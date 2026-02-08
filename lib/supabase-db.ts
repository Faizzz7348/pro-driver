import { supabase } from './supabase'

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface Route {
  id: string
  code: string
  name: string
  description?: string
  region: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Location {
  id: string
  route_id: string
  code: string
  name: string
  address?: string
  contact?: string
  notes?: string
  position: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface DeliverySchedule {
  id: string
  location_id: string
  day_of_week: number
  time_slot: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface RouteWithLocations extends Route {
  locations: (Location & { deliverySchedule: DeliverySchedule[] })[]
}

export interface GalleryRow {
  id: string
  title: string
  position: number
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  row_id: string
  url: string
  alt?: string
  position: number
  created_at: string
  updated_at: string
}

// ============================================
// ROUTES & LOCATIONS OPERATIONS
// ============================================

/**
 * Get all routes for a specific region with their locations
 */
export async function getRoutesByRegion(region: string): Promise<RouteWithLocations[]> {
  try {
    const { data: routes, error: routesError } = await supabase
      .from('routes')
      .select('*')
      .eq('region', region)
      .eq('active', true)
      .order('created_at', { ascending: true })

    if (routesError) throw routesError

    // Fetch locations for each route
    const routesWithLocations = await Promise.all(
      (routes || []).map(async (route) => {
        const { data: locations, error: locationsError } = await supabase
          .from('locations')
          .select('*')
          .eq('route_id', route.id)
          .eq('active', true)
          .order('position', { ascending: true })

        if (locationsError) throw locationsError

        // Fetch delivery schedules for each location
        const locationsWithSchedules = await Promise.all(
          (locations || []).map(async (location) => {
            const { data: schedules, error: schedulesError } = await supabase
              .from('delivery_schedules')
              .select('*')
              .eq('location_id', location.id)

            if (schedulesError) throw schedulesError

            return {
              ...location,
              deliverySchedule: schedules || [],
            }
          })
        )

        return {
          ...route,
          locations: locationsWithSchedules,
        }
      })
    )

    return routesWithLocations
  } catch (error) {
    console.error('Error fetching routes:', error)
    throw error
  }
}

/**
 * Get a single route by ID with locations
 */
export async function getRouteById(routeId: string): Promise<RouteWithLocations | null> {
  try {
    const { data: route, error: routeError } = await supabase
      .from('routes')
      .select('*')
      .eq('id', routeId)
      .single()

    if (routeError) throw routeError
    if (!route) return null

    const { data: locations, error: locationsError } = await supabase
      .from('locations')
      .select('*')
      .eq('route_id', route.id)
      .order('position', { ascending: true })

    if (locationsError) throw locationsError

    const locationsWithSchedules = await Promise.all(
      (locations || []).map(async (location) => {
        const { data: schedules, error: schedulesError } = await supabase
          .from('delivery_schedules')
          .select('*')
          .eq('location_id', location.id)

        if (schedulesError) throw schedulesError

        return {
          ...location,
          deliverySchedule: schedules || [],
        }
      })
    )

    return {
      ...route,
      locations: locationsWithSchedules,
    }
  } catch (error) {
    console.error('Error fetching route:', error)
    throw error
  }
}

/**
 * Create a new route
 */
export async function createRoute(data: {
  code: string
  name: string
  description?: string
  region: string
  active?: boolean
}): Promise<Route> {
  try {
    const { data: route, error } = await supabase
      .from('routes')
      .insert([data])
      .select()
      .single()

    if (error) throw error
    return route
  } catch (error) {
    console.error('Error creating route:', error)
    throw error
  }
}

/**
 * Update an existing route
 */
export async function updateRoute(
  routeId: string,
  data: {
    code?: string
    name?: string
    description?: string
    region?: string
    active?: boolean
  }
): Promise<Route> {
  try {
    const { data: route, error } = await supabase
      .from('routes')
      .update(data)
      .eq('id', routeId)
      .select()
      .single()

    if (error) throw error
    return route
  } catch (error) {
    console.error('Error updating route:', error)
    throw error
  }
}

/**
 * Delete a route
 */
export async function deleteRoute(routeId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('routes')
      .delete()
      .eq('id', routeId)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting route:', error)
    throw error
  }
}

// ============================================
// LOCATION OPERATIONS
// ============================================

/**
 * Get locations by route ID
 */
export async function getLocationsByRouteId(routeId: string): Promise<Location[]> {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('route_id', routeId)
      .eq('active', true)
      .order('position', { ascending: true })

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching locations:', error)
    throw error
  }
}

/**
 * Create a new location
 */
export async function createLocation(data: {
  route_id: string
code: string
  name: string
  address?: string
  contact?: string
  notes?: string
  position?: number
  active?: boolean
}): Promise<Location> {
  try {
    const { data: location, error } = await supabase
      .from('locations')
      .insert([data])
      .select()
      .single()

    if (error) throw error
    return location
  } catch (error) {
    console.error('Error creating location:', error)
    throw error
  }
}

/**
 * Update an existing location
 */
export async function updateLocation(
  locationId: string,
  data: {
    code?: string
    name?: string
    address?: string
    contact?: string
    notes?: string
    position?: number
    active?: boolean
  }
): Promise<Location> {
  try {
    const { data: location, error } = await supabase
      .from('locations')
      .update(data)
      .eq('id', locationId)
      .select()
      .single()

    if (error) throw error
    return location
  } catch (error) {
    console.error('Error updating location:', error)
    throw error
  }
}

/**
 * Delete a location
 */
export async function deleteLocation(locationId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', locationId)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting location:', error)
    throw error
  }
}

/**
 * Bulk create locations for a route
 */
export async function bulkCreateLocations(
  routeId: string,
  locations: Array<{
    code: string
    name: string
    address?: string
    contact?: string
    notes?: string
    position?: number
  }>
): Promise<void> {
  try {
    const locationsWithRouteId = locations.map((loc, index) => ({
      route_id: routeId,
      ...loc,
      position: loc.position ?? index,
    }))

    const { error } = await supabase
      .from('locations')
      .insert(locationsWithRouteId)

    if (error) throw error
  } catch (error) {
    console.error('Error bulk creating locations:', error)
    throw error
  }
}

// ============================================
// GALLERY OPERATIONS
// ============================================

/**
 * Get all gallery rows with images
 */
export async function getGalleryRows(): Promise<(GalleryRow & { images: GalleryImage[] })[]> {
  try {
    const { data: rows, error: rowsError } = await supabase
      .from('gallery_rows')
      .select('*')
      .order('position', { ascending: true })

    if (rowsError) throw rowsError

    const rowsWithImages = await Promise.all(
      (rows || []).map(async (row) => {
        const { data: images, error: imagesError } = await supabase
          .from('gallery_images')
          .select('*')
          .eq('row_id', row.id)
          .order('position', { ascending: true })

        if (imagesError) throw imagesError

        return {
          ...row,
          images: images || [],
        }
      })
    )

    return rowsWithImages
  } catch (error) {
    console.error('Error fetching gallery:', error)
    throw error
  }
}

/**
 * Create a new gallery row
 */
export async function createGalleryRow(data: {
  title: string
  position?: number
}): Promise<GalleryRow> {
  try {
    const { data: row, error } = await supabase
      .from('gallery_rows')
      .insert([data])
      .select()
      .single()

    if (error) throw error
    return row
  } catch (error) {
    console.error('Error creating gallery row:', error)
    throw error
  }
}

/**
 * Create a new gallery image
 */
export async function createGalleryImage(data: {
  row_id: string
  url: string
  alt?: string
  position?: number
}): Promise<GalleryImage> {
  try {
    const { data: image, error } = await supabase
      .from('gallery_images')
      .insert([data])
      .select()
      .single()

    if (error) throw error
    return image
  } catch (error) {
    console.error('Error creating gallery image:', error)
    throw error
  }
}

/**
 * Update a gallery row
 */
export async function updateGalleryRow(
  rowId: string,
  data: {
    title?: string
    position?: number
  }
): Promise<GalleryRow> {
  try {
    const { data: row, error } = await supabase
      .from('gallery_rows')
      .update(data)
      .eq('id', rowId)
      .select()
      .single()

    if (error) throw error
    return row
  } catch (error) {
    console.error('Error updating gallery row:', error)
    throw error
  }
}

/**
 * Delete a gallery row
 */
export async function deleteGalleryRow(rowId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('gallery_rows')
      .delete()
      .eq('id', rowId)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting gallery row:', error)
    throw error
  }
}

/**
 * Update a gallery image
 */
export async function updateGalleryImage(
  imageId: string,
  data: {
    url?: string
    alt?: string
    position?: number
  }
): Promise<GalleryImage> {
  try {
    const { data: image, error } = await supabase
      .from('gallery_images')
      .update(data)
      .eq('id', imageId)
      .select()
      .single()

    if (error) throw error
    return image
  } catch (error) {
    console.error('Error updating gallery image:', error)
    throw error
  }
}

/**
 * Delete a gallery image
 */
export async function deleteGalleryImage(imageId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', imageId)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    throw error
  }
}

/**
 * Bulk create images for a gallery row
 */
export async function bulkCreateGalleryImages(
  rowId: string,
  images: Array<{
    url: string
    alt?: string
    position?: number
  }>
): Promise<void> {
  try {
    const imagesWithRowId = images.map((img, index) => ({
      row_id: rowId,
      ...img,
      position: img.position ?? index,
    }))

    const { error } = await supabase
      .from('gallery_images')
      .insert(imagesWithRowId)

    if (error) throw error
  } catch (error) {
    console.error('Error bulk creating gallery images:', error)
    throw error
  }
}

/**
 * Reorder gallery rows
 */
export async function reorderGalleryRows(rowIds: string[]): Promise<void> {
  try {
    const updates = rowIds.map(async (id, index) => {
      const { error } = await supabase
        .from('gallery_rows')
        .update({ position: index })
        .eq('id', id)
      
      if (error) throw error
    })

    await Promise.all(updates)
  } catch (error) {
    console.error('Error reordering gallery rows:', error)
    throw error
  }
}

/**
 * Reorder images within a gallery row
 */
export async function reorderGalleryImages(imageIds: string[]): Promise<void> {
  try {
    const updates = imageIds.map(async (id, index) => {
      const { error } = await supabase
        .from('gallery_images')
        .update({ position: index })
        .eq('id', id)
      
      if (error) throw error
    })

    await Promise.all(updates)
  } catch (error) {
    console.error('Error reordering gallery images:', error)
    throw error
  }
}

