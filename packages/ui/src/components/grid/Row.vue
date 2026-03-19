<script setup lang="ts">
import { computed, provide } from 'vue'
import type { RowProps, RowAlign, RowJustify, Gutter } from './types'
import { rowDefaultProps, rowContextKey } from './types'
import { useBreakpoint, resolveResponsiveValue } from '@/hooks'
import type { Breakpoint, ScreenMap } from '@/hooks'

defineOptions({ name: 'ARow' })
const props = withDefaults(defineProps<RowProps>(), rowDefaultProps)
const screens = useBreakpoint()

function resolveGutterValue(gutter: Gutter, screens: ScreenMap): number {
  if (typeof gutter === 'number') return gutter
  // Responsive object: find first matching breakpoint
  return resolveResponsiveValue(screens, gutter) ?? 0
}

const gutterTuple = computed<[number, number]>(() => {
  const raw = props.gutter
  if (raw == null) return [0, 0]
  if (Array.isArray(raw)) {
    return [
      resolveGutterValue(raw[0], screens.value),
      resolveGutterValue(raw[1], screens.value),
    ]
  }
  const h = resolveGutterValue(raw, screens.value)
  return [h, 0]
})

const resolvedJustify = computed<RowJustify | undefined>(() => {
  if (!props.justify) return undefined
  if (typeof props.justify === 'string') return props.justify
  return resolveResponsiveValue(screens.value, props.justify)
})

const resolvedAlign = computed<RowAlign | undefined>(() => {
  if (!props.align) return undefined
  if (typeof props.align === 'string') return props.align
  return resolveResponsiveValue(screens.value, props.align)
})

const JUSTIFY_MAP: Record<RowJustify, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  'space-around': 'space-around',
  'space-between': 'space-between',
  'space-evenly': 'space-evenly',
}

const ALIGN_MAP: Record<RowAlign, string> = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
}

const rowStyle = computed(() => {
  const [h, v] = gutterTuple.value
  const style: Record<string, string> = {}

  // Negative margins to compensate for col padding
  if (h > 0) {
    style.marginLeft = `${-h / 2}px`
    style.marginRight = `${-h / 2}px`
  }
  if (v > 0) {
    style.rowGap = `${v}px`
  }

  if (resolvedJustify.value) {
    style.justifyContent = JUSTIFY_MAP[resolvedJustify.value]
  }
  if (resolvedAlign.value) {
    style.alignItems = ALIGN_MAP[resolvedAlign.value]
  }
  if (!props.wrap) {
    style.flexWrap = 'nowrap'
  }

  return style
})

provide(rowContextKey, {
  gutter: gutterTuple,
  wrap: computed(() => props.wrap),
})
</script>

<template>
  <div class="ant-row" :style="rowStyle">
    <slot />
  </div>
</template>
