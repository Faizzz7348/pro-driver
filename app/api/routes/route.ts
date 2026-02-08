import { NextRequest, NextResponse } from 'next/server'
import { 
  getRoutesByRegion, 
  createRoute, 
  updateRoute, 
  deleteRoute 
} from '@/lib/prisma-db'

/**
 * GET /api/routes?region=selangor
 * Get all routes for a specific region
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const region = searchParams.get('region')

    if (!region) {
      return NextResponse.json(
        { error: 'Region parameter is required' },
        { status: 400 }
      )
    }

    const routes = await getRoutesByRegion(region)
    return NextResponse.json(routes)
  } catch (error) {
    console.error('Error in GET /api/routes:', error)
    return NextResponse.json(
      { error: 'Failed to fetch routes' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/routes
 * Create a new route
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('POST /api/routes - Received body:', JSON.stringify(body, null, 2))
    
    const { code, name, description, region, active } = body

    if (!code || !name || !region) {
      console.error('Missing required fields:', { code, name, region })
      return NextResponse.json(
        { 
          error: 'Code, name, and region are required',
          received: { code, name, region },
          fullBody: body
        },
        { status: 400 }
      )
    }

    console.log('Creating route with data:', { code, name, description, region, active })

    const route = await createRoute({
      code,
      name,
      description,
      region,
      active,
    })

    console.log('Route created successfully:', route.id)
    return NextResponse.json(route, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/routes:', error)
    console.error('Error stack:', error?.stack)
    return NextResponse.json(
      { 
        error: 'Failed to create route',
        details: error?.message || String(error),
        code: error?.code,
        meta: error?.meta
      },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/routes
 * Update an existing route
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Route ID is required' },
        { status: 400 }
      )
    }

    const route = await updateRoute(id, data)
    return NextResponse.json(route)
  } catch (error) {
    console.error('Error in PATCH /api/routes:', error)
    return NextResponse.json(
      { error: 'Failed to update route' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/routes?id=xxx
 * Delete a route (soft delete)
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Route ID is required' },
        { status: 400 }
      )
    }

    await deleteRoute(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/routes:', error)
    return NextResponse.json(
      { error: 'Failed to delete route' },
      { status: 500 }
    )
  }
}
