import type { Slot } from '@/utils/types'

export interface DividerProps {
  /** Direction type */
  type?: 'horizontal' | 'vertical'
  /** Whether line is dashed */
  dashed?: boolean
  /** Position of title inside divider */
  orientation?: 'left' | 'center' | 'right'
  /** Margin between title and closest border, only for left/right orientation */
  orientationMargin?: string | number
  /** Show text in plain style (no bold) */
  plain?: boolean
}

export const dividerDefaultProps = {
  type: 'horizontal',
  orientation: 'center',
  dashed: false,
  plain: false,
} as const

export interface DividerSlots {
  default?: Slot
}
