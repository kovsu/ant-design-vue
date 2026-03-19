import type { InjectionKey, Ref } from 'vue'
import type { Breakpoint } from '@/hooks'
import type { Slot, ScopedSlot } from '@/utils/types'

export interface LayoutProps {
  /** Manually declare that Layout has a Sider (auto-detected if omitted) */
  hasSider?: boolean
}

export interface SiderProps {
  /** Controlled collapsed state */
  collapsed?: boolean
  /** Initial collapsed state (uncontrolled) */
  defaultCollapsed?: boolean
  /** Enable collapse functionality */
  collapsible?: boolean
  /** Width when expanded */
  width?: number | string
  /** Width when collapsed */
  collapsedWidth?: number | string
  /** Responsive breakpoint to auto-collapse */
  breakpoint?: Breakpoint
  /** Reverse the trigger arrow direction */
  reverseArrow?: boolean
  /** Color theme */
  theme?: 'light' | 'dark'
}

export const siderDefaultProps = {
  defaultCollapsed: false,
  collapsible: false,
  width: 200,
  collapsedWidth: 80,
  reverseArrow: false,
  theme: 'dark',
} as const

export interface SiderEmits {
  (e: 'update:collapsed', collapsed: boolean): void
  (e: 'collapse', collapsed: boolean, type: 'clickTrigger' | 'responsive'): void
  (e: 'breakpoint', broken: boolean): void
}

export interface SiderSlots {
  default?: Slot
  trigger?: ScopedSlot<{ collapsed: boolean }>
}

// Injection keys
export interface SiderHookProvider {
  addSider: (id: string) => void
  removeSider: (id: string) => void
}

export const siderHookProviderKey: InjectionKey<SiderHookProvider> = Symbol('siderHookProvider')
export const siderCollapsedKey: InjectionKey<Ref<boolean>> = Symbol('siderCollapsed')
