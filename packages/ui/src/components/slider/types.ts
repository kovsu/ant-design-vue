import type { ScopedSlot } from '@/utils/types'

export interface SliderMarks {
  [key: number]: string | { style?: Record<string, string>; label: string }
}

export interface SliderProps {
  /** Current value (number for single, tuple for range) */
  value?: number | [number, number]
  /** Default value (uncontrolled) */
  defaultValue?: number | [number, number]
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment. null for marks-only mode */
  step?: number | null
  /** Tick marks on the slider */
  marks?: SliderMarks
  /** Show dots at each step */
  dots?: boolean
  /** Dual-handle range mode */
  range?: boolean
  /** Vertical orientation */
  vertical?: boolean
  /** Reverse the slider direction */
  reverse?: boolean
  /** Whether the slider is disabled */
  disabled?: boolean
  /** Whether the track is inclusive (filled between min and value) */
  included?: boolean
}

export const sliderDefaultProps = {
  min: 0,
  max: 100,
  step: 1,
  range: false,
  vertical: false,
  reverse: false,
  included: true,
} as const

export interface SliderEmits {
  (e: 'update:value', value: number | [number, number]): void
  (e: 'change', value: number | [number, number]): void
  (e: 'afterChange', value: number | [number, number]): void
}

export interface SliderSlots {
  /** Custom mark label content */
  mark?: ScopedSlot<{ label: string; value: number }>
}
