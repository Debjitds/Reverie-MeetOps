
# TestSprite AI Testing Report(MCP)

---

## 1️⃣ Document Metadata
- **Project Name:** MeDo MeetOps
- **Date:** 2026-09-02
- **Prepared by:** TestSprite AI Team
- **Application:** React 18 + TypeScript + Vite frontend (meeting-room booking & approval workflow) backed by Supabase
- **Test Environment:** Local production build (`vite preview`) at http://localhost:5173
- **Total Tests Executed:** 30
- **Result Summary:** 25 passed, 5 failed (83.33% pass rate)

---

## 2️⃣ Requirement Validation Summary

### Requirement: Route Guard / Auth Navigation
- **Description:** Unauthenticated users are redirected to /login and returned to their originally requested page after login.

#### Test TC001 Access a protected page from the public site
- **Test Code:** [TC001_Access_a_protected_page_from_the_public_site.py](./TC001_Access_a_protected_page_from_the_public_site.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/02826dec-09e2-4683-8991-553b7bb38d6d
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Visiting a protected route while logged out correctly redirects the user to the login page; the auth guard behaves as designed.
---

#### Test TC006 Remember the requested protected page after signing in
- **Test Code:** [TC006_Remember_the_requested_protected_page_after_signing_in.py](./TC006_Remember_the_requested_protected_page_after_signing_in.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/59ddaca6-5138-4583-aab4-bc4570a1b94f
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** The `state.from` redirect logic in RouteGuard works — after login the user lands back on the originally requested page.
---

### Requirement: User Login
- **Description:** Login with username and password credentials via Supabase auth, with client-side validation.

#### Test TC003 Log in with valid credentials
- **Test Code:** [TC003_Log_in_with_valid_credentials.py](./TC003_Log_in_with_valid_credentials.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/3454ca69-938e-46db-a46f-d396e4278e08
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Valid username/password pair authenticates successfully and navigates to the dashboard.
---

#### Test TC027 Show login validation for an invalid username format
- **Test Code:** [TC027_Show_login_validation_for_an_invalid_username_format.py](./TC027_Show_login_validation_for_an_invalid_username_format.py)
- **Test Error:** TEST FAILURE

A username format validation message was not shown after submitting an invalid username.

Observations:
- The login form stayed on the /login page with the Username field containing 'not-an-email' and the Password field filled.
- No visible validation or error message mentioning 'email', 'valid', or similar was present on the page after submission.
- The UI did not navigate away or show any inline feedback indicating the username format is invalid.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/17683a81-d512-4e8a-a7ad-53b35b6fd520
- **Status:** ❌ Failed
- **Severity:** MEDIUM
- **Analysis / Findings:** The login form performs no client-side username format validation (the `^[a-zA-Z0-9_]+$` regex exists only on registration). An invalid username like `not-an-email` fails silently at the Supabase layer with no user-facing feedback beyond staying on the page. Suggested fix: surface an inline error message on failed sign-in (src/pages/LoginPage.tsx).
---

### Requirement: User Registration
- **Description:** Register a new account with name, username, password, confirm password, and terms acceptance.

#### Test TC004 Register a new account
- **Test Code:** [TC004_Register_a_new_account.py](./TC004_Register_a_new_account.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/91832de0-b200-4bea-b986-bb448e4fb624
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Registration flow creates the account and lands the user on the dashboard as expected.
---

#### Test TC023 Prevent registration with an invalid password
- **Test Code:** [TC023_Prevent_registration_with_an_invalid_password.py](./TC023_Prevent_registration_with_an_invalid_password.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/e0d76a96-0e84-4788-8ebb-e83bc56971a9
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Password policy (min 8 chars with letter + digit) is enforced with a visible validation message.
---

#### Test TC028 Prevent registration when passwords do not match
- **Test Code:** [TC028_Prevent_registration_when_passwords_do_not_match.py](./TC028_Prevent_registration_when_passwords_do_not_match.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/a3d5ef4e-ab6d-4406-9c9a-f543f0aa47cd
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Mismatched confirm-password correctly blocks submission with feedback.
---

#### Test TC030 Require terms acceptance during registration
- **Test Code:** [TC030_Require_terms_acceptance_during_registration.py](./TC030_Require_terms_acceptance_during_registration.py)
- **Test Error:** TEST FAILURE

A visible validation message requiring acceptance of the terms was not shown when submitting the registration form with the terms checkbox left unchecked.

Observations:
- Clicking the 'Register' button with the terms checkbox unchecked did not display any error message about accepting the terms.
- The page stayed on the registration form after multiple submit attempts (no navigation or success indication).
- The only occurrences of 'agree'/'accept' are part of the checkbox label itself, not a validation error message.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/aa61f79b-36d1-4b28-a3bf-6b4a76ed9778
- **Status:** ❌ Failed
- **Severity:** MEDIUM
- **Analysis / Findings:** Submission is blocked when terms are unchecked (no navigation occurs), but the form gives zero visible feedback explaining why. The submit silently no-ops. Suggested fix: render an explicit "You must accept the terms" error message next to the checkbox or as a toast (src/pages/RegisterPage.tsx).
---

### Requirement: Password Reset
- **Description:** Request a password reset email by username; show a confirmation state after sending.

#### Test TC008 Reset a password request
- **Test Code:** [TC008_Reset_a_password_request.py](./TC008_Reset_a_password_request.py)
- **Test Error:** TEST FAILURE

The password reset request did not show a confirmation message after submission — an error was shown instead.

Observations:
- The page displayed a notification: 'Failed to send reset link: {}'.
- The username field contained 'debjitchsarkarofficial2003' and the submit was triggered, but no success message such as 'Check your email' or 'Reset link sent' appeared.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/0abb75d8-56e7-4235-a202-2d67f82a5367
- **Status:** ❌ Failed
- **Severity:** HIGH
- **Analysis / Findings:** `supabase.auth.resetPasswordForEmail` rejects the request and the page surfaces a raw error object (`{}`) instead of the expected "check your email" confirmation. Root causes to investigate: (1) the synthetic email mapping `{username}@miaoda.com` sends reset mail to an address the user may not control, and (2) the error toast prints an empty object rather than a meaningful message — error handling should extract `error.message` (src/pages/ResetPasswordPage.tsx).
---

### Requirement: Dashboard Overview
- **Description:** View booking stat cards, upcoming bookings, quick actions, and admin AI insights.

#### Test TC011 Review dashboard booking summaries
- **Test Code:** [TC011_Review_dashboard_booking_summaries.py](./TC011_Review_dashboard_booking_summaries.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/723e3aa4-e6d1-422a-8d79-19267009c91d
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Stat cards (total/pending/approved/rejected) and upcoming bookings list render with correct data.
---

#### Test TC013 Open a booking from the dashboard
- **Test Code:** [TC013_Open_a_booking_from_the_dashboard.py](./TC013_Open_a_booking_from_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/757e27c5-b25d-4400-a716-b2bec0026059
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Navigating from a dashboard upcoming-booking entry to its detail page works.
---

#### Test TC016 Start a new booking from the dashboard
- **Test Code:** [TC016_Start_a_new_booking_from_the_dashboard.py](./TC016_Start_a_new_booking_from_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/9331feab-735f-4851-9c90-64bc10b73ba8
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** The "New Booking" quick action navigates to the 3-step wizard correctly.
---

#### Test TC018 View all bookings from the dashboard
- **Test Code:** [TC018_View_all_bookings_from_the_dashboard.py](./TC018_View_all_bookings_from_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/85ce91d9-e7eb-41ed-b8de-5e8541f9b975
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** The "View All" quick action navigates to the bookings list correctly.
---

### Requirement: Bookings List and Export
- **Description:** Browse active and past bookings with filters, pagination, and PDF export.

#### Test TC012 Open a booking from the bookings list
- **Test Code:** [TC012_Open_a_booking_from_the_bookings_list.py](./TC012_Open_a_booking_from_the_bookings_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/0cfcb9c3-ad95-43df-ae03-2d1c3aba3951
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Row-level "View Details" navigation from the bookings list to the booking detail page works.
---

#### Test TC015 Browse and filter bookings
- **Test Code:** [TC015_Browse_and_filter_bookings.py](./TC015_Browse_and_filter_bookings.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/e26410ed-3da8-4d81-929b-3808b2099bb9
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Status/user/text filters on the bookings tables apply correctly.
---

#### Test TC019 Export booking history for a date range
- **Test Code:** [TC019_Export_booking_history_for_a_date_range.py](./TC019_Export_booking_history_for_a_date_range.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/d689c8d7-a1dc-447a-a524-b2bfc1aa3522
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** The PDF export dialog with start/end date pickers generates a PDF (jspdf) successfully.
---

### Requirement: New Booking Wizard
- **Description:** 3-step wizard to create single/multi-day bookings with live conflict checking and AI agenda generation.

#### Test TC002 Create a single-day booking request
- **Test Code:** [TC002_Create_a_single_day_booking_request.py](./TC002_Create_a_single_day_booking_request.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/e628d927-0ef1-462f-afe4-d465edc10b9e
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Single-day booking creation (resource → date/time → purpose/attendees → submit) completes and inserts a pending booking.
---

#### Test TC007 Create a multi-day booking request
- **Test Code:** [TC007_Create_a_multi_day_booking_request.py](./TC007_Create_a_multi_day_booking_request.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/22110960-da81-4ac0-9e36-40dee9955696
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Multi-day flow via the `create-multi-day-booking` edge function works and creates the booking group.
---

#### Test TC010 Resolve a booking conflict before submitting
- **Test Code:** [TC010_Resolve_a_booking_conflict_before_submitting.py](./TC010_Resolve_a_booking_conflict_before_submitting.py)
- **Test Error:** TEST FAILURE

A conflict/overlap warning was not shown when a booking time overlapping an existing slot was selected. The UI allows proceeding to Create Booking without displaying any conflict validation.

Observations:
- The Booking Details summary shows Resource: Room 15 and Time: 09:30 - 10:30 (an overlapping time).
- No visible conflict, overlap, unavailable, or warning message is present on the Booking Details page or in the page text.
- The 'Create Booking' button is available on the page, suggesting submission is permitted despite the overlap.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/7af1f272-dc0a-4b11-80b6-8419ab65a607
- **Status:** ❌ Failed
- **Severity:** HIGH
- **Analysis / Findings:** The client-side conflict check (`checkBookingConflict` in src/lib/booking-utils, invoked from src/pages/NewBookingPage.tsx) did not flag an overlapping slot — the wizard let the user reach the summary step with a conflicting time and left "Create Booking" enabled. Combined with the known client-side-only conflict design (no server-side constraint), this means double-booking is possible. Suggested fixes: (1) verify the conflict check fires on step-2 → step-3 transition and blocks Next when a conflict exists, (2) add a server-side exclusion constraint or transactional check in the insert path.
---

#### Test TC024 Generate an agenda while creating a booking
- **Test Code:** [TC024_Generate_an_agenda_while_creating_a_booking.py](./TC024_Generate_an_agenda_with_AI.py)
- **Test Error:** TEST FAILURE

The AI agenda generation feature did not produce a meeting agenda — the assistant explicitly refused to generate agenda content.

Observations:
- The MeetOps AI Assistant panel displays: "Unfortunately, generating a meeting agenda, including objectives, discussion points, and action items, is outside my capabilities." (visible in the chat area).
- The booking wizard remains on Step 3 (Booking Details) with the Purpose filled and no generated agenda content (objectives, timed items, discussion points, or action items) shown.
- The 'GENERATE AGENDA WITH AI' control was clicked (and the assistant was queried) but no agenda output was produced for review.

- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/cf39998b-08aa-4539-962a-067c84cff6c3
- **Status:** ❌ Failed
- **Severity:** HIGH
- **Analysis / Findings:** The `generate-agenda` edge function is reachable, but the backing assistant model refused the request — the chat reply explicitly declined to produce an agenda. This is a backend/prompt configuration issue, not a UI wiring issue: the button correctly invokes the function and the panel renders the reply. Suggested fixes: (1) update the edge function's system prompt/model config so agenda generation is permitted, (2) consider a dedicated non-chat endpoint for agenda generation so an off-topic refusal cannot break the wizard.
---

### Requirement: Booking Approval Actions
- **Description:** Approve, reject (with reason), or cancel a booking; supports multi-day booking groups.

#### Test TC005 Approve a pending booking from its detail page
- **Test Code:** [TC005_Approve_a_pending_booking_from_its_detail_page.py](./TC005_Approve_a_pending_booking_from_its_detail_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/715a885c-aa0e-473c-b4c8-48e3e9446f17
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Approve action updates the booking status to approved and reflects in the UI.
---

#### Test TC009 Reject a pending booking with a reason
- **Test Code:** [TC009_Reject_a_pending_booking_with_a_reason.py](./TC009_Reject_a_pending_booking_with_a_reason.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/1c5b0854-dc5a-4939-a309-7dc07776030b
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Reject with optional reason updates status and records the reviewer, as designed.
---

#### Test TC014 Cancel a booking from its detail page
- **Test Code:** [TC014_Cancel_a_booking_from_its_detail_page.py](./TC014_Cancel_a_booking_from_its_detail_page.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/5f42c69c-b7c8-4c47-a70c-d6e88d72026f
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Cancel flow (owner or admin/manager) with confirm dialog works and updates status to cancelled.
---

#### Test TC021 Approve a booking from the detail view
- **Test Code:** [TC021_Approve_a_booking_from_the_detail_view.py](./TC021_Approve_a_booking_from_the_detail_view.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/396cf603-78af-4f82-9854-ee641c3bfe06
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Duplicate approval-path verification passed consistently, confirming the action is reliable across test runs.
---

#### Test TC029 Cancel a booking from the detail view
- **Test Code:** [TC029_Cancel_a_booking_from_the_detail_view.py](./TC029_Cancel_a_booking_from_the_detail_view.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/b495a743-d871-405f-9fde-23ed5b7172f9
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Duplicate cancel-path verification passed consistently.
---

### Requirement: Shared Calendar
- **Description:** Organization-wide calendar with month/week/day/agenda views and status-colored events.

#### Test TC017 Switch calendar views and review bookings
- **Test Code:** [TC017_Switch_calendar_views_and_review_bookings.py](./TC017_Switch_calendar_views_and_review_bookings.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/5dbb24c1-8c83-40e6-9e01-a90ff1a5ba70
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Month/week/day/agenda view toggles render events correctly.
---

#### Test TC020 Browse the calendar views
- **Test Code:** [TC020_Browse_the_calendar_views.py](./TC020_Browse_the_calendar_views.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/eae07709-ad8e-470f-9d4f-b80b0cebef18
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Calendar navigation (prev/next/today) works across views.
---

#### Test TC025 Browse another calendar date range
- **Test Code:** [TC025_Browse_another_calendar_date_range.py](./TC025_Browse_another_calendar_date_range.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/248166ff-9d99-4310-8c82-514514aac737
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Navigating to a different date range loads and displays that range's bookings.
---

### Requirement: Resource Management
- **Description:** Admin CRUD for meeting rooms/resources with delete guard on active bookings.

#### Test TC022 Create a new resource as an administrator
- **Test Code:** [TC022_Create_a_new_resource_as_an_administrator.py](./TC022_Create_a_new_resource_as_an_administrator.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/60c4b137-0a4c-4ddb-8bca-dd6b30ca5fc4
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Add Resource dialog creates a new resource that appears in the table.
---

### Requirement: User Management
- **Description:** Admin table of users with search and role change (user/manager/admin).

#### Test TC026 Change a user's role and confirm the update
- **Test Code:** [TC026_Change_a_users_role_and_confirm_the_update.py](./TC026_Change_a_users_role_and_confirm_the_update.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/8296271c-af05-5198-8447-7e712c1bf93e/test/71e0d649-e9de-4bf9-81b5-9c74cae0f3a8
- **Status:** ✅ Passed
- **Severity:** LOW
- **Analysis / Findings:** Change Role dialog updates the user's role in the profiles table and the table reflects the new value.
---

## 3️⃣ Coverage & Matching Metrics

- **83.33% of tests passed**

| Requirement                          | Total Tests | ✅ Passed | ❌ Failed |
|--------------------------------------|-------------|-----------|------------|
| Route Guard / Auth Navigation         | 2           | 2         | 0          |
| User Login                            | 2           | 1         | 1          |
| User Registration                     | 4           | 3         | 1          |
| Password Reset                        | 1           | 0         | 1          |
| Dashboard Overview                    | 4           | 4         | 0          |
| Bookings List and Export              | 3           | 3         | 0          |
| New Booking Wizard                    | 4           | 2         | 2          |
| Booking Approval Actions              | 5           | 5         | 0          |
| Shared Calendar                       | 3           | 3         | 0          |
| Resource Management                   | 1           | 1         | 0          |
| User Management                       | 1           | 1         | 0          |
| **Total**                             | **30**      | **25**    | **5**      |

Feature coverage: all 12 routes and 11 application features defined in the test plan were exercised, including the auth flows, booking lifecycle (create → approve/reject/cancel → export), calendar browsing, and admin management (resources, user roles).

---

## 4️⃣ Key Gaps / Risks

> **83.33% of tests passed (25/30).** Core booking lifecycle, auth guard, calendar, and admin management flows are solid. The 5 failures cluster into two themes: missing user-facing validation feedback, and unreliable conflict/AI backend behavior.

**High-severity issues:**
1. **Booking conflict detection not triggering (TC010)** — an overlapping time on Room 15 (09:30–10:30) produced no warning and left "Create Booking" enabled. Since conflict checking is client-side only with no server-side constraint, double-booking is currently possible. Fix the step-2 conflict check in src/pages/NewBookingPage.tsx and add a server-side exclusion guard.
2. **AI agenda generation refused by the assistant (TC024)** — the `generate-agenda` edge function returns a chat refusal ("outside my capabilities") instead of an agenda. Fix the edge function's prompt/model configuration; consider decoupling agenda generation from the general chat assistant.
3. **Password reset fails with a raw empty error (TC008)** — `resetPasswordForEmail` errors surface as "Failed to send reset link: {}" instead of the confirmation state. Extract `error.message` and address the synthetic `{username}@miaoda.com` email mapping that may route reset mail to unreachable addresses.

**Medium-severity issues (silent validation failures):**
4. **Terms checkbox gives no feedback (TC030)** — registration silently no-ops when terms are unchecked; add an explicit validation message.
5. **Login shows no error for invalid username (TC027)** — failed sign-ins leave the user on the form with no inline feedback; add error messaging to src/pages/LoginPage.tsx.

**Residual risks / known limitations (not directly tested but observed in code):**
- Broken i18n on BookingDetailPage: the `t()` wrapper was accidentally removed from ~10 labels, so raw keys like "bookingDetails.resource" render as visible text on that page.
- Client-side-only role gating (in-page `profile.role` checks) — security depends entirely on backend RLS, which could not be verified from the frontend.
- PDF export dialog has unimplemented resource/status filter controls (state exists, UI never rendered).
- Duplicate registration logic between LoginPage's register tab and RegisterPage invites future drift.
- Placeholder Supabase URL/key fallbacks mean a misconfigured environment silently produces a dead data layer.
- Active bookings table has no pagination and filters operate on fully-fetched rows — performance risk at scale.
---
