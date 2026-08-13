const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InsightsRequest {
  stats: {
    totalBookings: number;
    bookingsPerRoom: Record<string, number>;
    mostBookedRoom: string;
    leastBookedRoom: string;
    busiestDay: string;
    pendingApprovals: number;
  };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { stats }: InsightsRequest = await req.json();

    const prompt = `You are an office resource analyst. Here is this week's room booking data:

Total bookings: ${stats.totalBookings}
Bookings per room: ${JSON.stringify(stats.bookingsPerRoom, null, 2)}
Most booked room: ${stats.mostBookedRoom}
Least booked room: ${stats.leastBookedRoom}
Busiest day: ${stats.busiestDay}
Pending approvals: ${stats.pendingApprovals}

Generate a 3 to 4 sentence plain English summary highlighting the most important patterns, which rooms need attention, and one actionable recommendation for the office admin. Be concise and professional. Do not use markdown formatting.`;

    // Call LLM API with model fallback
    const googleApiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    const integrationsApiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    
    const useDirectApi = !!googleApiKey;
    const directApiModels = [
      { name: 'gemini-2.5-flash', version: 'v1beta' },
      { name: 'gemini-2.0-flash', version: 'v1beta' },
      { name: 'gemini-2.0-flash-exp', version: 'v1beta' },
      { name: 'gemini-1.5-flash', version: 'v1beta' },
      { name: 'gemini-1.5-flash', version: 'v1' },
      { name: 'gemini-1.5-pro', version: 'v1beta' },
      { name: 'gemini-1.0-pro', version: 'v1' },
    ];
    const gatewayModel = 'gemini-1.5-flash-latest';
    
    let llmResponse;
    let lastError = '';
    
    if (useDirectApi) {
      // Try models in fallback order
      for (const model of directApiModels) {
        try {
          const fetchUrl = `https://generativelanguage.googleapis.com/${model.version}/models/${model.name}:generateContent?key=${googleApiKey}`;
          console.log(`Trying model: ${model.name} (${model.version})`);
          
          llmResponse = await fetch(fetchUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [{ text: prompt }],
                },
              ],
            }),
          });

          if (llmResponse.ok) {
            console.log(`✅ Success with model: ${model.name} (${model.version})`);
            break;
          }
          
          lastError = await llmResponse.text();
          console.warn(`❌ Model ${model.name} (${model.version}) failed (${llmResponse.status}): ${lastError.substring(0, 150)}`);
        } catch (e) {
          console.error(`Exception with model ${model.name}:`, e);
          lastError = e.message;
        }
      }
    } else {
      // Use gateway
      const fetchUrl = `https://app-b5rmjd5bhh4x-api-VaOwP8E7dJqa.gateway.appmedo.com/v1beta/models/${gatewayModel}:generateContent`;
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (integrationsApiKey) {
        headers['X-Gateway-Authorization'] = `Bearer ${integrationsApiKey}`;
      }
      
      llmResponse = await fetch(fetchUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
        }),
      });
      
      if (!llmResponse.ok) {
        lastError = await llmResponse.text();
      }
    }

    if (!llmResponse?.ok) {
      if (!googleApiKey) {
        throw new Error(`AI service unavailable. Please configure GOOGLE_AI_API_KEY. Get it from: https://aistudio.google.com/app/apikey`);
      }
      const modelNames = directApiModels.map(m => `${m.name} (${m.version})`).join(', ');
      throw new Error(`All models failed. API key works but models unavailable. Tried: ${modelNames}. Last error: ${lastError.substring(0, 200)}`);
    }

    const data = await llmResponse.json();
    const insights = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return new Response(
      JSON.stringify({ insights: insights.trim() }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Insights generation error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
