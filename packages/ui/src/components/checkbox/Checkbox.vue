<script setup lang="ts">
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue'
import type { CheckboxProps, CheckboxEmits, CheckboxSlots } from './types'
import { checkboxDefaultProps, checkboxGroupContextKey } from './types'

defineOptions({ name: 'ACheckbox' })
const props = withDefaults(defineProps<CheckboxProps>(), checkboxDefaultProps)
const emit = defineEmits<CheckboxEmits>()
defineSlots<CheckboxSlots>()

const inputRef = ref<HTMLInputElement | null>(null)
const groupContext = inject(checkboxGroupContextKey, null)
const instance = getCurrentInstance()

// Uncontrolled internal state
const internalChecked = ref(props.defaultChecked ?? false)

const isChecked = computed(() => {
  if (groupContext) {
    return groupContext.value.value.includes(props.value as any)
  }
  // Vue boolean-casts absent boolean props to `false`, so we need to
  // check the vnode props to determine if `checked` was explicitly passed.
  const vnodeProps = instance?.vnode.props
  const hasCheckedProp =
    vnodeProps && ('checked' in vnodeProps || 'onUpdate:checked' in vnodeProps)
  if (hasCheckedProp) {
    return props.checked
  }
  return internalChecked.value
})

const isDisabled = computed(() => {
  if (groupContext) {
    return groupContext.disabled.value || props.disabled
  }
  return props.disabled
})

const resolvedName = computed(() => {
  if (groupContext) {
    return groupContext.name.value
  }
  return props.name
})

const wrapperClasses = computed(() => ({
  'ant-checkbox-wrapper': true,
  'ant-checkbox-wrapper-checked': isChecked.value,
  'ant-checkbox-wrapper-disabled': isDisabled.value,
}))

const checkboxClasses = computed(() => ({
  'ant-checkbox': true,
  'ant-checkbox-checked': isChecked.value,
  'ant-checkbox-indeterminate': !isChecked.value && props.indeterminate,
  'ant-checkbox-disabled': isDisabled.value,
}))

function handleChange(event: Event) {
  if (isDisabled.value) return

  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (groupContext) {
    groupContext.toggleValue(props.value as any)
  } else {
    internalChecked.value = checked
    emit('update:checked', checked)
  }
  emit('change', event)
}

function focus() {
  inputRef.value?.focus()
}

function blur() {
  inputRef.value?.blur()
}

onMounted(() => {
  if (props.autofocus) {
    inputRef.value?.focus()
  }
})

defineExpose({ focus, blur })
</script>

<template>
  <label :class="wrapperClasses">
    <span :class="checkboxClasses">
      <input
        :id="id"
        ref="inputRef"
        type="checkbox"
        class="ant-checkbox-input"
        :checked="isChecked"
        :disabled="isDisabled"
        :name="resolvedName"
        role="checkbox"
        :aria-checked="indeterminate ? 'mixed' : isChecked"
        @change="handleChange"
      />
      <span class="ant-checkbox-inner" />
    </span>
    <span v-if="$slots.default" class="ant-checkbox-label">
      <slot />
    </span>
  </label>
</template>
