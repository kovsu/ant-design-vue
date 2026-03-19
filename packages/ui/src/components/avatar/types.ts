import type { InjectionKey, Ref } from 'vue'
import type { Slot } from '@/utils/types'

export type AvatarSize = 'large' | 'small' | 'default' | number
export type AvatarShape = 'circle' | 'square'

export interface AvatarProps {
  /** Shape of avatar */
  shape?: AvatarShape
  /** Size of avatar */
  size?: AvatarSize
  /** Image URL */
  src?: string
  /** srcSet for responsive images */
  srcset?: string
  /** Alt text for image */
  alt?: string
  /** Gap for text scaling (px) */
  gap?: number
  /** Draggable attribute for image */
  draggable?: boolean
  /** Cross origin for image */
  crossOrigin?: '' | 'anonymous' | 'use-credentials'
}

export const avatarDefaultProps = {
  shape: 'circle',
  size: 'default',
  gap: 4,
} as const

export interface AvatarEmits {
  (e: 'error', event: Event): boolean | void
}

export interface AvatarSlots {
  default?: Slot
  icon?: Slot
}

export interface AvatarGroupProps {
  /** Max avatars to show */
  maxCount?: number
  /** Style for the "+N" avatar */
  maxStyle?: Record<string, string>
  /** Size for all avatars in group */
  size?: AvatarSize
  /** Shape for all avatars in group */
  shape?: AvatarShape
}

export const avatarGroupDefaultProps = {
  size: 'default',
  shape: 'circle',
} as const

export interface AvatarGroupSlots {
  default?: Slot
}

// Context for group -> avatar communication
export interface AvatarContextType {
  size: Ref<AvatarSize>
  shape: Ref<AvatarShape>
}

export const avatarContextKey: InjectionKey<AvatarContextType> = Symbol('avatarContext')
