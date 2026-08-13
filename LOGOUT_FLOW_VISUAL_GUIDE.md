# Logout Flow - Visual Guide

## User Experience Flow

### Scenario 1: Successful Logout

```
┌─────────────────────────────────────────────────────────────────┐
│                    BEFORE LOGOUT                                 │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  SIDEBAR              │  DASHBOARD PAGE                       │
│                       │                                        │
│  [MEETOPS]            │  Welcome to Dashboard                 │
│                       │                                        │
│  • DASHBOARD          │  Your bookings: 5                     │
│  • BOOKINGS           │  Pending approvals: 2                 │
│  • CALENDAR           │                                        │
│  • RESOURCES          │  [Recent Activity...]                 │
│                       │                                        │
│  ─────────────────    │                                        │
│  John Doe             │  [John Doe] [Admin] [🚪 Logout] ◄──┐ │
│  Admin                │                                      │ │
└──────────────────────────────────────────────────────────────┼─┘
                                                                │
User Status: ✅ LOGGED IN                                       │
Session: ✅ ACTIVE                                              │
URL: /dashboard                                                 │
                                                                │
                                                                │
                                    USER CLICKS LOGOUT BUTTON ──┘
                                                ↓
                                                ↓
                                                ↓


┌─────────────────────────────────────────────────────────────────┐
│                  CONFIRMATION DIALOG APPEARS                     │
└─────────────────────────────────────────────────────────────────┘

                    ┌────────────────────────────┐
                    │  ╔══════════════════════╗  │
                    │  ║  CONFIRM LOGOUT      ║  │
                    │  ╚══════════════════════╝  │
                    │                            │
                    │  Are you sure you want to  │
                    │  log out? You will need to │
                    │  sign in again to access   │
                    │  your dashboard and        │
                    │  bookings.                 │
                    │                            │
                    │  ┌────────┐  ┌──────────┐ │
                    │  │ CANCEL │  │  LOGOUT  │ │
                    │  └────────┘  └──────────┘ │
                    └────────────────────────────┘

                            ↓           ↓
                            ↓           ↓
                    USER CLICKS         USER CLICKS
                    "CANCEL"            "LOGOUT"
                            ↓           ↓
                            ↓           ↓
                            ↓           └──────────────────────┐
                            ↓                                  ↓
                            ↓                                  ↓
                            ↓                                  ↓
                            ↓                       ┌──────────────────────┐
                            ↓                       │  Dialog closes       │
                            ↓                       │  signOut() called    │
                            ↓                       │  Session invalidated │
                            ↓                       │  navigate('/')       │
                            ↓                       └──────────────────────┘
                            ↓                                  ↓
                            ↓                                  ↓
                            ↓                                  ↓
                            ↓
                            ↓
                    ┌───────────────────┐
                    │  Dialog closes    │
                    │  No logout        │
                    │  User remains on  │
                    │  dashboard        │
                    └───────────────────┘
                            ↓
                            ↓
                    ┌───────────────────┐
                    │  User still       │
                    │  logged in        │
                    └───────────────────┘


                                                ↓
                                                ↓
                                                ↓
                                    AFTER LOGOUT CONFIRMATION
                                                ↓
                                                ↓
                                                ↓


┌─────────────────────────────────────────────────────────────────┐
│                    AFTER LOGOUT                                  │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│  NAVBAR                                                       │
│  [MEETOPS]  Features  Pricing  [Login] [Get Started]         │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│                    LANDING PAGE                               │
│                                                               │
│         🎯 Book Rooms. Eliminate Conflicts.                   │
│                                                               │
│         MeetOps gives your team a centralized platform        │
│         to book meeting rooms, manage resources, and          │
│         eliminate double bookings — all in one place.         │
│                                                               │
│         [Get Started]  [Login]                                │
│                                                               │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  Feature 1  │  │  Feature 2  │  │  Feature 3  │          │
│  │  Instant    │  │  Conflict   │  │  Approval   │          │
│  │  Booking    │  │  Detection  │  │  Workflows  │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                               │
└──────────────────────────────────────────────────────────────┘

User Status: ❌ LOGGED OUT ← CHANGED!
Session: ❌ TERMINATED ← CHANGED!
URL: / (landing page) ← CHANGED!

✅ Session cookies deleted
✅ User data cleared
✅ Landing page shows logged-out state
✅ Navbar shows "Login" + "Get Started"
✅ Hero shows generic content
```

---

## Technical Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                  TECHNICAL EXECUTION FLOW                        │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│  User clicks logout  │
│  button in header    │
└──────────────────────┘
          │
          ▼
┌──────────────────────┐
│  handleSignOut()     │
│  function called     │
└──────────────────────┘
          │
          ▼
┌──────────────────────┐
│  setLogoutDialogOpen │
│  (true)              │
└──────────────────────┘
          │
          ▼
┌──────────────────────┐
│  LogoutConfirmDialog │
│  component renders   │
└──────────────────────┘
          │
          ├─────────────────────────────────────────┐
          │                                         │
          ▼                                         ▼
┌──────────────────────┐              ┌──────────────────────┐
│  User clicks         │              │  User clicks         │
│  "Cancel" button     │              │  "Logout" button     │
└──────────────────────┘              └──────────────────────┘
          │                                         │
          ▼                                         ▼
┌──────────────────────┐              ┌──────────────────────┐
│  onOpenChange(false) │              │  onConfirm() called  │
│  called              │              │  (confirmSignOut)    │
└──────────────────────┘              └──────────────────────┘
          │                                         │
          ▼                                         ▼
┌──────────────────────┐              ┌──────────────────────┐
│  Dialog closes       │              │  try {               │
│  No logout           │              │    await signOut()   │
│  User remains        │              │  }                   │
│  logged in           │              └──────────────────────┘
└──────────────────────┘                          │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  supabase.auth       │
                                       │  .signOut()          │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  Server-side:        │
                                       │  - Invalidate token  │
                                       │  - Delete cookies    │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  Client-side:        │
                                       │  - setUser(null)     │
                                       │  - setProfile(null)  │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  Auth state change   │
                                       │  event fires         │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  setLogoutDialogOpen │
                                       │  (false)             │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  navigate('/')       │
                                       │  { replace: true }   │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  React Router        │
                                       │  changes URL to /    │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  LandingPage         │
                                       │  component loads     │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  useAuth() returns   │
                                       │  user = null         │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  Conditional render  │
                                       │  shows logged-out    │
                                       │  content             │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  RouteGuard checks   │
                                       │  location = '/'      │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  '/' is public route │
                                       │  Allow access        │
                                       └──────────────────────┘
                                                  │
                                                  ▼
                                       ┌──────────────────────┐
                                       │  User sees landing   │
                                       │  page (logged out)   │
                                       └──────────────────────┘
```

---

## State Changes

### Before Logout

```
AuthContext:
  user: { id: "123", email: "john@example.com", ... }
  profile: { name: "John Doe", role: "admin", ... }
  loading: false

Browser:
  Cookies: sb-auth-token=xxx (HTTP-only)
  URL: /dashboard

UI:
  Navbar: "John Doe" + "Admin" + Logout button
  Page: Dashboard content
```

### During Logout

```
AuthContext:
  user: null ← CHANGED
  profile: null ← CHANGED
  loading: false

Browser:
  Cookies: (being deleted)
  URL: /dashboard → / (changing)

UI:
  Dialog: Confirmation dialog visible
  Page: Dashboard content (still visible behind dialog)
```

### After Logout

```
AuthContext:
  user: null
  profile: null
  loading: false

Browser:
  Cookies: (deleted) ← CHANGED
  URL: / ← CHANGED

UI:
  Navbar: "Login" + "Get Started" ← CHANGED
  Page: Landing page (logged-out state) ← CHANGED
```

---

## Comparison: Login Page vs Landing Page Redirect

### ❌ BAD: Redirect to Login Page

```
User on Dashboard
    ↓
Clicks logout
    ↓
Session invalidated
    ↓
RouteGuard detects user = null
    ↓
Redirects to /login
    ↓
❌ User sees login form
❌ Confusing UX (just logged out, why login page?)
❌ Feels like an error occurred
```

### ✅ GOOD: Redirect to Landing Page

```
User on Dashboard
    ↓
Clicks logout
    ↓
Confirmation dialog
    ↓
User confirms
    ↓
Session invalidated
    ↓
Explicit navigate('/')
    ↓
✅ User sees landing page
✅ Clear UX (logged out, see public content)
✅ Can explore features or login again
✅ Feels intentional and complete
```

---

## Error Handling Flow

### Network Error During Logout

```
User confirms logout
    ↓
try {
  await signOut() ← Network error!
}
    ↓
catch (error) {
  console.error('Logout error:', error)
  setLogoutDialogOpen(false)
  navigate('/', { replace: true }) ← Still redirect!
}
    ↓
User on landing page
    ↓
✅ Graceful handling
✅ User not stuck
✅ Can try again if needed
```

---

## Browser Back Button Behavior

### Without `replace: true` (BAD)

```
History Stack:
1. /dashboard (before logout)
2. / (after logout)

User clicks back button:
/ → /dashboard ← ❌ Tries to access protected page
    ↓
RouteGuard redirects to /login
    ↓
❌ Confusing UX
```

### With `replace: true` (GOOD)

```
History Stack:
1. / (replaces /dashboard)

User clicks back button:
/ → (previous page before dashboard)
    ↓
✅ Cannot return to dashboard
✅ Clean navigation
```

---

## Mobile vs Desktop Experience

### Desktop

```
┌────────────────────────────────────────────┐
│  MEETOPS    Dashboard  Bookings  Calendar  │
│                                             │
│                    [John Doe] [Admin] [🚪] │◄─ Click here
└────────────────────────────────────────────┘
                        ↓
            ┌───────────────────────┐
            │  CONFIRM LOGOUT       │
            │                       │
            │  Are you sure...?     │
            │                       │
            │  [CANCEL]  [LOGOUT]   │
            └───────────────────────┘
```

### Mobile

```
┌────────────────────────────────┐
│  MEETOPS              [☰]      │◄─ Click hamburger
└────────────────────────────────┘
                ↓
┌────────────────────────────────┐
│  [MEETOPS]                     │
│                                │
│  • Dashboard                   │
│  • Bookings                    │
│  • Calendar                    │
│  • Resources                   │
│  • Users                       │
│                                │
│  ─────────────────             │
│  John Doe                      │
│  Admin                         │
│  [🚪 Logout]                   │◄─ Click here
└────────────────────────────────┘
                ↓
    ┌───────────────────────┐
    │  CONFIRM LOGOUT       │
    │                       │
    │  Are you sure...?     │
    │                       │
    │  [CANCEL]             │
    │  [LOGOUT]             │
    └───────────────────────┘
```

---

## Summary

✅ **Clear Confirmation**: Dialog prevents accidental logouts
✅ **Secure Process**: Complete session invalidation
✅ **Landing Page Redirect**: User sees public homepage, not login form
✅ **Error Handling**: Graceful handling with guaranteed redirect
✅ **Clean Navigation**: Back button doesn't return to protected pages
✅ **Consistent UX**: Works same on desktop and mobile

**Key Insight**: Explicit `navigate('/')` ensures user lands on landing page, not login page.

---

**Last Updated**: 2026-04-23
