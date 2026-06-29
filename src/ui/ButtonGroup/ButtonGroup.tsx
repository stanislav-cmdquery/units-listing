'use client'

import clsx from 'clsx'

import s from './ButtonGroup.module.css'

type Option<T extends string | number> = {
  value: T
  label: string
}

type Props<T extends string | number> = {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function ButtonGroup<T extends string | number>({ options, value, onChange, className }: Props<T>) {
  return (
    <div className={clsx(s.root, className)}>
      {options.map((option) => (
        <button
          key={String(option.value)}
          type="button"
          className={clsx(s.item, value === option.value && s.active)}
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
