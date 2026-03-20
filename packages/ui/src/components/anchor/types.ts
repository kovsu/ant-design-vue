import type { CSSProperties, VNode, InjectionKey, ComputedRef } from 'vue'
import type { Slot } from '@/utils/types'

export type AnchorDirection = 'vertical' | 'horizontal'

export interface AnchorLinkItem {
  key: string | number
  href: string
  title: string
  target?: string
  children?: AnchorLinkItem[]
}

export interface AnchorProps {
  /** Use Affix wrapper */
  affix?: boolean
  /** Offset top for affix */
  offsetTop?: number
  /** Offset for active link detection */
  targetOffset?: number
  /** Tolerance for active detection */
  bounds?: number
  /** Scroll container */
  getContainer?: () => HTMLElement | Window
  /** Direction */
  direction?: AnchorDirection
  /** Declarative link items */
  items?: AnchorLinkItem[]
  /** Override active link detection */
  getCurrentAnchor?: (activeLink: string) => string
  /** Use replace for navigation */
  replace?: boolean
}

export const anchorDefaultProps = {
  affix: false,
  bounds: 5,
  direction: 'vertical' as const,
  replace: false,
} as const

export interface AnchorEmits {
  (e: 'change', currentActiveLink: string): void
  (e: 'click', event: MouseEvent, link: { title: string; href: string }): void
}

export interface AnchorSlots {
  default?: Slot
}

// --- AnchorLink ---

export interface AnchorLinkProps {
  href: string
  title?: string
  target?: string
}

export interface AnchorLinkSlots {
  default?: Slot
  title?: Slot
}

// --- Context ---
export const ANCHOR_KEY = Symbol('anchor') as InjectionKey<AnchorContext>

export interface AnchorContext {
  activeLink: ComputedRef<string>
  registerLink: (href: string) => void
  unregisterLink: (href: string) => void
  handleClick: (e: MouseEvent, link: { title: string; href: string }) => void
}
