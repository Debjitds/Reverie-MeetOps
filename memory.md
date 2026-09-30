# memory.md — Project Modification History

> **Permanent rule for coding agents:** ALWAYS read this file before making any changes to this project, and ALWAYS append a record here after completing any task. Never delete previous entries — append only.

---

## 2026-09-30 — Calendar Legend "Approved" color fix

**Instruction:** The calendar's Approved events are displayed in blue, but the "Approved" indicator in the Legend card below the calendar used a different color. Fix ONLY the Legend's Approved indicator to use the exact same color as the calendar's Approved event, reusing the existing color; keep all other legend colors and behavior unchanged.

**What was changed:**
- File: `src/pages/CalendarPage.tsx`
- The calendar's event colors come from `eventStyleGetter()`: Approved events render with `backgroundColor: '#3b82f6'` and `borderColor: '#2563eb'` (blue).
- The Legend's Approved swatch previously used `bg-primary border-2 border-primary`. `--primary` is defined in `src/index.css` as `48 100% 62%` (a yellow tone), so it did NOT match the blue Approved event.
- Changed the Approved legend swatch className from `bg-primary border-2 border-primary` to `bg-[#3b82f6] border-2 border-[#2563eb]` — the exact same hex values used by `eventStyleGetter` for approved events, and consistent with how the other legend swatches (pending/rejected/cancelled) already hardcode their hex colors.

**Unchanged:** Pending (`#eab308`/`#ca8a04`), Rejected (`#6b7280`/`#4b5563`), Cancelled (`#9ca3af`/`#6b7280`) legend swatches; all calendar rendering, dialogs, views, and business logic.

**Verification:** Legend Approved swatch now uses the identical background (`#3b82f6`) and border (`#2563eb`) as approved calendar events. No other lines in the file were modified.

---

## 2026-09-30 — CalendarPage.tsx error fixes

**Instruction:** Fix the errors/warnings reported in `src/pages/CalendarPage.tsx` and update this file.

**What was changed:**
1. Missing type declarations for `react-big-calendar` (TS7016) → installed `@types/react-big-calendar` as a devDependency (`package.json` / `package-lock.json` updated via `npm install --save-dev`).
2. Unused variable `profile` (TS6133 warning) → removed `const { profile } = useAuth();` from `CalendarPage()` and the now-unused `import { useAuth } from '@/contexts/AuthContext';`. Page auth protection is handled elsewhere (route guards), so behavior is unchanged.
3. Implicit `any` on `showMore: (total)` (TS7016-related) → resolved automatically once `@types/react-big-calendar` was installed; `total` now gets contextual typing (`number`) from the `Messages` type. No code change needed for this one.

**Verification:** Full `npx tsc -p tsconfig.app.json --noEmit` reports ZERO errors for `CalendarPage.tsx`. Note: pre-existing unrelated errors remain in other files (`ChatWidget.tsx`, `qrcodedataurl.tsx`, `video.tsx`, `pdf-export.ts`, `BookingsPage.tsx`, `NewBookingPage.tsx`) — intentionally NOT touched in this task.

---

## 2026-09-30 — Sidebar independent scroll fix

**Instruction:** Scrolling the main page/body content moved the sidebar vertically. Fix so the sidebar stays fixed/sticky in place while page content scrolls, gets its own internal scrolling only when its content exceeds viewport height, works responsively, and without breaking navigation, active states, or the mobile drawer. Prefer a CSS/layout root-cause fix over JavaScript scroll listeners.

**Problem identified (root cause):** In `AppLayout`, the wrapper is `flex min-h-screen`. On long pages the flex container grows to the full document height, and the `<aside>` sidebar (default `align-items: stretch`) stretched to that full height instead of the viewport — so the logo scrolled out of view and the user-info footer sat at the bottom of the *document*, making the sidebar appear to scroll with the page. The inner `h-full` didn't constrain to the viewport because the parent had no fixed height.

**Files modified:** `src/components/layouts/AppSidebar.tsx` only (2 className changes; `AppLayout.tsx` needed no change).
1. `<aside>`: added `sticky top-0 self-start h-screen` — `self-start` stops the flex stretch, `h-screen` constrains the sidebar to the viewport, `sticky top-0` keeps it in place during page scroll. Pure CSS, no JS scroll listeners.
2. `<nav>`: added `min-h-0 overflow-y-auto` (alongside existing `flex-1`) — when menu items exceed available height, only the nav area scrolls internally; the logo header and user footer remain fixed. `min-h-0` is required so the flex child can shrink below content size and actually scroll.

**Unchanged:** Mobile navigation (separate `Sheet` drawer in `AppHeader.tsx`), active-link states, role-based menu filtering, borders/design system, main content scroll behavior. Sidebar remains `hidden lg:block` (desktop-only) exactly as before.

**Verification:**
- `npx tsc -p tsconfig.app.json --noEmit`: zero errors in layout files.
- `git diff`: exactly the two className changes above, nothing else.
- Checked `src/index.css` — no `html`/`body`/`#root` height/overflow rules that would break `position: sticky`.
- No horizontal overflow introduced: sidebar width (`w-64 shrink-0`) and main column (`min-w-0` with `overflow-x-hidden` in `AppLayout`) untouched.

---

## 2026-09-30 — Booking-details approver/requester visibility fix (end-to-end)

**Instruction:** Users couldn't see WHO approved their booking; managers couldn't see WHO originally booked the room (admin saw both fine). Fix end-to-end with real persisted identity data, no hardcoding, preserving RBAC and not weakening security beyond what the feature legitimately requires.

**Root cause found (NOT a frontend bug):** The data layer and UI were already correct — `bookings.reviewed_by`/`reviewed_at` are persisted by the approve/reject handlers in `BookingDetailPage.tsx`, and the page already renders "Booked by" + "Reviewed by/Reviewed at" from `user:profiles!bookings_user_id_fkey` / `reviewer:profiles!bookings_reviewed_by_fkey` embeds. The failure was **RLS on `public.profiles`** (from migration 00001): only admins could SELECT all profiles and users only their own row. PostgREST embeds execute under the caller's RLS, so the joined profile resolved to null for non-admins → reviewer name blank for booking owners, requester name blank for managers.

**Changes:**
1. New migration `supabase/migrations/00009_fix_profile_visibility_for_booking_details.sql`, applied to the live MeetOps Supabase project (`cazqwpknzkqyytokotny`) via `apply_migration`. Adds two narrow SELECT policies:
   - "Managers and admins can view all profiles" — `USING (can_manage_bookings(auth.uid()))` (reuses existing SECURITY DEFINER helper from migration 00003).
   - "Users can view profiles that reviewed their bookings" — `USING (EXISTS (SELECT 1 FROM bookings b WHERE b.user_id = auth.uid() AND b.reviewed_by = profiles.id))` (identity scoped strictly to reviewers of the caller's own bookings).
2. No frontend code changed — existing UI, types (`Booking.reviewer`), translations, and queries already handled both fields; they simply received nulls.

**Security posture:** Existing policies untouched (admin full access, own-row select, own update). No INSERT/UPDATE/DELETE policies relaxed; bookings policies unchanged.

**Verification (simulated real roles via `SET ROLE authenticated` + JWT claims against production data):**
- Booking owner Rohan_QC can now see reviewer "Raj" (manager-approved booking) ✓
- Manager Raj can now see requester "Ash" (user-created booking) ✓
- Negative test: owner still CANNOT see unrelated profiles → "INVISIBLE (correct)" ✓ (no over-exposure)
- Confirmed real persisted data exists for approved (manager + admin reviewers) and rejected bookings; admin behavior unchanged (its own policy was not modified).
- Pending/Cancelled: `reviewed_by` stays null (users cancel directly; no human reviewer), so the Reviewed-by block correctly stays hidden.
- Note: AI chat-assistant auto-approved bookings have `reviewed_by = null` by design (no human approver) — existing behavior, untouched.

---

## 2026-10-01 — Calendar booker name "undefined" / empty "Booked By" fix (normal users)

**Instruction:** On the Calendar, normal users saw other users' bookings labeled with booker name "undefined", and the click-through Booking Details modal showed an empty "Booked By". Fix the real data/permission cause (no frontend placeholder), keep Admin/Manager behavior identical, don't weaken RLS, and handle any genuinely unresolvable user gracefully.

**Root cause (RLS, not frontend):** Data flow inspected: `CalendarPage.fetchBookings()` queries ALL bookings (`bookings` SELECT RLS is `USING (true)` from migration 00005, needed for conflict + calendar visibility) with embed `user:profiles!bookings_user_id_fkey(name, email)`; the event title is `` `${resource?.name} - ${user?.name}` `` and the modal shows `selectedBooking.user?.name`. Profiles RLS (migrations 00001 + 00009) only let a normal user read their OWN profile and the reviewers OF their own bookings — never OTHER bookers' profiles. So the embed resolved to null for anyone else's booking → "undefined"/blank. (Admins/Managers were unaffected because their policies already grant full profile reads.)

**Changes:**
1. New migration `supabase/migrations/00010_fix_booker_visibility_for_calendar.sql`, applied to the live MeetOps Supabase project (`cazqwpknzkqyytokotny`) via `apply_migration`. Adds ONE narrow SELECT policy:
   - "Authenticated users can view booker profiles" — `USING (EXISTS (SELECT 1 FROM bookings b WHERE b.user_id = profiles.id))`. Only exposes identities ALREADY surfaced through bookings the caller can view; scoped strictly to people who have made bookings.
2. No frontend code changed — existing query, mapping, title, and modal already resolve `user.name`; they were simply receiving nulls. UI design left untouched.

**Security posture:** Existing policies untouched (admin full access, own-row, manager/admin all-profiles, reviewer-of-own-booking). No INSERT/UPDATE/DELETE or bookings policies relaxed. Non-booker users remain invisible to normal users, so no unrelated private profiles are exposed.

**Verification (simulated `authenticated` role + JWT claims against production data):**
- Before: normal user Ash saw other bookers as "INVISIBLE" (bug reproduced).
- After: Ash resolves "ABC, Rohan_QC" ✓
- All 6 bookings: `with_booker_id = 6`, `booker_name_resolved = 6` (no remaining nulls → no "undefined") ✓
- Scope check: a user with NO bookings ("Debjit Sarkar") remains "INVISIBLE (correctly non-exposed)" to Ash ✓
- Admin/Manager visibility unchanged (their full-profile policies were not modified). Refresh/reopen persists (server-side data, no client-only patch).

---

## 2026-10-01 — Language switching failure fix (RLS policy recursion)

**Instruction:** Changing the app language failed with "Failed to change language. Please try again." Fix the real root cause across selector → LanguageContext → Supabase profiles update; keep fallback/RTL/translation architecture intact; do not fake success or weaken RLS.

**Root cause (backend RLS, NOT frontend):** Full flow inspected: `LanguageIndicator`/`LanguageSelector` → `LanguageContext.setLanguage()` → `supabase.from('profiles').update({ language_preference })` → `refreshProfile()`. The frontend and translation files are correct; `setLanguage` threw because the UPDATE on `profiles` failed with Postgres error `42P17 infinite recursion detected in policy for relation "profiles"`. The `profiles` UPDATE policy "Users can update their own profile except role" has a WITH CHECK subquery that SELECTs `profiles` under the caller role. The SELECT policies added in migrations 00009 & 00010 read the `bookings` table INLINE (EXISTS subqueries); the `bookings` SELECT policy calls `can_manage_bookings()` which reads `profiles`. During the UPDATE's WITH CHECK this formed a `profiles → bookings → profiles` policy cycle → recursion error → every language change failed. (Confirmed empirically: dropping the two SELECT policies made UPDATE succeed again.)

**Changes:**
1. New migration `supabase/migrations/00011_fix_language_update_rls_recursion.sql`, applied to live MeetOps project (`cazqwpknzkqyytokotny`) via `apply_migration`. Introduces two `SECURITY DEFINER` helpers `profile_is_booker(target uuid)` and `profile_reviewed_my_booking(target uuid)` that compute the SAME predicates as 00009/00010, and redefines those two SELECT policies to call the functions. Inside a SECURITY DEFINER function the `bookings` read runs as the owner and does not re-apply caller RLS, breaking the cycle. UPDATE/INSERT/DELETE policies and admin/manager policies untouched.
2. No frontend code changed — `LanguageContext`, `LanguageIndicator`, `LanguageSelector`, translation files, RTL handling and IMPLEMENTED_LANGUAGES fallback all left intact and were already correct; they simply received a DB error.

**Error-handling note:** The UI never reported false success — `LanguageIndicator.handleLanguageChange` only shows success after `setLanguage()` resolves (post real DB commit), and shows the failure toast + preserves prior language on throw. With the backend fixed, genuine switches now succeed; genuine failures still surface correctly.

**Languages tested / verification (simulated `authenticated` role + JWT claims on production data, in rolled-back transactions so no data mutated):**
- Normal user Ash: `UPDATE language_preference='ja'` previously ERRORED (recursion); now SUCCEEDS. Also set `'ar'` (RTL) → persists as 'ar' ✓
- Manager Raj: `UPDATE language_preference='de'` → succeeds ✓
- Regression — prior fixes preserved: owner still sees reviewer "Raj" (00009 ✓); calendar bookers "ABC, Ash" still visible (00010 ✓); non-booker "Debjit Sarkar" still INVISIBLE (no scope widening) ✓
- All 10 CHECK-allowed codes (en, hi, bn, ta, es, fr, ar, zh, ja, de) are valid column values; the update path is value-independent, so all supported languages persist and the UI re-renders via LanguageContext state + document direction.

---

## 2026-10-01 — Language-change toast shown in PREVIOUS language (stale `t` closure)

**Problem:** After a successful language switch (e.g. English → Bengali), the success toast rendered in the OLD language instead of the newly selected one.

**Root cause (frontend timing, not translations):** In `LanguageIndicator.tsx` and `LanguageSelector.tsx`, `handleLanguageChange` awaited `setLanguage(langCode)` and then built the toast message via `t(...)`. `t` comes from `useAppTranslation` → `useCallback([currentLanguage])`, so within the running handler it is a closure bound to the PREVIOUS `currentLanguage` (React hasn't re-rendered yet and the existing closure can't change). The dictionaries themselves were correct and complete.

**Files changed (frontend only; no DB/RLS touched):**
1. `src/components/language/LanguageIndicator.tsx` — success toast now uses `translateKey('language.changedTo', langCode)` (imported from `@/i18n`) with the NEWLY selected language; `.replace('{nativeName}', …)` placeholder logic kept. Failure toast intentionally still uses `t` (on failure the language is unchanged, so the old language is correct).
2. `src/components/language/LanguageSelector.tsx` — same fix for `language.updateSuccess` success toast; failure toast unchanged.

**Implementation notes:** Reuses the app's existing synchronous dictionary lookup `translateKey(key, language)` from `src/i18n/index.ts` (same function `useAppTranslation` wraps) — no hardcoded per-language messages, no new translation system, no mocks. `setLanguage` already awaits the DB persistence and applies local state + RTL document direction BEFORE the handler resolves, so the toast is only shown post-success and in the applied language.

**Verification:**
- `grep` confirmed BOTH toast keys (`language.changedTo`, `language.updateSuccess`, plus failure keys) exist in ALL 9 non-English dictionaries (bn, hi, zh, ja, ta, es, fr, de, ar) with `{nativeName}` placeholders intact → no English-fallback for any supported language (e.g. bn → "ভাষা {nativeName}-এ পরিবর্তন করা হয়েছে", en→bn toast will be Bengali; bn→en uses flattened `TRANSLATION_KEYS` English).
- `npx tsc -p tsconfig.app.json --noEmit`: no errors in the changed files; `git diff` limited to the two language components (10 insertions, 5 deletions).
- Logic check en→bn: `translateKey('language.changedTo','bn')` resolves the bn dictionary → Bengali toast; bn→en resolves via `en` dictionary → English toast. RTL (ar): `setLanguage` sets `document.dir='rtl'` before the toast call, so the Arabic toast renders in an RTL context.
- Rest-of-UI translation flow untouched (LanguageContext/useAppTranslation unchanged); language-switching fix from the earlier 2026-10-01 RLS entry unaffected.

---
