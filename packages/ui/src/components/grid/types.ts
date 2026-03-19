import type { InjectionKey, ComputedRef } from 'vue'
import type { Breakpoint } from '@/hooks'

export type ColSpanType = number | string

export interface ColSize {
  span?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
  order?: ColSpanType
}

export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch'
export type RowJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'

export type Gutter = number | Partial<Record<Breakpoint, number>>

export interface RowProps {
  /** Horizontal alignment of columns */
  align?: RowAlign | Partial<Record<Breakpoint, RowAlign>>
  /** Horizontal arrangement of columns */
  justify?: RowJustify | Partial<Record<Breakpoint, RowJustify>>
  /** Spacing between columns: number, [h, v], or responsive object */
  gutter?: Gutter | [Gutter, Gutter]
  /** Enable flex wrap */
  wrap?: boolean
}

export const rowDefaultProps = {
  wrap: true,
} as const

export interface ColProps {
  /** Number of cells to span (0-24). 0 = hidden */
  span?: ColSpanType
  /** Number of cells to offset from left */
  offset?: ColSpanType
  /** Cells to push right */
  push?: ColSpanType
  /** Cells to pull left */
  pull?: ColSpanType
  /** Flex order */
  order?: ColSpanType
  /** CSS flex shorthand */
  flex?: number | string
  /** Responsive config for each breakpoint */
  xs?: ColSpanType | ColSize
  sm?: ColSpanType | ColSize
  md?: ColSpanType | ColSize
  lg?: ColSpanType | ColSize
  xl?: ColSpanType | ColSize
  xxl?: ColSpanType | ColSize
}

// Row context injected into Cols
export interface RowContext {
  gutter: ComputedRef<[number, number]>
  wrap: ComputedRef<boolean>
}

export const rowContextKey: InjectionKey<RowContext> = Symbol('rowContext')
