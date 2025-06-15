-- =============================================================
-- RepeatHarmony Authentication & Profile Management Setup
-- =============================================================

-- 1. Cleanup: Remove any existing profile-related objects to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- 2. Create the profiles table: Stores user profile data with proper constraints
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,                  -- User's email, must be unique
  name TEXT NOT NULL,                   -- User's display name
  initials TEXT NOT NULL,               -- User's initials for avatars, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),   -- Record creation time
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),   -- Last update time
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_email_key UNIQUE (email)
);

-- 3. Enable Row Level Security (RLS) for fine-grained access control
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Define RLS policies: Restrict access so users can only manage their own profiles
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id) 
WITH CHECK (auth.uid() = id);

-- 5. Create a function to automatically handle new user registration
--    Extracts name from metadata or email, generates initials, and creates a profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_name TEXT;
  user_initials TEXT;
BEGIN
  -- Extract name from metadata or use email username
  user_name := COALESCE(
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'full_name',
    split_part(NEW.email, '@', 1)
  );
  
  -- Generate initials from the name
  user_initials := UPPER(LEFT(user_name, 2));
  
  -- Insert the new profile
  INSERT INTO public.profiles (id, email, name, initials, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    user_name,
    user_initials,
    NOW(),
    NOW()
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but do not fail user creation
    RAISE LOG 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Create a trigger to automatically call handle_new_user after user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 7. Create a function to update the profile timestamp on any change
CREATE OR REPLACE FUNCTION public.handle_profile_updated()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Create a trigger to update the timestamp whenever a profile is modified
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_profile_updated();

-- 9. Verification block: Checks if setup was successful
--    Reports status of table, trigger, and RLS policies
DO $$
DECLARE
  table_exists BOOLEAN;
  trigger_exists BOOLEAN;
  policies_count INTEGER;
BEGIN
  -- Check if table exists
  SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles'
  ) INTO table_exists;
  
  -- Check if trigger exists
  SELECT EXISTS (
    SELECT FROM information_schema.triggers 
    WHERE trigger_name = 'on_auth_user_created'
  ) INTO trigger_exists;
  
  -- Count policies
  SELECT COUNT(*) FROM pg_policies 
  WHERE tablename = 'profiles' 
  INTO policies_count;
  
  -- Report results
  RAISE NOTICE '=== SETUP VERIFICATION ===';
  RAISE NOTICE 'Table created: %', CASE WHEN table_exists THEN '✅ YES' ELSE '❌ NO' END;
  RAISE NOTICE 'Trigger created: %', CASE WHEN trigger_exists THEN '✅ YES' ELSE '❌ NO' END;
  RAISE NOTICE 'Policies created: % policies', policies_count;
  
  IF table_exists AND trigger_exists AND policies_count >= 3 THEN
    RAISE NOTICE '🎉 SUCCESS: RepeatHarmony authentication setup completed!';
    RAISE NOTICE 'You can now test user registration and login.';
  ELSE
    RAISE NOTICE '❌ SETUP INCOMPLETE: Please check the errors above.';
  END IF;
END $$;

-- 10. Final success message
SELECT 
  '🎉 Database setup complete! Test authentication now.' as status,
  'Check Table Editor > profiles to see the new table' as next_step;
