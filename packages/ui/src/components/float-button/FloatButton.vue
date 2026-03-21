<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { FloatButtonProps, FloatButtonEmits, FloatButtonSlots } from './types'
import { floatButtonDefaultProps } from './types'

defineOptions({ name: 'AFloatButton' })
const props = withDefaults(defineProps<FloatButtonProps>(), floatButtonDefaultProps)
const emit = defineEmits<FloatButtonEmits>()
defineSlots<FloatButtonSlots>()
const slots = useSlots()

const tag = computed(() => (props.href ? 'a' : 'button'))

const classes = computed(() => ({
  'ant-float-btn': true,
  'ant-float-btn-primary': props.type === 'primary',
  'ant-float-btn-default': props.type === 'default',
  'ant-float-btn-circle': props.shape === 'circle',
  'ant-float-btn-square': props.shape === 'square',
  'ant-float-btn-with-description': !!props.description || !!slots.description,
}))

const tooltipText = computed(() => props.tooltip)

const hasBadge = computed(() => {
  if (!props.badge) return false
  return props.badge.dot || (props.badge.count != null && props.badge.count > 0)
})

const badgeText = computed(() => {
  if (!props.badge) return ''
  if (props.badge.dot) return ''
  if (props.badge.count != null && props.badge.count > 0) {
    return props.badge.count > 99 ? '99+' : String(props.badge.count)
  }
  return ''
})

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>

<template>
  <component
    :is="tag"
    :class="classes"
    :title="tooltipText"
    :href="href || undefined"
    :target="href ? target : undefined"
    :type="tag === 'button' ? 'button' : undefined"
    @click="handleClick"
  >
    <div class="ant-float-btn-body">
      <div class="ant-float-btn-content">
        <div class="ant-float-btn-icon">
          <slot />
        </div>
        <div v-if="description || $slots.description" class="ant-float-btn-description">
          <slot name="description">{{ description }}</slot>
        </div>
      </div>
      <div v-if="hasBadge" class="ant-float-btn-badge" :class="{ 'ant-float-btn-badge-dot': badge?.dot }">
        <template v-if="!badge?.dot">{{ badgeText }}</template>
      </div>
    </div>
  </component>
</template>
