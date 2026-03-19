<script setup lang="ts">
import { computed, ref, useSlots, watch, onBeforeUnmount } from 'vue'
import type { SpinProps, SpinSlots } from './types'
import { spinDefaultProps } from './types'

defineOptions({ name: 'ASpin' })
const props = withDefaults(defineProps<SpinProps>(), spinDefaultProps)
defineSlots<SpinSlots>()
const slots = useSlots()

const shouldShow = ref(false)

let delayTimer: ReturnType<typeof setTimeout> | null = null

function clearTimer() {
  if (delayTimer !== null) {
    clearTimeout(delayTimer)
    delayTimer = null
  }
}

watch(
  () => props.spinning,
  (val) => {
    clearTimer()
    if (val) {
      if (props.delay && props.delay > 0) {
        delayTimer = setTimeout(() => {
          shouldShow.value = true
        }, props.delay)
      } else {
        shouldShow.value = true
      }
    } else {
      shouldShow.value = false
    }
  },
  { immediate: true },
)

onBeforeUnmount(clearTimer)

const hasChildren = computed(() => !!slots.default)

const hasTip = computed(() => !!props.tip || !!slots.tip)

const spinClasses = computed(() => ({
  'ant-spin': true,
  'ant-spin-spinning': shouldShow.value,
  'ant-spin-sm': props.size === 'small',
  'ant-spin-lg': props.size === 'large',
  'ant-spin-show-text': hasTip.value,
}))

const containerClasses = computed(() => ({
  'ant-spin-nested-loading': true,
}))
</script>

<template>
  <div v-if="hasChildren" :class="containerClasses" :aria-busy="shouldShow">
    <div v-if="shouldShow" class="ant-spin-nested-loading-blur">
      <div :class="spinClasses" role="status" :aria-label="tip || 'Loading'">
        <slot name="indicator">
          <span class="ant-spin-dot ant-spin-dot-spin" aria-hidden="true">
            <i class="ant-spin-dot-item" />
            <i class="ant-spin-dot-item" />
            <i class="ant-spin-dot-item" />
            <i class="ant-spin-dot-item" />
          </span>
        </slot>
        <div v-if="hasTip" class="ant-spin-text" aria-hidden="true">
          <slot name="tip">{{ tip }}</slot>
        </div>
      </div>
    </div>
    <div class="ant-spin-container" :class="{ 'ant-spin-blur': shouldShow }" :aria-hidden="shouldShow || undefined">
      <slot />
    </div>
  </div>
  <div v-else :class="spinClasses" role="status" :aria-label="tip || 'Loading'">
    <slot name="indicator">
      <span class="ant-spin-dot ant-spin-dot-spin" aria-hidden="true">
        <i class="ant-spin-dot-item" />
        <i class="ant-spin-dot-item" />
        <i class="ant-spin-dot-item" />
        <i class="ant-spin-dot-item" />
      </span>
    </slot>
    <div v-if="hasTip" class="ant-spin-text" aria-hidden="true">
      <slot name="tip">{{ tip }}</slot>
    </div>
  </div>
</template>
