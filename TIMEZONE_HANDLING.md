# Timezone Handling in MeetOps

## Overview
MeetOps handles timezones correctly to ensure that booking times are displayed exactly as users enter them, regardless of when they're viewed or who views them.

## How It Works

### 1. Booking Creation
When a user creates a booking:
- User selects date (e.g., "2026-04-26") and time (e.g., "14:30")
- `combineDateAndTime()` function:
  - Creates string: "2026-04-26T14:30:00"
  - Converts to Date object (interpreted as LOCAL time)
  - Converts to ISO string (UTC) for storage
  - Example: "2026-04-26T19:30:00.000Z" (if user is in EST/UTC-5)

### 2. Database Storage
- Times are stored as `timestamptz` (timestamp with timezone) in PostgreSQL
- Stored in UTC format
- Example: "2026-04-26 19:30:00+00"

### 3. Display
When displaying a booking:
- `formatDateTime()` function:
  - Receives UTC timestamp from database
  - Converts to Date object
  - Uses `toLocaleString()` to display in user's local timezone
  - Example: "Apr 26, 2026, 02:30 PM" (if user is in EST)

### 4. Approval Process
When a manager approves a booking:
- ONLY updates: `status`, `reviewed_by`, `reviewed_at`
- NEVER touches: `start_time`, `end_time`
- Times remain exactly as originally stored

## Key Points

1. **Consistency**: Times are always stored in UTC and displayed in local time
2. **Preservation**: Approval process never modifies time fields
3. **Accuracy**: User sees the same time they entered, regardless of when they view it
4. **Debugging**: Console logs show both UTC and local time for verification

## Testing

To verify timezone handling:
1. Create a booking with specific time (e.g., 2:30 PM)
2. Check browser console for debug logs showing:
   - Selected time
   - UTC time being stored
   - Local time after parsing
3. Approve the booking
4. Check console logs to verify times didn't change
5. View booking detail - should show original time

## Common Issues

### Issue: Times change after approval
**Cause**: Approval handler modifying time fields
**Fix**: Ensure approval only updates status/review fields

### Issue: Times show in wrong timezone
**Cause**: Not using proper Date conversion
**Fix**: Always use `new Date()` and `toLocaleString()` for display

### Issue: Times off by several hours
**Cause**: Timezone not being handled during storage
**Fix**: Use `toISOString()` when storing, `toLocaleString()` when displaying
