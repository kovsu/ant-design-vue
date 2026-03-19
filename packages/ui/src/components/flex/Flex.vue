<script setup lang="ts">
import { computed } from 'vue'
import { type FlexProps, type FlexGapSize, flexDefaultProps } from './types'

defineOptions({ name: 'AFlex' })
const props = withDefaults(defineProps<FlexProps>(), flexDefaultProps)

const gapPresets: Record<FlexGapSize, string> = {
  small: '8px',
  middle: '16px',
  large: '32px',
}

const isPresetGap = (gap: unknown): gap is FlexGapSize =>
  typeof gap === 'string' && gap in gapPresets

const mergedStyle = computed(() => {
  const style: Record<string, unknown> = {}

  if (props.justify) style.justifyContent = props.justify
  if (props.align) style.alignItems = props.align
  if (props.flex) style.flex = props.flex

  if (props.wrap != null) {
    style.flexWrap = props.wrap === true ? 'wrap' : props.wrap
  }

  if (props.gap != null) {
    if (isPresetGap(props.gap)) {
      style.gap = gapPresets[props.gap]
    } else {
      const num = Number(props.gap)
      style.gap = Number.isNaN(num) ? props.gap : `${num}px`
    }
  }

  return style
})
</script>

<template>
  <component
    :is="props.component"
    class="ant-flex"
    :class="{ 'ant-flex-vertical': props.vertical }"
    :style="mergedStyle"
  >
    <slot />
  </component>
</template>
