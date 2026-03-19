import type { CSSProperties } from 'vue'

export type FlexGapSize = 'small' | 'middle' | 'large'

export interface FlexProps {
  /** Flex direction vertical */
  vertical?: boolean
  /** CSS flex-wrap */
  wrap?: CSSProperties['flexWrap'] | boolean
  /** CSS justify-content */
  justify?: CSSProperties['justifyContent']
  /** CSS align-items */
  align?: CSSProperties['alignItems']
  /** CSS flex shorthand */
  flex?: CSSProperties['flex']
  /** Gap between items — preset name, number (px), or CSS value */
  gap?: FlexGapSize | CSSProperties['gap']
  /** HTML tag to render, defaults to 'div' */
  component?: string
}

export const flexDefaultProps = {
  component: 'div',
} as const
