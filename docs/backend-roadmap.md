# Unfleur Backend Roadmap

This is the step-by-step path from the current static local-storage app to a hosted app with accounts, database storage, and safe account deletion.

## Current State

Unfleur currently stores everything in the browser under `localStorage` key `unfleur-state`.

That includes:

- profile name, email, purpose, notifications, language
- journal entries and selected Moodlets
- Bloomy pot/progress/mock-admin state
- onboarding/registration flags

This works for a prototype, but notes stay on one device and can disappear if browser storage is cleared.

## Step 1: Backend Foundation

Status: started.

What this step adds:

- `.env.example` for future secret/config values
- `database/schema.sql` for the first Postgres data model
- `.gitignore` protection for local secret files

Why:

This lets us plan the backend without changing the working UI yet.

## Step 2: Create Services

Selected setup:

- Hosting: Vercel
- Database: Supabase Postgres
- Auth: Supabase Auth

What it is for:

- Vercel hosts the app and backend routes.
- Supabase stores user notes/profile/Bloomy data.
- Supabase Auth handles signup, login, logout, password reset, and user identity.

What we need from the service dashboards:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

These values go into `.env.local`, never into Git.

## Step 3: Add App Framework

Target: Next.js.

What it is for:

Next.js lets Unfleur keep a browser UI while also adding server routes for private operations such as account deletion. Normal user data can be read and written from the browser through Supabase because Row Level Security protects each user's rows.

Practical migration approach:

1. Add a Next.js project shell.
2. Keep the current UI working.
3. Move backend-sensitive logic into API routes.
4. Gradually migrate the UI from static DOM code to components only when needed.

## Step 4: Add Auth

What it is for:

Auth tells Supabase which user is making a request, so each person only sees their own private journal data.

Required flows:

- create account
- log in
- log out
- protect API routes
- delete account

## Step 5: Add Database API

Initial data areas:

- `profiles`
- `journal_entries`
- `entry_moodlets`
- `bloomy_states`
- `local_imports`

What it is for:

These tables replace direct local-storage persistence with database persistence. Supabase policies keep each user's rows private.

## Step 6: Import Local Notes

What it is for:

Existing local notes should not vanish when users log in.

Proposed flow:

1. User logs in.
2. App checks for `localStorage.unfleur-state`.
3. If local entries exist, ask whether to import them.
4. Backend inserts imported notes and records the import in `local_imports`.

## Step 7: Account Deletion

What it is for:

Unfleur contains private journal data, so deletion should be trustworthy.

Recommended behavior:

- Hard-delete the Supabase Auth user.
- Cascading database rules delete profile, entries, moodlets, Bloomy state, settings, and import history.
- Add a private server route or Edge Function for the deletion action, because deleting an auth user requires privileged access.

The current schema uses `on delete cascade` for user-owned data.

## Step 8: Deploy And Verify

What it is for:

Once API and auth are added, Vercel should deploy the app and use production environment variables.

Checks:

- signup works
- login works
- notes persist after refresh
- notes appear on another browser/device after login
- delete account removes data
- mock admin mode does not affect real data
