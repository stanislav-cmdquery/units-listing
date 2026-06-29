'use client'

import { formatUSD } from '../../../../utils/formatPrice'
import { useUnitsListingConfig } from '../../../../context/UnitsListingContext'
import s from './ConcessionPopup.module.css'

type Props = {
  priceNet: number | null
  priceGross: number | null
  concessionValue?: number | string | null
  concessionType?: 'months' | 'weeks' | null
  leaseTerm?: number | string | null
  hasConcession: boolean
  onClose: () => void
}

export function ConcessionPopup({
  priceNet,
  priceGross,
  concessionValue,
  concessionType,
  leaseTerm,
  hasConcession,
  onClose,
}: Props) {
  const { labels } = useUnitsListingConfig()
  const showSaveBadge = priceGross != null && priceGross > 0 && priceGross !== priceNet

  const concessionLabel =
    concessionType === 'months' ? labels.concessionMonths : labels.concessionWeeks

  const concessionText = concessionValue != null
    ? `${concessionValue} ${concessionLabel}`
    : ''

  const netEffectiveText = `*Net effective cost with ${concessionText}${
    leaseTerm ? ` when you sign a ${leaseTerm}-month lease` : ''
  }`

  return (
    <div className={s.popup} onClick={onClose} role="dialog" aria-label="Concession details">
      <div className={s.content}>
        <div className={s.prices}>
          {priceGross != null && priceGross > 0 && priceGross !== priceNet && (
            <div className={s.priceGross}>
              <s>{formatUSD(priceGross)}</s>
            </div>
          )}
          {priceNet != null && priceNet > 0 && <div className={s.priceNet}>{formatUSD(priceNet)}*</div>}
        </div>

        {showSaveBadge && priceNet != null && priceNet > 0 && priceGross != null && (
          <div className={s.saveBadge}>
            Save {formatUSD(priceGross - priceNet)} ({(((priceGross - priceNet) / priceGross) * 100).toFixed(0)}% off)
          </div>
        )}

        {hasConcession && <div className={s.netEffective}>{netEffectiveText}</div>}
      </div>

      <div className={s.close} onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
          <path d="M6.5 19.5L19.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M19.5 19.5L6.5 6.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
