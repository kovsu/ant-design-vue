<script setup lang="ts">
import { computed, provide, ref, toRef, watch } from 'vue'
import type {
  CheckboxGroupProps,
  CheckboxGroupEmits,
  CheckboxGroupSlots,
  CheckboxOptionType,
  CheckboxValueType,
} from './types'
import { checkboxGroupContextKey } from './types'

defineOptions({ name: 'ACheckboxGroup' })
const props = defineProps<CheckboxGroupProps>()
const emit = defineEmits<CheckboxGroupEmits>()
defineSlots<CheckboxGroupSlots>()

// Internal value for uncontrolled mode
const internalValue = ref<CheckboxValueType[]>(props.defaultValue ?? [])

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

const normalizedOptions = computed<CheckboxOptionType[]>(() => {
  if (!props.options) return []
  return props.options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: String(opt), value: opt }
    }
    return opt
  })
})

function toggleValue(val: CheckboxValueType) {
  const current = [...mergedValue.value]
  const index = current.indexOf(val)
  if (index === -1) {
    current.push(val)
  } else {
    current.splice(index, 1)
  }
  internalValue.value = current
  emit('update:value', current)
  emit('change', current)
}

provide(checkboxGroupContextKey, {
  name: toRef(props, 'name') as any,
  disabled: computed(() => props.disabled ?? false),
  value: mergedValue,
  toggleValue,
})

const classes = computed(() => ({
  'ant-checkbox-group': true,
}))
</script>

<template>
  <div :class="classes" role="group">
    <template v-if="normalizedOptions.length">
      <a-checkbox
        v-for="opt in normalizedOptions"
        :key="String(opt.value)"
        :value="opt.value"
        :disabled="opt.disabled"
      >
        {{ opt.label }}
      </a-checkbox>
    </template>
    <slot v-else />
  </div>
</template>
