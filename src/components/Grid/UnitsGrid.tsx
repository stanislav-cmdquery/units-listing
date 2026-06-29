'use client'

import { useMemo, useState } from 'react'

import type { Unit } from '../../types/unit'
import { useUnitsListingConfig } from '../../context/UnitsListingContext'
import { useUnitsFilter } from '../../hooks/useUnitsFilter'
import { FiltersDropdown } from '../Filters/FiltersDropdown'
import { ViewToggle, type View } from './ViewToggle'
import './UnitsGrid.css'

type Props = {
  units: Unit[]
  isLoading: boolean
  isError: boolean
  pageSize?: number
  header?: React.ReactNode
  renderCard: (unit: Unit) => React.ReactNode
  renderSkeletons: () => React.ReactNode
  renderTable: (units: Unit[]) => React.ReactNode
}

export function UnitsGrid({
  units,
  isLoading,
  isError,
  pageSize,
  header,
  renderCard,
  renderSkeletons,
  renderTable,
}: Props) {
  const config = useUnitsListingConfig()
  const limit = pageSize ?? config.pageSize
  const { labels } = config

  const [view, setView] = useState<View>('cards')

  const {
    bathFilter,
    setBathFilter,
    priceMinStr,
    setPriceMinStr,
    priceMaxStr,
    setPriceMaxStr,
    outdoorFilter,
    toggleOutdoor,
    outdoorOptions,
    bathOptions,
    filteredUnits,
    hasActiveFilters,
    isDropdownActive,
    clearAll,
    clearDropdown,
  } = useUnitsFilter(units, config.priceStep)

  const limited = useMemo(() => filteredUnits.slice(0, limit), [filteredUnits, limit])

  const controls = (
    <>
      {header && <div className="ul-grid-header">{header}</div>}
      <div className="ul-grid-controls">
        <div className="ul-grid-controls-right">
          <ViewToggle
            view={view}
            onChange={setView}
            labelCards={labels.viewCard}
            labelList={labels.viewList}
          />
          <FiltersDropdown
            bathOptions={bathOptions}
            bathFilter={bathFilter}
            priceMinStr={priceMinStr}
            priceMaxStr={priceMaxStr}
            outdoorOptions={outdoorOptions}
            outdoorFilter={outdoorFilter}
            onBathChange={setBathFilter}
            onPriceMinChange={setPriceMinStr}
            onPriceMaxChange={setPriceMaxStr}
            onToggleOutdoor={toggleOutdoor}
            onClear={clearDropdown}
            isActive={isDropdownActive}
          />
        </div>
      </div>
    </>
  )

  if (isLoading) {
    return (
      <div className="ul-grid-root">
        {controls}
        <div className="ul-grid-grid">{renderSkeletons()}</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="ul-grid-root">
        {controls}
        <div className="ul-grid-error">{labels.retry}</div>
      </div>
    )
  }

  return (
    <div className="ul-grid-root">
      {controls}

      {limited.length === 0 ? (
        <div className="ul-grid-empty">
          <p className="ul-grid-empty-title">{labels.emptyTitle}</p>
          {hasActiveFilters && (
            <button type="button" className="ul-grid-empty-clear" onClick={clearAll}>
              {labels.clearFilters}
            </button>
          )}
        </div>
      ) : view === 'cards' ? (
        <div className="ul-grid-grid">{limited.map(renderCard)}</div>
      ) : (
        renderTable(limited)
      )}
    </div>
  )
}
