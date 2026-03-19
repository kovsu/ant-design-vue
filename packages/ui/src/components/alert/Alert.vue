<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import type { AlertProps, AlertEmits, AlertSlots } from './types'
import { alertDefaultProps } from './types'

defineOptions({ name: 'AAlert' })
const props = withDefaults(defineProps<AlertProps>(), alertDefaultProps)
const emit = defineEmits<AlertEmits>()
defineSlots<AlertSlots>()
const slots = useSlots()

const closed = ref(false)

// When banner=true, type defaults to 'warning' if not explicitly set
const resolvedType = computed(() => {
  if (props.banner && props.type === 'info') return 'warning'
  return props.type
})

// When banner=true, showIcon defaults to true
const showIconComputed = computed(() => {
  if (props.banner) return true
  return props.showIcon
})

const closableComputed = computed(() => {
  return props.closable || !!slots.closeText || !!slots.closeIcon
})

const hasDescription = computed(() => {
  return !!props.description || !!slots.description
})

const hasMessage = computed(() => {
  return !!props.message || !!slots.message || !!slots.default
})

const classes = computed(() => ({
  'ant-alert': true,
  [`ant-alert-${resolvedType.value}`]: true,
  'ant-alert-with-description': hasDescription.value,
  'ant-alert-banner': props.banner,
  'ant-alert-closable': closableComputed.value,
  'ant-alert-no-icon': !showIconComputed.value,
}))

function handleClose(event: MouseEvent) {
  emit('close', event)
  closed.value = true
}

function afterLeaveHandler() {
  props.afterClose?.()
}
</script>

<template>
  <Transition name="ant-alert-slide-up" @after-leave="afterLeaveHandler">
    <div v-if="!closed" :class="classes" role="alert">
      <span v-if="showIconComputed" class="ant-alert-icon" aria-hidden="true">
        <slot name="icon">
          <span v-if="resolvedType === 'success'" class="anticon anticon-check-circle">
            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
            </svg>
          </span>
          <span v-else-if="resolvedType === 'info'" class="anticon anticon-info-circle">
            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
            </svg>
          </span>
          <span v-else-if="resolvedType === 'warning'" class="anticon anticon-exclamation-circle">
            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
            </svg>
          </span>
          <span v-else-if="resolvedType === 'error'" class="anticon anticon-close-circle">
            <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.002L512 563.8l-99.3 118.4-66.1.002c-5.4 0-9.8-4.4-9.8-9.8 0-2.2.7-4.2 2-6L446.3 512 338.9 357.6a9.51 9.51 0 01-2-6c0-5.4 4.4-9.8 9.8-9.8l66.1.002L512 460.2l99.3-118.4 66-.002c5.4 0 9.8 4.4 9.8 9.8 0 2.2-.7 4.2-2 6L577.7 512l107.5 154.2a9.51 9.51 0 012 6c0 5.4-4.4 9.8-9.8 9.8z" />
            </svg>
          </span>
        </slot>
      </span>
      <div class="ant-alert-content">
        <div v-if="hasMessage" class="ant-alert-message">
          <slot name="message">
            <slot>{{ message }}</slot>
          </slot>
        </div>
        <div v-if="hasDescription" class="ant-alert-description">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <div v-if="$slots.action" class="ant-alert-action">
        <slot name="action" />
      </div>
      <button
        v-if="closableComputed"
        type="button"
        class="ant-alert-close-icon"
        aria-label="Close"
        @click="handleClose"
      >
        <slot name="closeText">
          <slot name="closeIcon">
            <span class="anticon anticon-close">
              <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
                <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9A7.95 7.95 0 00203.8 838h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l216.1 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
              </svg>
            </span>
          </slot>
        </slot>
      </button>
    </div>
  </Transition>
</template>
