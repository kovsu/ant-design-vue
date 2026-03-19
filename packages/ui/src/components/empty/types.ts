import type { Slot } from '@/utils/types'

export interface EmptyProps {
  /** Custom description text */
  description?: string | false
  /** Custom image (as URL string) */
  image?: string
  /** Image style override */
  imageStyle?: Record<string, string>
}

export const emptyDefaultProps = {} as const

export interface EmptySlots {
  default?: Slot
  description?: Slot
  image?: Slot
}
