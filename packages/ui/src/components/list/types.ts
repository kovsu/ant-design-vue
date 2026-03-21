import type { Slot, ScopedSlot } from '@/utils/types'
import type { CSSProperties, VNode, InjectionKey, ComputedRef } from 'vue'

export type ListSize = 'sm' | 'md' | 'lg'
export type ListItemLayout = 'horizontal' | 'vertical'

export interface ListGridType {
  gutter?: number
  column?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  xxl?: number
}

export interface ListProps {
  /** Data source for rendering list items */
  dataSource?: any[]
  /** Show border around list */
  bordered?: boolean
  /** Show split line between items */
  split?: boolean
  /** List size */
  size?: ListSize
  /** Item layout direction */
  itemLayout?: ListItemLayout
  /** Show loading state */
  loading?: boolean
  /** Grid configuration */
  grid?: ListGridType
  /** Row key for each item */
  rowKey?: string | ((item: any) => string | number)
}

export const listDefaultProps = {
  dataSource: () => [] as any[],
  bordered: false,
  split: true,
  size: 'md' as const,
  itemLayout: 'horizontal' as const,
  loading: false,
} as const

export interface ListEmits {
  // List has no direct events
}

export interface ListSlots {
  default?: Slot
  renderItem?: ScopedSlot<{ item: any; index: number }>
  header?: Slot
  footer?: Slot
  loadMore?: Slot
}

// --- List Item ---
export interface ListItemProps {
  /** Extra content to display */
  extra?: string
}

export const listItemDefaultProps = {} as const

export interface ListItemSlots {
  default?: Slot
  actions?: Slot
  extra?: Slot
}

// --- List Item Meta ---
export interface ListItemMetaProps {
  /** Avatar URL or element */
  avatar?: string
  /** Title text */
  title?: string
  /** Description text */
  description?: string
}

export const listItemMetaDefaultProps = {} as const

export interface ListItemMetaSlots {
  default?: Slot
  avatar?: Slot
  title?: Slot
  description?: Slot
}

// Context
export const LIST_KEY = Symbol('list') as InjectionKey<ListContext>

export interface ListContext {
  grid: ComputedRef<ListGridType | undefined>
  itemLayout: ComputedRef<ListItemLayout>
  size: ComputedRef<ListSize>
}
