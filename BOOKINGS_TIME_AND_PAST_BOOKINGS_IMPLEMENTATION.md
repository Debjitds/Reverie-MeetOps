# Bookings Time Display Fix & Past Bookings Feature

## Overview

This document describes the implementation of two critical bug fixes and one new feature for the MeetOps booking system:

1. **Bug Fix 1**: Time column display showing "2026 - 2026" instead of actual time
2. **Bug Fix 2 / Feature**: Auto-completion of past bookings and Past Bookings section
3. **Calendar Update**: Removal of completed bookings from calendar view

---

## Bug 1: Time Column Display Fix

### Problem

The Bookings page was displaying "2026 - 2026" or just the year value in the Start Time and End Time columns instead of showing the actual booking times.

### Root Cause

The time column renderer was using `formatDateTime()` which returns the full date and time format ("Apr 29, 2026, 10:00 AM"), then attempting to split it incorrectly, resulting in only the year being displayed.

### Solution

**Updated `formatTime()` function** in `/src/lib/booking-utils.ts`:
- Changed from 24-hour format (HH:MM) to 12-hour format with AM/PM
- Returns format: "10:00 AM", "2:30 PM", etc.
- Handles both UTC timestamps (with Z suffix) and local timestamps (without Z)
- Extracts time directly from string for plain datetime strings
- Converts to 12-hour format with proper AM/PM designation

**Updated BookingsPage table columns**:
- Changed from: `{formatDateTime(booking.start_time).split(', ')[1]} - {formatDateTime(booking.end_time).split(', ')[1]}`
- Changed to: Separate columns for Start Time and End Time
- Start Time column: `{formatTime(booking.start_time)}`
- End Time column: `{formatTime(booking.end_time)}`
- Column headers: "START TIME" and "END TIME"

### Result

✅ Start Time column now displays: "10:00 AM"
✅ End Time column now displays: "12:00 PM"
✅ No date, no year, no day name - only time in 12-hour format with AM/PM
✅ Full datetime format preserved in Booking Details page and other locations

---

## Bug 2 / Feature: Auto-Completion & Past Bookings Section

### Part A: Backend Auto-Completion

**Created Edge Function**: `/supabase/functions/update-booking-statuses/index.ts`

**Functionality**:
1. Automatically marks bookings as "Completed" when their end_time has passed
2. Only affects bookings with status "Approved"
3. Compares end_time against current server timestamp
4. Updates status to "completed" in the database (real database write)
5. Returns count of updated bookings

**Implementation Logic**:
```typescript
// Find all approved bookings where end_time has passed
const { data: expiredBookings } = await supabaseClient
  .from('bookings')
  .select('id, end_time, resource:resources(name), user:profiles!bookings_user_id_fkey(name)')
  .eq('status', 'approved')
  .lt('end_time', now);

// Update all expired approved bookings to completed status
const { data: updatedBookings } = await supabaseClient
  .from('bookings')
  .update({ status: 'completed' })
  .in('id', bookingIds)
  .select('id');
```

**Trigger Mechanism**:
- Edge Function is called automatically when BookingsPage loads
- Runs before fetching bookings data
- Ensures all expired bookings are marked as completed before display

**Rules**:
- ✅ Only Approved bookings are auto-completed
- ❌ Pending bookings that have passed remain Pending (admin must handle)
- ❌ Cancelled and Rejected bookings are not touched
- ✅ Status update is permanent in database (not calculated on-the-fly)

### Part B: Frontend - Past Bookings Section

**Updated BookingsPage** (`/src/pages/BookingsPage.tsx`):

**Data Structure Changes**:
- Split bookings into two separate state variables:
  - `activeBookings`: Pending, Approved, Rejected, Cancelled
  - `pastBookings`: Completed only
- Separate database queries for each section
- Active bookings query: `.in('status', ['pending', 'approved', 'rejected', 'cancelled'])`
- Past bookings query: `.eq('status', 'completed')`

**UI Structure**:
```
┌─────────────────────────────────────────┐
│ ACTIVE BOOKINGS (n)                     │
│ ┌─────────────────────────────────────┐ │
│ │ Table with all active bookings      │ │
│ │ - Pending, Approved, Rejected, etc. │ │
│ │ - Full action buttons available     │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

        ═══════════════════════════
        (Thick black divider line)
        ═══════════════════════════

┌─────────────────────────────────────────┐
│ PAST BOOKINGS (n)                       │
│ ┌─────────────────────────────────────┐ │
│ │ Table with completed bookings       │ │
│ │ - Read-only                         │ │
│ │ - View Details button only          │ │
│ │ - Pagination (10 per page)          │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

**Active Bookings Section**:
- Header: "ACTIVE BOOKINGS (count)"
- Shows: Pending, Approved, Rejected, Cancelled bookings
- Columns: Resource, User (admin/manager only), Purpose, Date, Start Time, End Time, Type, Status, Actions
- Status filter dropdown works within this section
- Full action buttons: View, Approve, Reject, Cancel (based on permissions)
- Time columns show 12-hour format: "10:00 AM"

**Past Bookings Section**:
- Header: "PAST BOOKINGS (count)"
- Shows: Completed bookings only
- Columns: Resource, User (admin/manager only), Purpose, Date, Start Time, End Time, Status, Actions
- Read-only: No Approve, Reject, or Cancel actions
- Only action: "View Details" button
- Time columns show 12-hour format: "10:00 AM"
- Pagination: 10 bookings per page with Previous/Next buttons
- Completed status badge: White background, thick black border, black uppercase text "COMPLETED"

**Styling**:
- Neo-brutalist design maintained throughout
- Thick black borders (border-4) for section headers
- Alternating row colors: white and #FFF8E7
- Hard shadows on tables
- Primary color background for active bookings header
- Secondary color background for past bookings header

### Part C: Calendar Update

**Updated CalendarPage** (`/src/pages/CalendarPage.tsx`):

**Query Change**:
```typescript
// Before
.in('status', ['pending', 'approved'])

// After
.in('status', ['pending', 'approved', 'rejected'])
```

**Behavior**:
- Completed bookings are excluded from calendar display
- Filter applied at database query level (not frontend)
- Calendar shows: Pending, Approved, and Rejected bookings only
- When a booking transitions to Completed (after end_time passes), it automatically disappears from calendar on next data refresh
- Real-time subscription ensures calendar updates automatically

---

## LLM Chat Assistant Updates

**Updated chat-assistant Edge Function** (`/supabase/functions/chat-assistant/index.ts`):

**Data Fetching Changes**:
- Split user bookings into two separate queries:
  - `userActiveBookings`: status IN (pending, approved, rejected, cancelled)
  - `userPastBookings`: status = completed, limited to 10 most recent

**System Prompt Updates**:
```
YOUR ACTIVE BOOKINGS (user's current and upcoming bookings):
[List of active bookings]

YOUR PAST BOOKINGS (user's completed bookings):
[List of past bookings]
```

**Instructions to LLM**:
- When user asks about bookings, refer to both sections
- Clearly separate active and past bookings in responses
- If asked about past/completed bookings specifically, refer to "YOUR PAST BOOKINGS" section
- If both sections are empty, suggest booking a room

---

## Technical Implementation Details

### Database Schema

No schema changes required. The `bookings` table already has:
- `status` column with enum: pending, approved, rejected, cancelled, completed
- `end_time` column with timestamp

### Edge Function Deployment

**Deployed Functions**:
1. `update-booking-statuses` - Auto-completion logic
2. `chat-assistant` - Updated with active/past bookings separation

### Frontend Components

**Modified Files**:
1. `/src/pages/BookingsPage.tsx` - Split into Active/Past sections
2. `/src/pages/CalendarPage.tsx` - Exclude completed bookings
3. `/src/lib/booking-utils.ts` - Updated formatTime() to 12-hour format

### State Management

**BookingsPage State**:
```typescript
const [activeBookings, setActiveBookings] = useState<Booking[]>([]);
const [pastBookings, setPastBookings] = useState<Booking[]>([]);
const [filteredActiveBookings, setFilteredActiveBookings] = useState<Booking[]>([]);
const [pastBookingsPage, setPastBookingsPage] = useState(1);
const pastBookingsPerPage = 10;
```

### Data Flow

1. **Page Load**:
   - Call `update-booking-statuses` Edge Function
   - Wait for completion
   - Fetch active bookings (status IN pending, approved, rejected, cancelled)
   - Fetch past bookings (status = completed)
   - Display both sections

2. **Filtering**:
   - Status filter applies only to active bookings section
   - Past bookings section always shows all completed bookings
   - Search filter applies only to active bookings

3. **Pagination**:
   - Active bookings: No pagination (all displayed)
   - Past bookings: Paginated (10 per page)

---

## Testing Scenarios

### Scenario 1: Time Display

**Test**:
1. Navigate to Bookings page
2. Check Start Time and End Time columns

**Expected Result**:
- Start Time shows: "10:00 AM" (not "2026" or "2026 - 2026")
- End Time shows: "12:00 PM" (not "2026" or "2026 - 2026")
- Format is 12-hour with AM/PM
- No date, year, or day name in these columns

### Scenario 2: Auto-Completion

**Test**:
1. Create an approved booking with end_time in the past
2. Reload Bookings page
3. Check booking status

**Expected Result**:
- Booking status automatically changes to "Completed"
- Booking moves from Active Bookings to Past Bookings section
- Status update is permanent in database

### Scenario 3: Past Bookings Section

**Test**:
1. Navigate to Bookings page
2. Scroll to Past Bookings section

**Expected Result**:
- Section header shows: "PAST BOOKINGS (n)" with correct count
- Only completed bookings are displayed
- Time columns show 12-hour format: "10:00 AM"
- Only "View Details" button available (no Approve/Reject/Cancel)
- Pagination appears if more than 10 bookings
- Completed badge has white background, black border, black text

### Scenario 4: Calendar Exclusion

**Test**:
1. Navigate to Calendar page
2. Check for completed bookings

**Expected Result**:
- No completed bookings appear on calendar
- Only Pending, Approved, and Rejected bookings are visible
- When a booking's end_time passes and it becomes Completed, it disappears from calendar

### Scenario 5: LLM Assistant

**Test**:
1. Open chat widget
2. Ask: "Show me my bookings"

**Expected Result**:
- LLM separates response into two sections:
  - Active bookings (pending, approved, etc.)
  - Past bookings (completed)
- Both sections clearly labeled
- If no bookings, suggests booking a room

---

## Acceptance Criteria

### Bug 1 - Time Display ✅

- [x] Bookings page Start Time column shows: "10:00 AM" only
- [x] Bookings page End Time column shows: "12:00 PM" only
- [x] No date, no year in time columns
- [x] Booking Details page continues to show full format: "Apr 29, 2026, 10:00 AM"
- [x] No timezone offset applied during time extraction

### Bug 2 / Feature - Past Bookings ✅

- [x] Any Approved booking whose end_time has passed is automatically marked as Completed in database
- [x] Bookings page shows two clearly separated sections: Active Bookings and Past Bookings
- [x] Past Bookings section shows only database records where status = Completed
- [x] Past Bookings section header shows correct count: "PAST BOOKINGS (n)"
- [x] Calendar page shows zero Completed bookings
- [x] When end_time passes for Approved booking, it disappears from calendar and appears in Past Bookings
- [x] Past bookings are read-only with only "View Details" action
- [x] Pagination works for past bookings (10 per page)
- [x] Completed status badge styled correctly (white bg, black border, black text)

### No Breaking Changes ✅

- [x] Existing Status filter dropdown works within Active Bookings section
- [x] Existing Approve, Reject, Cancel actions work on active bookings
- [x] Calendar shows Pending, Approved, Rejected bookings correctly
- [x] LLM assistant separates active and completed bookings
- [x] All previously fixed bugs remain intact (time display, timezone handling, conflict detection)

### Permanent Status ✅

- [x] Completed status is permanent in database
- [x] No user action can revert Completed booking to any other status
- [x] Only auto-completion logic can set status to Completed

---

## Summary

All three tasks have been successfully implemented:

1. **Bug 1 Fixed**: Time columns now display only time in 12-hour format with AM/PM ("10:00 AM")
2. **Bug 2 / Feature Implemented**: Auto-completion system marks expired approved bookings as completed, and Past Bookings section displays them separately with pagination
3. **Calendar Updated**: Completed bookings are excluded from calendar view

All implementations are backend-driven with real database reads and writes. No fake frontend-only logic. All existing features remain intact.

---

**Document Version**: 1.0  
**Date**: 2026-04-23  
**Author**: MeetOps Development Team
