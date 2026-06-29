import type { ComponentType, HTMLAttributes, ReactNode } from 'react'

export interface MotionDivProps extends HTMLAttributes<HTMLDivElement> {
  initial?: unknown
  animate?: unknown
  exit?: unknown
  transition?: unknown
  layout?: boolean | string
  layoutId?: string
  whileHover?: unknown
  whileTap?: unknown
}

export interface MotionAdapter {
  div: ComponentType<MotionDivProps>
  AnimatePresence: ComponentType<{ children?: ReactNode; mode?: string }>
}

const StaticDiv: ComponentType<MotionDivProps> = ({
  initial: _i,
  animate: _a,
  exit: _e,
  transition: _t,
  layout: _l,
  layoutId: _li,
  whileHover: _wh,
  whileTap: _wt,
  ...rest
}) => <div {...rest} />

const PassThrough: ComponentType<{ children?: ReactNode; mode?: string }> = ({ children }) => <>{children}</>

export const defaultMotionAdapter: MotionAdapter = {
  div: StaticDiv,
  AnimatePresence: PassThrough,
}
