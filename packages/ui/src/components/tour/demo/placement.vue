<template>
  <div style="padding: 80px 160px;">
    <div ref="targetRef" style="display: inline-block; padding: 16px 24px; border: 1px dashed #d9d9d9; border-radius: 8px;">
      Target Element
    </div>
    <a-divider />
    <a-space>
      <a-button variant="solid" @click="startTour('top')">Top</a-button>
      <a-button variant="solid" @click="startTour('bottom')">Bottom</a-button>
      <a-button variant="solid" @click="startTour('left')">Left</a-button>
      <a-button variant="solid" @click="startTour('right')">Right</a-button>
    </a-space>
    <a-tour
      v-model:open="open"
      :steps="steps"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TourStepInfo, TourPlacement } from '../types'

const open = ref(false)
const placement = ref<TourPlacement>('bottom')
const targetRef = ref<HTMLElement | null>(null)

function startTour(p: TourPlacement) {
  placement.value = p
  open.value = true
}

const steps = computed<TourStepInfo[]>(() => [
  {
    title: 'Placement Demo',
    description: `The tour panel is placed at the "${placement.value}" position.`,
    placement: placement.value,
    target: () => targetRef.value,
  },
])
</script>
