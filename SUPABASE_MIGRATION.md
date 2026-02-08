# 🎯 SUPABASE MIGRATION GUIDE

## ✅ What's Done:

1. **Removed Prisma ORM** - No more connection issues!
2. **Using Supabase Client directly** - Simpler, faster
3. **All API routes updated** - Routes, Locations, Gallery
4.**Database schema ready** - PostgreSQL tables

---

## 🚀 SETUP STEPS:

### 1. Run SQL in Supabase

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Open your project: `pro-driver`
3. Go to **SQL Editor** (left sidebar)
4. Copy content from [supabase-schema.sql](./supabase-schema.sql)
5. Paste and click **"RUN"**

✅ Ini akan create semua tables: routes, locations, delivery_schedules, gallery_rows, gallery_images, users

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Dev Server

```bash
npm run dev
```

### 4. Test APIs

Open browser:
- http://localhost:3000/api/routes?region=selangor
- http://localhost:3000/api/locations
- http://localhost:3000/api/gallery/rows

### 5. Deploy to Vercel

Make sure these environment variables are set in **Vercel Dashboard**:

```bash
DATABASE_URL=postgres://postgres.ciwipgivmiccstndleqv:ukwkjaH95CMWsywc@aws-1-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&sslmode=require

DIRECT_URL=postgres://postgres.ciwipgivmiccstndleqv:ukwkjaH95CMWsywc@db.ciwipgivmiccstndleqv.supabase.co:5432/postgres?sslmode=require

NEXT_PUBLIC_SUPABASE_URL=https://ciwipgivmiccstndleqv.supabase.co

NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpd2lwZ2l2bWljY3N0bmRsZXF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1MTE0NzYsImV4cCI6MjA4NjA4NzQ3Nn0.jKNOC4SFxen7EzphrPpdBUKL59Hb24mYJBvAMpUAlyA
```

Then push:
```bash
git add .
git commit -m "refactor: migrate from Prisma to Supabase client"
git push
```

---

## 📁 Files Changed:

✅ **lib/supabase.ts** - Supabase client
✅ **lib/supabase-db.ts** - All database operations
✅ **supabase-schema.sql** - Database schema
✅ **app/api/**/route.ts** - Updated to use Supabase
✅ **package.json** - Removed Prisma scripts
✅ **.env** - Supabase URLs

## 🗑️ Files to Delete (Optional):

You can delete these Prisma files if you want:
- `prisma/` folder
- `lib/prisma.ts`
- `lib/prisma-db.ts`
- `lib/database.ts` (if exists)

Or run:
```bash
rm -rf prisma
rm lib/prisma.ts lib/prisma-db.ts
npm uninstall @prisma/client prisma
```

---

## 🎉 Benefits:

- ✅ **No more connection errors!**
- ✅ **Works perfectly with Vercel serverless**
- ✅ **Built-in connection pooling**
- ✅ **Simpler code**
- ✅ **Free tier: 500MB database**

---

## 🔧 Database Operations:

Check tables dalam Supabase:
1. Go to **Table Editor** in Supabase Dashboard
2. You'll see: routes, locations, delivery_schedules, gallery_rows, gallery_images, users

Add sample data:
1. Go to Table Editor
2. Click table (e.g., "routes")
3. Click **"Insert row"**
4. Fill data and save

---

## Need Help?

Semua database operations ada dalam `lib/supabase-db.ts`:
- getRoutesByRegion()
- createRoute()
- updateRoute()
- deleteRoute()
- createLocation()
- getGalleryRows()
- etc.

Just import from `@/lib/supabase-db`!
