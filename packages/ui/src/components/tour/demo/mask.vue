<template>
  <div style="padding: 40px;">
    <a-space>
      <a-button ref="btn1Ref" variant="solid" @click="openMask = true">
        With Mask
      </a-button>
      <a-button ref="btn2Ref" @click="openNoMask = true">
        Without Mask
      </a-button>
      <a-button ref="btn3Ref" variant="dashed" @click="openCustom = true">
        Custom Mask Color
      </a-button>
    </a-space>

    <!-- Tour with mask (default) -->
    <a-tour
      v-model:open="openMask"
      :steps="stepsWithMask"
    />

    <!-- Tour without mask -->
    <a-tour
      v-model:open="openNoMask"
      :mask="false"
      :steps="stepsNoMask"
    />

    <!-- Tour with custom mask color -->
    <a-tour
      v-model:open="openCustom"
      :mask="{ color: 'rgba(0, 100, 200, 0.4)' }"
      :steps="stepsCustomMask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TourStepInfo } from '../types'

const openMask = ref(false)
const openNoMask = ref(false)
const openCustom = ref(false)

const btn1Ref = ref<{ $el: HTMLElement } | null>(null)
const btn2Ref = ref<{ $el: HTMLElement } | null>(null)
const btn3Ref = ref<{ $el: HTMLElement } | null>(null)

const stepsWithMask = computed<TourStepInfo[]>(() => [
  {
    title: 'With Mask',
    description: 'The default mask is shown around the target.',
    target: () => btn1Ref.value?.$el ?? null,
  },
])

const stepsNoMask = computed<TourStepInfo[]>(() => [
  {
    title: 'Without Mask',
    description: 'No mask is displayed.',
    target: () => btn2Ref.value?.$el ?? null,
  },
])

const stepsCustomMask = computed<TourStepInfo[]>(() => [
  {
    title: 'Custom Mask',
    description: 'The mask color is customized to a blue tint.',
    target: () => btn3Ref.value?.$el ?? null,
  },
])
</script>
