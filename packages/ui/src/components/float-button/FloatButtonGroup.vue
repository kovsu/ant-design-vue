<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import type { FloatButtonGroupProps, FloatButtonGroupEmits, FloatButtonGroupSlots } from './types'
import { floatButtonGroupDefaultProps } from './types'

defineOptions({ name: 'AFloatButtonGroup' })
const props = withDefaults(defineProps<FloatButtonGroupProps>(), floatButtonGroupDefaultProps)
const emit = defineEmits<FloatButtonGroupEmits>()
defineSlots<FloatButtonGroupSlots>()

const groupRef = ref<HTMLElement>()
const internalOpen = ref(false)
// Flag to skip the document click handler when the trigger button was clicked
let triggerClicked = false

const isControlled = computed(() => props.open !== undefined)
const isOpen = computed(() => (isControlled.value ? props.open : internalOpen.value))

// When no trigger is set, always show children expanded
const alwaysOpen = computed(() => !props.trigger)

function setOpen(value: boolean) {
  if (!isControlled.value) {
    internalOpen.value = value
  }
  emit('update:open', value)
  emit('openChange', value)
}

function handleTriggerClick() {
  if (props.trigger === 'click') {
    triggerClicked = true
    setOpen(!isOpen.value)
  }
}

function handleMouseEnter() {
  if (props.trigger === 'hover') {
    setOpen(true)
  }
}

function handleMouseLeave() {
  if (props.trigger === 'hover') {
    setOpen(false)
  }
}

// Close on outside click for click trigger
function handleDocumentClick(event: MouseEvent) {
  if (triggerClicked) {
    triggerClicked = false
    return
  }
  if (props.trigger === 'click' && isOpen.value) {
    const target = event.target as HTMLElement
    if (groupRef.value && !groupRef.value.contains(target)) {
      setOpen(false)
    }
  }
}

onMounted(() => {
  if (props.trigger === 'click') {
    document.addEventListener('click', handleDocumentClick)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

// Re-bind click handler if trigger changes
watch(
  () => props.trigger,
  (newTrigger, oldTrigger) => {
    if (typeof document === 'undefined') return
    if (oldTrigger === 'click') {
      document.removeEventListener('click', handleDocumentClick)
    }
    if (newTrigger === 'click') {
      document.addEventListener('click', handleDocumentClick)
    }
  },
)

const classes = computed(() => ({
  'ant-float-btn-group': true,
  'ant-float-btn-group-circle': props.shape === 'circle',
  'ant-float-btn-group-square': props.shape === 'square',
  'ant-float-btn-group-open': alwaysOpen.value || isOpen.value,
}))

const tooltipText = computed(() => props.tooltip)
</script>

<template>
  <div
    ref="groupRef"
    :class="classes"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div v-show="alwaysOpen || isOpen" class="ant-float-btn-group-items">
      <slot />
    </div>
    <button
      v-if="trigger"
      type="button"
      class="ant-float-btn ant-float-btn-group-trigger"
      :class="{
        'ant-float-btn-primary': type === 'primary',
        'ant-float-btn-default': type !== 'primary',
        'ant-float-btn-circle': shape === 'circle',
        'ant-float-btn-square': shape === 'square',
      }"
      :title="tooltipText"
      @click="handleTriggerClick"
    >
      <div class="ant-float-btn-body">
        <div class="ant-float-btn-content">
          <div class="ant-float-btn-icon">
            <slot name="icon">
              <span class="ant-float-btn-group-icon" :class="{ 'ant-float-btn-group-icon-open': isOpen }">
                <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
                  <path d="M192 474h672q8 0 8 8v60q0 8-8 8H192q-8 0-8-8v-60q0-8 8-8z" />
                </svg>
              </span>
            </slot>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>
