-- Fix "Failed to change language. Please try again." (RLS policy recursion).
--
-- Root cause: the profiles UPDATE policy "Users can update their own profile except
-- role" has a WITH CHECK subquery that SELECTs from profiles under the caller role.
-- The SELECT policies added in migrations 00009 and 00010 read the `bookings` table
-- INLINE, and the bookings SELECT policy calls can_manage_bookings() which reads
-- `profiles`. During the UPDATE's WITH CHECK this formed a
-- profiles -> bookings -> profiles policy cycle, making Postgres raise
-- "42P17 infinite recursion detected in policy for relation profiles", so every
-- language change (an UPDATE on profiles) failed.
--
-- Fix: preserve the EXACT same visibility, but move the bookings lookups into
-- SECURITY DEFINER helper functions. Inside them the bookings read runs as the
-- function owner and does not re-apply the caller's bookings RLS, breaking the cycle.
-- No behavior change for booking-details / calendar visibility; UPDATE/INSERT/DELETE
-- and admin/manager policies are untouched.

CREATE OR REPLACE FUNCTION public.profile_is_booker(target uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.bookings b WHERE b.user_id = target);
$$;

CREATE OR REPLACE FUNCTION public.profile_reviewed_my_booking(target uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.bookings b
    WHERE b.user_id = auth.uid() AND b.reviewed_by = target
  );
$$;

-- Replace the two inline-EXISTS SELECT policies with function-based equivalents.
DROP POLICY IF EXISTS "Authenticated users can view booker profiles" ON public.profiles;
CREATE POLICY "Authenticated users can view booker profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (public.profile_is_booker(id));

DROP POLICY IF EXISTS "Users can view profiles that reviewed their bookings" ON public.profiles;
CREATE POLICY "Users can view profiles that reviewed their bookings" ON public.profiles
  FOR SELECT TO authenticated
  USING (public.profile_reviewed_my_booking(id));
