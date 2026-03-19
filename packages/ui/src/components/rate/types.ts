import type { Slot } from '@/utils/types'

export interface RateProps {
  /** Current value */
  value?: number
  /** Default value (uncontrolled) */
  defaultValue?: number
  /** Total number of stars */
  count?: number
  /** Allow half star selection */
  allowHalf?: boolean
  /** Allow clearing value by clicking same star */
  allowClear?: boolean
  /** Whether the rate is disabled */
  disabled?: boolean
  /** Auto focus on mount */
  autofocus?: boolean
  /** Character to display as star */
  character?: string
}

export const rateDefaultProps = {
  count: 5,
  allowHalf: false,
  allowClear: true,
  character: '★',
} as const

export interface RateEmits {
  (e: 'update:value', value: number): void
  (e: 'change', value: number): void
  (e: 'hoverChange', value: number): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'keydown', event: KeyboardEvent): void
}

export interface RateSlots {
  /** Custom character content */
  character?: Slot
}
