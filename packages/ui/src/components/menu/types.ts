import type { InjectionKey, Ref, VNodeChild } from 'vue'
import type { Slot, ScopedSlot } from '@/utils/types'

export type MenuMode = 'horizontal' | 'vertical' | 'inline'
export type MenuTheme = 'light' | 'dark'
export type TriggerSubMenuAction = 'hover' | 'click'
export type MenuKey = string | number

/** Info object passed to menu event handlers */
export interface MenuItemInfo {
  key: MenuKey
  keyPath: MenuKey[]
  domEvent: MouseEvent | KeyboardEvent
}

// ---------------------------------------------------------------------------
// Menu
// ---------------------------------------------------------------------------

export interface MenuProps {
  /** Menu display mode */
  mode?: MenuMode
  /** Color theme */
  theme?: MenuTheme
  /** Currently selected keys (controlled) */
  selectedKeys?: MenuKey[]
  /** Default selected keys (uncontrolled) */
  defaultSelectedKeys?: MenuKey[]
  /** Currently open SubMenu keys (controlled) */
  openKeys?: MenuKey[]
  /** Default open SubMenu keys (uncontrolled) */
  defaultOpenKeys?: MenuKey[]
  /** Whether menu items are selectable */
  selectable?: boolean
  /** Allow selecting multiple items */
  multiple?: boolean
  /** Collapse inline menu to icons only */
  inlineCollapsed?: boolean
  /** Indent width per level in inline mode (px) */
  inlineIndent?: number
  /** How SubMenus are triggered */
  triggerSubMenuAction?: TriggerSubMenuAction
  /** Custom popup container for SubMenu popups */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement
  /** Data-driven menu items (alternative to slots) */
  items?: ItemType[]
}

export const menuDefaultProps = {
  mode: 'vertical' as MenuMode,
  theme: 'light' as MenuTheme,
  selectable: true,
  multiple: false,
  inlineCollapsed: false,
  inlineIndent: 24,
  triggerSubMenuAction: 'hover' as TriggerSubMenuAction,
} as const

export interface MenuEmits {
  (e: 'update:selectedKeys', keys: MenuKey[]): void
  (e: 'update:openKeys', keys: MenuKey[]): void
  (e: 'select', info: MenuItemInfo): void
  (e: 'deselect', info: MenuItemInfo): void
  (e: 'click', info: MenuItemInfo): void
  (e: 'openChange', keys: MenuKey[]): void
}

export interface MenuSlots {
  default?: Slot
  expandIcon?: ScopedSlot<{ isOpen: boolean }>
  overflowedIndicator?: Slot
}

// ---------------------------------------------------------------------------
// MenuItem
// ---------------------------------------------------------------------------

export interface MenuItemProps {
  /** Unique key for the item. Falls back to auto-generated if not provided. */
  itemKey?: MenuKey
  /** Whether the item is disabled */
  disabled?: boolean
  /** Show item in danger (red) style */
  danger?: boolean
  /** Title attribute for accessibility / collapsed tooltip */
  title?: string
}

export const menuItemDefaultProps = {
  disabled: false,
  danger: false,
} as const

export interface MenuItemSlots {
  default?: Slot
  icon?: Slot
}

// ---------------------------------------------------------------------------
// SubMenu
// ---------------------------------------------------------------------------

export interface SubMenuProps {
  /** Unique key for the submenu */
  menuKey?: MenuKey
  /** SubMenu title text */
  title?: string
  /** Whether the submenu is disabled */
  disabled?: boolean
  /** Class for the popup menu */
  popupClassName?: string
  /** Offset for the popup [x, y] */
  popupOffset?: [number, number]
}

export const subMenuDefaultProps = {
  disabled: false,
} as const

export interface SubMenuSlots {
  default?: Slot
  title?: Slot
  icon?: Slot
  expandIcon?: ScopedSlot<{ isOpen: boolean }>
}

// ---------------------------------------------------------------------------
// MenuItemGroup
// ---------------------------------------------------------------------------

export interface MenuItemGroupProps {
  /** Group title text */
  title?: string
}

export interface MenuItemGroupSlots {
  default?: Slot
  title?: Slot
}

// ---------------------------------------------------------------------------
// MenuDivider
// ---------------------------------------------------------------------------

export interface MenuDividerProps {
  /** Dashed line style */
  dashed?: boolean
}

// ---------------------------------------------------------------------------
// Data-driven items (items prop)
// ---------------------------------------------------------------------------

export interface MenuItemDataType {
  key: MenuKey
  label?: string | VNodeChild
  disabled?: boolean
  danger?: boolean
  icon?: VNodeChild
  title?: string
}

export interface SubMenuDataType {
  key: MenuKey
  label?: string | VNodeChild
  disabled?: boolean
  icon?: VNodeChild
  children?: ItemType[]
  popupClassName?: string
  popupOffset?: [number, number]
}

export interface MenuItemGroupDataType {
  type: 'group'
  label?: string | VNodeChild
  children?: ItemType[]
}

export interface MenuDividerDataType {
  type: 'divider'
  dashed?: boolean
}

export type ItemType = MenuItemDataType | SubMenuDataType | MenuItemGroupDataType | MenuDividerDataType

/** Type guard: divider */
export function isDividerItem(item: ItemType): item is MenuDividerDataType {
  return (item as any).type === 'divider'
}

/** Type guard: group */
export function isGroupItem(item: ItemType): item is MenuItemGroupDataType {
  return (item as any).type === 'group'
}

/** Type guard: submenu (has children but not a group) */
export function isSubMenuItem(item: ItemType): item is SubMenuDataType {
  return !!(item as any).children && (item as any).type !== 'group'
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

export interface MenuContextType {
  mode: Ref<MenuMode>
  theme: Ref<MenuTheme>
  selectedKeys: Ref<MenuKey[]>
  openKeys: Ref<MenuKey[]>
  inlineCollapsed: Ref<boolean>
  inlineIndent: Ref<number>
  triggerSubMenuAction: Ref<TriggerSubMenuAction>
  getPopupContainer?: Ref<((triggerNode: HTMLElement) => HTMLElement) | undefined>
  isDropdownMenu: boolean
  onItemClick: (info: MenuItemInfo) => void
  onSubMenuOpenChange: (key: MenuKey, open: boolean) => void
}

export const menuContextKey: InjectionKey<MenuContextType> = Symbol('menuContext')

/** Tracks the nesting level inside SubMenus */
export interface SubMenuLevelContext {
  level: number
  parentKeys: MenuKey[]
}

export const subMenuLevelKey: InjectionKey<SubMenuLevelContext> = Symbol('subMenuLevel')
