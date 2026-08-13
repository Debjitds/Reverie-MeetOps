# LLM Booking Time Fix - Testing Guide

## Overview

This document provides a comprehensive testing guide to verify that the LLM booking time bug has been fixed. The bug caused bookings to be stored with times shifted by 5 hours and 30 minutes ahead of what users requested.

**Expected Behavior After Fix**:
- User requests: "Book from 10:00 AM to 11:30 AM"
- LLM creates booking with: 10:00 AM to 11:30 AM
- Database stores: 10:00 AM to 11:30 AM
- All displays show: 10:00 AM to 11:30 AM
- Zero timezone shift or offset anywhere

---

## Code Verification

### ✅ 1. Edge Function Storage Logic

**File**: `/supabase/functions/chat-assistant/index.ts` (Lines 327-328)

**Verified**:
```typescript
start_time: startTimeStr,  // ✅ Stored directly without conversion
end_time: endTimeStr,      // ✅ Stored directly without conversion
```

**Status**: ✅ **CORRECT** - No `.toISOString()` or UTC conversion

---

### ✅ 2. Edge Function Confirmation Message

**File**: `/supabase/functions/chat-assistant/index.ts` (Lines 349-372)

**Verified**:
```typescript
const formatStoredTime = (timeStr: string): string => {
  const timePart = timeStr.split('T')[1];  // ✅ Direct string parsing
  const [hour, minute] = timePart.split(':');
  const hourNum = parseInt(hour);
  const isPM = hourNum >= 12;
  const hour12 = hourNum === 0 ? 12 : hourNum > 12 ? hourNum - 12 : hourNum;
  const ampm = isPM ? 'PM' : 'AM';
  return `${hour12}:${minute} ${ampm}`;
};
```

**Status**: ✅ **CORRECT** - Parses stored times directly without Date object

---

### ✅ 3. Display Layer (formatDateTime)

**File**: `/src/lib/booking-utils.ts` (Lines 92-145)

**Verified**:
```typescript
if (typeof date === 'string') {
  const hasTimezone = date.endsWith('Z') || date.includes('+') || date.match(/[+-]\d{2}:\d{2}$/);
  
  if (hasTimezone) {
    // Has timezone - parse through Date object
  } else {
    // No timezone - parse string directly ✅
    const [datePart, timePart] = date.split('T');
    const [year, month, day] = datePart.split('-');
    const [hour, minute] = timePart.split(':');
    // ... manual formatting
  }
}
```

**Status**: ✅ **CORRECT** - Handles plain strings without timezone by parsing directly

---

### ✅ 4. System Prompt Instructions

**File**: `/supabase/functions/chat-assistant/index.ts` (Lines 205-227)

**Verified**:
```
5. ISO 8601 TIME FORMAT FOR EXECUTE_BOOKING:
   CRITICAL: Do NOT add a 'Z' suffix or any timezone indicator to the datetime string.
   The format must be exactly: YYYY-MM-DDTHH:MM:SS (no Z, no +00:00, no timezone)
   
   Examples of CORRECT format:
   - 2026-04-23T11:00:00 ✅ (CORRECT - no Z suffix)
   
   Examples of WRONG format:
   - 2026-04-23T11:00:00Z ❌ (WRONG - has Z suffix)
```

**Status**: ✅ **CORRECT** - LLM instructed to construct times without Z suffix

---

## Manual Testing Steps

### Test Case 1: Basic Morning Booking (10:00 AM to 11:30 AM)

**Objective**: Verify that a booking created for 10:00 AM to 11:30 AM is stored and displayed correctly with no timezone shift.

**Steps**:

1. **Open MeetOps Application**
   - Navigate to the MeetOps application in your browser
   - Log in with your credentials

2. **Open Chat Widget**
   - Look for the chat icon (usually in the bottom right corner)
   - Click to open the LLM assistant chat

3. **Request Booking**
   - Type: "Book a room from 10:00 AM to 11:30 AM"
   - Press Enter

4. **Verify LLM Confirmation**
   - LLM should respond with:
     ```
     I found [Room Name] available! Here are the booking details I'm about to create:
     
     📍 Room: [Room Name]
     📅 Date: [Today's Date]
     🕐 Start Time: 10:00 AM
     🕐 End Time: 11:30 AM
     📝 Purpose: Not specified
     
     Shall I confirm this booking?
     ```
   - ✅ **Verify**: Start Time shows "10:00 AM" (not 3:30 PM or any other time)
   - ✅ **Verify**: End Time shows "11:30 AM" (not 5:00 PM or any other time)

5. **Confirm Booking**
   - Type: "Yes"
   - Press Enter

6. **Verify Success Message**
   - LLM should respond with:
     ```
     ✅ Booking created successfully!
     
     📍 Room: [Room Name]
     📅 Date: [Full Date]
     🕐 Start Time: 10:00 AM
     🕐 End Time: 11:30 AM
     📝 Purpose: [Purpose]
     ⏳ Status: Pending approval
     
     The booking has been saved with the times shown above.
     ```
   - ✅ **Verify**: Start Time shows "10:00 AM"
   - ✅ **Verify**: End Time shows "11:30 AM"
   - ✅ **Verify**: Times match what you requested (no shift)

7. **Check Toast Notification**
   - A toast notification should appear in the top right corner
   - ✅ **Verify**: Toast shows "10:00 AM to 11:30 AM" or similar
   - ✅ **Verify**: Times match what you requested

8. **Navigate to Bookings Page**
   - Click on "Bookings" in the navigation menu
   - Find the booking you just created in the list

9. **Verify Bookings List Display**
   - ✅ **Verify**: The booking shows "10:00 AM - 11:30 AM" in the time column
   - ✅ **Verify**: Times match what you requested

10. **Open Booking Details**
    - Click on the booking to open the details page

11. **Verify Booking Details Page**
    - ✅ **Verify**: Start Time shows "Apr [Day], [Year], 10:00 AM"
    - ✅ **Verify**: End Time shows "Apr [Day], [Year], 11:30 AM"
    - ✅ **Verify**: Times match exactly what you requested
    - ✅ **Verify**: NO 5:30 hour shift (not showing 3:30 PM)

12. **Check Calendar View**
    - Navigate to the Calendar page
    - Find the booking on the calendar

13. **Verify Calendar Display**
    - ✅ **Verify**: Booking appears at 10:00 AM on the calendar
    - ✅ **Verify**: Booking duration shows 10:00 AM to 11:30 AM
    - ✅ **Verify**: Times match what you requested

14. **Ask LLM About Booking**
    - Open chat widget again
    - Type: "What did you book for me?"
    - Press Enter

15. **Verify LLM Response**
    - LLM should fetch from database and respond with actual stored times
    - ✅ **Verify**: LLM says "10:00 AM to 11:30 AM"
    - ✅ **Verify**: Times match what you requested

**Expected Result**: ✅ **PASS** - All displays show 10:00 AM to 11:30 AM with zero timezone shift

---

### Test Case 2: Afternoon Booking (2:00 PM to 3:30 PM)

**Objective**: Verify afternoon times are stored and displayed correctly.

**Steps**:

1. Open chat widget
2. Type: "Book a room from 2:00 PM to 3:30 PM"
3. Verify confirmation shows: "2:00 PM to 3:30 PM"
4. Confirm booking
5. Verify success message shows: "2:00 PM to 3:30 PM"
6. Check booking details page shows: "2:00 PM to 3:30 PM"
7. ✅ **Verify**: NO shift to 7:30 PM or 9:00 PM

**Expected Result**: ✅ **PASS** - All displays show 2:00 PM to 3:30 PM

---

### Test Case 3: Evening Booking (6:00 PM to 7:00 PM)

**Objective**: Verify evening times are stored and displayed correctly.

**Steps**:

1. Open chat widget
2. Type: "Book a room at 6pm for 1 hour"
3. Verify confirmation shows: "6:00 PM to 7:00 PM"
4. Confirm booking
5. Verify success message shows: "6:00 PM to 7:00 PM"
6. Check booking details page shows: "6:00 PM to 7:00 PM"
7. ✅ **Verify**: NO shift to 11:30 PM or 12:30 AM

**Expected Result**: ✅ **PASS** - All displays show 6:00 PM to 7:00 PM

---

### Test Case 4: Early Morning Booking (8:00 AM to 9:00 AM)

**Objective**: Verify early morning times are stored and displayed correctly.

**Steps**:

1. Open chat widget
2. Type: "Book at 8 in the morning to 9"
3. Verify confirmation shows: "8:00 AM to 9:00 AM"
4. Confirm booking
5. Verify success message shows: "8:00 AM to 9:00 AM"
6. Check booking details page shows: "8:00 AM to 9:00 AM"
7. ✅ **Verify**: NO shift to 1:30 PM or 2:30 PM

**Expected Result**: ✅ **PASS** - All displays show 8:00 AM to 9:00 AM

---

### Test Case 5: Noon Booking (12:00 PM to 1:00 PM)

**Objective**: Verify noon times (12-hour boundary) are handled correctly.

**Steps**:

1. Open chat widget
2. Type: "Book from 12pm to 1pm"
3. Verify confirmation shows: "12:00 PM to 1:00 PM"
4. Confirm booking
5. Verify success message shows: "12:00 PM to 1:00 PM"
6. Check booking details page shows: "12:00 PM to 1:00 PM"
7. ✅ **Verify**: NO shift to 5:30 PM or 6:30 PM

**Expected Result**: ✅ **PASS** - All displays show 12:00 PM to 1:00 PM

---

### Test Case 6: Midnight Booking (11:00 PM to 11:59 PM)

**Objective**: Verify late night times are handled correctly.

**Steps**:

1. Open chat widget
2. Type: "Book from 11pm to 11:59pm"
3. Verify confirmation shows: "11:00 PM to 11:59 PM"
4. Confirm booking
5. Verify success message shows: "11:00 PM to 11:59 PM"
6. Check booking details page shows: "11:00 PM to 11:59 PM"
7. ✅ **Verify**: NO shift to next day or wrong time

**Expected Result**: ✅ **PASS** - All displays show 11:00 PM to 11:59 PM

---

## Database Verification

### Check Stored Values Directly

**Objective**: Verify that the database contains the correct time format.

**Steps**:

1. **Access Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to Table Editor
   - Select the `bookings` table

2. **Find Your Test Booking**
   - Look for the booking you just created
   - Check the `start_time` and `end_time` columns

3. **Verify Format**
   - ✅ **Expected**: `"2026-04-29T10:00:00"` (no Z suffix)
   - ❌ **Wrong**: `"2026-04-29T04:30:00.000Z"` (has Z suffix, UTC time)
   - ❌ **Wrong**: `"2026-04-29T15:30:00"` (shifted time)

4. **Verify Time Values**
   - ✅ **Verify**: Hour matches what you requested (10 for 10:00 AM)
   - ✅ **Verify**: Minute matches what you requested (00 for 10:00 AM)
   - ✅ **Verify**: No 5:30 hour offset

**Expected Result**: ✅ **PASS** - Database stores plain local datetime strings without Z suffix

---

## Edge Function Logs Verification

### Check Console Logs

**Objective**: Verify that the Edge Function is logging the correct values.

**Steps**:

1. **Access Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to Edge Functions
   - Select `chat-assistant` function
   - Click on "Logs" tab

2. **Create a Test Booking**
   - Follow Test Case 1 steps to create a booking

3. **Check Logs**
   - Look for log entry: "LLM Booking Time Storage"
   - ✅ **Verify**: `startTimeStr: "2026-04-29T10:00:00"` (no Z)
   - ✅ **Verify**: `endTimeStr: "2026-04-29T11:30:00"` (no Z)
   - ✅ **Verify**: Note says "Storing as plain local datetime strings without timezone conversion"

**Expected Result**: ✅ **PASS** - Logs show plain datetime strings without Z suffix

---

## Troubleshooting

### Issue 1: Times Still Shifted by 5:30 Hours

**Symptoms**:
- User requests 10:00 AM
- Booking details shows 3:30 PM

**Possible Causes**:
1. Edge Function not deployed correctly
2. Browser cache showing old version
3. Old booking being viewed (created before fix)

**Solutions**:
1. Verify Edge Function deployment:
   ```bash
   # Check deployment status in Supabase dashboard
   # Edge Functions → chat-assistant → Check last deployed time
   ```

2. Clear browser cache:
   - Press Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
   - Clear cache and reload page

3. Create a NEW booking to test:
   - Don't test with old bookings created before the fix
   - Create a fresh booking after the fix was deployed

---

### Issue 2: LLM Not Responding

**Symptoms**:
- Chat widget doesn't respond
- No confirmation message appears

**Possible Causes**:
1. Edge Function error
2. API key issue
3. Network problem

**Solutions**:
1. Check Edge Function logs for errors
2. Verify INTEGRATIONS_API_KEY is set correctly
3. Check browser console for network errors

---

### Issue 3: Booking Created But Wrong Time

**Symptoms**:
- Booking is created successfully
- But time is still wrong

**Possible Causes**:
1. LLM adding Z suffix despite instructions
2. Database timezone settings
3. Display layer issue

**Solutions**:
1. Check database directly (see Database Verification section)
2. Check Edge Function logs to see what was stored
3. Verify formatDateTime function is being used

---

## Success Criteria

### ✅ All Tests Must Pass

- [ ] Test Case 1: 10:00 AM booking displays correctly
- [ ] Test Case 2: 2:00 PM booking displays correctly
- [ ] Test Case 3: 6:00 PM booking displays correctly
- [ ] Test Case 4: 8:00 AM booking displays correctly
- [ ] Test Case 5: 12:00 PM booking displays correctly
- [ ] Test Case 6: 11:00 PM booking displays correctly

### ✅ All Displays Must Match

- [ ] LLM confirmation message shows correct time
- [ ] Success message shows correct time
- [ ] Toast notification shows correct time
- [ ] Bookings list shows correct time
- [ ] Booking details page shows correct time
- [ ] Calendar view shows correct time
- [ ] LLM inquiry response shows correct time

### ✅ Database Must Store Correctly

- [ ] Database contains plain datetime strings (no Z suffix)
- [ ] Stored hour matches requested hour
- [ ] Stored minute matches requested minute
- [ ] No 5:30 hour offset in stored values

### ✅ Zero Timezone Shift

- [ ] No shift from AM to PM
- [ ] No shift from PM to next day
- [ ] No 5:30 hour offset anywhere
- [ ] User request = Stored value = Displayed value

---

## Reporting Issues

If you find any issues during testing, please report them with:

1. **Test Case**: Which test case failed
2. **Expected**: What time you requested
3. **Actual**: What time was displayed
4. **Location**: Where the wrong time appeared (details page, list, etc.)
5. **Screenshot**: Screenshot of the wrong display
6. **Database Value**: What's stored in the database (from Supabase dashboard)
7. **Edge Function Logs**: Relevant log entries

---

## Conclusion

This testing guide provides comprehensive steps to verify that the LLM booking time bug has been fixed. Follow each test case carefully and verify that all displays show the correct times with zero timezone shift.

**Expected Outcome**: All bookings created through the LLM assistant should store and display times exactly as the user requests, with no 5:30 hour offset or timezone conversion errors.

---

**Document Version**: 1.0  
**Date**: 2026-04-29  
**Author**: MeetOps Development Team
