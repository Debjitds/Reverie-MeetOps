import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client with service role key for admin access
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Get current timestamp in ISO format
    const now = new Date().toISOString();

    console.log('Checking for expired approved bookings...', { now });

    // Find all approved bookings where end_time has passed
    const { data: expiredBookings, error: fetchError } = await supabaseClient
      .from('bookings')
      .select('id, end_time, resource:resources(name), user:profiles!bookings_user_id_fkey(name)')
      .eq('status', 'approved')
      .lt('end_time', now);

    if (fetchError) {
      console.error('Error fetching expired bookings:', fetchError);
      throw fetchError;
    }

    console.log('Found expired bookings:', expiredBookings?.length || 0);

    if (!expiredBookings || expiredBookings.length === 0) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'No expired bookings to update',
          updated_count: 0,
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Extract booking IDs
    const bookingIds = expiredBookings.map(b => b.id);

    // Update all expired approved bookings to completed status
    const { data: updatedBookings, error: updateError } = await supabaseClient
      .from('bookings')
      .update({ status: 'completed' })
      .in('id', bookingIds)
      .select('id');

    if (updateError) {
      console.error('Error updating booking statuses:', updateError);
      throw updateError;
    }

    const updatedCount = updatedBookings?.length || 0;

    console.log('Successfully updated bookings to completed:', updatedCount);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Updated ${updatedCount} booking(s) to completed status`,
        updated_count: updatedCount,
        booking_ids: bookingIds,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in update-booking-statuses:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
