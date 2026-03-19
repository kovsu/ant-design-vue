<script setup lang="ts">
import { computed } from 'vue'
import type { RibbonProps, RibbonSlots } from './types'
import { ribbonDefaultProps, isPresetColor } from './types'

defineOptions({ name: 'ABadgeRibbon' })
const props = withDefaults(defineProps<RibbonProps>(), ribbonDefaultProps)
defineSlots<RibbonSlots>()

const presetColor = computed(() => isPresetColor(props.color))
const customColor = computed(() => !!props.color && !presetColor.value)

const ribbonClasses = computed(() => ({
  'ant-ribbon': true,
  [`ant-ribbon-placement-${props.placement}`]: true,
  [`ant-ribbon-color-${props.color}`]: presetColor.value,
}))

const ribbonStyle = computed(() => {
  if (!customColor.value) return undefined
  return { backgroundColor: props.color }
})

const cornerStyle = computed(() => {
  if (!customColor.value) return undefined
  return { color: props.color }
})
</script>

<template>
  <div class="ant-ribbon-wrapper">
    <slot />
    <div :class="ribbonClasses" :style="ribbonStyle">
      <span class="ant-ribbon-text">
        <slot name="text">{{ text }}</slot>
      </span>
      <div class="ant-ribbon-corner" :style="cornerStyle" />
    </div>
  </div>
</template>
