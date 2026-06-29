'use client'

import clsx from 'clsx'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { useBodyOverflow } from '../../hooks/useBodyOverflow'
import { formatUSD } from '../../utils/formatPrice'
import s from './FiltersModal.module.css'

export type FiltersModalFilters = {
  beds: number[]
  priceMin: number
  priceMax: number
}

export type FiltersModalProps = {
  onClose: () => void
  bedOptions: number[]
  priceBounds: { min: number; max: number }
  value: FiltersModalFilters
  onApply: (next: FiltersModalFilters) => void
  priceStep?: number
}

function getBedLabel(beds: number) {
  if (beds === 0) return 'Studio'
  if (beds === 1) return '1BR'
  return `${beds}BR`
}

function clampPrice(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export function FiltersModal({
  onClose,
  bedOptions,
  priceBounds,
  value,
  onApply,
  priceStep = 50,
}: FiltersModalProps) {
  const [draftBeds, setDraftBeds] = useState<number[]>(value.beds)
  const [draftMin, setDraftMin] = useState<number>(value.priceMin)
  const [draftMax, setDraftMax] = useState<number>(value.priceMax)

  useBodyOverflow(true)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const toggleBed = useCallback((bed: number) => {
    setDraftBeds((prev) => (prev.includes(bed) ? prev.filter((b) => b !== bed) : [...prev, bed].sort((a, b) => a - b)))
  }, [])

  const handleMinChange = useCallback(
    (next: number) => {
      const clamped = clampPrice(next, priceBounds.min, priceBounds.max)
      setDraftMin(Math.min(clamped, draftMax))
    },
    [priceBounds.min, priceBounds.max, draftMax]
  )

  const handleMaxChange = useCallback(
    (next: number) => {
      const clamped = clampPrice(next, priceBounds.min, priceBounds.max)
      setDraftMax(Math.max(clamped, draftMin))
    },
    [priceBounds.min, priceBounds.max, draftMin]
  )

  const handleReset = useCallback(() => {
    setDraftBeds([])
    setDraftMin(priceBounds.min)
    setDraftMax(priceBounds.max)
  }, [priceBounds.min, priceBounds.max])

  const handleApply = useCallback(() => {
    onApply({ beds: draftBeds, priceMin: draftMin, priceMax: draftMax })
  }, [draftBeds, draftMin, draftMax, onApply])

  const range = priceBounds.max - priceBounds.min
  const minPercent = useMemo(
    () => (range > 0 ? ((draftMin - priceBounds.min) / range) * 100 : 0),
    [draftMin, priceBounds.min, range]
  )
  const maxPercent = useMemo(
    () => (range > 0 ? ((draftMax - priceBounds.min) / range) * 100 : 100),
    [draftMax, priceBounds.min, range]
  )

  if (typeof document === 'undefined') return null

  const sliderDisabled = range <= 0

  return createPortal(
    <div className={s.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label="Filter units">
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={s.closeButton} onClick={onClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <div className={s.header}>
          <h2 className={s.title}>Refine your search.</h2>
          <p className={s.subtitle}>Adjust the filters below to find your perfect home.</p>
        </div>

        <div className={s.body}>
          <section className={s.section}>
            <div className={s.sectionHead}>
              <div className={s.label}>Bedrooms</div>
              {draftBeds.length > 0 && (
                <button type="button" className={s.sectionClear} onClick={() => setDraftBeds([])}>
                  Clear
                </button>
              )}
            </div>
            {bedOptions.length > 0 ? (
              <div className={s.chipGroup} role="group" aria-label="Filter by bedrooms">
                {bedOptions.map((bed) => {
                  const selected = draftBeds.includes(bed)
                  return (
                    <button
                      key={bed}
                      type="button"
                      className={clsx(s.chip, selected && s.chipSelected)}
                      onClick={() => toggleBed(bed)}
                      aria-pressed={selected}
                    >
                      {getBedLabel(bed)}
                    </button>
                  )
                })}
              </div>
            ) : (
              <div className={s.empty}>No bedroom options available.</div>
            )}
          </section>

          <section className={s.section}>
            <div className={s.sectionHead}>
              <div className={s.label}>Monthly Rent</div>
              {(draftMin !== priceBounds.min || draftMax !== priceBounds.max) && !sliderDisabled && (
                <button
                  type="button"
                  className={s.sectionClear}
                  onClick={() => {
                    setDraftMin(priceBounds.min)
                    setDraftMax(priceBounds.max)
                  }}
                >
                  Clear
                </button>
              )}
            </div>

            <div className={s.priceRow}>
              <div className={s.priceChip}>
                <span className={s.priceChipLabel}>Min</span>
                <span className={s.priceChipValue}>{formatUSD(draftMin)}</span>
              </div>
              <div className={s.priceChipDivider} aria-hidden="true" />
              <div className={s.priceChip}>
                <span className={s.priceChipLabel}>Max</span>
                <span className={s.priceChipValue}>{formatUSD(draftMax)}</span>
              </div>
            </div>

            <div className={clsx(s.slider, sliderDisabled && s.sliderDisabled)}>
              <div className={s.sliderTrack} aria-hidden="true" />
              <div
                className={s.sliderRange}
                style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                aria-hidden="true"
              />
              <input
                type="range"
                className={clsx(s.sliderInput, s.sliderInputMin)}
                min={priceBounds.min}
                max={priceBounds.max}
                step={priceStep}
                value={draftMin}
                onChange={(e) => handleMinChange(Number(e.target.value))}
                disabled={sliderDisabled}
                aria-label="Minimum monthly rent"
              />
              <input
                type="range"
                className={clsx(s.sliderInput, s.sliderInputMax)}
                min={priceBounds.min}
                max={priceBounds.max}
                step={priceStep}
                value={draftMax}
                onChange={(e) => handleMaxChange(Number(e.target.value))}
                disabled={sliderDisabled}
                aria-label="Maximum monthly rent"
              />
            </div>

            <div className={s.sliderBounds}>
              <span>{formatUSD(priceBounds.min)}</span>
              <span>{formatUSD(priceBounds.max)}</span>
            </div>
          </section>
        </div>

        <div className={s.footer}>
          <button type="button" className={s.resetButton} onClick={handleReset}>
            Reset
          </button>
          <button type="button" className={s.applyButton} onClick={handleApply}>
            Apply filters
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
