import type { Slot } from '@/utils/types'

export interface CardProps {
  /** Card title */
  title?: string
  /** Whether to show border */
  bordered?: boolean
  /** Inline style for body section */
  bodyStyle?: Record<string, string>
  /** Inline style for head section */
  headStyle?: Record<string, string>
  /** Whether to show loading skeleton */
  loading?: boolean
  /** Lift card on hover */
  hoverable?: boolean
  /** Card type: 'inner' for nested card */
  type?: 'inner'
  /** Card size */
  size?: 'default' | 'small'
  /** Active tab key (for future tab support) */
  activeTabKey?: string
  /** Default active tab key */
  defaultActiveTabKey?: string
}

export const cardDefaultProps = {
  bordered: true,
  loading: false,
  hoverable: false,
  size: 'default',
} as const

export interface CardEmits {
  (e: 'tabChange', key: string): void
}

export interface CardSlots {
  default?: Slot
  title?: Slot
  extra?: Slot
  cover?: Slot
  actions?: Slot
}

export interface CardMetaProps {
  /** Meta title */
  title?: string
  /** Meta description */
  description?: string
}

export interface CardMetaSlots {
  default?: Slot
  avatar?: Slot
  title?: Slot
  description?: Slot
}

export interface CardGridProps {
  /** Whether to show hover shadow */
  hoverable?: boolean
}

export const cardGridDefaultProps = {
  hoverable: true,
} as const

export interface CardGridSlots {
  default?: Slot
}
