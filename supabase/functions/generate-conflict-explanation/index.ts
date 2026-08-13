import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ConflictRequest {
  resourceId: string;
  startTime: string;
  endTime: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { resourceId, startTime, endTime }: ConflictRequest = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get resource details
    const { data: resource } = await supabaseClient
      .from('resources')
      .select('*')
      .eq('id', resourceId)
      .single();

    // Find conflicting bookings
    const { data: conflictingBookings } = await supabaseClient
      .from('bookings')
      .select('*, user:users(*)')
      .eq('resource_id', resourceId)
      .in('status', ['pending', 'approved'])
      .or(`and(start_time.lte.${endTime},end_time.gte.${startTime})`);

    // Find next available slot for this room
    const { data: futureBookings } = await supabaseClient
      .from('bookings')
      .select('start_time, end_time')
      .eq('resource_id', resourceId)
      .in('status', ['pending', 'approved'])
      .gte('start_time', startTime)
      .order('start_time', { ascending: true })
      .limit(5);

    // Find alternative rooms with same capacity
    const { data: alternativeRooms } = await supabaseClient
      .from('resources')
      .select('*')
      .gte('capacity', resource?.capacity || 0)
      .neq('id', resourceId)
      .limit(3);

    // Check which alternatives are available
    const availableAlternatives = [];
    for (const room of alternativeRooms || []) {
      const { data: roomBookings } = await supabaseClient
        .from('bookings')
        .select('id')
        .eq('resource_id', room.id)
        .in('status', ['pending', 'approved'])
        .or(`and(start_time.lte.${endTime},end_time.gte.${startTime})`);

      if (!roomBookings || roomBookings.length === 0) {
        availableAlternatives.push(room);
      }
    }

    // Build context for LLM
    const conflictInfo = conflictingBookings?.[0];
    const conflictUser = conflictInfo?.user?.name || 'Another user';
    const conflictStart = new Date(conflictInfo?.start_time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    const conflictEnd = new Date(conflictInfo?.end_time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    // Find next available slot
    let nextAvailableSlot = 'later today';
    if (futureBookings && futureBookings.length > 0) {
      const lastBookingEnd = new Date(futureBookings[futureBookings.length - 1].end_time);
      nextAvailableSlot = lastBookingEnd.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
    }

    const alternativesList = availableAlternatives
      .map((r) => `${r.name} (${r.location}, capacity: ${r.capacity})`)
      .join(', ');

    const prompt = `Generate a concise, human-readable booking conflict explanation with the following information:

Room: ${resource?.name}
Requested time: ${new Date(startTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} to ${new Date(endTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
Conflict: Already booked by ${conflictUser} from ${conflictStart} to ${conflictEnd}
Purpose: ${conflictInfo?.purpose || 'Meeting'}
Next available slot for this room: ${nextAvailableSlot}
Alternative rooms available: ${alternativesList || 'None'}

Write a friendly 2-3 sentence explanation that includes:
1. Who has the room booked and until what time
2. The next available slot for this specific room
3. Alternative rooms if available

Keep it professional and helpful. Do not use markdown formatting.`;

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
    const explanation = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return new Response(
      JSON.stringify({
        explanation: explanation.trim(),
        conflictDetails: {
          user: conflictUser,
          startTime: conflictStart,
          endTime: conflictEnd,
          nextAvailable: nextAvailableSlot,
          alternatives: availableAlternatives.map((r) => ({
            id: r.id,
            name: r.name,
            location: r.location,
            capacity: r.capacity,
          })),
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Conflict explanation error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
