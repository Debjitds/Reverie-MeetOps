-- Email confirmation is disabled in this project, so new signups are INSERTed
-- into auth.users with confirmed_at already set. The existing
-- on_auth_user_confirmed trigger (AFTER UPDATE when confirmed_at NULL -> set)
-- never fires for them, so no profile row was created. This trigger covers
-- the auto-confirmed INSERT path; the UPDATE trigger still covers the flow
-- if email confirmation is ever re-enabled.
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  WHEN (NEW.confirmed_at IS NOT NULL)
  EXECUTE FUNCTION public.handle_new_user();

-- Backfill profiles for auth users that were created while the schema was
-- missing / before this trigger existed. Follows handle_new_user() semantics:
-- the first confirmed user becomes admin, everyone else 'user'.
INSERT INTO public.profiles (id, email, name, role)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'name', split_part(u.email, '@', 1)),
  CASE WHEN u.id = (
    SELECT id FROM auth.users
    WHERE confirmed_at IS NOT NULL
    ORDER BY confirmed_at
    LIMIT 1
  ) THEN 'admin'::public.user_role ELSE 'user'::public.user_role END
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = u.id);
