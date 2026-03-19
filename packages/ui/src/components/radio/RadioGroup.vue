<script setup lang="ts">
import { computed, provide, ref, toRef, watch } from 'vue'
import type {
  RadioGroupProps,
  RadioGroupEmits,
  RadioGroupSlots,
  RadioOptionType,
} from './types'
import { radioGroupContextKey, radioGroupDefaultProps } from './types'

defineOptions({ name: 'ARadioGroup' })
const props = withDefaults(defineProps<RadioGroupProps>(), radioGroupDefaultProps)
const emit = defineEmits<RadioGroupEmits>()
defineSlots<RadioGroupSlots>()

// Internal value for uncontrolled mode
const internalValue = ref(props.defaultValue)

const mergedValue = computed(() => {
  return props.value ?? internalValue.value
})

// Sync internal state when controlled value changes
watch(
  () => props.value,
  (val) => {
    if (val !== undefined) {
      internalValue.value = val
    }
  },
)

const normalizedOptions = computed<RadioOptionType[]>(() => {
  if (!props.options) return []
  return props.options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: String(opt), value: opt }
    }
    return opt
  })
})

function setValue(val: any) {
  internalValue.value = val
  emit('update:value', val)
  // Create a synthetic-like event for the change callback
  const event = new Event('change')
  emit('change', event)
}

provide(radioGroupContextKey, {
  name: toRef(props, 'name') as any,
  disabled: computed(() => props.disabled ?? false),
  value: mergedValue,
  setValue,
})

const resolvedSize = computed(() => {
  const map: Record<string, string> = {
    large: 'large',
    default: 'default',
    small: 'small',
  }
  return map[props.size ?? 'default'] ?? 'default'
})

const classes = computed(() => ({
  'ant-radio-group': true,
  [`ant-radio-group-${resolvedSize.value}`]: true,
  'ant-radio-group-solid': props.buttonStyle === 'solid',
  'ant-radio-group-outline': props.buttonStyle !== 'solid',
}))

const isButtonType = computed(() => props.optionType === 'button')
</script>

<template>
  <div :class="classes" role="radiogroup">
    <template v-if="normalizedOptions.length">
      <template v-if="isButtonType">
        <a-radio-button
          v-for="opt in normalizedOptions"
          :key="String(opt.value)"
          :value="opt.value"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </a-radio-button>
      </template>
      <template v-else>
        <a-radio
          v-for="opt in normalizedOptions"
          :key="String(opt.value)"
          :value="opt.value"
          :disabled="opt.disabled"
        >
          {{ opt.label }}
        </a-radio>
      </template>
    </template>
    <slot v-else />
  </div>
</template>
