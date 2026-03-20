import type { CSSProperties } from 'vue'
import type { Slot } from '@/utils/types'

export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left'

export interface DrawerProps {
  /** Whether the drawer is visible (v-model:open) */
  open?: boolean
  /** @deprecated Use `open` instead */
  visible?: boolean
  /** Drawer title */
  title?: string
  /** Placement of the drawer */
  placement?: DrawerPlacement
  /** Whether to show the close button */
  closable?: boolean
  /** Width of the drawer (for left/right placement) */
  width?: string | number
  /** Height of the drawer (for top/bottom placement) */
  height?: string | number
  /** Preset size: 'default' (378px) or 'large' (736px) */
  size?: 'default' | 'large'
  /** Whether to show the mask overlay */
  mask?: boolean
  /** Whether clicking the mask closes the drawer */
  maskClosable?: boolean
  /** Whether pressing ESC closes the drawer */
  keyboard?: boolean
  /** Whether to destroy the drawer DOM when closed */
  destroyOnClose?: boolean
  /** Custom z-index */
  zIndex?: number
  /** Style for the drawer body */
  bodyStyle?: CSSProperties
  /** Style for the drawer header */
  headerStyle?: CSSProperties
  /** Function that returns the container element */
  getContainer?: () => HTMLElement
  /** Callback after open/close animation finishes */
  afterOpenChange?: (open: boolean) => void
  /** @deprecated Use `afterOpenChange` instead */
  afterVisibleChange?: (open: boolean) => void
  /** Extra header content (rendered at the right side of header) */
  extra?: string
  /** Class for the root element */
  rootClassName?: string
}

export const drawerDefaultProps = {
  placement: 'right' as const,
  closable: true,
  size: 'default' as const,
  mask: true,
  maskClosable: true,
  keyboard: true,
  destroyOnClose: false,
} as const

export interface DrawerEmits {
  (e: 'update:open', open: boolean): void
  /** @deprecated */
  (e: 'update:visible', open: boolean): void
  (e: 'close', event: MouseEvent | KeyboardEvent): void
  (e: 'afterOpenChange', open: boolean): void
  /** @deprecated */
  (e: 'afterVisibleChange', open: boolean): void
}

export interface DrawerSlots {
  default?: Slot
  title?: Slot
  extra?: Slot
  footer?: Slot
  closeIcon?: Slot
}
