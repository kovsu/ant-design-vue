import type { Slot, ScopedSlot } from '@/utils/types'
import type { VNode } from 'vue'

export type TransferDirection = 'left' | 'right'

export interface TransferItem {
  key: string
  title?: string
  description?: string
  disabled?: boolean
  [name: string]: any
}

export interface TransferProps {
  /** Data source */
  dataSource?: TransferItem[]
  /** Keys of items in right panel (v-model:targetKeys) */
  targetKeys?: string[]
  /** Currently selected keys (v-model:selectedKeys) */
  selectedKeys?: string[]
  /** Panel titles [left, right] */
  titles?: [string, string]
  /** Operation button labels [toRight, toLeft] */
  operations?: [string, string]
  /** Show search input */
  showSearch?: boolean
  /** Custom filter function */
  filterOption?: (inputValue: string, option: TransferItem) => boolean
  /** Search placeholder */
  searchPlaceholder?: string
  /** Display when no data */
  notFoundContent?: string
  /** Render function for each item */
  render?: (item: TransferItem) => string | VNode
  /** Row key accessor */
  rowKey?: (item: TransferItem) => string
  /** Show select all checkbox */
  showSelectAll?: boolean
  /** One-way mode (no move-left) */
  oneWay?: boolean
  /** Disabled state */
  disabled?: boolean
}

export const transferDefaultProps = {
  dataSource: () => [] as TransferItem[],
  targetKeys: () => [] as string[],
  selectedKeys: () => [] as string[],
  titles: () => ['', ''] as [string, string],
  operations: () => ['', ''] as [string, string],
  showSearch: false,
  showSelectAll: true,
  oneWay: false,
  disabled: false,
} as const

export interface TransferEmits {
  (e: 'update:targetKeys', keys: string[]): void
  (e: 'update:selectedKeys', keys: string[]): void
  (e: 'change', targetKeys: string[], direction: TransferDirection, moveKeys: string[]): void
  (e: 'selectChange', sourceSelectedKeys: string[], targetSelectedKeys: string[]): void
  (e: 'search', direction: TransferDirection, value: string): void
  (e: 'scroll', direction: TransferDirection, event: Event): void
}

export interface TransferSlots {
  render?: ScopedSlot<{ item: TransferItem }>
  footer?: ScopedSlot<{ direction: TransferDirection }>
  notFoundContent?: Slot
}
