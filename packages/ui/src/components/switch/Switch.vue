<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import LoadingOutlined from '@ant-design/icons-vue/LoadingOutlined'
import type { SwitchProps, SwitchEmits, SwitchSlots } from './types'
import { switchDefaultProps } from './types'

defineOptions({ name: 'ASwitch' })
const props = withDefaults(defineProps<SwitchProps>(), switchDefaultProps)
const emit = defineEmits<SwitchEmits>()
defineSlots<SwitchSlots>()

const buttonRef = ref<HTMLButtonElement | null>(null)

// Internal state for uncontrolled mode
const internalChecked = ref(props.checked ?? props.unCheckedValue)

const mergedChecked = computed(() => {
  return props.checked ?? internalChecked.value
})

const isChecked = computed(() => {
  return mergedChecked.value === props.checkedValue
})

const classes = computed(() => ({
  'ant-switch': true,
  'ant-switch-checked': isChecked.value,
  'ant-switch-disabled': props.disabled,
  'ant-switch-loading': props.loading,
  'ant-switch-small': props.size === 'small',
}))

function toggle(event: MouseEvent) {
  if (props.disabled || props.loading) return

  const newValue = isChecked.value ? props.unCheckedValue! : props.checkedValue!
  internalChecked.value = newValue
  emit('update:checked', newValue)
  emit('change', newValue, event)
  emit('click', newValue, event)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    toggle(event as unknown as MouseEvent)
  }
}

function focus() {
  buttonRef.value?.focus()
}

function blur() {
  buttonRef.value?.blur()
}

onMounted(() => {
  if (props.autofocus) {
    buttonRef.value?.focus()
  }
})

defineExpose({ focus, blur })
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    role="switch"
    :aria-checked="isChecked"
    :class="classes"
    :disabled="disabled || loading"
    :id="id"
    @click="toggle"
    @keydown="handleKeydown"
  >
    <div class="ant-switch-handle">
      <LoadingOutlined v-if="loading" class="ant-switch-loading-icon" />
    </div>
    <span class="ant-switch-inner">
      <span v-if="isChecked" class="ant-switch-inner-checked">
        <slot name="checkedChildren" />
      </span>
      <span v-else class="ant-switch-inner-unchecked">
        <slot name="unCheckedChildren" />
      </span>
    </span>
  </button>
</template>
