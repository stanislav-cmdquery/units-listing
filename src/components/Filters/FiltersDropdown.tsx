'use client'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { useClickOutside } from '../../hooks/useClickOutside'
import { ButtonGroup } from '../../ui/ButtonGroup/ButtonGroup'
import type { BathFilter, OutdoorFilter } from '../../hooks/useUnitsFilter'
import { ArrowDown } from './ArrowDown'
import s from './FiltersDropdown.module.css'

function capitalise(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

type Props = {
  bathOptions: number[]
  bathFilter: BathFilter
  priceMinStr: string
  priceMaxStr: string
  outdoorOptions: string[]
  outdoorFilter: OutdoorFilter
  onBathChange: (bath: BathFilter) => void
  onPriceMinChange: (v: string) => void
  onPriceMaxChange: (v: string) => void
  onToggleOutdoor: (v: string) => void
  onClear: () => void
  isActive: boolean
}

function getBathLabel(bath: number): string {
  return bath >= 3 ? `${bath}+` : `${bath}`
}

export function FiltersDropdown({
  bathOptions,
  bathFilter,
  priceMinStr,
  priceMaxStr,
  outdoorOptions,
  outdoorFilter,
  onBathChange,
  onPriceMinChange,
  onPriceMaxChange,
  onToggleOutdoor,
  onClear,
  isActive,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useClickOutside([rootRef], () => setIsOpen(false))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keyup', onKey)
    return () => document.removeEventListener('keyup', onKey)
  }, [])

  const bathButtonOptions: { value: BathFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    ...bathOptions.map((b) => ({ value: b as BathFilter, label: getBathLabel(b) })),
  ]

  const handleClear = () => {
    onClear()
    setIsOpen(false)
  }

  return (
    <div ref={rootRef} className={s.root}>
      <button
        type="button"
        className={clsx(s.trigger, isActive && s.triggerActive)}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label="Open filters"
      >
        Filters
        <ArrowDown className={clsx(s.arrowDown, isOpen && s.arrowDownActive)} />
      </button>

      {isOpen && (
        <div className={s.panel}>
          <div className={s.section}>
            <div className={s.sectionLabel}>Bathrooms</div>
            <ButtonGroup
              options={bathButtonOptions}
              value={bathFilter}
              onChange={onBathChange}
              className={s.bathGroup}
            />
          </div>

          <div className={s.section}>
            <div className={s.sectionLabel}>Price</div>
            <div className={s.priceRow}>
              <div className={s.priceInputWrapper}>
                <span className={s.pricePrefix} aria-hidden="true">
                  $
                </span>
                <input
                  type="number"
                  className={s.priceInput}
                  placeholder="Min"
                  value={priceMinStr}
                  onChange={(e) => onPriceMinChange(e.target.value)}
                  min={0}
                  aria-label="Minimum price"
                />
              </div>
              <div className={s.priceSeparator} aria-hidden="true" />
              <div className={s.priceInputWrapper}>
                <span className={s.pricePrefix} aria-hidden="true">
                  $
                </span>
                <input
                  type="number"
                  className={s.priceInput}
                  placeholder="Max"
                  value={priceMaxStr}
                  onChange={(e) => onPriceMaxChange(e.target.value)}
                  min={0}
                  aria-label="Maximum price"
                />
              </div>
            </div>
          </div>

          {outdoorOptions.length > 0 && (
            <div className={s.section}>
              <div className={s.sectionLabel}>Outdoor Space</div>
              <div className={s.outdoorGroup}>
                {outdoorOptions.map((v) => {
                  const active = outdoorFilter.includes(v)
                  return (
                    <button
                      key={v}
                      type="button"
                      className={clsx(s.outdoorItem, active && s.outdoorItemActive)}
                      aria-pressed={active}
                      onClick={() => onToggleOutdoor(v)}
                    >
                      {capitalise(v)}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <button type="button" className={s.clearBtn} onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}
