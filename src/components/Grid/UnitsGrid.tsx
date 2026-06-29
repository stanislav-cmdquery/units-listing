'use client'

import { useState } from 'react'

import type { Unit } from '../../types/unit'
import { useUnitsListingConfig } from '../../context/UnitsListingContext'
import { useUnitsFilter } from '../../hooks/useUnitsFilter'
import { FiltersDropdown } from '../Filters/FiltersDropdown'
import { ViewToggle, type View } from './ViewToggle'
import s from './UnitsGrid.module.css'

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

  const controls = (
    <>
      {header && <div className={s.header}>{header}</div>}
      <div className={s.controls}>
        <div className={s.controlsRight}>
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
      <div className={s.root}>
        {controls}
        <div className={s.grid}>{renderSkeletons()}</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className={s.root}>
        {controls}
        <div className={s.error}>{labels.retry}</div>
      </div>
    )
  }

  const limited = filteredUnits.slice(0, limit)

  return (
    <div className={s.root}>
      {controls}

      {limited.length === 0 ? (
        <div className={s.empty}>
          <p className={s.emptyTitle}>{labels.emptyTitle}</p>
          {hasActiveFilters && (
            <button type="button" className={s.emptyClear} onClick={clearAll}>
              {labels.clearFilters}
            </button>
          )}
        </div>
      ) : view === 'cards' ? (
        <div className={s.grid}>{limited.map(renderCard)}</div>
      ) : (
        renderTable(limited)
      )}
    </div>
  )
}
