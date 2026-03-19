<script setup lang="ts">
import { computed } from 'vue'
import type { CardGridProps, CardGridSlots } from './types'
import { cardGridDefaultProps } from './types'

defineOptions({ name: 'ACardGrid' })
const props = withDefaults(defineProps<CardGridProps>(), cardGridDefaultProps)
defineSlots<CardGridSlots>()

const classes = computed(() => ({
  'ant-card-grid': true,
  'ant-card-grid-hoverable': props.hoverable,
}))
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
