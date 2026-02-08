import { NextRequest, NextResponse } from 'next/server'
import { 
  createLocation, 
  updateLocation, 
  deleteLocation,
  bulkCreateLocations 
} from '@/lib/supabase-db'

/**
 * POST /api/locations
 * Create a new location
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('POST /api/locations - Received body:', JSON.stringify(body, null, 2))
    
    const { routeId, code, name, address, contact, notes, position, active } = body

    if (!routeId || !code || !name) {
      console.error('Missing required fields:', { routeId, code, name })
      return NextResponse.json(
        { 
          error: 'RouteId, code, and name are required', 
          received: { routeId, code, name },
          fullBody: body 
        },
        { status: 400 }
      )
    }

    console.log('Creating location with data:', { routeId, code, name, address, contact, notes, position, active })

    const location = await createLocation({
      route_id: routeId, // Convert camelCase to snake_case for Supabase
      code,
      name,
      address: address || undefined,
      contact: contact || undefined,
      notes: notes || undefined,
      position: position ?? 0,
      active: active ?? true,
    })

    console.log('Location created successfully:', location.id)
    return NextResponse.json(location, { status: 201 })
  } catch (error: any) {
    console.error('Error in POST /api/locations:', error)
    console.error('Error stack:', error?.stack)
    return NextResponse.json(
      { 
        error: 'Failed to create location', 
        details: error?.message || String(error),
        code: error?.code,
        meta: error?.meta
      },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/locations
 * Update an existing location
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Location ID is required' },
        { status: 400 }
      )
    }

    const location = await updateLocation(id, data)
    return NextResponse.json(location)
  } catch (error: any) {
    console.error('Error in PATCH /api/locations:', error)
    
    // Handle record not found error (Supabase returns null or throws error)
    if (error?.message?.includes('not found') || error?.code === 'PGRST116') {
      return NextResponse.json(
        { error: 'Location not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(
      { error: 'Failed to update location', details: error?.message || error },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/locations?id=xxx
 * Delete a location (soft delete)
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Location ID is required' },
        { status: 400 }
      )
    }

    await deleteLocation(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/locations:', error)
    return NextResponse.json(
      { error: 'Failed to delete location' },
      { status: 500 }
    )
  }
}
