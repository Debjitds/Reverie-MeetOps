# Authentication Flow - Quick Reference Guide

## Overview

MeetOps uses Supabase Authentication with session-based state management. Sessions persist across browser restarts using HTTP-only cookies.

---

## User Behavior Summary

### ✅ Logged-In User
- Accessing `/` → **Shows landing page (session preserved)**
- Accessing `/dashboard` → **Granted access immediately**
- Closing browser → **Session persists**
- Reopening browser → **Still logged in, no re-authentication needed**
- Clicking MeetOps logo → **Navigates to landing page, stays logged in**

### ❌ Logged-Out User
- Accessing `/` → **Shows landing page**
- Accessing `/dashboard` → **Redirected to `/login`**
- Must enter credentials to access protected areas

---

## Key Components

### 1. AuthContext (`/src/contexts/AuthContext.tsx`)
**Purpose**: Global authentication state management

**Provides**:
- `user`: Current authenticated user
- `profile`: User profile data
- `loading`: Initial auth check status
- `signInWithUsername()`: Login function
- `signOut()`: Logout function

### 2. RouteGuard (`/src/components/common/RouteGuard.tsx`)
**Purpose**: Protect routes from unauthorized access

**Logic**:
```
IF user is NOT logged in AND route is protected
  → Redirect to /login
ELSE
  → Allow access
```

### 3. LandingPage (`/src/pages/LandingPage.tsx`)
**Purpose**: Public homepage accessible to all users

**Logic**:
```
Landing page displays for all users
- Logged-in users: Can view landing page while maintaining session
- Logged-out users: Can view landing page and access login/register
```

---

## Authentication Flow

### Login Flow
```
1. User enters credentials on /login
2. signInWithUsername() called
3. Supabase validates credentials
4. Session created → HTTP-only cookies set
5. User redirected to /dashboard
```

### Logout Flow
```
1. User clicks logout button
2. signOut() called
3. Supabase invalidates session
4. HTTP-only cookies deleted
5. User redirected to /login
```

### Session Restoration (Browser Restart)
```
1. User opens browser
2. AuthContext calls getSession()
3. Supabase reads HTTP-only cookies
4. Valid session found → user state restored
5. User automatically logged in
```

---

## Route Configuration

### Public Routes (No Login Required)
- `/` - Landing page
- `/login` - Login page
- `/register` - Registration page
- `/reset-password` - Password reset

### Protected Routes (Login Required)
- `/dashboard` - Main dashboard
- `/bookings` - Bookings list
- `/bookings/new` - Create booking
- `/bookings/:id` - Booking details
- `/calendar` - Calendar view
- `/resources` - Resources management (admin only)
- `/users` - User management (admin only)

---

## Security Features

✅ **HTTP-Only Cookies**: Tokens not accessible via JavaScript  
✅ **HTTPS Enforcement**: All requests over secure connection  
✅ **CSRF Protection**: SameSite cookie attribute  
✅ **XSS Protection**: React automatic escaping  
✅ **Automatic Token Refresh**: Seamless session extension  
✅ **Session Invalidation**: Complete cleanup on logout

---

## Testing Scenarios

### Test 1: Login and Persistence
```
1. Navigate to /login
2. Enter valid credentials
3. Verify redirect to /dashboard
4. Close browser completely
5. Reopen browser and navigate to /
6. ✅ Should show landing page with user still logged in
7. Navigate to /dashboard
8. ✅ Should access dashboard without re-login
```

### Test 2: Logout
```
1. Login as any user
2. Navigate to /dashboard
3. Click logout button
4. ✅ Should redirect to /login
5. Try to access /dashboard directly
6. ✅ Should redirect to /login (access denied)
```

### Test 3: Protected Route Access
```
1. Ensure logged out
2. Navigate directly to /dashboard
3. ✅ Should redirect to /login
4. Login successfully
5. ✅ Should redirect back to /dashboard
```

### Test 4: MeetOps Logo Navigation
```
1. Login as any user
2. Navigate to /dashboard
3. Click "MEETOPS" logo in sidebar
4. ✅ Should navigate to / (landing page)
5. ✅ Should remain logged in (no logout)
6. Click any dashboard link
7. ✅ Should access dashboard without re-login
```

---

## Common Issues & Solutions

### Issue: User Not Staying Logged In
**Cause**: Browser blocking cookies  
**Solution**: Check browser cookie settings, ensure third-party cookies allowed for Supabase domain

### Issue: Infinite Redirect Loop
**Cause**: Conflicting redirect logic  
**Solution**: Verify LandingPage only redirects when `user !== null` and RouteGuard waits for `loading === false`

### Issue: Session Expires Too Quickly
**Cause**: Default token expiry  
**Solution**: Configure longer refresh token expiry in Supabase dashboard (default: 30 days)

---

## Environment Setup

### Required Environment Variables
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Supabase Configuration
- JWT expiry: 3600 seconds (1 hour)
- Refresh token expiry: 2592000 seconds (30 days)
- Auto refresh: Enabled
- Persist session: Enabled

---

## Code Snippets

### Check if User is Logged In
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, profile } = useAuth();
  
  if (!user) {
    return <div>Please log in</div>;
  }
  
  return <div>Welcome, {profile?.name}!</div>;
}
```

### Protect a Component
```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function ProtectedComponent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return null;
  
  return <div>Protected content</div>;
}
```

### Manual Logout
```typescript
import { useAuth } from '@/contexts/AuthContext';

function LogoutButton() {
  const { signOut } = useAuth();
  
  const handleLogout = async () => {
    await signOut();
    // User will be automatically redirected to /login by RouteGuard
  };
  
  return <button onClick={handleLogout}>Logout</button>;
}
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     User Browser                         │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │           React Application                     │    │
│  │                                                 │    │
│  │  ┌──────────────┐      ┌──────────────┐       │    │
│  │  │ AuthContext  │◄────►│ RouteGuard   │       │    │
│  │  └──────────────┘      └──────────────┘       │    │
│  │         │                      │               │    │
│  │         │                      │               │    │
│  │         ▼                      ▼               │    │
│  │  ┌──────────────┐      ┌──────────────┐       │    │
│  │  │ LandingPage  │      │ LoginPage    │       │    │
│  │  └──────────────┘      └──────────────┘       │    │
│  │                                                 │    │
│  └─────────────────────────────────────────────────┘    │
│                          │                               │
│                          │ HTTPS                         │
│                          ▼                               │
│  ┌─────────────────────────────────────────────────┐    │
│  │         HTTP-Only Cookies                        │    │
│  │  • sb-auth-token                                 │    │
│  │  • sb-auth-token-code-verifier                   │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────────┐
│                  Supabase Backend                        │
│                                                          │
│  ┌──────────────┐      ┌──────────────┐                │
│  │ Auth Service │      │ Database     │                │
│  │ • Sessions   │      │ • Profiles   │                │
│  │ • Tokens     │      │ • Users      │                │
│  └──────────────┘      └──────────────┘                │
└─────────────────────────────────────────────────────────┘
```

---

## Quick Checklist

### Before Deployment
- [ ] Environment variables configured
- [ ] HTTPS enabled
- [ ] Supabase auth settings verified
- [ ] Public routes configured correctly
- [ ] Protected routes tested
- [ ] Logout functionality tested
- [ ] Session persistence tested

### After Deployment
- [ ] Test login with valid credentials
- [ ] Test login with invalid credentials
- [ ] Test logout functionality
- [ ] Test session persistence (browser restart)
- [ ] Test protected route access (logged out)
- [ ] Test protected route access (logged in)
- [ ] Verify cookies are HTTP-only
- [ ] Verify HTTPS enforcement

---

## Support & Documentation

- **Full Specification**: See `AUTHENTICATION_FLOW_SPECIFICATION.md`
- **Supabase Docs**: https://supabase.com/docs/guides/auth
- **React Router Docs**: https://reactrouter.com/

---

**Last Updated**: 2026-04-23  
**Version**: 1.0
