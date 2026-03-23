<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import type { RadioProps, RadioEmits, RadioSlots } from './types'
import { radioGroupContextKey } from './types'

defineOptions({ name: 'ARadio' })
const props = defineProps<RadioProps>()
const emit = defineEmits<RadioEmits>()
defineSlots<RadioSlots>()

const inputRef = ref<HTMLInputElement | null>(null)
const groupContext = inject(radioGroupContextKey, null)

const isChecked = computed(() => {
  if (groupContext) {
    return groupContext.value.value === props.value
  }
  return props.checked ?? false
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
  'ant-radio-wrapper': true,
  'ant-radio-wrapper-checked': isChecked.value,
  'ant-radio-wrapper-disabled': isDisabled.value,
}))

const radioClasses = computed(() => ({
  'ant-radio': true,
  'ant-radio-checked': isChecked.value,
  'ant-radio-disabled': isDisabled.value,
}))

function handleChange(event: Event) {
  if (isDisabled.value) return

  if (groupContext) {
    groupContext.setValue(props.value)
  } else {
    emit('update:checked', true)
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
    <span :class="radioClasses">
      <input
        :id="id"
        ref="inputRef"
        type="radio"
        class="ant-radio-input"
        :checked="isChecked"
        :disabled="isDisabled"
        :name="resolvedName"
        role="radio"
        :aria-checked="isChecked"
        @change="handleChange"
      />
      <span class="ant-radio-inner" />
    </span>
    <span v-if="$slots.default" class="ant-radio-label">
      <slot />
    </span>
  </label>
</template>
