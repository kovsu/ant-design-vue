import type { Slot } from '@/utils/types'
import type { InjectionKey, Ref } from 'vue'

export interface RadioProps {
  /** Whether radio is checked (v-model:checked) */
  checked?: boolean
  /** Value used when inside a RadioGroup */
  value?: any
  /** Whether radio is disabled */
  disabled?: boolean
  /** Whether to auto-focus on mount */
  autofocus?: boolean
  /** Element id */
  id?: string
  /** Input name attribute */
  name?: string
}

export interface RadioEmits {
  (e: 'update:checked', checked: boolean): void
  (e: 'change', event: Event): void
}

export interface RadioSlots {
  /** Label content */
  default?: Slot
}

export interface RadioOptionType {
  label?: string
  value: any
  disabled?: boolean
}

export interface RadioGroupProps {
  /** Selected value (v-model:value) */
  value?: any
  /** Default selected value (uncontrolled) */
  defaultValue?: any
  /** Options for rendering radios */
  options?: (string | number | RadioOptionType)[]
  /** Whether all radios are disabled */
  disabled?: boolean
  /** Name attribute for all child radios */
  name?: string
  /** Size of radio buttons */
  size?: 'large' | 'default' | 'small'
  /** Style of radio buttons */
  buttonStyle?: 'outline' | 'solid'
  /** Type of child options rendered */
  optionType?: 'default' | 'button'
}

export const radioGroupDefaultProps = {
  buttonStyle: 'outline',
  optionType: 'default',
  size: 'default',
} as const

export interface RadioGroupEmits {
  (e: 'update:value', value: any): void
  (e: 'change', event: Event): void
}

export interface RadioGroupSlots {
  default?: Slot
}

export interface RadioGroupContext {
  name: Ref<string | undefined>
  disabled: Ref<boolean>
  value: Ref<any>
  setValue: (val: any) => void
}

export const radioGroupContextKey: InjectionKey<RadioGroupContext> =
  Symbol('radioGroupContext')
