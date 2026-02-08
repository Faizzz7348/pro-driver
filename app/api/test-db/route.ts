import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const startTime = Date.now()
  
  try {
    // Test 1: Check environment variables
    const envCheck = {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing',
      NODE_ENV: process.env.NODE_ENV,
    }

    // Test 2: Try to query routes table
    let routesTest = { status: 'not tested', error: null, count: 0 }
    try {
      const { data, error, count } = await supabase
        .from('routes')
        .select('*', { count: 'exact', head: false })
        .limit(1)
      
      if (error) throw error
      
      routesTest = {
        status: '✓ Connected',
        error: null,
        count: count || 0
      }
    } catch (error: any) {
      routesTest = {
        status: '✗ Failed',
        error: error?.message || String(error),
        count: 0
      }
    }

    // Test 3: Try to query locations table
    let locationsTest = { status: 'not tested', error: null, count: 0 }
    try {
      const { data, error, count } = await supabase
        .from('locations')
        .select('*', { count: 'exact', head: false })
        .limit(1)
      
      if (error) throw error
      
      locationsTest = {
        status: '✓ Connected',
        error: null,
        count: count || 0
      }
    } catch (error: any) {
      locationsTest = {
        status: '✗ Failed',
        error: error?.message || String(error),
        count: 0
      }
    }

    const elapsed = Date.now() - startTime

    const errorString = typeof routesTest.error === 'string' ? routesTest.error : ''
    const isTableMissingError = errorString.includes('relation') || errorString.includes('does not exist')
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      elapsed: `${elapsed}ms`,
      environment: envCheck,
      tests: {
        routesTable: routesTest,
        locationsTable: locationsTest,
      },
      recommendation: routesTest.status === '✓ Connected' 
        ? 'Supabase connection working! All tables accessible.' 
        : isTableMissingError
        ? 'Tables not created yet. Run the SQL from supabase-schema.sql in Supabase SQL Editor.'
        : 'Connection failed - check environment variables'
    })
  } catch (error: any) {
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      error: error?.message || String(error),
      stack: error?.stack,
    }, { status: 500 })
  }
}
