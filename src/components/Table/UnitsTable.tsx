'use client'

import clsx from 'clsx'
import { useId, useMemo, useState } from 'react'

import { useUnitsListingConfig } from '../../context/UnitsListingContext'
import type { Unit } from '../../types/unit'
import { formatUSD } from '../../utils/formatPrice'
import s from './UnitsTable.module.css'

type SortKey = 'unit' | 'beds' | 'baths' | 'price'
type SortDir = 'asc' | 'desc'
type SortState = { key: SortKey; dir: SortDir }

type Props = {
  units: Unit[]
}

type Column = {
  key: SortKey
  label: string
  align?: 'left' | 'right' | 'center'
  mobileHide?: boolean
}

const COLUMNS: Column[] = [
  { key: 'unit', label: 'Unit', align: 'left' },
  { key: 'beds', label: 'Type', align: 'left' },
  { key: 'baths', label: 'Bath', align: 'left', mobileHide: true },
  { key: 'price', label: 'Price', align: 'left' },
]

function getTypeLabel(beds: number) {
  if (beds === 0) return 'Studio'
  return `${beds}-Bedroom`
}

function getSortValue(unit: Unit, key: SortKey): number | string {
  switch (key) {
    case 'unit':
      return unit.unitNumber ?? ''
    case 'beds':
      return unit.beds ?? 0
    case 'baths':
      return unit.baths ?? 0
    case 'price':
      return unit.price.net ?? 0
    default:
      return 0
  }
}

function compareUnits(a: Unit, b: Unit, sort: SortState): number {
  const av = getSortValue(a, sort.key)
  const bv = getSortValue(b, sort.key)
  let cmp = 0
  if (typeof av === 'number' && typeof bv === 'number') {
    cmp = av - bv
  } else {
    cmp = String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: 'base' })
  }
  return sort.dir === 'asc' ? cmp : -cmp
}

function BedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M8.75 13.125V6.25H16.875C17.538 6.25 18.1739 6.51339 18.6428 6.98223C19.1116 7.45107 19.375 8.08696 19.375 8.75V13.125" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.875 16.25V3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.875 13.125H19.375V16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.75 6.25H1.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BathIcon({ className }: { className?: string }) {
  const clipId = useId()
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <g clipPath={`url(#${clipId})`}>
        <path d="M5.625 15V16.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14.375 15V16.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.625 7.5H10.625V11.25H15.625V7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15.625 8.125H18.75V11.25C18.75 12.2446 18.3549 13.1984 17.6517 13.9017C16.9484 14.6049 15.9946 15 15 15H5C4.00544 15 3.05161 14.6049 2.34835 13.9017C1.64509 13.1984 1.25 12.2446 1.25 11.25V8.125H10.625" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.375 8.125V4.0625C4.375 3.6481 4.53962 3.25068 4.83265 2.95765C5.12567 2.66462 5.5231 2.5 5.9375 2.5C6.30139 2.49915 6.65466 2.6226 6.93881 2.84993C7.22297 3.07725 7.42096 3.3948 7.5 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id={clipId}>
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

function FloorPlanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.66699 6.66699L8.00033 10.0003L11.3337 6.66699" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BookTourIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M1.5 14H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.5 14V2.5C3.5 2.36739 3.55268 2.24021 3.64645 2.14645C3.74021 2.05268 3.86739 2 4 2H12C12.1326 2 12.2598 2.05268 12.3536 2.14645C12.4473 2.24021 12.5 2.36739 12.5 2.5V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.75 8.75C10.1642 8.75 10.5 8.41421 10.5 8C10.5 7.58579 10.1642 7.25 9.75 7.25C9.33579 7.25 9 7.58579 9 8C9 8.41421 9.33579 8.75 9.75 8.75Z" fill="currentColor" />
    </svg>
  )
}

function formatPriceCell(priceNet: number | null, priceGross: number | null) {
  if (priceNet == null && priceGross == null) return <span>—</span>

  const net = priceNet ?? priceGross
  const gross = priceGross !== priceNet ? priceGross : null

  return (
    <div className={s.priceContainer}>
      {gross != null && <span className={s.priceGross}>{formatUSD(gross)}</span>}
      {net != null && <span className={s.priceNet}>{formatUSD(net)}</span>}
    </div>
  )
}

export function UnitsTable({ units }: Props) {
  const { labels, onBookTour, renderBookTourModal } = useUnitsListingConfig()
  const [sort, setSort] = useState<SortState>({ key: 'unit', dir: 'asc' })
  const [openUnit, setOpenUnit] = useState<Unit | null>(null)

  const sortedUnits = useMemo(() => [...units].sort((a, b) => compareUnits(a, b, sort)), [units, sort])

  const handleHeaderClick = (key: SortKey) => {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }))
  }

  const handleBookTour = (unit: Unit) => {
    onBookTour?.(unit)
    if (renderBookTourModal) setOpenUnit(unit)
  }

  return (
    <div className={s.scroll}>
      <table className={s.table}>
        <thead>
          <tr>
            {COLUMNS.map((col) => {
              const isActive = sort.key === col.key
              return (
                <th
                  key={col.key}
                  className={clsx(
                    s.th,
                    col.align === 'right' && s.alignRight,
                    col.align === 'center' && s.alignCenter,
                    col.mobileHide && s.hideMobile
                  )}
                  aria-sort={isActive ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <button
                    type="button"
                    className={clsx(s.headerBtn, isActive && s.headerBtnActive)}
                    onClick={() => handleHeaderClick(col.key)}
                  >
                    <span
                      className={clsx(s.caret, isActive && s.active, isActive && sort.dir === 'desc' && s.caretDown)}
                      aria-hidden="true"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path className={s.down} d="M8.75 13.75L6.25 16.25L3.75 13.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path className={s.down} d="M6.25 3.75V16.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path className={s.up} d="M11.25 6.25L13.75 3.75L16.25 6.25" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path className={s.up} d="M13.75 16.25V3.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{col.label}</span>
                  </button>
                </th>
              )
            })}
            <th className={clsx(s.th, s.actionTh)} aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {sortedUnits.map((unit) => (
            <tr key={unit.id} className={s.row}>
              <td className={clsx(s.td, s.unitCell)}>{unit.unitNumber || '—'}</td>
              <td className={s.td}>
                <span className={s.hideMobile}>{getTypeLabel(unit.beds)}</span>
                <div className={clsx(s.mobileBedBath, s.hideDesktop)}>
                  <div className={s.mobileBedRow}>
                    {unit.beds === 0 ? (
                      <span>Studio</span>
                    ) : (
                      <>
                        <span>{unit.beds}</span>
                        <BedIcon className={s.mobileTypeIcon} />
                      </>
                    )}
                  </div>
                  <div className={s.mobileBathRow}>
                    <span>{unit.baths}</span>
                    <BathIcon className={s.mobileTypeIcon} />
                  </div>
                </div>
              </td>
              <td className={clsx(s.td, s.hideMobile)}>
                <div className={s.bathContainer}>
                  {unit.baths}
                  <BathIcon className={s.bathIcon} />
                </div>
              </td>
              <td className={clsx(s.td, s.priceCell)}>
                {formatPriceCell(unit.price.net, unit.price.gross)}
              </td>
              <td className={clsx(s.td, s.actionTd)}>
                <div className={s.actionWrapper}>
                  {unit.floorPlanUrl && (
                    <a
                      title="Download floor plan"
                      aria-label="Download floor plan"
                      href={unit.floorPlanUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.downloadBtn}
                    >
                      <FloorPlanIcon className={s.floorPlanIcon} />
                    </a>
                  )}
                  <button
                    type="button"
                    className={s.bookTourBtn}
                    onClick={() => handleBookTour(unit)}
                    aria-label={`Book a tour for unit ${unit.unitNumber}`}
                  >
                    <BookTourIcon className={s.bookTourIcon} />
                    <span className={s.btnText}>{labels.bookTour}</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUnit && renderBookTourModal != null &&
        renderBookTourModal({ unit: openUnit, close: () => setOpenUnit(null) })
      }
    </div>
  )
}
