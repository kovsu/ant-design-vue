import type { Slot } from '@/utils/types'
import type { InjectionKey, Ref } from 'vue'

export type CheckboxValueType = string | number | boolean

export interface CheckboxProps {
  /** Whether checkbox is checked (v-model:checked) */
  checked?: boolean
  /** Default checked state (uncontrolled) */
  defaultChecked?: boolean
  /** Value used when inside a CheckboxGroup */
  value?: CheckboxValueType
  /** Whether checkbox is disabled */
  disabled?: boolean
  /** Whether checkbox displays an indeterminate state */
  indeterminate?: boolean
  /** Whether to auto-focus on mount */
  autofocus?: boolean
  /** Element id */
  id?: string
  /** Input name attribute */
  name?: string
}

export const checkboxDefaultProps = {
  indeterminate: false,
} as const

export interface CheckboxEmits {
  (e: 'update:checked', checked: boolean): void
  (e: 'change', event: Event): void
}

export interface CheckboxSlots {
  /** Label content */
  default?: Slot
}

export interface CheckboxOptionType {
  label?: string
  value: CheckboxValueType
  disabled?: boolean
}

export interface CheckboxGroupProps {
  /** Selected values (v-model:value) */
  value?: CheckboxValueType[]
  /** Default selected values (uncontrolled) */
  defaultValue?: CheckboxValueType[]
  /** Options for rendering checkboxes */
  options?: (string | number | CheckboxOptionType)[]
  /** Whether all checkboxes are disabled */
  disabled?: boolean
  /** Name attribute for all child checkboxes */
  name?: string
}

export interface CheckboxGroupEmits {
  (e: 'update:value', value: CheckboxValueType[]): void
  (e: 'change', value: CheckboxValueType[]): void
}

export interface CheckboxGroupSlots {
  default?: Slot
}

export interface CheckboxGroupContext {
  name: Ref<string | undefined>
  disabled: Ref<boolean>
  value: Ref<CheckboxValueType[]>
  toggleValue: (val: CheckboxValueType) => void
}

export const checkboxGroupContextKey: InjectionKey<CheckboxGroupContext> =
  Symbol('checkboxGroupContext')
