<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { SpaceProps, SpaceSlots, SpaceSize, SpaceSizePreset } from './types'
import { spaceDefaultProps, SPACE_SIZE_MAP } from './types'

defineOptions({ name: 'ASpace' })
const props = withDefaults(defineProps<SpaceProps>(), spaceDefaultProps)
defineSlots<SpaceSlots>()
const slots = useSlots()

function resolveSize(size: SpaceSize): number {
  return typeof size === 'string' ? SPACE_SIZE_MAP[size as SpaceSizePreset] ?? 0 : size
}

const gap = computed(() => {
  if (Array.isArray(props.size)) {
    return [resolveSize(props.size[0]), resolveSize(props.size[1])] as [number, number]
  }
  const s = resolveSize(props.size!)
  return [s, s] as [number, number]
})

const hasSplit = computed(() => !!slots.split)

const classes = computed(() => ({
  'ant-space': true,
  [`ant-space-${props.direction}`]: true,
  'ant-space-align-center': !props.align && props.direction === 'horizontal',
  [`ant-space-align-${props.align}`]: !!props.align,
}))

const containerStyle = computed(() => {
  const [h, v] = gap.value
  const style: Record<string, string> = {}

  if (!hasSplit.value) {
    style.columnGap = `${h}px`
    style.rowGap = `${v}px`
  }

  if (props.wrap) {
    style.flexWrap = 'wrap'
  }

  return style
})

const splitItemGap = computed(() => {
  const [h, v] = gap.value
  return {
    columnGap: `${h / 2}px`,
    rowGap: `${v}px`,
  }
})
</script>

<template>
  <div :class="classes" :style="hasSplit ? splitItemGap : containerStyle">
    <template v-if="hasSplit">
      <template v-for="(child, index) in $slots.default?.()" :key="index">
        <div class="ant-space-item">
          <component :is="child" />
        </div>
        <div v-if="index < ($slots.default?.()?.length ?? 0) - 1" class="ant-space-item-split">
          <slot name="split" />
        </div>
      </template>
    </template>
    <slot v-else />
  </div>
</template>
