<template>
  <Teleport to="body">
    <Transition name="ant-fade">
      <div v-if="mergedOpen" class="ant-tour-root" :style="rootStyle">
        <!-- Mask with spotlight cutout -->
        <div
          v-if="showMask"
          class="ant-tour-mask"
          :style="maskStyle"
          @click="onMaskClick"
        />
        <div
          v-if="showMask && currentTargetRect"
          class="ant-tour-target-placeholder"
          :style="targetPlaceholderStyle"
        />

        <!-- Step panel -->
        <TourStep
          :step="currentStep"
          :current="mergedCurrent"
          :total="props.steps.length"
          :type="resolvedType"
          :placement="resolvedPlacement"
          :arrow="resolvedArrow"
          :target-rect="currentTargetRect"
          :panel-position="panelPosition"
          :actual-placement="actualPlacement"
          @prev="onPrev"
          @next="onNext"
        >
          <template v-if="$slots.indicatorsRender" #indicatorsRender="scope">
            <slot name="indicatorsRender" v-bind="scope" />
          </template>
        </TourStep>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue'
import TourStep from './TourStep.vue'
import type { TourProps, TourEmits, TourSlots, TourPlacement } from './types'
import { tourDefaultProps } from './types'

defineOptions({ name: 'ATour' })

const props = withDefaults(defineProps<TourProps>(), tourDefaultProps)
const emit = defineEmits<TourEmits>()
defineSlots<TourSlots>()

// --- Open state ---
const instance = getCurrentInstance()!
const isOpenControlled = computed(() => {
  const rawProps = instance.vnode.props || {}
  return 'open' in rawProps
})
const internalOpen = ref(false)
const mergedOpen = computed(() => {
  if (isOpenControlled.value) {
    return props.open ?? false
  }
  return internalOpen.value
})

// --- Current step state ---
const isCurrentControlled = computed(() => {
  const rawProps = instance.vnode.props || {}
  return 'current' in rawProps
})
const internalCurrent = ref(0)
const mergedCurrent = computed(() => {
  if (isCurrentControlled.value) {
    return props.current ?? 0
  }
  return internalCurrent.value
})

// --- Current step info ---
const currentStep = computed(() => props.steps[mergedCurrent.value] ?? props.steps[0])

// --- Resolved type ---
const resolvedType = computed(() => currentStep.value?.type ?? props.type ?? 'default')

// --- Resolved mask ---
const showMask = computed(() => {
  const stepMask = currentStep.value?.mask
  if (stepMask !== undefined) {
    return stepMask !== false
  }
  return props.mask !== false
})

const maskColor = computed(() => {
  const stepMask = currentStep.value?.mask
  if (typeof stepMask === 'object' && stepMask?.color) return stepMask.color
  if (typeof props.mask === 'object' && props.mask?.color) return props.mask.color
  return 'rgba(0, 0, 0, 0.5)'
})

// --- Resolved arrow ---
const resolvedArrow = computed(() => {
  const stepArrow = currentStep.value?.arrow
  if (stepArrow !== undefined) return stepArrow
  return props.arrow ?? true
})

// --- Resolved placement ---
const resolvedPlacement = computed<TourPlacement>(() => {
  return currentStep.value?.placement ?? props.placement ?? 'bottom'
})

// --- Target rect tracking ---
const currentTargetRect = ref<DOMRect | null>(null)

function updateTargetRect() {
  const target = currentStep.value?.target?.()
  if (target) {
    currentTargetRect.value = target.getBoundingClientRect()
  } else {
    currentTargetRect.value = null
  }
}

// --- Panel positioning ---
const PANEL_GAP = 12
const PANEL_WIDTH = 520

const panelPosition = computed(() => {
  const rect = currentTargetRect.value
  if (!rect) {
    // Center on screen
    if (typeof window === 'undefined') return { top: 0, left: 0 }
    return {
      top: window.innerHeight / 2 - 100,
      left: window.innerWidth / 2 - PANEL_WIDTH / 2,
    }
  }
  return calculatePosition(rect, resolvedPlacement.value)
})

const actualPlacement = computed(() => resolvedPlacement.value)

function calculatePosition(rect: DOMRect, placement: TourPlacement) {
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  switch (placement) {
    case 'top':
      return { top: rect.top - PANEL_GAP, left: centerX - PANEL_WIDTH / 2 }
    case 'topLeft':
      return { top: rect.top - PANEL_GAP, left: rect.left }
    case 'topRight':
      return { top: rect.top - PANEL_GAP, left: rect.right - PANEL_WIDTH }
    case 'bottom':
      return { top: rect.bottom + PANEL_GAP, left: centerX - PANEL_WIDTH / 2 }
    case 'bottomLeft':
      return { top: rect.bottom + PANEL_GAP, left: rect.left }
    case 'bottomRight':
      return { top: rect.bottom + PANEL_GAP, left: rect.right - PANEL_WIDTH }
    case 'left':
      return { top: centerY - 50, left: rect.left - PANEL_WIDTH - PANEL_GAP }
    case 'leftTop':
      return { top: rect.top, left: rect.left - PANEL_WIDTH - PANEL_GAP }
    case 'leftBottom':
      return { top: rect.bottom - 100, left: rect.left - PANEL_WIDTH - PANEL_GAP }
    case 'right':
      return { top: centerY - 50, left: rect.right + PANEL_GAP }
    case 'rightTop':
      return { top: rect.top, left: rect.right + PANEL_GAP }
    case 'rightBottom':
      return { top: rect.bottom - 100, left: rect.right + PANEL_GAP }
    default:
      return { top: rect.bottom + PANEL_GAP, left: centerX - PANEL_WIDTH / 2 }
  }
}

// --- Styles ---
const rootStyle = computed(() => ({
  zIndex: props.zIndex,
}))

const maskStyle = computed(() => ({
  backgroundColor: maskColor.value,
}))

const targetPlaceholderStyle = computed(() => {
  const rect = currentTargetRect.value
  if (!rect) return { display: 'none' }
  return {
    top: `${rect.top - 4}px`,
    left: `${rect.left - 4}px`,
    width: `${rect.width + 8}px`,
    height: `${rect.height + 8}px`,
    boxShadow: `0 0 0 9999px ${maskColor.value}`,
  }
})

// --- Event handlers ---
function setOpen(open: boolean) {
  if (!isOpenControlled.value) {
    internalOpen.value = open
  }
  emit('update:open', open)
}

function setCurrent(step: number) {
  if (!isCurrentControlled.value) {
    internalCurrent.value = step
  }
  emit('update:current', step)
  emit('change', step)
}

function onMaskClick() {
  closeTour()
}

function closeTour() {
  emit('close', mergedCurrent.value)
  setOpen(false)
}

function onPrev() {
  if (mergedCurrent.value > 0) {
    setCurrent(mergedCurrent.value - 1)
  }
}

function onNext() {
  if (mergedCurrent.value >= props.steps.length - 1) {
    emit('finish')
    setOpen(false)
  } else {
    setCurrent(mergedCurrent.value + 1)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    closeTour()
  }
}

// --- Reposition on scroll/resize ---
let rafId: number | null = null

function onScrollOrResize() {
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    updateTargetRect()
    rafId = null
  })
}

// --- Lifecycle ---
watch(mergedOpen, (val) => {
  if (val) {
    nextTick(() => {
      updateTargetRect()
    })
  }
})

watch(mergedCurrent, () => {
  if (mergedOpen.value) {
    nextTick(() => {
      updateTargetRect()
    })
  }
})

// Reset current when opening
watch(mergedOpen, (val, oldVal) => {
  if (val && !oldVal && !isCurrentControlled.value) {
    internalCurrent.value = 0
  }
})

onMounted(() => {
  if (typeof window === 'undefined') return
  window.addEventListener('resize', onScrollOrResize)
  window.addEventListener('scroll', onScrollOrResize, true)
  document.addEventListener('keydown', onKeydown)
  if (mergedOpen.value) {
    updateTargetRect()
  }
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('resize', onScrollOrResize)
  window.removeEventListener('scroll', onScrollOrResize, true)
  document.removeEventListener('keydown', onKeydown)
  if (rafId !== null) {
    cancelAnimationFrame(rafId)
  }
})
</script>
