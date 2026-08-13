# LLM Chatbot Error Fix - Documentation

## Issue Description

After implementing the Google Text Translation integration, the LLM chatbot started showing error messages:
```
Sorry, I encountered an error. Please try again.
```

This error appeared for every user message sent to the chatbot, making the AI assistant completely non-functional.

## Root Cause Analysis

The issue was in the `chat-assistant` Edge Function at `/supabase/functions/chat-assistant/index.ts`.

### The Problem

The Edge Function was attempting to fetch user data from two separate tables:

```typescript
// BEFORE (BROKEN CODE):
const [resourcesResult, userActiveBookingsResult, userPastBookingsResult, allBookingsResult, userResult, profileResult] = await Promise.all([
  // ... other queries ...
  
  // Trying to query auth.users table (Supabase Auth internal table)
  supabaseClient.from('users').select('*').eq('id', userId).single(),
  
  // Trying to query profiles table for language preference
  supabaseClient.from('profiles').select('language_preference').eq('id', userId).single(),
]);

const currentUser = userResult.data;  // ❌ This was null/undefined
const userLanguage = profileResult.data?.language_preference || 'en';
```

**Why it failed:**

1. The `users` table reference was pointing to `auth.users` (Supabase's internal authentication table)
2. The `auth.users` table does NOT have `name` or `role` fields
3. The application uses a custom `profiles` table that contains user data (name, email, role, language_preference)
4. The query to `auth.users` was failing or returning incomplete data
5. The Edge Function then tried to access `currentUser?.name` and `currentUser?.role` which were undefined
6. This caused the Edge Function to crash with an error

### Database Schema

**auth.users table** (Supabase internal):
- Contains: id, email, encrypted_password, email_confirmed_at, etc.
- Does NOT contain: name, role (custom fields)

**profiles table** (Application custom table):
- Contains: id, email, name, role, created_at, language_preference
- This is where the application stores user profile data

## The Fix

Consolidated the user data fetching to use only the `profiles` table, which contains all the necessary information:

```typescript
// AFTER (FIXED CODE):
const [resourcesResult, userActiveBookingsResult, userPastBookingsResult, allBookingsResult, profileResult] = await Promise.all([
  // ... other queries ...
  
  // All bookings with user info from profiles table
  supabaseClient
    .from('bookings')
    .select('*, resource:resources(*), user:profiles!bookings_user_id_fkey(name, role)')
    .in('status', ['pending', 'approved'])
    .order('start_time', { ascending: true }),
  
  // Current user info and language preference from profiles table (single query)
  supabaseClient.from('profiles').select('*').eq('id', userId).single(),
]);

const currentUser = profileResult.data;  // ✅ Now contains name, role, language_preference
const userLanguage = profileResult.data?.language_preference || 'en';  // ✅ Works correctly
```

### Changes Made

1. **Removed duplicate query**: Eliminated the separate `users` table query
2. **Consolidated data fetching**: Now fetching all user data (name, role, language_preference) from `profiles` table in a single query
3. **Fixed foreign key reference**: Updated the `allBookings` query to use `user:profiles!bookings_user_id_fkey(name, role)` instead of `user:users(*)`
4. **Reduced Promise.all array**: From 6 queries to 5 queries (more efficient)

## Testing

### Before Fix
- ❌ User sends "hi" → Bot responds with error
- ❌ User sends booking request → Bot responds with error
- ❌ All chatbot functionality broken

### After Fix
- ✅ User sends "hi" → Bot responds in selected language
- ✅ User sends booking request → Bot processes and responds correctly
- ✅ Bot responds in user's preferred language (from language_preference field)
- ✅ All chatbot functionality restored

## Impact

**Fixed:**
- LLM chatbot now works correctly
- User language preference is properly detected
- Bot responds in the correct language (English, Hindi, Bengali, etc.)
- Booking commands work as expected
- User data is correctly fetched and displayed in system prompt

**Performance:**
- Reduced from 6 parallel queries to 5 queries
- Eliminated unnecessary query to auth.users table
- More efficient data fetching

## Related Files

- `/supabase/functions/chat-assistant/index.ts` - Edge Function (fixed)
- `/src/components/ai/ChatWidget.tsx` - Frontend component (no changes needed)
- Database tables: `profiles`, `bookings`, `resources`

## Deployment

The fixed Edge Function has been deployed successfully:
```bash
supabase_deploy_edge_function(name='chat-assistant', pluginIds=['b17b019e-e71c-457f-93ef-619824a3e6db'])
```

## Prevention

To prevent similar issues in the future:

1. **Always use the `profiles` table** for user data (name, role, email, language_preference)
2. **Never query `auth.users` directly** - it's Supabase's internal table
3. **Use foreign key relationships** properly: `user:profiles!bookings_user_id_fkey(name, role)`
4. **Test Edge Functions** after any database schema changes
5. **Check Supabase logs** when Edge Functions fail

## Verification Steps

To verify the fix is working:

1. Open the application
2. Click the chat widget button (bottom-right corner)
3. Send a message: "hi"
4. Verify bot responds without error
5. Send a booking request: "book room 15 for meeting tomorrow at 2pm"
6. Verify bot processes the request correctly
7. Change language preference to Bengali
8. Send another message
9. Verify bot responds in Bengali

## Conclusion

The issue was caused by attempting to query the wrong table (`auth.users` instead of `profiles`) for user data. By consolidating all user data fetching to use the `profiles` table, the Edge Function now works correctly and the chatbot is fully functional again.

The fix also improved performance by reducing the number of parallel queries from 6 to 5, making the chatbot more efficient.
