const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TranslateRequest {
  text: string | string[];
  targetLang: string;
  sourceLang?: string;
}

interface TranslationItem {
  id: number;
  text: string;
}

const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil',
  es: 'Spanish',
  fr: 'French',
  ar: 'Arabic',
  zh: 'Chinese',
  ja: 'Japanese',
  de: 'German',
};

// Same Gemini REST pattern as chat-assistant, with structured JSON output
const GEMINI_MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
const CHUNK_SIZE = 200;

function buildPrompt(items: TranslationItem[], sourceLang: string, targetLang: string): string {
  const sourceName = LANGUAGE_NAMES[sourceLang] || sourceLang;
  const targetName = LANGUAGE_NAMES[targetLang] || targetLang;

  return `You are a professional UI translator for MeetOps, a meeting-room booking application.

SOURCE LANGUAGE: ${sourceName} (${sourceLang})
TARGET LANGUAGE: ${targetName} (${targetLang})

Translate each "text" value into the target language naturally and concisely, as used in software UI (buttons, labels, headings, statuses, placeholders).

STRICT RULES:
- Return EVERY input id exactly once. Keep ids unchanged. Do not merge, split, reorder, add, or drop items.
- Do NOT translate or alter placeholders/variables such as {{name}}, \${name}, {count}, %s — keep them verbatim inside the translated text.
- Keep proper nouns, product names (e.g. MeetOps), email addresses, URLs, IDs, and numbers unchanged — keep them in their original Latin/script form, do NOT transliterate them into the target language's script.
- Example: "MeetOps AI Assistant" translated to Hindi must be "MeetOps AI सहायक" — "MeetOps" stays in Latin script.
- Translate only the human-readable words.
- Output ONLY the JSON object matching the required schema.

ITEMS TO TRANSLATE:
${JSON.stringify(items)}`;
}

async function translateChunkWithGemini(
  items: TranslationItem[],
  sourceLang: string,
  targetLang: string,
  apiKey: string
): Promise<string[]> {
  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: buildPrompt(items, sourceLang, targetLang) }],
      },
    ],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'OBJECT',
        properties: {
          translations: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                id: { type: 'INTEGER' },
                text: { type: 'STRING' },
              },
              required: ['id', 'text'],
            },
          },
        },
        required: ['translations'],
      },
    },
  };

  let lastStatus = 'unknown';
  let lastError = '';

  for (const model of GEMINI_MODELS) {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      lastStatus = response.status;
      lastError = (await response.text()).substring(0, 200);
      console.error(`Gemini model ${model} failed (${response.status}): ${lastError}`);
      if (response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      continue;
    }

    const data = await response.json();
    const rawText: string = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    if (!rawText) {
      lastStatus = 'empty-response';
      lastError = 'Gemini returned no generated text';
      console.error('Gemini returned empty response:', JSON.stringify(data).substring(0, 300));
      continue;
    }

    let parsed: { translations?: { id?: number; text?: string }[] };
    try {
      parsed = JSON.parse(rawText);
    } catch {
      lastStatus = 'invalid-json';
      lastError = 'Gemini response was not valid JSON';
      console.error('Failed to parse Gemini JSON output:', rawText.substring(0, 300));
      continue;
    }

    const byId = new Map<number, string>();
    for (const item of parsed.translations || []) {
      if (typeof item?.id === 'number' && typeof item?.text === 'string') {
        byId.set(item.id, item.text);
      }
    }

    const missing = items.filter(item => !byId.has(item.id));
    if (missing.length > 0) {
      console.warn(`Gemini response missing ${missing.length}/${items.length} translation ids; falling back to originals for those items`);
    }

    // Rebuild in input order; missing ids fall back to their original text
    return items.map(item => byId.get(item.id) ?? item.text);
  }

  throw new Error(`Gemini translation failed (last status: ${lastStatus}). ${lastError}`);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, targetLang, sourceLang }: TranslateRequest = await req.json();

    // Validate target language
    const validLanguages = ['en', 'hi', 'bn', 'ta', 'es', 'fr', 'ar', 'zh', 'ja', 'de'];
    if (!validLanguages.includes(targetLang)) {
      return new Response(
        JSON.stringify({ error: 'Invalid target language' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const textsToTranslate = Array.isArray(text) ? text : [text];

    // If source and target are the same, return original text
    if ((sourceLang || 'en') === targetLang) {
      return new Response(
        JSON.stringify({ translations: Array.isArray(text) ? textsToTranslate : textsToTranslate[0] }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const apiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    if (!apiKey) {
      console.error('GOOGLE_AI_API_KEY is not configured');
      return new Response(
        JSON.stringify({
          error: 'Translation service not configured: GOOGLE_AI_API_KEY secret is missing',
          translations: Array.isArray(text) ? textsToTranslate : textsToTranslate[0],
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const allTranslations: string[] = [];

    for (let i = 0; i < textsToTranslate.length; i += CHUNK_SIZE) {
      const chunk = textsToTranslate.slice(i, i + CHUNK_SIZE);
      const items: TranslationItem[] = chunk.map((t, idx) => ({ id: idx, text: t }));

      console.log(`Translating ${chunk.length} texts to ${targetLang}`);

      try {
        const chunkTranslations = await translateChunkWithGemini(items, sourceLang || 'en', targetLang, apiKey);
        allTranslations.push(...chunkTranslations);
      } catch (error) {
        console.error('Gemini translation error:', error instanceof Error ? error.message : error);
        return new Response(
          JSON.stringify({
            error: `Translation provider failure: ${error instanceof Error ? error.message : 'unknown error'}`,
            translations: Array.isArray(text) ? textsToTranslate : textsToTranslate[0],
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }

    return new Response(
      JSON.stringify({
        translations: Array.isArray(text) ? allTranslations : allTranslations[0],
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Translation error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
