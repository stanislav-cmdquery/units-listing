import clsx from 'clsx'

import s from './CardSkeleton.module.css'

type Props = {
  className?: string
}

export function CardSkeleton({ className }: Props) {
  return (
    <div className={clsx(s.root, className)} aria-hidden="true">
      <div className={s.top}>
        <div className={s.params}>
          <div className={clsx(s.pill, s.unitPill, s.shimmer)} />
          <div className={clsx(s.pill, s.iconPill, s.shimmer)} />
          <div className={clsx(s.pill, s.iconPill, s.shimmer)} />
        </div>
        <div className={clsx(s.pricePill, s.shimmer)} />
        <div className={clsx(s.copyPill, s.shimmer)} />
      </div>

      <div className={s.center}>
        <div className={clsx(s.centerInner, s.shimmerSoft)} />
      </div>

      <div className={s.bottom}>
        <div className={clsx(s.actionPill, s.shimmer)} />
        <div className={clsx(s.actionPill, s.shimmer)} />
      </div>
    </div>
  )
}
