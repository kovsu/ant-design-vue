import type { Slot } from '@/utils/types'
import type { TooltipProps, TooltipEmits } from '../tooltip/types'

export interface PopoverProps extends Omit<TooltipProps, 'title'> {
  /** Popover title */
  title?: string | number
  /** Popover content */
  content?: string | number
}

export const popoverDefaultProps = {
  trigger: 'hover',
  placement: 'top',
  arrow: true,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  destroyTooltipOnHide: false,
  autoAdjustOverflow: true,
} as const

export interface PopoverEmits extends TooltipEmits {}

export interface PopoverSlots {
  /** The trigger element */
  default?: Slot
  /** Popover title */
  title?: Slot
  /** Popover content */
  content?: Slot
}
