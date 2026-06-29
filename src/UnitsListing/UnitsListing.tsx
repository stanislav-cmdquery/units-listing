'use client'
import { useCallback, useMemo, type CSSProperties } from 'react'
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

  const rootStyle = useMemo(
    () => ({ ...themeStyle, ...style }),
    [themeStyle, style]
  )

  const providerValue = useMemo(
    () => ({ labels, ImageComponent, motion, pageSize, skeletonCount, priceStep, onBookTour, renderBookTourModal }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [labels, ImageComponent, motion, pageSize, skeletonCount, priceStep, onBookTour, renderBookTourModal]
  )

  const renderCard = useCallback(
    (unit: Parameters<typeof UnitCard>[0]['unit']) => <UnitCard key={unit.id} unit={unit} />,
    []
  )

  const renderSkeletons = useCallback(
    () => Array.from({ length: skeletonCount }, (_, i) => <CardSkeleton key={i} />),
    [skeletonCount]
  )

  const renderTable = useCallback(
    (u: Parameters<typeof UnitsTable>[0]['units']) => <UnitsTable units={u} />,
    []
  )

  return (
    <UnitsListingProvider value={providerValue}>
      <div className={clsx('ul-root', className)} style={rootStyle}>
        <UnitsGrid
          units={units}
          isLoading={isLoading ?? false}
          isError={isError ?? false}
          header={header}
          pageSize={pageSize}
          renderCard={renderCard}
          renderSkeletons={renderSkeletons}
          renderTable={renderTable}
        />
      </div>
    </UnitsListingProvider>
  )
}
