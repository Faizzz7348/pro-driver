import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

export async function GET() {
  const startTime = Date.now()
  
  try {
    // Test 1: Check environment variables
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL ? '✓ Set' : '✗ Missing',
      PRISMA_DATABASE_URL: !!process.env.PRISMA_DATABASE_URL ? '✓ Set' : '✗ Missing',
      DATABASE_POSTGRES_URL: !!process.env.DATABASE_POSTGRES_URL ? '✓ Set' : '✗ Missing',
      NODE_ENV: process.env.NODE_ENV,
    }

    // Test 2: Try to connect with PRISMA_DATABASE_URL (Accelerate)
    let accelerateTest = { status: 'not tested', error: null }
    if (process.env.PRISMA_DATABASE_URL) {
      try {
        const prismaAccelerate = new PrismaClient({
          datasources: {
            db: {
              url: process.env.PRISMA_DATABASE_URL,
            },
          },
        })
        await prismaAccelerate.$queryRaw`SELECT 1 as test`
        await prismaAccelerate.$disconnect()
        accelerateTest.status = '✓ Connected'
      } catch (error: any) {
        accelerateTest = {
          status: '✗ Failed',
          error: error?.message || String(error)
        }
      }
    }

    // Test 3: Try to connect with DATABASE_URL (Direct)
    let directTest = { status: 'not tested', error: null }
    if (process.env.DATABASE_URL) {
      try {
        const prismaDirect = new PrismaClient({
          datasources: {
            db: {
              url: process.env.DATABASE_URL,
            },
          },
        })
        await prismaDirect.$queryRaw`SELECT 1 as test`
        await prismaDirect.$disconnect()
        directTest.status = '✓ Connected'
      } catch (error: any) {
        directTest = {
          status: '✗ Failed',
          error: error?.message || String(error)
        }
      }
    }

    const elapsed = Date.now() - startTime

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      elapsed: `${elapsed}ms`,
      environment: envCheck,
      tests: {
        prismaAccelerate: accelerateTest,
        directConnection: directTest,
      },
      recommendation: accelerateTest.status === '✓ Connected' 
        ? 'Use PRISMA_DATABASE_URL (Prisma Accelerate)' 
        : directTest.status === '✓ Connected'
        ? 'Use DATABASE_URL (Direct Connection with pooling)'
        : 'Both connections failed - check database credentials'
    })
  } catch (error: any) {
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      error: error?.message || String(error),
      stack: error?.stack,
    }, { status: 500 })
  }
}
