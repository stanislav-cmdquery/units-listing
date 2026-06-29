'use client'
import { useMemo, type CSSProperties } from 'react'
import { UnitsListingProvider } from '../context/UnitsListingContext'
import { UnitsGrid } from '../components/Grid/UnitsGrid'
import { UnitCard } from '../components/Card/UnitCard'
import { CardSkeleton } from '../components/CardSkeleton/CardSkeleton'
import { UnitsTable } from '../components/Table/UnitsTable'
import { themeToVars } from '../types/theme'
import { clsx } from 'clsx'
import type { UnitsListingProps } from './UnitsListing.types'

export function UnitsListing({
  units,
  isLoading,
  isError,
  pageSize = 25,
  skeletonCount = 10,
  priceStep = 50,
  labels,
  theme,
  themeVars,
  className,
  style,
  header,
  ImageComponent,
  motion,
  onBookTour,
  renderBookTourModal,
}: UnitsListingProps) {
  const themeStyle = useMemo((): CSSProperties => ({
    ...(theme ? themeToVars(theme) : {}),
    ...(themeVars ?? {}),
  }), [theme, themeVars]) as CSSProperties

  return (
    <UnitsListingProvider
      value={{ labels, ImageComponent, motion, pageSize, skeletonCount, priceStep, onBookTour, renderBookTourModal }}
    >
      <div className={clsx('ul-root', className)} style={{ ...themeStyle, ...style }}>
        <UnitsGrid
          units={units}
          isLoading={isLoading ?? false}
          isError={isError ?? false}
          header={header}
          pageSize={pageSize}
          renderCard={(unit) => <UnitCard key={unit.id} unit={unit} />}
          renderSkeletons={() => Array.from({ length: skeletonCount }, (_, i) => <CardSkeleton key={i} />)}
          renderTable={(u) => <UnitsTable units={u} />}
        />
      </div>
    </UnitsListingProvider>
  )
}
