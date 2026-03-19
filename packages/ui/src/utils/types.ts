import type { VNode } from 'vue'

/**
 * Utility: value or array of values.
 * Useful for TSX users who pass array event handlers: `onClick={[h1, h2]}`
 */
export type MaybeArray<T> = T | T[]

/**
 * Slot render function return type.
 * Accepts anything Vue can render in a slot.
 */
export type SlotReturnType = VNode | VNode[] | string | number | boolean | null | undefined

/**
 * Define a slot with no parameters.
 *
 * @example
 * interface ButtonSlots {
 *   default?: Slot
 *   icon?: Slot
 * }
 */
export type Slot = () => SlotReturnType

/**
 * Define a scoped slot with a single props object parameter.
 * Users destructure props at the call site: `#default="{ value }"`.
 *
 * @example
 * interface ProgressSlots {
 *   format?: ScopedSlot<{ percent: number }>
 * }
 */
export type ScopedSlot<T extends Record<string, any>> = (props: T) => SlotReturnType
