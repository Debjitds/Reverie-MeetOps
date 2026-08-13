# Date Selection Bug Fix - Verification Guide

## Bug Description
Users were experiencing a date offset bug where selected dates were being stored and displayed as 1 day earlier than intended.

**Example:**
- User selects: April 12, 2026
- System stored: April 11, 2026
- System displayed: April 11, 2026

## Root Cause
The bug was caused by timezone conversion issues in the `formatDate()` function:

**Before (Buggy Code):**
```javascript
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];  // ❌ Converts to UTC first!
}
```

**Problem:**
1. User selects April 12 at midnight local time (00:00:00)
2. `toISOString()` converts to UTC
3. For users in positive UTC offsets (e.g., IST UTC+5:30), midnight becomes previous day in UTC
4. April 12 00:00:00 IST → April 11 18:30:00 UTC
5. Splitting on 'T' gives "2026-04-11" instead of "2026-04-12"

## The Fix

### 1. Fixed `formatDate()` Function
```javascript
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  // Extract date components in LOCAL timezone (not UTC)
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}
```

**How it works:**
- Uses `getFullYear()`, `getMonth()`, `getDate()` which return LOCAL timezone values
- No UTC conversion happens
- Date stays exactly as user selected

### 2. Added `formatDateOnly()` Function
```javascript
export function formatDateOnly(date: Date | string): string {
  let d: Date;
  
  if (typeof date === 'string') {
    // If it's a YYYY-MM-DD string, parse it as local date
    if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      d = new Date(date + 'T00:00:00');  // Force local midnight
    } else {
      d = new Date(date);
    }
  } else {
    d = date;
  }
  
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
```

**Purpose:**
- Display dates in human-readable format (e.g., "Apr 12, 2026")
- Handles both Date objects and YYYY-MM-DD strings
- Prevents timezone shifts when parsing date-only strings

### 3. Enhanced `combineDateAndTime()` Function
Added verification to detect if date shifting occurs:

```javascript
// Verify the date wasn't shifted (this would indicate a parsing issue)
const verifyYear = dateObj.getFullYear();
const verifyMonth = String(dateObj.getMonth() + 1).padStart(2, '0');
const verifyDay = String(dateObj.getDate()).padStart(2, '0');
const verifyDate = `${verifyYear}-${verifyMonth}-${verifyDay}`;

if (verifyDate !== date) {
  console.error('Date shift detected during combineDateAndTime:', {
    input: date,
    parsed: verifyDate,
    dateObj: dateObj.toString(),
  });
}
```

## Verification Steps

### Test 1: Create a Booking
1. Navigate to "New Booking" page
2. Select a resource
3. Select date: **April 12, 2026**
4. Select time: 2:30 PM - 3:30 PM
5. Complete the booking

**Expected Result:**
- Booking summary shows: "Date: Apr 12, 2026"
- Console logs show no date shift errors
- After submission, booking appears with April 12 (not April 11)

### Test 2: View Booking in List
1. Navigate to "Bookings" page
2. Find the booking you just created

**Expected Result:**
- Start time shows: "Apr 12, 2026, 02:30 PM"
- End time shows: "Apr 12, 2026, 03:30 PM"
- Date matches what you selected (April 12)

### Test 3: View Booking Detail
1. Click on the booking to view details

**Expected Result:**
- Start time: "Apr 12, 2026, 02:30 PM"
- End time: "Apr 12, 2026, 03:30 PM"
- All dates match the selected date

### Test 4: Approve Booking (Manager/Admin)
1. As a manager or admin, approve the booking
2. Check console logs for "Before approval" and "After approval"

**Expected Result:**
- Console shows `timesMatch: true`
- Date and time remain unchanged after approval
- Booking still shows April 12 (not shifted)

### Test 5: Calendar View
1. Navigate to "Calendar" page
2. Find the booking on the calendar

**Expected Result:**
- Booking appears on April 12
- Not on April 11 or April 13
- Clicking it shows correct date and time

### Test 6: Dashboard View
1. Navigate to "Dashboard"
2. Check "Upcoming Bookings" section

**Expected Result:**
- Booking shows correct date (April 12)
- Time shows correctly (2:30 PM)

## Console Debugging

When creating a booking, you should see logs like:

```
Booking creation: {
  selectedDate: "2026-04-12",
  selectedStartTime: "14:30",
  selectedEndTime: "15:30",
  startDateTime: "2026-04-12T09:00:00.000Z",  // UTC
  endDateTime: "2026-04-12T10:00:00.000Z",    // UTC
  parsedStart: "4/12/2026, 2:30 PM",          // Local
  parsedEnd: "4/12/2026, 3:30 PM"             // Local
}
```

**Key Points:**
- `selectedDate` should match the date you picked
- `parsedStart` and `parsedEnd` should show the correct local date and time
- No "Date shift detected" errors should appear

## Edge Cases Tested

### Edge Case 1: Users in Different Timezones
- **IST (UTC+5:30)**: April 12 00:00 IST → Should store and display as April 12
- **EST (UTC-5)**: April 12 00:00 EST → Should store and display as April 12
- **UTC**: April 12 00:00 UTC → Should store and display as April 12

### Edge Case 2: Month Boundaries
- **April 30 → May 1**: Should not shift to April 29 → April 30
- **December 31 → January 1**: Should not shift to December 30 → December 31

### Edge Case 3: Leap Years
- **February 29, 2024**: Should display as February 29, not February 28

## What Was NOT Changed

✅ **Time handling remains unchanged**
- Start time and end time logic is not affected
- Times are still stored in UTC and displayed in local timezone
- Previous timezone fix for times is preserved

✅ **Database schema unchanged**
- Still using `timestamptz` for start_time and end_time
- No migration needed

✅ **Approval logic unchanged**
- Approval still only updates status, reviewed_by, reviewed_at
- Never touches start_time or end_time fields

## Summary

The fix ensures that:
1. ✅ Selected dates are stored exactly as chosen
2. ✅ Displayed dates match selected dates
3. ✅ No timezone conversion for date-only values
4. ✅ Times continue to work correctly with timezone handling
5. ✅ Approval process doesn't modify any date/time fields
6. ✅ Works correctly for users in any timezone
