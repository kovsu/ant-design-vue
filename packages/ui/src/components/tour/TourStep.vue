<template>
  <div :class="panelClasses" :style="panelStyle" role="dialog" aria-modal="true">
    <!-- Arrow -->
    <div v-if="showArrow" class="ant-tour-arrow" :style="arrowStyle" />

    <!-- Cover image -->
    <div v-if="step.cover" class="ant-tour-cover">
      <img :src="step.cover" :alt="step.title" />
    </div>

    <!-- Header -->
    <div class="ant-tour-header">
      <div class="ant-tour-title">{{ step.title }}</div>
    </div>

    <!-- Description -->
    <div v-if="step.description" class="ant-tour-description">
      {{ step.description }}
    </div>

    <!-- Footer -->
    <div class="ant-tour-footer">
      <!-- Indicators -->
      <div class="ant-tour-indicators">
        <slot name="indicatorsRender" :current="current" :total="total">
          <span
            v-for="i in total"
            :key="i - 1"
            :class="[
              'ant-tour-indicator',
              { 'ant-tour-indicator-active': i - 1 === current },
            ]"
          />
        </slot>
      </div>

      <!-- Buttons -->
      <div class="ant-tour-buttons">
        <button
          v-if="current > 0"
          type="button"
          class="ant-tour-prev-btn"
          @click="onPrev"
        >
          {{ prevText }}
        </button>
        <button
          type="button"
          :class="nextBtnClass"
          @click="onNext"
        >
          {{ nextText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TourStepInfo, TourPlacement } from './types'

defineOptions({ name: 'ATourStep' })

const props = defineProps<{
  step: TourStepInfo
  current: number
  total: number
  type: 'default' | 'primary'
  placement: TourPlacement
  arrow: boolean | { pointAtCenter: boolean }
  targetRect: DOMRect | null
  panelPosition: { top: number; left: number }
  actualPlacement: TourPlacement
}>()

const emit = defineEmits<{
  (e: 'prev'): void
  (e: 'next'): void
}>()

// --- Step type ---
const resolvedType = computed(() => props.step.type ?? props.type)

// --- Arrow visibility ---
const showArrow = computed(() => {
  const stepArrow = props.step.arrow
  if (stepArrow !== undefined) {
    return stepArrow !== false
  }
  return props.arrow !== false
})

// --- Panel classes ---
const panelClasses = computed(() => [
  'ant-tour',
  `ant-tour-placement-${props.actualPlacement}`,
  {
    'ant-tour-primary': resolvedType.value === 'primary',
  },
])

// --- Panel positioning ---
const panelStyle = computed(() => ({
  position: 'fixed' as const,
  top: `${props.panelPosition.top}px`,
  left: `${props.panelPosition.left}px`,
  zIndex: 1002,
}))

// --- Arrow positioning ---
const arrowStyle = computed(() => {
  const side = props.actualPlacement
  const style: Record<string, string> = {}

  if (side.startsWith('top')) {
    style.bottom = '-6px'
    style.transform = 'rotate(180deg)'
  } else if (side.startsWith('bottom')) {
    style.top = '-6px'
  } else if (side.startsWith('left')) {
    style.right = '-6px'
    style.transform = 'rotate(90deg)'
  } else if (side.startsWith('right')) {
    style.left = '-6px'
    style.transform = 'rotate(-90deg)'
  }

  return style
})

// --- Button text ---
const prevText = computed(() => props.step.prevButtonProps?.children ?? 'Previous')
const nextText = computed(() => {
  if (props.current >= props.total - 1) {
    return props.step.nextButtonProps?.children ?? 'Finish'
  }
  return props.step.nextButtonProps?.children ?? 'Next'
})

const nextBtnClass = computed(() => [
  'ant-tour-next-btn',
  {
    'ant-tour-primary-btn': resolvedType.value === 'primary',
  },
])

// --- Handlers ---
function onPrev() {
  props.step.prevButtonProps?.onClick?.()
  emit('prev')
}

function onNext() {
  props.step.nextButtonProps?.onClick?.()
  emit('next')
}
</script>
