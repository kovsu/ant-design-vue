<script setup lang="ts">
import { computed, provide, reactive, onMounted, onBeforeUnmount } from 'vue'
import type { FormProps, FormEmits, FormSlots, NamePath, FieldError } from './types'
import { formDefaultProps } from './types'
import { formContextKey } from './context'
import type { FormItemField } from './context'

defineOptions({ name: 'AForm' })
const props = withDefaults(defineProps<FormProps>(), formDefaultProps)
const emit = defineEmits<FormEmits>()
defineSlots<FormSlots>()

// ── Field registration ──
const fields: FormItemField[] = reactive([])

function addField(field: FormItemField) {
  fields.push(field)
}

function removeField(field: FormItemField) {
  const index = fields.indexOf(field)
  if (index !== -1) fields.splice(index, 1)
}

// ── Provide context ──
provide(formContextKey, {
  model: computed(() => props.model),
  rules: computed(() => props.rules),
  layout: computed(() => props.layout!),
  labelCol: computed(() => props.labelCol),
  wrapperCol: computed(() => props.wrapperCol),
  colon: computed(() => props.colon!),
  requiredMark: computed(() => props.requiredMark),
  validateTrigger: computed(() => props.validateTrigger),
  labelAlign: computed(() => props.labelAlign!),
  labelWrap: computed(() => props.labelWrap!),
  disabled: computed(() => props.disabled),
  size: computed(() => props.size),
  addField,
  removeField,
})

// ── NamePath helpers ──
function toNamePath(name: NamePath): string[] {
  if (Array.isArray(name)) return name.map(String)
  return [String(name)]
}

function getValueByNamePath(model: Record<string, any>, namePath: string[]): any {
  let current: any = model
  for (const key of namePath) {
    if (current == null) return undefined
    current = current[key]
  }
  return current
}

function setValueByNamePath(model: Record<string, any>, namePath: string[], value: any) {
  let current: any = model
  for (let i = 0; i < namePath.length - 1; i++) {
    const key = namePath[i]
    if (current[key] == null) current[key] = {}
    current = current[key]
  }
  current[namePath[namePath.length - 1]] = value
}

function matchNamePath(fieldPath: string[], target: string[]): boolean {
  if (fieldPath.length !== target.length) return false
  return fieldPath.every((part, i) => part === target[i])
}

// ── Filter fields by nameList ──
function getTargetFields(nameList?: NamePath[]): FormItemField[] {
  if (!nameList || nameList.length === 0) {
    return fields.filter((f) => f.name !== undefined)
  }
  const targetPaths = nameList.map(toNamePath)
  return fields.filter((f) => {
    if (f.name === undefined) return false
    const fieldPath = f.getNamePath()
    return targetPaths.some((tp) => matchNamePath(fieldPath, tp))
  })
}

// ── Public API ──
async function validate(nameList?: NamePath[]): Promise<Record<string, any>> {
  return validateFields(nameList)
}

async function validateFields(nameList?: NamePath[]): Promise<Record<string, any>> {
  const targetFields = getTargetFields(nameList)
  const errorFields: FieldError[] = []

  const results = await Promise.all(
    targetFields.map(async (field) => {
      const result = await field.validate()
      return { field, result }
    }),
  )

  for (const { field, result } of results) {
    if (result.errors.length > 0 || result.warnings.length > 0) {
      errorFields.push({
        name: field.name!,
        errors: result.errors,
        warnings: result.warnings,
      })
    }
  }

  const values = getFieldsValue(true)

  if (errorFields.some((f) => f.errors.length > 0)) {
    return Promise.reject({ values, errorFields })
  }

  return values
}

function resetFields(nameList?: NamePath[]) {
  const targetFields = getTargetFields(nameList)
  targetFields.forEach((field) => field.resetField())
}

function clearValidate(nameList?: NamePath[]) {
  const targetFields = getTargetFields(nameList)
  targetFields.forEach((field) => field.clearValidate())
}

function getFieldsValue(nameList?: NamePath[] | true): Record<string, any> {
  if (!props.model) return {}

  if (nameList === true) {
    // Return all model values
    return { ...props.model }
  }

  if (!nameList || nameList.length === 0) {
    return { ...props.model }
  }

  const result: Record<string, any> = {}
  for (const name of nameList) {
    const path = toNamePath(name)
    const value = getValueByNamePath(props.model, path)
    setValueByNamePath(result, path, value)
  }
  return result
}

function getFieldValue(name: NamePath): any {
  if (!props.model) return undefined
  const path = toNamePath(name)
  return getValueByNamePath(props.model, path)
}

function setFieldValue(name: NamePath, value: any) {
  if (!props.model) return
  const path = toNamePath(name)
  setValueByNamePath(props.model, path, value)
}

function setFieldsValue(values: Record<string, any>) {
  if (!props.model) return
  Object.keys(values).forEach((key) => {
    props.model![key] = values[key]
  })
}

function scrollToField(name: NamePath) {
  if (typeof document === 'undefined') return
  const path = toNamePath(name)
  const fieldId = path.join('_')
  const el = document.querySelector(`[data-field-id="${fieldId}"]`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }
}

// ── Submit handler ──
async function handleSubmit() {
  try {
    const values = await validateFields()
    emit('finish', values)
  } catch (errorInfo: any) {
    emit('finishFailed', errorInfo)
    if (props.scrollToFirstError && errorInfo.errorFields?.length) {
      scrollToField(errorInfo.errorFields[0].name)
    }
  }
}

// ── Layout classes ──
const formClasses = computed(() => ({
  'ant-form': true,
  'ant-form-horizontal': props.layout === 'horizontal',
  'ant-form-vertical': props.layout === 'vertical',
  'ant-form-inline': props.layout === 'inline',
  'ant-form-hide-required-mark': props.hideRequiredMark,
  [`ant-form-${props.size}`]: !!props.size,
}))

defineExpose({
  validate,
  validateFields,
  resetFields,
  clearValidate,
  getFieldsValue,
  getFieldValue,
  setFieldValue,
  setFieldsValue,
  scrollToField,
})
</script>

<template>
  <form :class="formClasses" @submit.prevent="handleSubmit">
    <slot />
  </form>
</template>
