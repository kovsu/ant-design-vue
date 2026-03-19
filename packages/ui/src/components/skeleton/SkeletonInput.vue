<script setup lang="ts">
import { computed } from 'vue'
import type { SkeletonInputProps } from './types'

defineOptions({ name: 'ASkeletonInput' })
const props = withDefaults(defineProps<SkeletonInputProps>(), {
  size: 'default',
  block: false,
  active: false,
})

const classes = computed(() => ({
  'ant-skeleton': true,
  'ant-skeleton-element': true,
  'ant-skeleton-active': props.active,
}))

const inputClasses = computed(() => ({
  'ant-skeleton-input': true,
  'ant-skeleton-input-lg': props.size === 'large',
  'ant-skeleton-input-sm': props.size === 'small',
  'ant-skeleton-input-block': props.block,
}))
</script>

<template>
  <div :class="classes" aria-hidden="true">
    <span :class="inputClasses" />
  </div>
</template>
