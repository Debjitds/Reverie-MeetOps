-- Drop the restrictive policy that only allows users to see their own bookings
DROP POLICY IF EXISTS "Users can view their own bookings" ON public.bookings;

-- Create new policy: All authenticated users can view all bookings
-- This is necessary for conflict detection and calendar views
CREATE POLICY "All users can view all bookings" ON public.bookings
  FOR SELECT TO authenticated
  USING (true);

-- Keep the existing policies for managers/admins (they already have full access)
-- Keep the insert policy (users can only create bookings for themselves)
-- Keep the update policies (users can cancel their own, managers can approve/reject)