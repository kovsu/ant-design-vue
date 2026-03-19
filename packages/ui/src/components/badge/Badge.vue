<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { BadgeProps, BadgeSlots } from './types'
import { badgeDefaultProps, isPresetColor } from './types'

defineOptions({ name: 'ABadge' })
const props = withDefaults(defineProps<BadgeProps>(), badgeDefaultProps)
defineSlots<BadgeSlots>()
const slots = useSlots()

const hasChildren = computed(() => !!slots.default)
const hasCount = computed(() => props.count !== undefined && props.count !== null)
const isZero = computed(() => Number(props.count) === 0)
const showAsDot = computed(() => props.dot || !!props.status)
const isHidden = computed(() => {
  if (showAsDot.value) return false
  if (!hasCount.value) return true
  return isZero.value && !props.showZero
})

const displayCount = computed(() => {
  if (showAsDot.value) return ''
  if (typeof props.count === 'string') return props.count
  const num = Number(props.count)
  if (num > props.overflowCount) return `${props.overflowCount}+`
  return String(num)
})

const titleText = computed(() => {
  if (props.title != null) return props.title
  if (typeof props.count === 'number' || typeof props.count === 'string') {
    return String(props.count)
  }
  return undefined
})

const presetColor = computed(() => isPresetColor(props.color))
const customColor = computed(() => !!props.color && !presetColor.value)

const badgeStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.offset) {
    style.right =
      typeof props.offset[0] === 'number' ? `${-props.offset[0]}px` : `-${props.offset[0]}`
    style.marginTop =
      typeof props.offset[1] === 'number' ? `${props.offset[1]}px` : props.offset[1]
  }
  if (customColor.value) {
    style.backgroundColor = props.color!
  }
  if (props.numberStyle) {
    Object.assign(style, props.numberStyle)
  }
  return Object.keys(style).length ? style : undefined
})

const classes = computed(() => ({
  'ant-badge': true,
  'ant-badge-status': !!props.status,
  'ant-badge-not-a-wrapper': !hasChildren.value,
}))

const supClasses = computed(() => ({
  'ant-badge-count': !showAsDot.value,
  'ant-badge-dot': showAsDot.value,
  'ant-badge-count-sm': props.size === 'small',
  [`ant-badge-status-${props.status}`]: !!props.status && hasChildren.value,
  [`ant-badge-color-${props.color}`]: presetColor.value,
  'ant-badge-multiple-words': !showAsDot.value && displayCount.value.length > 1,
}))
</script>

<template>
  <!-- Status badge (no children, dot + text) -->
  <span v-if="status && !hasChildren" :class="classes">
    <span
      class="ant-badge-status-dot"
      :class="`ant-badge-status-${status}`"
      :style="customColor ? { backgroundColor: color } : undefined"
    />
    <span v-if="text || $slots.text" class="ant-badge-status-text">
      <slot name="text">{{ text }}</slot>
    </span>
  </span>

  <!-- Badge with children or standalone count -->
  <span v-else :class="classes">
    <slot />
    <slot name="count">
      <Transition name="ant-badge-zoom">
        <sup
          v-if="!isHidden"
          :class="supClasses"
          :style="badgeStyle"
          :title="titleText"
        >
          {{ showAsDot ? '' : displayCount }}
        </sup>
      </Transition>
    </slot>
  </span>
</template>
