import type { Slot } from '@/utils/types'

export type SpaceSizePreset = 'small' | 'middle' | 'large'
export type SpaceSize = SpaceSizePreset | number

export interface SpaceProps {
  /** Size of spacing: preset name, number (px), or [horizontal, vertical] */
  size?: SpaceSize | [SpaceSize, SpaceSize]
  /** Layout direction */
  direction?: 'horizontal' | 'vertical'
  /** Alignment of items */
  align?: 'start' | 'end' | 'center' | 'baseline'
  /** Enable wrapping */
  wrap?: boolean
}

export const spaceDefaultProps = {
  size: 'small' as SpaceSize,
  direction: 'horizontal',
} as const

export interface SpaceSlots {
  default?: Slot
  split?: Slot
}

export interface SpaceCompactProps {
  /** Size of compact items */
  size?: 'small' | 'middle' | 'large'
  /** Layout direction */
  direction?: 'horizontal' | 'vertical'
  /** Full-width block display */
  block?: boolean
}

export const spaceCompactDefaultProps = {
  direction: 'horizontal',
} as const

export const SPACE_SIZE_MAP: Record<SpaceSizePreset, number> = {
  small: 8,
  middle: 16,
  large: 24,
}

// Compact context
export interface SpaceCompactContext {
  compactSize?: string
  compactDirection?: string
}

export const spaceCompactContextKey = Symbol('spaceCompact') as import('vue').InjectionKey<SpaceCompactContext>
