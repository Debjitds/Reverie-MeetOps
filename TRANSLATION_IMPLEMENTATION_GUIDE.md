# Google Text Translation Integration - Complete Implementation Guide

## Overview

This document provides a complete guide for implementing application-wide translation using the Google Text Translation plugin in the MeetOps application.

## Current Status

### ✅ COMPLETED

1. **Translation Infrastructure**
   - Created `/src/lib/translation-keys.ts` with ALL UI strings centralized
   - Created `/src/hooks/useAppTranslation.ts` hook with preloading and caching
   - Existing `/src/contexts/LanguageContext.tsx` provides translation API
   - Existing `/supabase/functions/translate-text` Edge Function handles Google Translation API calls

2. **Layout Components**
   - ✅ AppSidebar - All navigation labels translated
   - ✅ AppHeader - All navbar labels, notifications, logout translated
   - ✅ Mobile menu - All labels translated

### 🔄 IN PROGRESS / TODO

The following pages need to be updated to use the `useAppTranslation` hook:

1. Dashboard Page
2. Bookings Page
3. New Booking Page
4. Booking Detail Page
5. Calendar Page
6. Resources Page
7. Users Page
8. Notifications Page
9. Profile Page
10. All toast messages across all pages

## Implementation Pattern

### Step 1: Import the Hook

```typescript
import { useAppTranslation } from '@/hooks/useAppTranslation';
```

### Step 2: Use the Hook in Component

```typescript
export default function YourPage() {
  const { t, tDynamic, isLoading } = useAppTranslation();
  
  // ... rest of component
}
```

### Step 3: Replace All Hardcoded Strings

**Before:**
```typescript
<h1>Dashboard</h1>
<Button>New Booking</Button>
<p>No bookings found</p>
```

**After:**
```typescript
<h1>{t('dashboard.title')}</h1>
<Button>{t('dashboard.newBooking')}</Button>
<p>{t('bookings.noBookingsFound')}</p>
```

### Step 4: Translate Status Badges

**Before:**
```typescript
<Badge>{status}</Badge>
```

**After:**
```typescript
<Badge>{t(`bookings.${status}`)}</Badge>
```

### Step 5: Translate Toast Messages

**Before:**
```typescript
toast.success('Booking created successfully');
toast.error('Failed to create booking');
```

**After:**
```typescript
toast.success(t('toast.bookingCreated'));
toast.error(t('newBooking.bookingFailed'));
```

### Step 6: Translate User-Generated Content (Dynamic)

For content like room names, booking purposes, etc.:

```typescript
const [translatedName, setTranslatedName] = useState('');

useEffect(() => {
  tDynamic(resource.name).then(setTranslatedName);
}, [resource.name, tDynamic]);

// Then use translatedName in render
<p>{translatedName}</p>
```

## Translation Keys Reference

All translation keys are defined in `/src/lib/translation-keys.ts`. The structure is:

```
TRANSLATION_KEYS = {
  nav: { dashboard, bookings, calendar, resources, users, ... },
  navbar: { language, logout, admin, manager, user },
  dashboard: { title, welcome, totalBookings, ... },
  bookings: { title, activeBookings, pastBookings, status, ... },
  newBooking: { title, selectResource, date, ... },
  bookingDetails: { title, resource, location, ... },
  calendar: { title, month, week, day, ... },
  resources: { title, addResource, name, ... },
  users: { title, name, email, role, ... },
  notifications: { title, markAllRead, ... },
  profile: { title, personalInfo, ... },
  chat: { title, placeholder, send, ... },
  common: { loading, error, success, ... },
  toast: { bookingCreated, bookingUpdated, ... },
}
```

## Page-by-Page Implementation Guide

### Dashboard Page (`/src/pages/DashboardPage.tsx`)

**Strings to translate:**
- Page title: "Dashboard"
- Welcome message: "Welcome back, {name}"
- Stat labels: "Total Bookings", "Pending", "Approved", "Rejected"
- Section heading: "Upcoming Bookings"
- Section heading: "Quick Actions"
- Button labels: "New Booking", "View All Bookings", "Manage Resources"
- Empty state: "No upcoming bookings"
- Status badges: pending, approved, rejected, cancelled, completed

**Implementation:**
```typescript
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function DashboardPage() {
  const { t } = useAppTranslation();
  
  return (
    <AppLayout>
      <h1>{t('dashboard.title')}</h1>
      <p>{t('dashboard.welcome')}, {profile?.name}</p>
      
      {/* Stats Cards */}
      <Card>
        <CardTitle>{t('dashboard.totalBookings')}</CardTitle>
        <CardContent>{stats.total}</CardContent>
      </Card>
      
      {/* Upcoming Bookings */}
      <h2>{t('dashboard.upcomingBookings')}</h2>
      {upcomingBookings.length === 0 ? (
        <p>{t('dashboard.noUpcomingBookings')}</p>
      ) : (
        // ... render bookings with translated status badges
        <Badge>{t(`bookings.${booking.status}`)}</Badge>
      )}
      
      {/* Quick Actions */}
      <h2>{t('dashboard.quickActions')}</h2>
      <Button>{t('dashboard.newBooking')}</Button>
      <Button>{t('dashboard.viewAllBookings')}</Button>
    </AppLayout>
  );
}
```

### Bookings Page (`/src/pages/BookingsPage.tsx`)

**Strings to translate:**
- Page title: "Bookings"
- Section headers: "Active Bookings (n)", "Past Bookings (n)"
- Filter labels: "Status", "User", "Search"
- Filter options: "All Statuses", "Pending", "Approved", "Rejected", "Cancelled", "Completed"
- Search placeholder: "Search by resource, purpose, or user..."
- Table columns: "Resource", "Purpose", "Date", "Start Time", "End Time", "Type", "Status", "Actions"
- Button labels: "New Booking", "View", "View Details", "Export PDF"
- Empty states: "No bookings found", "No active bookings found", "No past bookings found"
- Pagination: "Previous", "Next", "Page", "of"
- Status badges: pending, approved, rejected, cancelled, completed
- Type badge: "Multi-Day"

**Implementation:**
```typescript
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function BookingsPage() {
  const { t } = useAppTranslation();
  
  return (
    <AppLayout>
      <h1>{t('bookings.title')}</h1>
      
      {/* Filters */}
      <Label>{t('bookings.status')}</Label>
      <SelectItem value="all">{t('bookings.allStatuses')}</SelectItem>
      <SelectItem value="pending">{t('bookings.pending')}</SelectItem>
      
      <Input placeholder={t('bookings.searchPlaceholder')} />
      
      {/* Active Bookings Section */}
      <h2>{t('bookings.activeBookings')} ({filteredActiveBookings.length})</h2>
      
      <TableHead>{t('bookings.resource')}</TableHead>
      <TableHead>{t('bookings.purpose')}</TableHead>
      <TableHead>{t('bookings.startTime')}</TableHead>
      <TableHead>{t('bookings.endTime')}</TableHead>
      <TableHead>{t('bookings.status')}</TableHead>
      <TableHead>{t('bookings.actions')}</TableHead>
      
      <Badge>{t(`bookings.${booking.status}`)}</Badge>
      <Button>{t('bookings.view')}</Button>
      
      {/* Past Bookings Section */}
      <h2>{t('bookings.pastBookings')} ({pastBookings.length})</h2>
      <Button>{t('bookings.viewDetails')}</Button>
      
      {/* Pagination */}
      <Button>{t('bookings.previous')}</Button>
      <span>{t('bookings.page')} {page} {t('bookings.of')} {totalPages}</span>
      <Button>{t('bookings.next')}</Button>
    </AppLayout>
  );
}
```

### New Booking Page (`/src/pages/NewBookingPage.tsx`)

**Strings to translate:**
- Page title: "New Booking"
- Form labels: "Select Resource", "Date", "Start Time", "End Time", "Purpose", "Attendees"
- Placeholders: "Choose a room or resource", "Enter booking purpose", "Number of attendees"
- Checkbox label: "Multi-Day Booking"
- Button labels: "Create Booking", "Cancel", "Generate Agenda"
- Validation messages: "Please select a resource", "Please select a date", etc.
- Toast messages: "Booking created successfully", "Failed to create booking"

**Implementation:**
```typescript
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function NewBookingPage() {
  const { t } = useAppTranslation();
  
  const handleSubmit = async () => {
    if (!selectedResource) {
      toast.error(t('newBooking.resourceRequired'));
      return;
    }
    
    // ... create booking
    toast.success(t('toast.bookingCreated'));
  };
  
  return (
    <AppLayout>
      <h1>{t('newBooking.title')}</h1>
      
      <Label>{t('newBooking.selectResource')}</Label>
      <Select placeholder={t('newBooking.selectResourcePlaceholder')} />
      
      <Label>{t('newBooking.date')}</Label>
      <Label>{t('newBooking.startTime')}</Label>
      <Label>{t('newBooking.endTime')}</Label>
      
      <Label>{t('newBooking.purpose')}</Label>
      <Input placeholder={t('newBooking.purposePlaceholder')} />
      
      <Button onClick={handleSubmit}>{t('newBooking.submit')}</Button>
      <Button>{t('newBooking.cancel')}</Button>
    </AppLayout>
  );
}
```

### Booking Detail Page (`/src/pages/BookingDetailPage.tsx`)

**Strings to translate:**
- Page title: "Booking Details"
- Field labels: "Resource", "Location", "Capacity", "Booked By", "Start Time", "End Time", "Purpose", "Status", "Reviewed By", "Reviewed At"
- Button labels: "Approve", "Reject", "Cancel Booking", "Back"
- Confirmation dialogs: "Are you sure you want to approve this booking?", "Yes", "No"
- Toast messages: "Booking approved successfully", "Booking rejected successfully", "Booking cancelled successfully"

### Calendar Page (`/src/pages/CalendarPage.tsx`)

**Strings to translate:**
- Page title: "Calendar"
- Subtitle: "View all resource bookings"
- View toggles: "Month", "Week", "Day"
- Navigation: "Today", "Back", "Next"
- Legend: "Legend", "Approved", "Pending", "Rejected", "Cancelled"
- Event details: "Room", "Time", "Booked By"
- Empty state: "No bookings for this period"

### Resources Page (`/src/pages/ResourcesPage.tsx`)

**Strings to translate:**
- Page title: "Resources"
- Button: "Add Resource"
- Table columns: "Name", "Location", "Capacity", "Description", "Actions"
- Actions: "Edit", "Delete"
- Dialog titles: "Add Resource", "Edit Resource"
- Form labels: "Name", "Location", "Capacity", "Description", "Availability Hours"
- Placeholders: "Enter resource name", "Enter location", etc.
- Buttons: "Save", "Cancel"
- Confirmation: "Are you sure you want to delete this resource?"
- Toast messages: "Resource added successfully", "Resource updated successfully", "Resource deleted successfully"

### Users Page (`/src/pages/UsersPage.tsx`)

**Strings to translate:**
- Page title: "Users"
- Search placeholder: "Search users..."
- Table columns: "Name", "Email", "Role", "Joined", "Actions"
- Role labels: "Admin", "Manager", "User"
- Button: "Change Role"
- Dialog title: "Change User Role"
- Toast message: "User role changed successfully"

### Notifications Page (`/src/pages/NotificationsPage.tsx`)

**Strings to translate:**
- Page title: "Notifications"
- Button: "Mark All as Read"
- Time labels: "Today", "Yesterday"
- Empty state: "No notifications"

### Profile Page (`/src/pages/ProfilePage.tsx`)

**Strings to translate:**
- Page title: "Profile"
- Section: "Personal Information"
- Labels: "Name", "Email", "Role", "Language Preference"
- Dropdown: "Select Language"
- Buttons: "Save", "Cancel"
- Toast messages: "Profile updated successfully", "Failed to update profile"

### Chat Widget (`/src/components/ai/ChatWidget.tsx`)

**Strings to translate:**
- Title: "MeetOps AI Assistant"
- Placeholder: "Type your message..."
- Button: "Send"
- Loading: "Thinking..."
- Error: "Failed to send message"

## RTL Support for Arabic

The RTL support is already implemented in `/src/contexts/LanguageContext.tsx`:

```typescript
const updateDocumentDirection = (lang: LanguageCode) => {
  const rtl = isRTL(lang);
  document.documentElement.dir = rtl ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;
};
```

When Arabic is selected, the entire app automatically switches to RTL layout. No additional changes needed.

## Testing Checklist

### For Each Page:

1. **English (Default)**
   - [ ] All text displays correctly
   - [ ] No translation keys visible (e.g., "dashboard.title")
   - [ ] All features work as expected

2. **Hindi / Bengali / Tamil**
   - [ ] All UI text translates to selected language
   - [ ] No English text remains visible
   - [ ] Status badges translate correctly
   - [ ] Toast messages translate correctly
   - [ ] Form validation messages translate correctly
   - [ ] All features work as expected

3. **Arabic**
   - [ ] All UI text translates to Arabic
   - [ ] Layout switches to RTL (sidebar on right, text right-aligned)
   - [ ] All features work as expected

4. **Spanish / French / German / Chinese / Japanese**
   - [ ] All UI text translates correctly
   - [ ] All features work as expected

### Cross-Page Testing:

1. **Language Persistence**
   - [ ] Select a language on Dashboard
   - [ ] Navigate to Bookings page
   - [ ] Verify language persists
   - [ ] Logout and login again
   - [ ] Verify language preference loads from database

2. **Language Switching**
   - [ ] Switch language from navbar
   - [ ] Verify entire page updates immediately without reload
   - [ ] Navigate to different page
   - [ ] Verify new page displays in selected language

3. **User-Generated Content**
   - [ ] Create a room with English name
   - [ ] Switch to Hindi
   - [ ] Verify room name translates to Hindi
   - [ ] Create a booking with English purpose
   - [ ] Switch to Bengali
   - [ ] Verify booking purpose translates to Bengali

## Performance Considerations

1. **Translation Caching**
   - All UI strings are translated once when language changes
   - Translations are cached globally in `useAppTranslation` hook
   - No repeated API calls for the same strings

2. **Batch Translation**
   - All UI strings are translated in a single batch API call
   - Uses `translateBatch` function from LanguageContext
   - Reduces API calls and improves performance

3. **Loading State**
   - `useAppTranslation` hook provides `isLoading` state
   - Can show loading indicator while translations load
   - Translations load in background, UI remains responsive

## Troubleshooting

### Issue: Translation keys visible instead of translated text

**Cause:** Translation key path is incorrect

**Solution:** Check that the key exists in `/src/lib/translation-keys.ts` and the path is correct

Example:
- ❌ `t('dashboard.titl')` (typo)
- ✅ `t('dashboard.title')`

### Issue: Some text not translating

**Cause:** Hardcoded string not wrapped in `t()` function

**Solution:** Find all hardcoded strings and wrap them with `t()`

### Issue: Translations not loading

**Cause:** Google Translation API error or network issue

**Solution:** Check browser console for errors, verify Edge Function is deployed

### Issue: Language not persisting after logout

**Cause:** Language preference not saved to database

**Solution:** Verify `language_preference` column exists in `profiles` table and `setLanguage` function updates it

## Next Steps

1. **Update All Pages**
   - Follow the implementation pattern above for each page
   - Test each page after updating

2. **Update Toast Messages**
   - Find all `toast.success()`, `toast.error()`, `toast.warning()` calls
   - Wrap messages with `t()` function

3. **Add Dynamic Content Translation**
   - Identify user-generated content (room names, booking purposes)
   - Use `tDynamic()` function to translate them

4. **Test Thoroughly**
   - Test all pages in all 10 supported languages
   - Verify RTL for Arabic
   - Verify language persistence
   - Verify all features work in all languages

5. **Run Lint**
   - `cd /workspace/app-b5rmjd5bhh4x && npm run lint`
   - Fix any TypeScript or ESLint errors

## Summary

The translation infrastructure is complete and ready to use. The `useAppTranslation` hook provides a simple `t()` function that can be used throughout the application. All UI strings are centralized in `/src/lib/translation-keys.ts` and are translated via real Google Text Translation API calls (not hardcoded translations).

The implementation is straightforward:
1. Import `useAppTranslation` hook
2. Use `t('key.path')` for all UI strings
3. Use `tDynamic(text)` for user-generated content
4. Test in all languages

Once all pages are updated, the entire application will support full multilingual functionality with instant language switching, database persistence, and RTL support for Arabic.
