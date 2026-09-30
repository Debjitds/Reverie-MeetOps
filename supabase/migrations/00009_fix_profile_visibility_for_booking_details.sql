-- Fix booking-details visibility: allow managers/admins and booking owners to resolve
-- requester/reviewer identity through the profiles embeds used by the app.
--
-- Root cause: profiles RLS only allowed admins (all rows) and users (own row), so
-- PostgREST embeds like `user:profiles!bookings_user_id_fkey(...)` and
-- `reviewer:profiles!bookings_reviewed_by_fkey(...)` returned null for non-admins:
-- - Booking owners could not see WHO approved their booking.
-- - Managers could not see WHO originally booked the room.

-- Managers and admins participate in booking review across the whole system,
-- so they may read profiles (same data already used for booking displays).
CREATE POLICY "Managers and admins can view all profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (can_manage_bookings(auth.uid()));

-- Booking owners may read the profile of the reviewer who acted on THEIR booking
-- (identity display only, scoped to reviewers of their own bookings).
CREATE POLICY "Users can view profiles that reviewed their bookings" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings b
      WHERE b.user_id = auth.uid()
        AND b.reviewed_by = profiles.id
    )
  );
