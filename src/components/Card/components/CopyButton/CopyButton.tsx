'use client'

import { formatUSD } from '../../../../utils/formatPrice'
import { CopyHoverInfo } from '../CopyHoverInfo/CopyHoverInfo'
import s from './CopyButton.module.css'

type Props = {
  unitNumber?: string
  beds: number
  baths: number
  priceNet: number | null
  priceGross: number | null
}

function prepareInfoForCopy(info: Props): string {
  return `
Number: ${info.unitNumber},
Price: ${info.priceNet != null ? formatUSD(info.priceNet) : '-'},
Beds: ${info.beds === 0 ? 1 : info.beds},
Baths: ${info.baths === 0 ? 1 : info.baths}
`
}

export function CopyButton({ unitNumber, beds, baths, priceNet, priceGross }: Props) {
  return (
    <div
      className={s.root}
      onClick={() => {
        navigator.clipboard.writeText(prepareInfoForCopy({ unitNumber, beds, baths, priceNet, priceGross }))
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M10.5 10.5H13.5V2.5H5.5V5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 5.5H2.5V13.5H10.5V5.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <CopyHoverInfo className={s.info}>Copy to clipboard</CopyHoverInfo>
    </div>
  )
}
