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
