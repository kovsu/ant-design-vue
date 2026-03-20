import type { ScopedSlot } from '@/utils/types'

export interface VirtualListProps {
  /** The full list of items */
  data: any[]
  /** Fixed height of each item in pixels */
  itemHeight: number
  /** Total height of the scrollable container */
  height: number
  /** Extra items to render above/below the visible area */
  overscan?: number
  /** Unique key field on each item */
  itemKey?: string | ((item: any) => string | number)
}

export const virtualListDefaultProps = {
  itemHeight: 24,
  height: 256,
  overscan: 5,
  itemKey: 'value',
} as const

export interface VirtualListSlots {
  default?: ScopedSlot<{ item: any; index: number; style: Record<string, string> }>
}

export interface VirtualListExpose {
  scrollTo: (index: number) => void
  scrollToTop: () => void
  scrollToBottom: () => void
  getScrollTop: () => number
}
