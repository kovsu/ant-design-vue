<script setup lang="ts">
import { computed, provide, ref, toRef, watch } from 'vue'
import type { CollapseProps, CollapseEmits, CollapseSlots } from './types'
import { collapseDefaultProps, collapseContextKey } from './types'

defineOptions({ name: 'ACollapse' })
const props = withDefaults(defineProps<CollapseProps>(), collapseDefaultProps)
const emit = defineEmits<CollapseEmits>()
defineSlots<CollapseSlots>()

// Normalize key input to array
function normalizeKeys(val: string | number | (string | number)[] | undefined): (string | number)[] {
  if (val == null) return []
  return Array.isArray(val) ? [...val] : [val]
}

// Internal state for uncontrolled mode
const internalKeys = ref<(string | number)[]>(normalizeKeys(props.defaultActiveKey))

// Whether component is controlled (activeKey prop provided)
const isControlled = computed(() => props.activeKey !== undefined)

const activeKeys = computed(() => {
  return isControlled.value ? normalizeKeys(props.activeKey) : internalKeys.value
})

// Sync internal keys when controlled prop changes
watch(
  () => props.activeKey,
  (val) => {
    if (val !== undefined) {
      internalKeys.value = normalizeKeys(val)
    }
  },
)

function togglePanel(key: string | number) {
  let newKeys: (string | number)[]

  if (props.accordion) {
    // Accordion mode: toggle single key, close others
    newKeys = activeKeys.value.includes(key) ? [] : [key]
  } else {
    // Normal mode: toggle key in array
    const index = activeKeys.value.indexOf(key)
    newKeys = [...activeKeys.value]
    if (index > -1) {
      newKeys.splice(index, 1)
    } else {
      newKeys.push(key)
    }
  }

  // Update internal state for uncontrolled mode
  if (!isControlled.value) {
    internalKeys.value = newKeys
  }

  emit('update:activeKey', newKeys)
  emit('change', newKeys)
}

const classes = computed(() => ({
  'ant-collapse': true,
  'ant-collapse-borderless': !props.bordered,
  'ant-collapse-ghost': props.ghost,
  'ant-collapse-icon-position-end': props.expandIconPosition === 'end',
}))

provide(collapseContextKey, {
  activeKeys,
  collapsible: toRef(props, 'collapsible'),
  destroyInactivePanel: toRef(props, 'destroyInactivePanel'),
  expandIconPosition: toRef(props, 'expandIconPosition'),
  togglePanel,
})
</script>

<template>
  <div :class="classes" role="tablist">
    <slot />
  </div>
</template>
