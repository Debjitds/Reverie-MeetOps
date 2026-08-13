# Booking Pages Translation Implementation Guide

## Status: Partially Complete

### Completed Work (v40)

#### NewBookingPage ✅ Partial
- ✅ Added `useAppTranslation` hook import
- ✅ Initialized `t` and `tDynamic` functions
- ✅ Translated ALL toast messages (15 messages)
- ✅ Translated ALL validation error messages
- ✅ Translated step 1 UI (Select Resource section)
- ⏳ **Remaining**: Step 2 & 3 UI labels, form labels, button text

#### Translation Keys Added ✅
- ✅ Added `toast.agendaGenerated`
- ✅ Added `toast.agendaFailed`
- ✅ All booking-related toast messages ready

### Remaining Work

#### 1. Complete NewBookingPage UI Translation

**Step 2 Section** (Lines 430-540):
```typescript
// Current:
<CardTitle>Step 2: Select Date & Time</CardTitle>
<Label>Booking Type</Label>
<Label htmlFor="single">Single Day</Label>
<Label htmlFor="multi_day">Multi-Day</Label>
<Label>Date</Label>
<Label>Start Date</Label>
<Label>End Date</Label>
<Label htmlFor="start-time">Start Time</Label>
<Label htmlFor="end-time">End Time</Label>

// Should be:
<CardTitle>{t('newBooking.date')}</CardTitle>
<Label>{t('bookings.type')}</Label>
<Label htmlFor="single">{t('bookings.singleDay')}</Label>
<Label htmlFor="multi_day">{t('bookings.multiDay')}</Label>
<Label>{t('common.date')}</Label>
<Label>{t('newBooking.startDate')}</Label>
<Label>{t('newBooking.endDate')}</Label>
<Label htmlFor="start-time">{t('newBooking.startTime')}</Label>
<Label htmlFor="end-time">{t('newBooking.endTime')}</Label>
```

**Step 3 Section** (Lines 545-655):
```typescript
// Current:
<CardTitle>Step 3: Booking Details</CardTitle>
<Label htmlFor="purpose">Purpose *</Label>
<Label htmlFor="attendees">Attendees (optional)</Label>
<CardTitle>AI Agenda Generator</CardTitle>
<Button>Generate Agenda</Button>
<Button>Generating...</Button>
<Button>Copy to Clipboard</Button>
<strong>Resource:</strong>
<strong>Date:</strong>
<strong>Time:</strong>
<strong>Type:</strong>
<Button>Back</Button>
<Button>Create Booking</Button>
<Button>Creating...</Button>

// Should be:
<CardTitle>{t('newBooking.purpose')}</CardTitle>
<Label htmlFor="purpose">{t('newBooking.purpose')} *</Label>
<Label htmlFor="attendees">{t('newBooking.attendees')}</Label>
<CardTitle>{t('newBooking.aiAgendaGenerator')}</CardTitle>
<Button>{t('newBooking.generateAgenda')}</Button>
<Button>{t('common.loading')}</Button>
<Button>{t('common.copy')}</Button>
<strong>{t('bookings.resource')}:</strong>
<strong>{t('common.date')}:</strong>
<strong>{t('common.time')}:</strong>
<strong>{t('bookings.type')}:</strong>
<Button>{t('common.back')}</Button>
<Button>{t('newBooking.submit')}</Button>
<Button>{t('common.loading')}</Button>
```

#### 2. BookingsPage Translation

**File**: `/workspace/app-b5rmjd5bhh4x/src/pages/BookingsPage.tsx` (530 lines)

**Import Section** (Add after line 3):
```typescript
import { useAppTranslation } from '@/hooks/useAppTranslation';
```

**Hook Usage** (Add after line 21):
```typescript
const { t } = useAppTranslation();
```

**Toast Messages to Replace** (~15 occurrences):
```typescript
// Search for all toast.error() and toast.success() calls
// Replace with appropriate t() calls using keys from translation-keys.ts
```

**UI Labels to Replace** (~40 occurrences):
- Page title: "Bookings"
- Tab labels: "Active Bookings", "Past Bookings"
- Button labels: "Export PDF", "New Booking"
- Filter labels: "Status", "User", "Search"
- Table headers: "Resource", "Purpose", "Date", "Start Time", "End Time", "Type", "Actions"
- Action buttons: "View", "Approve", "Reject", "Cancel"
- Pagination: "Previous", "Next", "Page", "of"
- Empty states: "No bookings found", "No active bookings", "No past bookings"

**Export Dialog** (Lines ~300-400):
```typescript
// Dialog title, description, labels, buttons
// All need translation using t() function
```

#### 3. BookingDetailPage Translation

**File**: `/workspace/app-b5rmjd5bhh4x/src/pages/BookingDetailPage.tsx` (474 lines)

**Import & Hook** (Same as above)

**UI Labels** (~25 occurrences):
- Page title: "Booking Details"
- Detail labels: "Resource", "Location", "Capacity", "Booked By", "Start Time", "End Time", "Purpose", "Attendees", "Status", "Reviewed By", "Reviewed At", "Created At"
- Action buttons: "Approve", "Reject", "Cancel Booking", "Back"
- Confirmation dialogs: "Are you sure...", "Yes", "No"

**Toast Messages** (~6 occurrences):
- Success messages for approve/reject/cancel
- Error messages

### Implementation Steps

#### Step 1: Add Missing Translation Keys

Add to `src/lib/translation-keys.ts`:
```typescript
common: {
  // ... existing keys ...
  copy: 'Copy to Clipboard',
},

newBooking: {
  // ... existing keys ...
  startDate: 'Start Date',
  bookingDetails: 'Booking Details',
},
```

#### Step 2: Systematic Replacement Process

For each page:

1. **Add imports**:
   ```typescript
   import { useAppTranslation } from '@/hooks/useAppTranslation';
   ```

2. **Add hook**:
   ```typescript
   const { t } = useAppTranslation();
   ```

3. **Replace toast messages**:
   - Find all `toast.error('...')` and `toast.success('...')`
   - Replace with `toast.error(t('...'))`

4. **Replace UI labels**:
   - Find all hardcoded strings in JSX
   - Replace with `{t('...')}`

5. **Test compilation**:
   ```bash
   npm run lint
   ```

### Quick Reference: Common Replacements

```typescript
// Buttons
"Next" → {t('common.next')}
"Back" → {t('common.back')}
"Cancel" → {t('common.cancel')}
"Save" → {t('common.save')}
"Submit" → {t('common.submit')}
"Loading..." → {t('common.loading')}

// Status
"Pending" → {t('bookings.pending')}
"Approved" → {t('bookings.approved')}
"Rejected" → {t('bookings.rejected')}
"Cancelled" → {t('bookings.cancelled')}
"Completed" → {t('bookings.completed')}

// Common labels
"Resource" → {t('bookings.resource')}
"Purpose" → {t('bookings.purpose')}
"Date" → {t('common.date')}
"Time" → {t('common.time')}
"Actions" → {t('common.actions')}
```

### Testing Checklist

After completing translations:

- [ ] Run `npm run lint` - should pass with no errors
- [ ] Test language switching on each page
- [ ] Verify all text changes language
- [ ] Check toast notifications appear in selected language
- [ ] Verify form validation messages are translated
- [ ] Test with Hindi, Bengali, Tamil
- [ ] Check layout doesn't break with longer text
- [ ] Verify buttons remain properly sized

### Estimated Effort

- **NewBookingPage completion**: 30 minutes (40 strings remaining)
- **BookingsPage**: 1 hour (50 strings)
- **BookingDetailPage**: 45 minutes (25 strings)
- **Testing & fixes**: 30 minutes

**Total**: ~2.5-3 hours for complete implementation

### Priority Order

1. **HIGH**: Complete NewBookingPage (most user-facing)
2. **HIGH**: BookingsPage (main list view)
3. **MEDIUM**: BookingDetailPage (detail view)

### Notes

- All translation keys are already defined in `translation-keys.ts`
- The translation infrastructure is fully functional
- Focus on replacing hardcoded strings with `t()` calls
- No need to modify translation logic or API calls
- Test after each page completion to catch issues early

## Current Status Summary

**Completed**: 4 pages fully translated (Dashboard, Login, Profile, NotFound)
**In Progress**: 1 page partially translated (NewBookingPage - 60% done)
**Remaining**: 2 pages (BookingsPage, BookingDetailPage)

**Overall Progress**: 4.6 / 7 pages = 66% complete

The foundation is solid. The remaining work is systematic string replacement following the patterns established in completed pages.
