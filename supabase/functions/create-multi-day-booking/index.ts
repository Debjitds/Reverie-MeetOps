import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingRequest {
  resource_id: string;
  user_id: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  purpose: string;
  attendees: string[];
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { resource_id, user_id, start_date, end_date, start_time, end_time, purpose, attendees } =
      await req.json() as BookingRequest;

    // Validate inputs
    if (!resource_id || !user_id || !start_date || !end_date || !start_time || !end_time || !purpose) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse dates
    const startDateObj = new Date(start_date + 'T00:00:00');
    const endDateObj = new Date(end_date + 'T00:00:00');

    if (endDateObj < startDateObj) {
      return new Response(
        JSON.stringify({ error: 'End date must be after or equal to start date' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate array of dates
    const dates: string[] = [];
    const currentDate = new Date(startDateObj);
    while (currentDate <= endDateObj) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Generate booking group ID
    const bookingGroupId = crypto.randomUUID();

    // Create datetime strings for each date
    const bookingsToCreate = dates.map((date) => {
      const startDateTime = `${date}T${start_time}:00`;
      const endDateTime = `${date}T${end_time}:00`;
      const startDateObj = new Date(startDateTime);
      const endDateObj = new Date(endDateTime);

      return {
        resource_id,
        user_id,
        start_time: startDateObj.toISOString(),
        end_time: endDateObj.toISOString(),
        purpose,
        attendees,
        status: 'pending',
        booking_type: dates.length > 1 ? 'multi_day' : 'single',
        booking_group_id: dates.length > 1 ? bookingGroupId : null,
      };
    });

    // Check for conflicts on all dates
    for (const booking of bookingsToCreate) {
      const { data: conflicts } = await supabase
        .from('bookings')
        .select('id, start_time, end_time')
        .eq('resource_id', resource_id)
        .in('status', ['approved', 'pending'])
        .or(`and(start_time.lt.${booking.end_time},end_time.gt.${booking.start_time})`);

      if (conflicts && conflicts.length > 0) {
        const conflictDate = new Date(booking.start_time).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        return new Response(
          JSON.stringify({
            error: `Resource unavailable on ${conflictDate}. Please choose different dates.`,
            conflict_date: conflictDate,
          }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Create all bookings in a transaction
    const { data: createdBookings, error: insertError } = await supabase
      .from('bookings')
      .insert(bookingsToCreate)
      .select();

    if (insertError) {
      console.error('Insert error:', insertError);
      return new Response(
        JSON.stringify({ error: insertError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create notification for managers/admins
    const { data: managers } = await supabase
      .from('profiles')
      .select('id')
      .in('role', ['manager', 'admin']);

    if (managers && managers.length > 0) {
      const notifications = managers.map((manager) => ({
        user_id: manager.id,
        booking_id: createdBookings[0].id,
        type: 'booking_created',
        message: dates.length > 1
          ? `New multi-day booking request for ${dates.length} days`
          : 'New booking request requires approval',
      }));

      await supabase.from('notifications').insert(notifications);
    }

    return new Response(
      JSON.stringify({
        success: true,
        bookings: createdBookings,
        booking_group_id: bookingGroupId,
        total_days: dates.length,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
