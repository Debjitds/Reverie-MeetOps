# Logout Flow - Quick Reference

## Overview

Secure logout with confirmation dialog that redirects to landing page (not login page).

---

## Key Components

### 1. LogoutConfirmDialog
**File**: `/src/components/common/LogoutConfirmDialog.tsx`

**Usage**:
```typescript
<LogoutConfirmDialog
  open={logoutDialogOpen}
  onOpenChange={setLogoutDialogOpen}
  onConfirm={confirmSignOut}
/>
```

### 2. AppHeader Logout Logic
**File**: `/src/components/layouts/AppHeader.tsx`

**State**:
```typescript
const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
const navigate = useNavigate();
```

**Handlers**:
```typescript
// Open confirmation dialog
const handleSignOut = async () => {
  setLogoutDialogOpen(true);
};

// Execute logout and redirect
const confirmSignOut = async () => {
  try {
    await signOut();
    setLogoutDialogOpen(false);
    navigate('/', { replace: true }); // ← CRITICAL: Redirect to landing page
  } catch (error) {
    console.error('Logout error:', error);
    setLogoutDialogOpen(false);
    navigate('/', { replace: true }); // ← Even on error, redirect
  }
};
```

---

## Flow Diagram

```
User clicks logout → Dialog opens → User confirms
    ↓
navigate('/') → Navigate to landing page FIRST
    ↓
100ms delay → Ensure navigation completes
    ↓
signOut() → Session invalidated
    ↓
Landing page shows logged-out state
```

---

## Critical Implementation Points

### ✅ DO

1. **Navigate FIRST, then sign out**
   - `navigate('/')` before `signOut()`
   - Prevents RouteGuard from redirecting to login

2. **Add 100ms delay**
   - Ensures navigation completes before auth state changes
   - `await new Promise(resolve => setTimeout(resolve, 100))`

3. **Handle errors gracefully**
   - Still redirect even on error
   - Log error to console

4. **Close dialog before navigation**
   - `setLogoutDialogOpen(false)`
   - Clean UI state

### ❌ DON'T

1. **Don't sign out before navigating**
   - Will cause redirect to login page
   - RouteGuard will intercept

2. **Don't skip the 100ms delay**
   - Race condition may occur
   - Navigation may not complete in time

3. **Don't forget `replace: true`**
   - Without it, back button returns to protected page

4. **Don't skip error handling**
   - Always redirect, even on error

---

## Testing Quick Checks

### Basic Flow
```
1. Click logout button → Dialog appears ✓
2. Click "Logout" → Redirect to / ✓
3. Landing page shows logged-out state ✓
4. Navbar shows "Login" + "Get Started" ✓
```

### Cancel Flow
```
1. Click logout button → Dialog appears ✓
2. Click "Cancel" → Dialog closes ✓
3. User remains logged in ✓
4. No navigation occurs ✓
```

### Session Check
```
1. Before logout → Auth cookie present ✓
2. After logout → Auth cookie deleted ✓
3. Try to access /dashboard → Redirect to /login ✓
```

---

## Code Snippets

### Import Dialog Component
```typescript
import { LogoutConfirmDialog } from '@/components/common/LogoutConfirmDialog';
```

### Add State
```typescript
const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
const navigate = useNavigate();
```

### Create Handlers
```typescript
const handleSignOut = async () => {
  setLogoutDialogOpen(true);
};

const confirmSignOut = async () => {
  try {
    // CRITICAL: Navigate FIRST, before signing out
    navigate('/', { replace: true });
    await new Promise(resolve => setTimeout(resolve, 100));
    await signOut();
    setLogoutDialogOpen(false);
  } catch (error) {
    console.error('Logout error:', error);
    setLogoutDialogOpen(false);
    navigate('/', { replace: true });
  }
};
```

### Render Dialog
```typescript
<LogoutConfirmDialog
  open={logoutDialogOpen}
  onOpenChange={setLogoutDialogOpen}
  onConfirm={confirmSignOut}
/>
```

---

## Why Landing Page, Not Login Page?

**Problem**: If we sign out first, RouteGuard redirects to `/login`.

**Solution**: Navigate to `/` BEFORE signing out.

**Why It Works**:
1. Navigate to `/` first → User on public route
2. 100ms delay → Navigation completes
3. Sign out → Auth state changes to null
4. RouteGuard checks → User on public route (`/`)
5. RouteGuard allows access → No redirect to login
6. User stays on landing page ✅

**Key Insight**: Order matters! Navigate first, then sign out.

---

## Troubleshooting

### Still redirects to login page?
- Check navigation happens BEFORE signOut()
- Verify 100ms delay is present
- Check `/` is in `PUBLIC_ROUTES`
- Check for errors in console

### Logout takes too long?
- 100ms delay is intentional
- Total time should be ~300ms
- Check network speed for signOut() call

### Dialog doesn't appear?
- Check `logoutDialogOpen` state
- Verify dialog is rendered
- Check CSS/styling

### Back button returns to dashboard?
- Add `{ replace: true }` to navigate
- Verify replace option is present

---

## Summary

✅ Confirmation dialog prevents accidental logouts  
✅ Secure session invalidation (server + client)  
✅ Explicit redirect to landing page (not login)  
✅ Error handling with guaranteed redirect  
✅ Clean UI state updates  

**Key Line**:
```typescript
// Navigate FIRST, then sign out (order matters!)
navigate('/', { replace: true });
await new Promise(resolve => setTimeout(resolve, 100));
await signOut();
```

---

**Last Updated**: 2026-04-23
