import type { Slot, ScopedSlot } from '@/utils/types'
import type { TooltipPlacement, TooltipEmits } from '../tooltip/types'
import type { TriggerType } from '@/_internal/trigger/types'
import type { ButtonProps } from '../button/types'

export interface PopconfirmProps {
  /** The confirmation message */
  title?: string | number
  /** Additional description text */
  description?: string | number
  /** Whether the popconfirm is visible (controlled). null = uncontrolled. */
  open?: boolean | null
  /** Default visibility (uncontrolled) */
  defaultOpen?: boolean
  /** @deprecated Use `open` instead */
  visible?: boolean
  /** Whether the popconfirm is disabled */
  disabled?: boolean
  /** OK button text */
  okText?: string
  /** Cancel button text */
  cancelText?: string
  /** OK button variant (maps to button type) */
  okType?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
  /** Props for the OK button */
  okButtonProps?: Partial<ButtonProps>
  /** Props for the Cancel button */
  cancelButtonProps?: Partial<ButtonProps>
  /** Whether to show the cancel button */
  showCancel?: boolean
  /** Custom icon */
  icon?: any
  /** Popconfirm placement */
  placement?: TooltipPlacement
  /** How to trigger */
  trigger?: TriggerType | TriggerType[]
  /** Whether to show arrow */
  arrow?: boolean | { pointAtCenter?: boolean }
  /** Delay in ms before showing */
  mouseEnterDelay?: number
  /** Delay in ms before hiding */
  mouseLeaveDelay?: number
  /** Class for the overlay */
  overlayClassName?: string
  /** Style for the overlay */
  overlayStyle?: Record<string, string>
  /** Destroy popup on hide */
  destroyTooltipOnHide?: boolean
  /** Auto adjust when near edges */
  autoAdjustOverflow?: boolean
  /** Custom popup container */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  /** Z-index */
  zIndex?: number
}

export const popconfirmDefaultProps = {
  trigger: 'click' as TriggerType,
  placement: 'top' as TooltipPlacement,
  arrow: true,
  mouseEnterDelay: 100,
  mouseLeaveDelay: 100,
  destroyTooltipOnHide: false,
  autoAdjustOverflow: true,
  disabled: false,
  okType: 'primary' as const,
  showCancel: true,
  okText: 'OK',
  cancelText: 'Cancel',
} as const

export interface PopconfirmEmits {
  (e: 'update:open', open: boolean): void
  (e: 'openChange', open: boolean): void
  (e: 'confirm', event: MouseEvent): void
  (e: 'cancel', event: MouseEvent): void
  /** @deprecated */
  (e: 'update:visible', open: boolean): void
  /** @deprecated */
  (e: 'visibleChange', open: boolean): void
}

export interface PopconfirmSlots {
  /** The trigger element */
  default?: Slot
  /** Confirmation message */
  title?: Slot
  /** Description text */
  description?: Slot
  /** Custom icon */
  icon?: Slot
  /** Custom OK button text */
  okText?: Slot
  /** Custom Cancel button text */
  cancelText?: Slot
  /** Custom cancel button */
  cancelButton?: ScopedSlot<{ cancel: (e: MouseEvent) => void }>
  /** Custom OK button */
  okButton?: ScopedSlot<{ confirm: (e: MouseEvent) => void }>
}
