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
