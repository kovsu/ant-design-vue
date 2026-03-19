import type { Slot } from '@/utils/types'

export interface InputNumberProps {
  value?: number | string
  defaultValue?: number | string
  min?: number
  max?: number
  step?: number
  precision?: number
  disabled?: boolean
  readonly?: boolean
  size?: 'small' | 'middle' | 'large'
  placeholder?: string
  controls?: boolean
  bordered?: boolean
  status?: 'error' | 'warning'
  keyboard?: boolean
  stringMode?: boolean
  autofocus?: boolean
  id?: string
  name?: string
  formatter?: (value: number | string | undefined) => string
  parser?: (value: string) => number | string
}

export const inputNumberDefaultProps = {
  step: 1,
  controls: true,
  bordered: true,
  keyboard: true,
} as const

export interface InputNumberEmits {
  (e: 'update:value', value: number | string | null): void
  (e: 'change', value: number | string | null): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'pressEnter', event: KeyboardEvent): void
  (e: 'step', value: number, info: { offset: number; type: 'up' | 'down' }): void
}

export interface InputNumberSlots {
  prefix?: Slot
  addonBefore?: Slot
  addonAfter?: Slot
  upIcon?: Slot
  downIcon?: Slot
}
