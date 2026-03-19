import type { Slot, ScopedSlot } from '@/utils/types'

export interface StatisticProps {
  /** Title text */
  title?: string
  /** Statistic value */
  value?: number | string
  /** Decimal separator */
  decimalSeparator?: string
  /** Group separator */
  groupSeparator?: string
  /** Decimal precision */
  precision?: number
  /** Prefix content */
  prefix?: string
  /** Suffix content */
  suffix?: string
  /** Value style */
  valueStyle?: Record<string, string>
  /** Show loading skeleton */
  loading?: boolean
}

export const statisticDefaultProps = {
  decimalSeparator: '.',
  groupSeparator: ',',
  loading: false,
} as const

export interface StatisticSlots {
  default?: Slot
  title?: Slot
  prefix?: Slot
  suffix?: Slot
  formatter?: ScopedSlot<{ value: number | string }>
}

export interface CountdownProps {
  /** Title text */
  title?: string
  /** Target timestamp (ms, Date, or string) */
  value?: number | string | Date
  /** Format pattern */
  format?: string
  /** Value style */
  valueStyle?: Record<string, string>
}

export const countdownDefaultProps = {
  format: 'HH:mm:ss',
} as const

export interface CountdownEmits {
  (e: 'finish'): void
  (e: 'change', value: number): void
}

export interface CountdownSlots {
  title?: Slot
  prefix?: Slot
  suffix?: Slot
}
