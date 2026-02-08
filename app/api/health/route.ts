import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Test database connection
    await prisma.$queryRaw`SELECT 1`
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasPostgresUrl: !!process.env.DATABASE_POSTGRES_URL,
        nodeEnv: process.env.NODE_ENV,
      }
    })
  } catch (error: any) {
    console.error('Health check failed:', error)
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error?.message || String(error),
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        hasPostgresUrl: !!process.env.DATABASE_POSTGRES_URL,
        nodeEnv: process.env.NODE_ENV,
      }
    }, { status: 500 })
  }
}
