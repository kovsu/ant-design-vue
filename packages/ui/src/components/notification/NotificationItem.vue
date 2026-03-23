<template>
  <div :class="itemClasses" :style="item.args.style" @click="item.args.onClick?.()">
    <div class="ant-notification-notice-content">
      <div class="ant-notification-notice-with-icon">
        <span v-if="iconNode" class="ant-notification-notice-icon">
          <component :is="iconNode" />
        </span>
        <div class="ant-notification-notice-message">
          <component :is="item.args.message" v-if="typeof item.args.message === 'function'" />
          <component :is="item.args.message" v-else-if="isVNode(item.args.message)" />
          <template v-else>{{ item.args.message }}</template>
        </div>
        <div v-if="item.args.description" class="ant-notification-notice-description">
          <component :is="item.args.description" v-if="typeof item.args.description === 'function'" />
          <component :is="item.args.description" v-else-if="isVNode(item.args.description)" />
          <template v-else>{{ item.args.description }}</template>
        </div>
        <div v-if="item.args.btn" class="ant-notification-notice-btn">
          <component :is="item.args.btn" v-if="typeof item.args.btn === 'function'" />
          <component :is="item.args.btn" v-else />
        </div>
      </div>
    </div>
    <button
      type="button"
      class="ant-notification-notice-close"
      aria-label="Close"
      @click.stop="$emit('close', item.id)"
    >
      <CloseOutlined />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, isVNode, type Component } from 'vue'
import {
  InfoCircleFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  CloseOutlined,
} from '@ant-design/icons-vue'
import type { InternalNotificationItem, NotificationType } from './types'

const props = defineProps<{
  item: InternalNotificationItem
}>()

const emit = defineEmits<{
  (e: 'close', id: string): void
}>()

const typeIconMap: Record<NotificationType, Component> = {
  info: InfoCircleFilled,
  success: CheckCircleFilled,
  error: CloseCircleFilled,
  warning: ExclamationCircleFilled,
}

const iconNode = computed(() => {
  if (props.item.args.icon) {
    return typeof props.item.args.icon === 'function'
      ? props.item.args.icon
      : () => props.item.args.icon
  }
  if (!props.item.args.type) return null
  return typeIconMap[props.item.args.type]
})

const itemClasses = computed(() => [
  'ant-notification-notice',
  props.item.args.type ? `ant-notification-notice-${props.item.args.type}` : '',
  props.item.args.class,
])

// Auto-close timer
let timer: ReturnType<typeof setTimeout> | null = null

function startTimer() {
  const duration = props.item.args.duration
  // duration null means never auto-close
  if (duration === null) return
  const d = duration ?? 4.5
  if (d > 0) {
    timer = setTimeout(() => {
      emit('close', props.item.id)
    }, d * 1000)
  }
}

function clearTimer() {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  clearTimer()
})
</script>
