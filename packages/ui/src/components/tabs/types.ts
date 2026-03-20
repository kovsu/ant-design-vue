import type { CSSProperties, VNode } from 'vue'
import type { Slot, ScopedSlot } from '@/utils/types'

export type TabType = 'line' | 'card' | 'editable-card'
export type TabPosition = 'top' | 'right' | 'bottom' | 'left'

export interface TabItem {
  key: string | number
  /** Tab label */
  label?: string | VNode
  /** Whether the tab is disabled */
  disabled?: boolean
  /** Whether the tab is closable (editable-card only) */
  closable?: boolean
  /** Force render tab pane even when inactive */
  forceRender?: boolean
  /** Tab pane content (for items prop usage) */
  children?: VNode | string
}

export interface TabsProps {
  /** Current active tab key (v-model:activeKey) */
  activeKey?: string | number
  /** Default active tab key */
  defaultActiveKey?: string | number
  /** Tab bar position */
  tabPosition?: TabPosition
  /** Tab type */
  type?: TabType
  /** Tab size */
  size?: 'sm' | 'md' | 'lg'
  /** Whether to center tabs */
  centered?: boolean
  /** Whether to destroy inactive tab panes */
  destroyInactiveTabPane?: boolean
  /** Hide add button for editable-card */
  hideAdd?: boolean
  /** Gap between tabs in pixels */
  tabBarGutter?: number
  /** Tab bar style */
  tabBarStyle?: CSSProperties
  /** Animation config */
  animated?: boolean | { inkBar?: boolean; tabPane?: boolean }
  /** Declarative tabs via items array */
  items?: TabItem[]
}

export const tabsDefaultProps = {
  tabPosition: 'top' as const,
  type: 'line' as const,
  size: 'md' as const,
  centered: false,
  destroyInactiveTabPane: false,
  hideAdd: false,
} as const

export interface TabsEmits {
  (e: 'update:activeKey', key: string | number): void
  (e: 'change', key: string | number): void
  (e: 'tabClick', key: string | number, event: MouseEvent | KeyboardEvent): void
  (e: 'edit', targetKey: string | number, action: 'add' | 'remove'): void
}

export interface TabsSlots {
  default?: Slot
  leftExtra?: Slot
  rightExtra?: Slot
  addIcon?: Slot
  removeIcon?: Slot
}

// --- TabPane ---

export interface TabPaneProps {
  /** Unique tab key */
  tab?: string
  /** Whether this tab is disabled */
  disabled?: boolean
  /** Whether this tab is closable */
  closable?: boolean
  /** Force render even when inactive */
  forceRender?: boolean
}

export interface TabPaneSlots {
  default?: Slot
  tab?: Slot
}

// --- Internal ---
export const TABS_KEY = Symbol('tabs') as InjectionKey<TabsContext>

import type { InjectionKey, Ref, ComputedRef } from 'vue'

export interface TabsContext {
  activeKey: ComputedRef<string | number>
  registerPane: (key: string | number) => void
  unregisterPane: (key: string | number) => void
  destroyInactiveTabPane: ComputedRef<boolean>
}

export interface InternalTab {
  key: string | number
  label?: string | VNode
  disabled?: boolean
  closable?: boolean
  forceRender?: boolean
}
