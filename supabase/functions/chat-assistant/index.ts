import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
  userId: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, history, userId }: ChatRequest = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch live data from database - CRITICAL: Fetch fresh data on EVERY request
    const [resourcesResult, userActiveBookingsResult, userPastBookingsResult, allBookingsResult, profileResult] = await Promise.all([
      supabaseClient.from('resources').select('*'),
      supabaseClient
        .from('bookings')
        .select('*, resource:resources(*)')
        .eq('user_id', userId)
        .in('status', ['pending', 'approved', 'rejected', 'cancelled'])
        .order('start_time', { ascending: false }),
      supabaseClient
        .from('bookings')
        .select('*, resource:resources(*)')
        .eq('user_id', userId)
        .eq('status', 'completed')
        .order('end_time', { ascending: false })
        .limit(10),
      supabaseClient
        .from('bookings')
        .select('*, resource:resources(*), user:profiles!bookings_user_id_fkey(name, role)')
        .in('status', ['pending', 'approved'])
        .order('start_time', { ascending: true }),
      supabaseClient.from('profiles').select('*').eq('id', userId).maybeSingle(),
    ]);

    // Check for errors in critical queries but don't fail the whole request
    if (resourcesResult.error) console.error('Error fetching resources:', resourcesResult.error.message);
    if (allBookingsResult.error) console.error('Error fetching all bookings:', allBookingsResult.error.message);
    if (profileResult.error) console.error('Error fetching profile:', profileResult.error.message);

    const resources = resourcesResult.data || [];
    const userActiveBookings = userActiveBookingsResult.data || [];
    const userPastBookings = userPastBookingsResult.data || [];
    const allBookings = allBookingsResult.data || [];
    const currentUser = profileResult.data;
    const userLanguage = profileResult.data?.language_preference || 'en';

    // Language name mapping
    const languageNames: Record<string, string> = {
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

    // Format user's active bookings for the prompt
    const userActiveBookingsFormatted = userActiveBookings.length > 0
      ? userActiveBookings.map((b) => {
          const startDate = new Date(b.start_time);
          const endDate = new Date(b.end_time);
          const dateStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' }).format(startDate);
          const startTimeStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }).format(startDate);
          const endTimeStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }).format(endDate);
          
          return `  - Booking ID: ${b.id}
    Room: ${b.resource?.name || 'Unknown'}
    Date: ${dateStr}
    Time: ${startTimeStr} - ${endTimeStr}
    Status: ${b.status.toUpperCase()}
    Purpose: ${b.purpose || 'Not specified'}`;
        }).join('\n\n')
      : '  No active bookings found.';

    // Format user's past bookings for the prompt
    const userPastBookingsFormatted = userPastBookings.length > 0
      ? userPastBookings.map((b) => {
          const startDate = new Date(b.start_time);
          const endDate = new Date(b.end_time);
          const dateStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' }).format(startDate);
          const startTimeStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }).format(startDate);
          const endTimeStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }).format(endDate);
          
          return `  - Booking ID: ${b.id}
    Room: ${b.resource?.name || 'Unknown'}
    Date: ${dateStr}
    Time: ${startTimeStr} - ${endTimeStr}
    Status: COMPLETED
    Purpose: ${b.purpose || 'Not specified'}`;
        }).join('\n\n')
      : '  No past bookings found.';

    // Format all bookings for availability checking
    const allBookingsFormatted = allBookings.length > 0
      ? allBookings.map((b) => {
          const startDate = new Date(b.start_time);
          const endDate = new Date(b.end_time);
          const dateStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'medium' }).format(startDate);
          const startTimeStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }).format(startDate);
          const endTimeStr = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }).format(endDate);
          
          return `  - Room: ${b.resource?.name || 'Unknown'}, Booked by: ${b.user?.name || 'Unknown'}, Date: ${dateStr}, Time: ${startTimeStr} - ${endTimeStr}, Status: ${b.status}`;
        }).join('\n')
      : '  No active bookings.';

    // Format available resources
    const resourcesFormatted = resources.map((r) => 
      `  - ID: ${r.id}, Name: ${r.name}, Location: ${r.location}, Capacity: ${r.capacity} people, Hours: ${r.availability_hours}`
    ).join('\n');

    // Get current date and time for context in IST (Asia/Kolkata)
    const now = new Date();
    const currentDateTime = now.toISOString();
    
    const formatter = (options: Intl.DateTimeFormatOptions) => 
      new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'Asia/Kolkata' }).format(now);

    const currentDateFormatted = formatter({ 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    const currentTimeFormatted = formatter({ 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    // System prompt with live data injection - CRITICAL: This data is fetched fresh on EVERY request
    const systemPrompt = `You are MeetOps AI, an intelligent office room booking assistant. You have access to real-time room availability and booking data fetched directly from the database. You help office employees book rooms, check availability, manage their bookings, and find the best available space for their needs. Always be concise, helpful, and professional.

IMPORTANT LANGUAGE INSTRUCTION:
The user's preferred language is ${languageNames[userLanguage]}.
You MUST respond EXCLUSIVELY in ${languageNames[userLanguage]}.
Even if the conversation history is in English, you MUST translate your response to ${languageNames[userLanguage]}.
This is a strict requirement.

=== CURRENT DATE AND TIME ===
Current Date: ${currentDateFormatted}
Current Time: ${currentTimeFormatted}
ISO Format: ${currentDateTime}

Use this information to interpret relative dates like "today", "tomorrow", "next Monday", etc.

=== LIVE DATA (Fetched fresh from database on every request) ===

CURRENT USER:
- Name: ${currentUser?.name}
- Role: ${currentUser?.role}
- Language: ${languageNames[userLanguage]}

YOUR ACTIVE BOOKINGS (${currentUser?.name}'s current and upcoming bookings):
${userActiveBookingsFormatted}

YOUR PAST BOOKINGS (${currentUser?.name}'s completed bookings):
${userPastBookingsFormatted}

ALL BOOKINGS (for availability checking - includes all users):
${allBookingsFormatted}

AVAILABLE ROOMS:
${resourcesFormatted}

=== CRITICAL INSTRUCTIONS ===

1. When the user asks about "my bookings", "my reservations", "is there any booking of mine", "show me my bookings", "what rooms have I booked", "do I have any upcoming meetings", "what is the status of my booking", "did my booking get approved", or any similar question:
   - ALWAYS refer to the "YOUR ACTIVE BOOKINGS" section above for current/upcoming bookings
   - If asked about past or completed bookings, refer to the "YOUR PAST BOOKINGS" section
   - List ALL bookings shown in those sections with room name, date, time, and status
   - If both sections show "No bookings found", respond: "You currently have no bookings. Would you like me to help you book a room?"
   - NEVER say "I don't have access to that information" - you DO have access via the sections above
   - Clearly separate active and past bookings in your response

2. When checking room availability:
   - Use the "ALL BOOKINGS" section to see which rooms are already booked
   - Use the "AVAILABLE ROOMS" section to see all rooms
   - Check for time conflicts between requested time and existing bookings

3. TIME EXTRACTION AND HANDLING (CRITICAL - READ CAREFULLY):
   When extracting time from user messages, you MUST interpret the time EXACTLY as the user states it with NO modification, NO time zone offset, NO rounding, and NO substitution.
   
   Examples of CORRECT time extraction:
   - "11AM to 12PM" → Start: 11:00 AM, End: 12:00 PM → ISO: 11:00:00 and 12:00:00
   - "11am to 12pm" → Start: 11:00 AM, End: 12:00 PM → ISO: 11:00:00 and 12:00:00
   - "2pm to 3pm" → Start: 2:00 PM, End: 3:00 PM → ISO: 14:00:00 and 15:00:00
   - "2:30 PM to 4:00 PM" → Start: 2:30 PM, End: 4:00 PM → ISO: 14:30:00 and 16:00:00
   - "9 in the morning to 10" → Start: 9:00 AM, End: 10:00 AM → ISO: 09:00:00 and 10:00:00
   - "from 3:30 to 5" → Start: 3:30 PM, End: 5:00 PM → ISO: 15:30:00 and 17:00:00
   - "11am for 1 hour" → Start: 11:00 AM, End: 12:00 PM → ISO: 11:00:00 and 12:00:00
   
   CRITICAL RULES:
   - If user says "11AM", the time is 11:00:00 (NOT 16:30:00, NOT 23:00:00, NOT any other time)
   - If user says "2PM", the time is 14:00:00 (NOT 18:30:00, NOT any other time)
   - NEVER apply time zone offsets to the extracted time
   - NEVER round times to nearest slot
   - NEVER substitute a default time if parsing is unclear
   - If time is ambiguous (e.g., "book at 7" without AM/PM), ASK for clarification: "Did you mean 7:00 AM or 7:00 PM?"
   - If no specific time is given (e.g., "book this afternoon"), ASK: "What time this afternoon works for you?"
   - The time shown in confirmation MUST exactly match the time that will be stored in the database

4. BOOKING FLOW WITH MANDATORY CONFIRMATION:
   When a user requests a booking, you MUST follow this exact flow:
   
   Step 1: Parse the request and check availability
   Step 2: If available, show a DETAILED CONFIRMATION with exact details:
   
   "I found [Room Name] available! Here are the booking details I'm about to create:
   
   📍 Room: [Room Name]
   📅 Date: [Full Date - e.g., Wednesday, April 23, 2026]
   🕐 Start Time: [Exact Time - e.g., 11:00 AM]
   🕐 End Time: [Exact Time - e.g., 12:00 PM]
   📝 Purpose: [Purpose if provided, or "Not specified"]
   
   Shall I confirm this booking? (Reply Yes to confirm, or No to cancel)"
   
   Step 3: WAIT for user confirmation
   Step 4: ONLY if user says "yes", "confirm", "ok", "sure", "go ahead", or similar affirmative response, then execute:
   "EXECUTE_BOOKING:{resource_id}|{YYYY-MM-DDTHH:MM:SS}|{YYYY-MM-DDTHH:MM:SS}|{purpose}"
   
   Step 5: If user says "no" or requests changes, ask what needs to be corrected and show confirmation again
   
   IMPORTANT: Bookings made through the AI Assistant are AUTOMATICALLY APPROVED. 
   Users do not need to wait for manager/admin approval. The booking is immediately confirmed and ready to use.
   
   CRITICAL: You must NEVER execute EXECUTE_BOOKING without showing the confirmation first and receiving explicit user approval.

5. ISO 8601 TIME FORMAT FOR EXECUTE_BOOKING:
   When constructing the EXECUTE_BOOKING command, use this format:
   - Date: YYYY-MM-DD (e.g., 2026-04-23)
   - Time: HH:MM:SS in 24-hour format (e.g., 11:00:00 for 11 AM, 14:00:00 for 2 PM)
   - Combined: YYYY-MM-DDTHH:MM:SS (e.g., 2026-04-23T11:00:00)
   
   CRITICAL: Do NOT add a 'Z' suffix or any timezone indicator to the datetime string.
   The format must be exactly: YYYY-MM-DDTHH:MM:SS (no Z, no +00:00, no timezone)
   
   Examples of CORRECT format:
   - 2026-04-23T11:00:00 ✅ (CORRECT - no Z suffix)
   - 2026-04-23T14:30:00 ✅ (CORRECT - no Z suffix)
   
   Examples of WRONG format:
   - 2026-04-23T11:00:00Z ❌ (WRONG - has Z suffix)
   - 2026-04-23T11:00:00+05:30 ❌ (WRONG - has timezone offset)
   
   Conversion examples:
   - 11:00 AM → 11:00:00
   - 12:00 PM → 12:00:00
   - 1:00 PM → 13:00:00
   - 2:00 PM → 14:00:00
   - 3:30 PM → 15:30:00
   - 11:00 PM → 23:00:00

6. When the user wants to cancel:
   - Find their booking in the "YOUR BOOKINGS" section
   - Respond with: "EXECUTE_CANCEL:{booking_id}"
   - The system will cancel and confirm

Always format times in 12-hour format (e.g., 2:00 PM) when displaying to users.
Never make up room names or availability — always use the live data provided above.
Final Reminder: Your response MUST be in ${languageNames[userLanguage]}.`;

    // Build conversation history with system prompt
    const contents: ChatMessage[] = [
      {
        role: 'user',
        parts: [{ text: systemPrompt }],
      },
      {
        role: 'model',
        parts: [{ text: `I understand. I am MeetOps AI, ready to assist with room bookings using live data. I will respond exclusively in ${languageNames[userLanguage]}.` }],
      },
      ...history,
      {
        role: 'user',
        parts: [{ text: `${message}\n\n(Reminder: Respond in ${languageNames[userLanguage]})` }],
      },
    ];

    // Call LLM API with retry mechanism
    // Try GOOGLE_AI_API_KEY first (user's own key), fallback to INTEGRATIONS_API_KEY
    const googleApiKey = Deno.env.get('GOOGLE_AI_API_KEY');
    const integrationsApiKey = Deno.env.get('INTEGRATIONS_API_KEY');
    
    if (!googleApiKey && !integrationsApiKey) {
      throw new Error('No API key configured. Please set GOOGLE_AI_API_KEY in Supabase secrets.');
    }

    let llmResponse;
    let retries = 0;
    const maxRetries = 3;
    // Model configurations with their appropriate API versions
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
    let lastErrorText = '';
    let modelIndex = 0;
    
    while (retries < maxRetries) {
      const useDirectApi = !!googleApiKey;
      const currentModel = useDirectApi ? directApiModels[modelIndex] : { name: gatewayModel, version: 'v1beta' };
      console.log(`[Attempt ${retries + 1}/${maxRetries}] Trying model: ${currentModel.name} (API: ${currentModel.version}), using ${useDirectApi ? 'Direct Google' : 'Gateway'}`);
      try {
        const fetchUrl = useDirectApi
          ? `https://generativelanguage.googleapis.com/${currentModel.version}/models/${currentModel.name}:generateContent?key=${googleApiKey}`
          : `https://app-b5rmjd5bhh4x-api-VaOwP8E7dJqa.gateway.appmedo.com/v1beta/models/${currentModel.name}:generateContent`;
        
        console.log(`Endpoint: ${currentModel.version}/models/${currentModel.name}:generateContent`);
        
        console.log(`Using ${useDirectApi ? 'Direct Google AI API' : 'Gateway API'}`);
        
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        // Only add authorization header for gateway
        if (!useDirectApi && integrationsApiKey) {
          headers['X-Gateway-Authorization'] = `Bearer ${integrationsApiKey}`;
        }
        
        llmResponse = await fetch(fetchUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify({ contents }),
        });

        if (llmResponse.ok) {
          lastErrorText = '';
          console.log(`✅ SUCCESS! Connected with model: ${currentModel.name} using API ${currentModel.version}`);
          break;
        }
        
        lastErrorText = await llmResponse.text();
        console.error(`❌ Model ${currentModel.name} (${currentModel.version}) failed (${llmResponse.status}): ${lastErrorText.substring(0, 200)}`);

        // If 404 and using direct API, try next model immediately
        if (llmResponse.status === 404 && useDirectApi && modelIndex < directApiModels.length - 1) {
          modelIndex++;
          console.log(`Trying next model: ${directApiModels[modelIndex].name}`);
          continue; // Don't increment retries, just try next model
        }

        if (llmResponse.status === 429) {
          retries++;
          console.log(`Rate limited. Retry ${retries}/${maxRetries} after delay...`);
          await new Promise(resolve => setTimeout(resolve, 1000 * retries)); 
          continue;
        }
        
        // For other errors, retry
        console.warn(`Error ${llmResponse.status}, retrying...`);
        retries++;
        await new Promise(resolve => setTimeout(resolve, 1000 * retries));
      } catch (e) {
        console.error(`Fetch exception on retry ${retries}:`, e);
        lastErrorText = e.message;
        if (retries === maxRetries - 1) throw e;
        retries++;
        await new Promise(resolve => setTimeout(resolve, 1000 * retries));
      }
    }

    if (!llmResponse?.ok) {
      const status = llmResponse?.status || 'unknown';
      console.error('LLM Final Failure:', status, lastErrorText);
      
      // Provide helpful error message
      if (!googleApiKey) {
        throw new Error(`AI service unavailable. Please configure GOOGLE_AI_API_KEY in Supabase Edge Function secrets. Get your key from: https://aistudio.google.com/app/apikey`);
      }
      
      const modelNames = directApiModels.map(m => `${m.name} (${m.version})`).join(', ');
      throw new Error(`All Gemini models failed. Your API key is valid (requests are reaching Google), but none of the models are available. Tried: ${modelNames}. Last error: ${lastErrorText.substring(0, 300)}`);
    }

    // Parse non-streaming response
    const data = await llmResponse.json();
    console.log('LLM Response Data:', JSON.stringify(data).substring(0, 500));
    const fullText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!fullText) {
      console.warn('Empty fullText from LLM. Data:', JSON.stringify(data));
    }

    // Check for action commands
    let actionResult = null;

    if (fullText.includes('EXECUTE_BOOKING:')) {
      const match = fullText.match(/EXECUTE_BOOKING:([^|]+)\|([^|]+)\|([^|]+)\|(.+)/);
      if (match) {
        const [, resourceId, startTimeStr, endTimeStr, purpose] = match;
        
        // CRITICAL: Convert local datetime string to IST timestamp
        // The app is focused on IST (UTC+5:30) as per requirements.
        // We append +05:30 to ensure PostgreSQL stores it correctly as UTC.
        const startTimeWithOffset = `${startTimeStr}+05:30`;
        const endTimeWithOffset = `${endTimeStr}+05:30`;
        
        // Log for debugging
        console.log('LLM Booking Time Storage:', {
          startTimeStr,
          endTimeStr,
          startTimeWithOffset,
          endTimeWithOffset,
          note: 'Storing with IST (+05:30) offset',
        });
        
        const { data: booking, error } = await supabaseClient
          .from('bookings')
          .insert({
            resource_id: resourceId,
            user_id: userId,
            start_time: startTimeWithOffset,
            end_time: endTimeWithOffset,
            purpose: purpose,
            status: 'approved', // AI Assistant bookings are auto-approved
            booking_type: 'single',
            attendees: [],
          })
          .select('*, resource:resources(*)')
          .single();

        if (error) {
          actionResult = { success: false, message: `Failed to create booking: ${error.message}` };
        } else {
          // Format the stored times specifically for IST (Asia/Kolkata)
          // This ensures the confirmation message matches the user's expectation
          const formatIST = (isoStr: string) => {
            const date = new Date(isoStr);
            return {
              time: date.toLocaleTimeString('en-US', { 
                timeZone: 'Asia/Kolkata',
                hour: '2-digit', 
                minute: '2-digit', 
                hour12: true 
              }),
              date: date.toLocaleDateString('en-US', {
                timeZone: 'Asia/Kolkata',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            };
          };
          
          const startInfo = formatIST(booking.start_time);
          const endInfo = formatIST(booking.end_time);
          
          actionResult = {
            success: true,
            message: `✅ Booking confirmed and approved!

📍 Room: ${booking.resource?.name}
📅 Date: ${startInfo.date}
🕐 Start Time: ${startInfo.time}
🕐 End Time: ${endInfo.time}
📝 Purpose: ${purpose}
✅ Status: Approved

Your booking is confirmed and ready to use!`,
          };
        }
      }
    } else if (fullText.includes('EXECUTE_CANCEL:')) {
      const match = fullText.match(/EXECUTE_CANCEL:([a-f0-9-]+)/);
      if (match) {
        const bookingId = match[1];
        
        const { error } = await supabaseClient
          .from('bookings')
          .update({ status: 'cancelled' })
          .eq('id', bookingId)
          .eq('user_id', userId);

        if (error) {
          actionResult = { success: false, message: `Failed to cancel booking: ${error.message}` };
        } else {
          actionResult = { success: true, message: '✅ Booking cancelled successfully.' };
        }
      }
    }

    // Return response with action result if applicable
    return new Response(
      JSON.stringify({
        response: fullText.replace(/EXECUTE_(BOOKING|CANCEL):[^\n]+/, '').trim(),
        actionResult,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Chat assistant error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
