import type { InjectionKey, ComputedRef } from 'vue'
import type { Rule, ColProps, NamePath } from './types'

export interface FormContext {
  model: ComputedRef<Record<string, any> | undefined>
  rules: ComputedRef<Record<string, Rule | Rule[]> | undefined>
  layout: ComputedRef<string>
  labelCol: ComputedRef<ColProps | undefined>
  wrapperCol: ComputedRef<ColProps | undefined>
  colon: ComputedRef<boolean>
  requiredMark: ComputedRef<boolean | 'optional' | undefined>
  validateTrigger: ComputedRef<string | string[] | undefined>
  labelAlign: ComputedRef<'left' | 'right'>
  labelWrap: ComputedRef<boolean>
  disabled: ComputedRef<boolean | undefined>
  size: ComputedRef<string | undefined>
  addField: (field: FormItemField) => void
  removeField: (field: FormItemField) => void
}

export interface FormItemField {
  name: NamePath | undefined
  validate: () => Promise<{ errors: string[]; warnings: string[] }>
  resetField: () => void
  clearValidate: () => void
  getNamePath: () => string[]
}

export const formContextKey: InjectionKey<FormContext> = Symbol('formContext')
