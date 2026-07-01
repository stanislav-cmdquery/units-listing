export interface UnitImage {
  src: string
  /** Full-resolution version of the image, used in the enlarged/lightbox view. Falls back to `src` if omitted. */
  original?: string
  alt?: string
  width?: number
  height?: number
  blurDataURL?: string
}

export interface UnitPrice {
  net: number | null
  gross: number | null
  currency?: string
}

export interface UnitConcession {
  type: 'months' | 'weeks'
  value: number | string
}

export interface Unit {
  id: string
  unitNumber: string
  beds: number
  baths: number
  price: UnitPrice
  images?: UnitImage[]
  floorPlan?: UnitImage | null
  floorPlanUrl?: string | null
  concession?: UnitConcession | null
  leaseTerm?: number | string | null
  outdoor?: string | null
  meta?: Record<string, unknown>
}
