<script setup lang="ts">
import { computed, provide } from 'vue'
import type { SpaceCompactProps } from './types'
import { spaceCompactDefaultProps, spaceCompactContextKey } from './types'

defineOptions({ name: 'ASpaceCompact' })
const props = withDefaults(defineProps<SpaceCompactProps>(), spaceCompactDefaultProps)

provide(spaceCompactContextKey, {
  compactSize: computed(() => props.size) as any,
  compactDirection: computed(() => props.direction) as any,
})

const classes = computed(() => ({
  'ant-space-compact': true,
  [`ant-space-compact-${props.direction}`]: true,
  'ant-space-compact-block': props.block,
}))
</script>

<template>
  <div :class="classes" role="group">
    <slot />
  </div>
</template>
