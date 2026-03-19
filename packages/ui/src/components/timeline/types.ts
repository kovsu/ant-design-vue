import type { Slot } from '@/utils/types'

export interface TimelineProps {
  /** Show a pending item at the end */
  pending?: boolean | string
  /** Reverse the order of items */
  reverse?: boolean
  /** Layout mode */
  mode?: 'left' | 'alternate' | 'right'
}

export const timelineDefaultProps = {
  reverse: false,
} as const

export interface TimelineSlots {
  default?: Slot
  pending?: Slot
  pendingDot?: Slot
}

export interface TimelineItemProps {
  /** Dot color: preset name or custom CSS color */
  color?: string
  /** Override position in alternate mode */
  position?: 'left' | 'right'
  /** Label content (shown opposite side in alternate/right mode) */
  label?: string
}

export const timelineItemDefaultProps = {
  color: 'blue',
} as const

export interface TimelineItemSlots {
  default?: Slot
  dot?: Slot
  label?: Slot
}
