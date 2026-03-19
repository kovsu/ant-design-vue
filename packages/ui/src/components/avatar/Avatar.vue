<script setup lang="ts">
import { computed, inject, nextTick, onMounted, ref, shallowRef, useSlots, watch } from 'vue'
import type { AvatarProps, AvatarEmits, AvatarSlots } from './types'
import { avatarDefaultProps, avatarContextKey } from './types'

defineOptions({ name: 'AAvatar' })
const props = withDefaults(defineProps<AvatarProps>(), avatarDefaultProps)
const emit = defineEmits<AvatarEmits>()
defineSlots<AvatarSlots>()
const slots = useSlots()

const groupContext = inject(avatarContextKey, null)

// Merge size/shape from group context
const mergedSize = computed(() => groupContext?.size.value ?? props.size)
const mergedShape = computed(() => groupContext?.shape.value ?? props.shape)

const isImgExist = ref(true)
const textRef = shallowRef<HTMLElement | null>(null)
const avatarRef = shallowRef<HTMLElement | null>(null)
const scale = ref(1)

// When image fails, fallback to icon/text
function handleImgLoadError(e: Event) {
  const result = emit('error', e)
  if (result !== false) {
    isImgExist.value = false
  }
}

// Auto-scale text to fit avatar
function setTextScale() {
  if (!textRef.value || !avatarRef.value) return
  const textWidth = textRef.value.offsetWidth
  const avatarWidth = avatarRef.value.offsetWidth
  const gap = props.gap * 2
  if (avatarWidth - gap === 0) {
    scale.value = 1
  } else {
    scale.value = avatarWidth - gap < textWidth ? (avatarWidth - gap) / textWidth : 1
  }
}

onMounted(() => {
  nextTick(setTextScale)
})

watch(() => props.gap, () => nextTick(setTextScale))

// Reset img state when src changes
watch(() => props.src, () => {
  isImgExist.value = true
})

const sizeStyle = computed(() => {
  if (typeof mergedSize.value !== 'number') return undefined
  const s = mergedSize.value
  return {
    width: `${s}px`,
    height: `${s}px`,
    lineHeight: `${s}px`,
    fontSize: `${s / 2}px`,
  }
})

const textStyle = computed(() => {
  if (scale.value === 1) return undefined
  return {
    transform: `scale(${scale.value}) translateX(-50%)`,
  }
})

const hasImage = computed(() => props.src && isImgExist.value)
const hasIconSlot = computed(() => !!slots.icon)
const hasText = computed(() => !hasImage.value && !hasIconSlot.value && !!slots.default)

const classes = computed(() => ({
  'ant-avatar': true,
  [`ant-avatar-${mergedShape.value}`]: true,
  'ant-avatar-lg': mergedSize.value === 'large',
  'ant-avatar-sm': mergedSize.value === 'small',
  'ant-avatar-image': hasImage.value,
  'ant-avatar-icon': hasIconSlot.value && !hasImage.value,
}))
</script>

<template>
  <span ref="avatarRef" :class="classes" :style="sizeStyle" role="img" :aria-label="alt">
    <img
      v-if="hasImage"
      :src="src"
      :srcset="srcset"
      :alt="alt"
      :draggable="draggable"
      :crossorigin="crossOrigin"
      @error="handleImgLoadError"
    />
    <slot v-else-if="hasIconSlot" name="icon" />
    <span v-else-if="hasText" ref="textRef" class="ant-avatar-string" :style="textStyle">
      <slot />
    </span>
  </span>
</template>
