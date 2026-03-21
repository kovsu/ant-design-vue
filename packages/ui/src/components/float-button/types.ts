import type { Slot } from '@/utils/types'

export interface FloatButtonBadge {
  /** Number to show in badge */
  count?: number
  /** Show as dot instead of number */
  dot?: boolean
}

export interface FloatButtonProps {
  /** Button visual type */
  type?: 'default' | 'primary'
  /** Button shape */
  shape?: 'circle' | 'square'
  /** Description text below the icon */
  description?: string
  /** Tooltip text on hover (uses title attribute) */
  tooltip?: string
  /** If set, renders as `<a>` tag */
  href?: string
  /** Target for `<a>` tag */
  target?: string
  /** Simplified badge overlay */
  badge?: FloatButtonBadge
}

export const floatButtonDefaultProps = {
  type: 'default',
  shape: 'circle',
} as const

export interface FloatButtonEmits {
  (e: 'click', event: MouseEvent): void
}

export interface FloatButtonSlots {
  /** Icon content */
  default?: Slot
  /** Description content */
  description?: Slot
  /** Tooltip content (used as title attribute text) */
  tooltip?: Slot
}

export interface FloatButtonGroupProps {
  /** Button visual type */
  type?: 'default' | 'primary'
  /** Button shape — also applied to child FloatButtons */
  shape?: 'circle' | 'square'
  /** Description text for the trigger button */
  description?: string
  /** Tooltip text for the trigger button */
  tooltip?: string
  /** Badge on the trigger button */
  badge?: FloatButtonBadge
  /** Trigger mode. If not set, children are always expanded */
  trigger?: 'click' | 'hover'
  /** Whether the group is open (v-model:open) */
  open?: boolean
}

export const floatButtonGroupDefaultProps = {
  shape: 'circle',
  open: undefined,
} as const

export interface FloatButtonGroupEmits {
  (e: 'update:open', open: boolean): void
  (e: 'openChange', open: boolean): void
}

export interface FloatButtonGroupSlots {
  /** Child FloatButtons */
  default?: Slot
  /** Icon for the trigger button */
  icon?: Slot
}

export interface BackTopProps {
  /** Button visual type */
  type?: 'default' | 'primary'
  /** Button shape */
  shape?: 'circle' | 'square'
  /** Description text */
  description?: string
  /** Tooltip text */
  tooltip?: string
  /** Badge overlay */
  badge?: FloatButtonBadge
  /** Scroll height to show the button */
  visibilityHeight?: number
  /** Scroll container — default is window */
  target?: () => HTMLElement | Window
  /** Scroll animation duration in ms */
  duration?: number
}

export const backTopDefaultProps = {
  type: 'default',
  shape: 'circle',
  visibilityHeight: 400,
  duration: 450,
} as const

export interface BackTopEmits {
  (e: 'click', event: MouseEvent): void
}

export interface BackTopSlots {
  /** Custom icon content */
  default?: Slot
  /** Description content */
  description?: Slot
}
