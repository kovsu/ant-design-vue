import type { Slot, ScopedSlot } from '@/utils/types'
import type { VNode } from 'vue'

export type SegmentedValue = string | number

export interface SegmentedOption {
  value: SegmentedValue
  label?: string | VNode
  disabled?: boolean
  title?: string
  className?: string
}

export interface SegmentedProps {
  /** Current selected value (v-model:value) */
  value?: SegmentedValue
  /** Segment options */
  options?: (SegmentedOption | SegmentedValue)[]
  /** Disable all segments */
  disabled?: boolean
  /** Display as full-width block */
  block?: boolean
  /** Size of segmented control */
  size?: 'sm' | 'md' | 'lg'
}

export const segmentedDefaultProps = {
  options: () => [] as (SegmentedOption | SegmentedValue)[],
  disabled: false,
  block: false,
  size: 'md' as const,
} as const

export interface SegmentedEmits {
  (e: 'update:value', value: SegmentedValue): void
  (e: 'change', value: SegmentedValue): void
}

export interface SegmentedSlots {
  label?: ScopedSlot<{ value: SegmentedValue; label: string; disabled?: boolean }>
}
