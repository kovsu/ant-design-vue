import type { Slot, ScopedSlot } from '@/utils/types'
import type { InjectionKey, Ref } from 'vue'

export type CollapsibleType = 'header' | 'icon' | 'disabled'

export interface CollapseProps {
  /** Currently active panel key(s) */
  activeKey?: string | number | (string | number)[]
  /** Default active panel key(s) */
  defaultActiveKey?: string | number | (string | number)[]
  /** Only one panel open at a time */
  accordion?: boolean
  /** Show border around collapse */
  bordered?: boolean
  /** Position of the expand icon */
  expandIconPosition?: 'start' | 'end'
  /** Restrict collapsible trigger area */
  collapsible?: CollapsibleType
  /** Transparent background with no borders */
  ghost?: boolean
  /** Destroy panel content when collapsed */
  destroyInactivePanel?: boolean
}

export const collapseDefaultProps = {
  accordion: false,
  bordered: true,
  expandIconPosition: 'start',
  ghost: false,
  destroyInactivePanel: false,
} as const

export interface CollapseEmits {
  (e: 'update:activeKey', key: (string | number)[]): void
  (e: 'change', key: (string | number)[]): void
}

export interface CollapseSlots {
  default?: Slot
  expandIcon?: ScopedSlot<{ isActive: boolean; panelKey: string | number }>
}

export interface CollapsePanelProps {
  /** Header text */
  header?: string
  /** Unique key for the panel */
  panelKey?: string | number
  /** Show expand arrow */
  showArrow?: boolean
  /** Always render panel content even when inactive */
  forceRender?: boolean
  /** Override parent collapsible setting */
  collapsible?: CollapsibleType
  /** Extra content in header right area */
  extra?: string
}

export const collapsePanelDefaultProps = {
  showArrow: true,
  forceRender: false,
} as const

export interface CollapsePanelSlots {
  default?: Slot
  header?: Slot
  extra?: Slot
  expandIcon?: ScopedSlot<{ isActive: boolean }>
}

/** Context for parent Collapse to child Panel communication */
export interface CollapseContextType {
  activeKeys: Ref<(string | number)[]>
  collapsible: Ref<CollapsibleType | undefined>
  destroyInactivePanel: Ref<boolean>
  expandIconPosition: Ref<'start' | 'end'>
  togglePanel: (key: string | number) => void
}

export const collapseContextKey: InjectionKey<CollapseContextType> = Symbol('collapseContext')
