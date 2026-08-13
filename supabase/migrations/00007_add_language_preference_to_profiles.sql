-- Add language_preference column to profiles table
ALTER TABLE profiles
ADD COLUMN language_preference text DEFAULT 'en' NOT NULL
CHECK (language_preference IN ('en', 'hi', 'bn', 'ta', 'es', 'fr', 'ar', 'zh', 'ja', 'de'));

-- Add comment
COMMENT ON COLUMN profiles.language_preference IS 'User preferred language for UI and notifications';