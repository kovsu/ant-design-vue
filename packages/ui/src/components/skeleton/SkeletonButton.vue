<script setup lang="ts">
import { computed } from 'vue'
import type { SkeletonButtonProps } from './types'

defineOptions({ name: 'ASkeletonButton' })
const props = withDefaults(defineProps<SkeletonButtonProps>(), {
  size: 'default',
  shape: 'default',
  block: false,
  active: false,
})

const classes = computed(() => ({
  'ant-skeleton': true,
  'ant-skeleton-element': true,
  'ant-skeleton-active': props.active,
}))

const btnClasses = computed(() => ({
  'ant-skeleton-button': true,
  'ant-skeleton-button-lg': props.size === 'large',
  'ant-skeleton-button-sm': props.size === 'small',
  'ant-skeleton-button-circle': props.shape === 'circle',
  'ant-skeleton-button-round': props.shape === 'round',
  'ant-skeleton-button-square': props.shape === 'square',
  'ant-skeleton-button-block': props.block,
}))
</script>

<template>
  <div :class="classes" aria-hidden="true">
    <span :class="btnClasses" />
  </div>
</template>
