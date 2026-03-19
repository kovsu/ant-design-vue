import type { Slot } from '@/utils/types'

export interface SpinProps {
  /** Whether to show spinning state */
  spinning?: boolean
  /** Size of spinner */
  size?: 'small' | 'default' | 'large'
  /** Loading tip text */
  tip?: string
  /** Delay in ms before showing spinner */
  delay?: number
}

export const spinDefaultProps = {
  spinning: true,
  size: 'default',
} as const

export interface SpinSlots {
  default?: Slot
  tip?: Slot
  indicator?: Slot
}
