<script setup lang="ts">
import { computed, provide, useSlots, type VNode } from 'vue'
import type { AvatarGroupProps, AvatarGroupSlots } from './types'
import { avatarGroupDefaultProps, avatarContextKey } from './types'

defineOptions({ name: 'AAvatarGroup' })
const props = withDefaults(defineProps<AvatarGroupProps>(), avatarGroupDefaultProps)
defineSlots<AvatarGroupSlots>()
const slots = useSlots()

provide(avatarContextKey, {
  size: computed(() => props.size),
  shape: computed(() => props.shape),
})

// Flatten slot children (handles fragments)
function flattenChildren(children: VNode[]): VNode[] {
  const result: VNode[] = []
  for (const child of children) {
    if (Array.isArray(child.children)) {
      result.push(...(child.children as VNode[]))
    } else {
      result.push(child)
    }
  }
  return result
}

const childrenNodes = computed(() => {
  const children = slots.default?.() || []
  return flattenChildren(children)
})

const visibleChildren = computed(() => {
  if (!props.maxCount || childrenNodes.value.length <= props.maxCount) {
    return childrenNodes.value
  }
  return childrenNodes.value.slice(0, props.maxCount)
})

const restCount = computed(() => {
  if (!props.maxCount) return 0
  return Math.max(0, childrenNodes.value.length - props.maxCount)
})
</script>

<template>
  <div class="ant-avatar-group" role="group" aria-label="Avatar group">
    <template v-if="maxCount">
      <component v-for="(child, i) in visibleChildren" :key="i" :is="child" />
      <span
        v-if="restCount > 0"
        class="ant-avatar ant-avatar-circle"
        :class="{
          'ant-avatar-lg': size === 'large',
          'ant-avatar-sm': size === 'small',
        }"
        :style="maxStyle"
      >
        <span class="ant-avatar-string">+{{ restCount }}</span>
      </span>
    </template>
    <slot v-else />
  </div>
</template>
