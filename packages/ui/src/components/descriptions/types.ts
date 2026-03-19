import type { Slot } from '@/utils/types'
import type { InjectionKey, Ref } from 'vue'

export type DescriptionsSize = 'default' | 'middle' | 'small'
export type DescriptionsLayout = 'horizontal' | 'vertical'

export interface DescriptionsProps {
  /** Title displayed at the top */
  title?: string
  /** Whether to show a border */
  bordered?: boolean
  /** Size of the descriptions list */
  size?: DescriptionsSize
  /** Number of columns per row */
  column?: number
  /** Layout direction of label/content pairs */
  layout?: DescriptionsLayout
  /** Whether to show colon after label */
  colon?: boolean
  /** Default styles for all labels */
  labelStyle?: Record<string, string>
  /** Default styles for all content cells */
  contentStyle?: Record<string, string>
}

export const descriptionsDefaultProps = {
  bordered: false,
  size: 'default',
  column: 3,
  layout: 'horizontal',
  colon: true,
} as const

export interface DescriptionsSlots {
  default?: Slot
  title?: Slot
  extra?: Slot
}

export interface DescriptionsItemProps {
  /** Label text */
  label?: string
  /** Number of columns this item spans */
  span?: number
  /** Custom label style */
  labelStyle?: Record<string, string>
  /** Custom content style */
  contentStyle?: Record<string, string>
}

export const descriptionsItemDefaultProps = {
  span: 1,
} as const

export interface DescriptionsItemSlots {
  default?: Slot
  label?: Slot
}

/** Context provided by Descriptions to DescriptionsItem */
export interface DescriptionsContextType {
  labelStyle: Ref<Record<string, string> | undefined>
  contentStyle: Ref<Record<string, string> | undefined>
}

export const descriptionsContextKey: InjectionKey<DescriptionsContextType> = Symbol('descriptionsContext')
