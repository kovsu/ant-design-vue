<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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
      <span v-if="loading" class="ant-switch-loading-icon">
        <svg
          class="ant-switch-loading-svg"
          viewBox="0 0 1024 1024"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.3 199.3 0 19.9-16.1 36-36 36z"
          />
        </svg>
      </span>
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
