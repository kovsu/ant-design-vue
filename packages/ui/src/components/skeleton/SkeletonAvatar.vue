<script setup lang="ts">
import { computed } from 'vue'
import type { SkeletonAvatarProps } from './types'

defineOptions({ name: 'ASkeletonAvatar' })
const props = withDefaults(defineProps<SkeletonAvatarProps>(), {
  size: 'default',
  shape: 'circle',
  active: false,
})

const classes = computed(() => ({
  'ant-skeleton': true,
  'ant-skeleton-element': true,
  'ant-skeleton-active': props.active,
}))

const avatarClasses = computed(() => ({
  'ant-skeleton-avatar': true,
  'ant-skeleton-avatar-lg': props.size === 'large',
  'ant-skeleton-avatar-sm': props.size === 'small',
  'ant-skeleton-avatar-circle': props.shape === 'circle',
  'ant-skeleton-avatar-square': props.shape === 'square',
}))

const sizeStyle = computed(() => {
  if (typeof props.size === 'number') {
    return { width: `${props.size}px`, height: `${props.size}px`, lineHeight: `${props.size}px` }
  }
  return undefined
})
</script>

<template>
  <div :class="classes" aria-hidden="true">
    <span :class="avatarClasses" :style="sizeStyle" />
  </div>
</template>
