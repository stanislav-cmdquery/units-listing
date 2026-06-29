import type { CSSProperties, ReactNode } from 'react'
import type { Unit } from '../types/unit'
import type { UnitsListingTheme, UnitsListingThemeVars } from '../types/theme'
import type { UnitsListingLabels } from '../context/UnitsListingContext'
import type { ImageComponent } from '../adapters/image'
import type { MotionAdapter } from '../adapters/motion'

export type ViewMode = 'card' | 'list'

export interface UnitsListingProps {
  units: Unit[]
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  defaultView?: ViewMode
  view?: ViewMode
  onViewChange?: (v: ViewMode) => void
  enableViewToggle?: boolean
  pageSize?: number
  skeletonCount?: number
  priceStep?: number
  labels?: Partial<UnitsListingLabels>
  theme?: UnitsListingTheme
  themeVars?: UnitsListingThemeVars
  className?: string
  style?: CSSProperties
  header?: ReactNode
  ImageComponent?: ImageComponent
  motion?: MotionAdapter
  onUnitSelect?: (unit: Unit) => void
  onBookTour?: (unit: Unit) => void
  renderBookTourModal?: (ctx: { unit: Unit; close: () => void }) => ReactNode
  portalContainer?: HTMLElement | null
}
