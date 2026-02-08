# 🚀 Supabase Setup Guide

## Why Supabase?
- ✅ Built-in connection pooling (PgBouncer)
- ✅ Works perfectly with Vercel
- ✅ Free tier: 500MB database
- ✅ Fast connection from Asia region

---

## Step 1: Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click **"New Project"**
3. Fill in:
   - **Name**: `pro-driver`
   - **Database Password**: Create strong password (SAVE THIS!)
   - **Region**: `Southeast Asia (Singapore)` - closest to Malaysia
   - **Pricing Plan**: Free
4. Click **"Create new project"** (takes ~2 minutes)

---

## Step 2: Get Connection Strings

1. In your Supabase project dashboard, go to:
   - **Settings** (gear icon) → **Database**
2. Scroll to **Connection string** section
3. Copy **2 connection strings**:

### A) Connection Pooling (for Production)
- Select: **"Connection pooling"** 
- Mode: **"Transaction"**
- Example format:
```
postgres://postgres.abcdefghij:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

### B) Direct Connection (for Migrations)
- Select: **"URI"**
- Example format:
```
postgres://postgres.abcdefghij:[YOUR-PASSWORD]@db.abcdefghij.supabase.co:5432/postgres
```

⚠️ **Replace `[YOUR-PASSWORD]` with your actual database password!**

---

## Step 3: Update Environment Variables

### Local Development (.env file)

1. Open `.env` file
2. **Replace everything** with:

```env
# Supabase Connection Pooling (for queries)
DATABASE_URL="postgres://postgres.[REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Supabase Direct Connection (for migrations)
DIRECT_URL="postgres://postgres.[REF]:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
```

3. Replace `[REF]` and `[PASSWORD]` with your actual values

### Vercel Deployment

1. Go to [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your `pro-driver` project
3. Go to **Settings** → **Environment Variables**
4. Add these 2 variables:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `DATABASE_URL` | `postgres://postgres.[REF]:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true` | Production, Preview, Development |
| `DIRECT_URL` | `postgres://postgres.[REF]:[PASSWORD]@db.[REF].supabase.co:5432/postgres` | Production, Preview, Development |

5. Click **"Save"**

---

## Step 4: Run Database Migration

In your terminal:

```bash
# Install dependencies (if needed)
npm install

# Push database schema to Supabase
npx prisma db push

# (Optional) Check migration
npx prisma studio
```

You should see:
```
✅ Your database is now in sync with your Prisma schema
```

---

## Step 5: Test Locally

```bash
# Start development server
npm run dev

# Open browser and test:
# - http://localhost:3000
# - http://localhost:3000/api/routes
# - http://localhost:3000/api/locations
```

---

## Step 6: Deploy to Vercel

```bash
# Commit changes
git add .
git commit -m "feat: migrate to Supabase"
git push origin main
```

Vercel will auto-deploy. Check your live URL!

---

## Troubleshooting

### Error: "Can't reach database server"
- ✅ Check password is correct (no special characters issue)
- ✅ Verify connection strings are complete
- ✅ Make sure Supabase project is active (not paused)

### Error: "Client has already been initialized"
- ✅ Restart dev server: `Ctrl+C` then `npm run dev`

### Error: "Invalid `prisma.route.findMany()`"
- ✅ Run: `npx prisma generate`
- ✅ Run: `npx prisma db push`

---

## Verify in Supabase Dashboard

1. Go to **Table Editor** in Supabase
2. You should see tables: `Route`, `Location`, `DeliverySchedule`, `GalleryRow`, `GalleryImage`, `User`

---

## 🎉 Done!

Your app is now using Supabase with:
- Connection pooling for production
- Direct URL for migrations
- Perfect compatibility with Vercel

---

## Quick Reference

| Purpose | Environment Variable | Port |
|---------|---------------------|------|
| Queries (Production) | `DATABASE_URL` | 6543 (pooler) |
| Migrations | `DIRECT_URL` | 5432 (direct) |
