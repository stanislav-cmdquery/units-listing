'use client'
import { createContext, useContext, type ReactNode } from 'react'
import type { ImageComponent } from '../adapters/image'
import type { MotionAdapter } from '../adapters/motion'
import { DefaultImage } from '../adapters/image'
import { defaultMotionAdapter } from '../adapters/motion'

export interface UnitsListingLabels {
  filtersTitle: string
  bathLabel: string
  priceLabel: string
  outdoorLabel: string
  bookTour: string
  copyLink: string
  emptyTitle: string
  emptySubtitle: string
  concessionMonths: string
  concessionWeeks: string
  viewCard: string
  viewList: string
  clearFilters: string
  retry: string
}

export const defaultLabels: UnitsListingLabels = {
  filtersTitle: 'Filters',
  bathLabel: 'Baths',
  priceLabel: 'Price',
  outdoorLabel: 'Outdoor',
  bookTour: 'Book Tour',
  copyLink: 'Copy',
  emptyTitle: 'No units available',
  emptySubtitle: 'Try adjusting your filters',
  concessionMonths: 'Months Free',
  concessionWeeks: 'Weeks Free',
  viewCard: 'Cards',
  viewList: 'List',
  clearFilters: 'Clear',
  retry: 'Try again',
}

export interface UnitsListingConfig {
  labels: UnitsListingLabels
  ImageComponent: ImageComponent
  motion: MotionAdapter
  pageSize: number
  skeletonCount: number
  priceStep: number
  onBookTour?: (unit: import('../types/unit').Unit) => void
  renderBookTourModal?: (ctx: { unit: import('../types/unit').Unit; close: () => void }) => ReactNode
}

export interface UnitsListingConfigInput {
  labels?: Partial<UnitsListingLabels>
  ImageComponent?: ImageComponent
  motion?: MotionAdapter
  pageSize?: number
  skeletonCount?: number
  priceStep?: number
  onBookTour?: (unit: import('../types/unit').Unit) => void
  renderBookTourModal?: (ctx: { unit: import('../types/unit').Unit; close: () => void }) => ReactNode
}

const UnitsListingContext = createContext<UnitsListingConfig>({
  labels: defaultLabels,
  ImageComponent: DefaultImage,
  motion: defaultMotionAdapter,
  pageSize: 25,
  skeletonCount: 10,
  priceStep: 50,
})

export function UnitsListingProvider({
  children,
  value,
}: {
  children: ReactNode
  value: UnitsListingConfigInput
}) {
  const merged: UnitsListingConfig = {
    labels: { ...defaultLabels, ...value.labels },
    ImageComponent: value.ImageComponent ?? DefaultImage,
    motion: value.motion ?? defaultMotionAdapter,
    pageSize: value.pageSize ?? 25,
    skeletonCount: value.skeletonCount ?? 10,
    priceStep: value.priceStep ?? 50,
    onBookTour: value.onBookTour,
    renderBookTourModal: value.renderBookTourModal,
  }
  return (
    <UnitsListingContext.Provider value={merged}>
      {children}
    </UnitsListingContext.Provider>
  )
}

export function useUnitsListingConfig(): UnitsListingConfig {
  return useContext(UnitsListingContext)
}
