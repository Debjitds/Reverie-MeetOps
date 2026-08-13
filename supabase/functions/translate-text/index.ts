const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TranslateRequest {
  text: string | string[];
  targetLang: string;
  sourceLang?: string;
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

    // If source and target are the same, return original text
    if (sourceLang === targetLang) {
      const translations = Array.isArray(text) ? text : [text];
      return new Response(
        JSON.stringify({ translations }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const apiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    if (!apiKey) {
      console.error('INTEGRATIONS_API_KEY is not configured');
      return new Response(
        JSON.stringify({ 
          error: 'Translation service not configured',
          translations: Array.isArray(text) ? text : [text]
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const textsToTranslate = Array.isArray(text) ? text : [text];
    
    // Google Translate API v2 requires each text as a separate 'q' parameter
    // We'll process in chunks to avoid URL length limits
    const CHUNK_SIZE = 50;
    const allTranslations: string[] = [];

    for (let i = 0; i < textsToTranslate.length; i += CHUNK_SIZE) {
      const chunk = textsToTranslate.slice(i, i + CHUNK_SIZE);
      
      // Build form data with multiple 'q' parameters
      const formData = new URLSearchParams();
      chunk.forEach(t => formData.append('q', t));
      formData.append('target', targetLang);
      if (sourceLang) formData.append('source', sourceLang);
      formData.append('format', 'text');
      
      console.log(`Translating ${chunk.length} texts to ${targetLang}`);
      
      const response = await fetch(
        'https://app-b5rmjd5bhh4x-api-GaDwZ8DX7jPY.gateway.appmedo.com/language/translate/v2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Gateway-Authorization': `Bearer ${apiKey}`,
          },
          body: formData.toString(),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Translation API error:', response.status, errorText);
        // Fallback to original texts for this chunk
        allTranslations.push(...chunk);
        continue;
      }

      const data = await response.json();
      console.log('Translation API response:', JSON.stringify(data).substring(0, 200));
      
      const chunkTranslations = data.data?.translations?.map((t: any) => t.translatedText) || chunk;
      allTranslations.push(...chunkTranslations);
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
