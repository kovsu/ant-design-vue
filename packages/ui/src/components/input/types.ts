import type { Slot } from '@/utils/types'

export type InputSize = 'small' | 'middle' | 'large'
export type InputStatus = 'error' | 'warning'

export interface InputProps {
  value?: string | number
  defaultValue?: string | number
  placeholder?: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  size?: InputSize
  allowClear?: boolean
  showCount?: boolean
  status?: InputStatus
  bordered?: boolean
  autofocus?: boolean
  id?: string
  name?: string
  /** Prefix content (string shorthand; use #prefix slot for VNode) */
  prefix?: string
  /** Suffix content (string shorthand; use #suffix slot for VNode) */
  suffix?: string
}

export const inputDefaultProps = {
  type: 'text',
  bordered: true,
} as const

export interface InputEmits {
  (e: 'update:value', value: string): void
  (e: 'change', event: Event): void
  (e: 'input', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'pressEnter', event: KeyboardEvent): void
  (e: 'clear'): void
}

export interface InputSlots {
  prefix?: Slot
  suffix?: Slot
  addonBefore?: Slot
  addonAfter?: Slot
  clearIcon?: Slot
}

export interface TextAreaProps {
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  rows?: number
  maxlength?: number
  showCount?: boolean
  autoSize?: boolean | { minRows?: number; maxRows?: number }
  size?: InputSize
  bordered?: boolean
  status?: InputStatus
  autofocus?: boolean
  id?: string
  name?: string
}

export const textAreaDefaultProps = {
  bordered: true,
} as const

export interface TextAreaEmits {
  (e: 'update:value', value: string): void
  (e: 'change', event: Event): void
  (e: 'input', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'pressEnter', event: KeyboardEvent): void
}

export interface TextAreaSlots {
  count?: Slot
}

export interface PasswordProps {
  value?: string
  placeholder?: string
  disabled?: boolean
  size?: InputSize
  bordered?: boolean
  status?: InputStatus
  visibilityToggle?: boolean
  visible?: boolean
}

export const passwordDefaultProps = {
  bordered: true,
  visibilityToggle: true,
} as const

export interface PasswordEmits {
  (e: 'update:value', value: string): void
  (e: 'update:visible', visible: boolean): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'pressEnter', event: KeyboardEvent): void
}

export interface SearchProps {
  value?: string
  placeholder?: string
  disabled?: boolean
  size?: InputSize
  bordered?: boolean
  status?: InputStatus
  enterButton?: boolean | string
  loading?: boolean
  allowClear?: boolean
}

export const searchDefaultProps = {
  bordered: true,
  enterButton: false,
  loading: false,
} as const

export interface SearchEmits {
  (e: 'update:value', value: string): void
  (e: 'search', value: string, event: Event): void
  (e: 'change', event: Event): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'pressEnter', event: KeyboardEvent): void
}
