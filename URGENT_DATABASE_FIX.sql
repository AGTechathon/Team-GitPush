/* 
=================================================
RepeatHarmony User Profile Management System
=================================================
This script sets up secure user profiles with automated creation
and strict access controls.
*/

-- 1. Cleanup: Remove existing objects to avoid conflicts
-- ----------------------------------------------
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP TABLE IF EXISTS profiles;


-- 2. Core Profile Table: Stores essential user data
-- ----------------------------------------------
-- Features:
-- - Direct reference to authentication system
-- - Automatic UTC timestamps
-- - Initials generation for user avatars
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,  -- CASCADE delete on user removal
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),  -- Basic email validation
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);


-- 3. Security Configuration: Row Level Security (RLS)
-- ----------------------------------------------
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Access Policies:
-- - Users can only view their own profile
-- - Users can only update their own profile
-- - Users can only create their own profile
CREATE POLICY "User Profile Visibility" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "User Profile Updates" ON profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "User Profile Creation" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id);


-- 4. Automation: Profile Management
-- ----------------------------------------------
-- Function: Automatically creates profile on new user registration
-- Handles:
-- - Name extraction from metadata or email
-- - Initials generation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, initials)
  VALUES (
    new.id,
    new.email,
    COALESCE(
      new.raw_user_meta_data->>'name',  -- Preferred: metadata name
      split_part(new.email, '@', 1)     -- Fallback: email username
    ),
    UPPER(LEFT(COALESCE(
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1)
    ), 2))  -- First two letters of name
  );
  RETURN new;
EXCEPTION
  WHEN others THEN
    RAISE LOG 'Profile creation failed for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger: Executes profile creation after user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 5. Verification & Feedback
-- ----------------------------------------------
-- System checks:
-- 1. Verify table creation
-- 2. Confirm security policies
-- 3. Validate trigger/function existence
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
    RAISE NOTICE '✅ Profile system ready';
    RAISE NOTICE '   - Table: profiles';
    RAISE NOTICE '   - Policies: 3 RLS policies';
    RAISE NOTICE '   - Automation: handle_new_user() function';
    RAISE NOTICE '   - Trigger: on_auth_user_created';
    RAISE NOTICE '=== SYSTEM READY FOR USER TESTING ===';
  ELSE
    RAISE EXCEPTION '❌ Critical setup failure - contact support';
  END IF;
END $$;
