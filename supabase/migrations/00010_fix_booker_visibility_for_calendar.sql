-- Fix Calendar "undefined" booker name / empty "Booked By" for normal users.
--
-- Root cause: the Calendar queries ALL bookings (for conflict + calendar visibility;
-- bookings SELECT RLS is USING (true) per migration 00005) and embeds
-- `user:profiles!bookings_user_id_fkey(name, email)`. Profiles RLS (migrations 00001
-- and 00009) only let a normal user read their OWN profile and the reviewers OF their
-- own bookings, so the embed resolved to null for any OTHER user's booking, producing
-- "undefined" in the event title and a blank "Booked By" in the details modal.
--
-- Fix: allow authenticated users to read the profiles of people who have made bookings.
-- This is strictly scoped to bookers and only surfaces identities that are ALREADY
-- exposed through the bookings the caller is authorized to view (bookings.user_id is
-- visible to all authenticated users, and the public_profiles view already exposes
-- id/name/email/role with no additional RLS). Admin/Manager visibility is unchanged.

CREATE POLICY "Authenticated users can view booker profiles" ON public.profiles
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.bookings b WHERE b.user_id = profiles.id
    )
  );
