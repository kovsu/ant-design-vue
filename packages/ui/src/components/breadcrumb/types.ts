import type { Slot } from '@/utils/types'
import type { InjectionKey, Ref } from 'vue'

export interface BreadcrumbProps {
  /** Separator between items */
  separator?: string
}

export const breadcrumbDefaultProps = {
  separator: '/',
} as const

export interface BreadcrumbSlots {
  default?: Slot
  separator?: Slot
}

export interface BreadcrumbItemProps {
  /** Link URL. When provided, renders as an anchor tag */
  href?: string
}

export interface BreadcrumbItemEmits {
  (e: 'click', event: MouseEvent): void
}

export interface BreadcrumbItemSlots {
  default?: Slot
  separator?: Slot
}

/** Context for parent Breadcrumb to child BreadcrumbItem communication */
export interface BreadcrumbContextType {
  separator: Ref<string>
}

export const breadcrumbContextKey: InjectionKey<BreadcrumbContextType> = Symbol('breadcrumbContext')
