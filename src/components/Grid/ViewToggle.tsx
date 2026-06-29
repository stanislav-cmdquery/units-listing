'use client'

import clsx from 'clsx'

import s from './ViewToggle.module.css'

export type View = 'cards' | 'list'

type Props = {
  view: View
  onChange: (view: View) => void
  labelCards?: string
  labelList?: string
}

export function ViewToggle({ view, onChange, labelCards = 'Cards', labelList = 'List' }: Props) {
  return (
    <div className={s.root} role="group" aria-label="Switch units view">
      <button
        type="button"
        className={clsx(s.btn, view === 'cards' && s.btnActive)}
        onClick={() => onChange('cards')}
        aria-pressed={view === 'cards'}
      >
        <svg
          className={s.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#vt-cards)">
            <path
              d="M18.75 4.5H5.25C4.83579 4.5 4.5 4.83579 4.5 5.25V18.75C4.5 19.1642 4.83579 19.5 5.25 19.5H18.75C19.1642 19.5 19.5 19.1642 19.5 18.75V5.25C19.5 4.83579 19.1642 4.5 18.75 4.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 4.5V19.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.5 12H19.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="vt-cards">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className={s.label}>{labelCards}</span>
      </button>

      <button
        type="button"
        className={clsx(s.btn, view === 'list' && s.btnActive)}
        onClick={() => onChange('list')}
        aria-pressed={view === 'list'}
      >
        <svg
          className={s.icon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clipPath="url(#vt-list)">
            <path
              d="M8.25 6H20.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.25 12H20.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.25 18H20.25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.125 6.9375C4.64277 6.9375 5.0625 6.51777 5.0625 6C5.0625 5.48223 4.64277 5.0625 4.125 5.0625C3.60723 5.0625 3.1875 5.48223 3.1875 6C3.1875 6.51777 3.60723 6.9375 4.125 6.9375Z"
              fill="currentColor"
            />
            <path
              d="M4.125 12.9375C4.64277 12.9375 5.0625 12.5178 5.0625 12C5.0625 11.4822 4.64277 11.0625 4.125 11.0625C3.60723 11.0625 3.1875 11.4822 3.1875 12C3.1875 12.5178 3.60723 12.9375 4.125 12.9375Z"
              fill="currentColor"
            />
            <path
              d="M4.125 18.9375C4.64277 18.9375 5.0625 18.5178 5.0625 18C5.0625 17.4822 4.64277 17.0625 4.125 17.0625C3.60723 17.0625 3.1875 17.4822 3.1875 18C3.1875 18.5178 3.60723 18.9375 4.125 18.9375Z"
              fill="currentColor"
            />
          </g>
          <defs>
            <clipPath id="vt-list">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className={s.label}>{labelList}</span>
      </button>
    </div>
  )
}
