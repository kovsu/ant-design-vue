<script setup lang="ts">
import { computed, inject, onMounted, onBeforeUnmount, ref, watch, useSlots } from 'vue'
import type { FormItemProps, FormItemSlots, ValidateStatus, Rule } from './types'
import { formContextKey } from './context'
import type { FormItemField } from './context'
import { validateRules } from './validate'

defineOptions({ name: 'AFormItem' })
const props = withDefaults(defineProps<FormItemProps>(), {
  required: undefined,
  colon: undefined,
  hasFeedback: undefined,
})
defineSlots<FormItemSlots>()
const slots = useSlots()

const formContext = inject(formContextKey, null)

// ── NamePath helpers ──
function toNamePath(name: any): string[] {
  if (name === undefined || name === null) return []
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

// ── Computed name path ──
const namePath = computed(() => toNamePath(props.name))

// ── Field ID for scrolling ──
const fieldId = computed(() => namePath.value.join('_'))

// ── Get value from model ──
const fieldValue = computed(() => {
  if (!formContext?.model.value || namePath.value.length === 0) return undefined
  return getValueByNamePath(formContext.model.value, namePath.value)
})

// ── Get rules ──
const mergedRules = computed<Rule[]>(() => {
  // Own rules take priority
  if (props.rules && props.rules.length > 0) return props.rules

  // Fallback to form-level rules
  if (formContext?.rules.value && namePath.value.length > 0) {
    const key = namePath.value.join('.')
    const formRules = formContext.rules.value[key]
    if (formRules) {
      return Array.isArray(formRules) ? formRules : [formRules]
    }
    // Try with simple name (for flat models)
    if (namePath.value.length === 1) {
      const simpleRules = formContext.rules.value[namePath.value[0]]
      if (simpleRules) {
        return Array.isArray(simpleRules) ? simpleRules : [simpleRules]
      }
    }
  }

  return []
})

// ── Required state ──
const isRequired = computed(() => {
  if (props.required !== undefined) return props.required
  return mergedRules.value.some((rule) => rule.required)
})

// ── Validation state ──
const internalValidateStatus = ref<ValidateStatus>('')
const internalErrors = ref<string[]>([])
const internalWarnings = ref<string[]>([])

const mergedValidateStatus = computed<ValidateStatus>(() => {
  if (props.validateStatus !== undefined) return props.validateStatus
  return internalValidateStatus.value
})

const mergedHelp = computed(() => {
  if (props.help !== undefined) return props.help
  if (internalErrors.value.length > 0) return internalErrors.value[0]
  if (internalWarnings.value.length > 0) return internalWarnings.value[0]
  return ''
})

const showHelp = computed(() => {
  return !!mergedHelp.value || !!slots.help
})

const showExtra = computed(() => {
  return !!props.extra || !!slots.extra
})

// ── Validate trigger ──
const mergedValidateTrigger = computed(() => {
  const trigger = props.validateTrigger || formContext?.validateTrigger.value || 'change'
  if (Array.isArray(trigger)) return trigger
  return [trigger]
})

// ── Do validation ──
async function doValidate(): Promise<{ errors: string[]; warnings: string[] }> {
  if (mergedRules.value.length === 0) {
    internalValidateStatus.value = ''
    internalErrors.value = []
    internalWarnings.value = []
    return { errors: [], warnings: [] }
  }

  internalValidateStatus.value = 'validating'

  const result = await validateRules(mergedRules.value, fieldValue.value)

  if (result.errors.length > 0) {
    internalValidateStatus.value = 'error'
  } else if (result.warnings.length > 0) {
    internalValidateStatus.value = 'warning'
  } else {
    internalValidateStatus.value = 'success'
  }

  internalErrors.value = result.errors
  internalWarnings.value = result.warnings

  return result
}

function resetField() {
  internalValidateStatus.value = ''
  internalErrors.value = []
  internalWarnings.value = []
}

function clearValidate() {
  internalValidateStatus.value = ''
  internalErrors.value = []
  internalWarnings.value = []
}

// ── Watch field value for change trigger ──
watch(
  fieldValue,
  () => {
    if (mergedValidateTrigger.value.includes('change') && mergedRules.value.length > 0) {
      doValidate()
    }
  },
  { deep: true },
)

// ── Handle blur event delegation ──
function handleBlur() {
  if (mergedValidateTrigger.value.includes('blur') && mergedRules.value.length > 0) {
    doValidate()
  }
}

// ── Register with parent form ──
const field: FormItemField = {
  name: props.name,
  validate: doValidate,
  resetField,
  clearValidate,
  getNamePath: () => namePath.value,
}

onMounted(() => {
  if (formContext && props.name !== undefined) {
    formContext.addField(field)
  }
})

onBeforeUnmount(() => {
  if (formContext && props.name !== undefined) {
    formContext.removeField(field)
  }
})

// ── Layout from context ──
const mergedLayout = computed(() => formContext?.layout.value || 'horizontal')
const mergedLabelCol = computed(() => props.labelCol || formContext?.labelCol.value)
const mergedWrapperCol = computed(() => props.wrapperCol || formContext?.wrapperCol.value)
const mergedColon = computed(() => props.colon ?? formContext?.colon.value ?? true)
const mergedLabelAlign = computed(() => props.labelAlign || formContext?.labelAlign.value || 'right')
const isDisabled = computed(() => formContext?.disabled.value)

// ── Show label ──
const showLabel = computed(() => {
  return !!props.label || !!slots.label
})

// ── Required mark display ──
const showRequiredMark = computed(() => {
  const requiredMark = formContext?.requiredMark.value
  if (requiredMark === false) return false
  return isRequired.value
})

const showOptionalMark = computed(() => {
  return formContext?.requiredMark.value === 'optional' && !isRequired.value
})

// ── CSS classes ──
const formItemClasses = computed(() => ({
  'ant-form-item': true,
  'ant-form-item-has-error': mergedValidateStatus.value === 'error',
  'ant-form-item-has-warning': mergedValidateStatus.value === 'warning',
  'ant-form-item-has-success': mergedValidateStatus.value === 'success',
  'ant-form-item-is-validating': mergedValidateStatus.value === 'validating',
  'ant-form-item-has-feedback': props.hasFeedback,
}))

const labelClasses = computed(() => ({
  'ant-form-item-label': true,
  'ant-form-item-label-left': mergedLabelAlign.value === 'left',
  'ant-form-item-label-wrap': formContext?.labelWrap.value,
}))

const labelColStyle = computed(() => {
  const col = mergedLabelCol.value
  if (!col) return {}
  const style: Record<string, string> = {}
  if (col.span !== undefined) {
    const width = `${(col.span / 24) * 100}%`
    style.width = width
    style.maxWidth = width
  }
  if (col.offset !== undefined) {
    style.marginInlineStart = `${(col.offset / 24) * 100}%`
  }
  return style
})

const wrapperClasses = computed(() => ({
  'ant-form-item-control': true,
}))

const wrapperColStyle = computed(() => {
  const col = mergedWrapperCol.value
  if (!col) return {}
  const style: Record<string, string> = {}
  if (col.span !== undefined) {
    const width = `${(col.span / 24) * 100}%`
    style.width = width
    style.maxWidth = width
  }
  if (col.offset !== undefined) {
    style.marginInlineStart = `${(col.offset / 24) * 100}%`
  }
  return style
})

const explainClasses = computed(() => ({
  'ant-form-item-explain': true,
  'ant-form-item-explain-error': mergedValidateStatus.value === 'error',
  'ant-form-item-explain-warning': mergedValidateStatus.value === 'warning',
  'ant-form-item-explain-success': mergedValidateStatus.value === 'success',
}))

// ── Feedback icon ──
const feedbackIconText = computed(() => {
  if (!props.hasFeedback) return ''
  switch (mergedValidateStatus.value) {
    case 'success':
      return '\u2713'
    case 'error':
      return '\u2717'
    case 'warning':
      return '!'
    case 'validating':
      return '\u27F3'
    default:
      return ''
  }
})
</script>

<template>
  <div :class="formItemClasses" :data-field-id="fieldId" @focusout="handleBlur">
    <div v-if="showLabel" :class="labelClasses" :style="labelColStyle">
      <label :for="fieldId || undefined">
        <span v-if="showRequiredMark" class="ant-form-item-required" aria-hidden="true">*</span>
        <slot name="label">{{ label }}</slot>
        <span v-if="showOptionalMark" class="ant-form-item-optional">(optional)</span>
        <span v-if="mergedColon && mergedLayout !== 'vertical'" class="ant-form-item-colon">:</span>
        <span v-if="tooltip" class="ant-form-item-tooltip">
          <slot name="tooltip">{{ tooltip }}</slot>
        </span>
      </label>
    </div>
    <div :class="wrapperClasses" :style="wrapperColStyle">
      <div class="ant-form-item-control-input">
        <div class="ant-form-item-control-input-content">
          <slot />
        </div>
        <span v-if="hasFeedback && feedbackIconText" class="ant-form-item-feedback-icon">
          {{ feedbackIconText }}
        </span>
      </div>
      <div v-if="showHelp" :class="explainClasses">
        <slot name="help">{{ mergedHelp }}</slot>
      </div>
      <div v-if="showExtra" class="ant-form-item-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
    </div>
  </div>
</template>
