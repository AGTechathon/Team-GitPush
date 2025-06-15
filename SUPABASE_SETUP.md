# 🔐 Supabase Authentication Setup for RepeatHarmony

Your app is currently running in **DEMO MODE** with mock authentication. To enable real user authentication with Supabase, follow these steps:

## 🚀 Quick Setup (5 minutes)

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose your organization
5. Set project name: `RepeatHarmony`
6. Set database password (save this!)
7. Choose region closest to your users
8. Click "Create new project"

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy your **Project URL** (starts with `https://`)
3. Copy your **anon/public key** (starts with `eyJ`)

### 3. Configure Environment Variables

1. Open `.env.local` in your project root
2. Uncomment and replace these lines:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Save the file

### 4. Set Up Database Table

1. In Supabase dashboard, go to **SQL Editor**
2. Run this SQL to create the profiles table:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
ON profiles FOR INSERT
WITH CHECK (auth.uid() = id);
```

### 5. Restart Your App

1. Stop your development server (Ctrl+C)
2. Restart with `npm run dev`
3. You should see "Supabase connected!" in the console

## 🎉 That's it!

Your RepeatHarmony app now has:

- ✅ Real user registration and login
- ✅ Secure password authentication
- ✅ Email verification (optional)
- ✅ Password reset functionality
- ✅ User profile management
- ✅ Session persistence

## 🔧 Optional Enhancements

### Email Authentication

To enable email verification:

1. Go to **Authentication** → **Settings**
2. Enable "Confirm email"
3. Configure email templates

### Social Logins

To add Google/GitHub login:

1. Go to **Authentication** → **Providers**
2. Enable desired providers
3. Configure OAuth credentials

### Custom Domains

For production:

1. Go to **Settings** → **Custom Domains**
2. Add your domain
3. Update environment variables

## 🆘 Troubleshooting

**"Invalid URL" Error**: Make sure your URL starts with `https://` and ends with `.supabase.co`

**"Invalid API Key" Error**: Copy the `anon` key, not the `service_role` key

**Database Errors**: Make sure you ran the SQL commands to create the profiles table

**Still in Demo Mode?**: Check that your environment variables are set correctly and restart your dev server

## 📖 Learn More

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Authentication Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

Need help? Check the browser console for detailed error messages.
