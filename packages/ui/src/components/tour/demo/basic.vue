<template>
  <div style="padding: 40px;">
    <a-button ref="btn1Ref" variant="solid" @click="open = true">
      Begin Tour
    </a-button>
    <a-divider />
    <a-space :size="60">
      <a-button ref="btn2Ref">Upload</a-button>
      <a-button ref="btn3Ref">Save</a-button>
    </a-space>
    <a-tour
      v-model:open="open"
      :steps="steps"
      @finish="onFinish"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TourStepInfo } from '../types'

const open = ref(false)

const btn1Ref = ref<{ $el: HTMLElement } | null>(null)
const btn2Ref = ref<{ $el: HTMLElement } | null>(null)
const btn3Ref = ref<{ $el: HTMLElement } | null>(null)

const steps = computed<TourStepInfo[]>(() => [
  {
    title: 'Begin Tour',
    description: 'Click this button to start the tour.',
    target: () => btn1Ref.value?.$el ?? null,
  },
  {
    title: 'Upload File',
    description: 'Upload your file here.',
    target: () => btn2Ref.value?.$el ?? null,
  },
  {
    title: 'Save',
    description: 'Save your changes.',
    target: () => btn3Ref.value?.$el ?? null,
  },
])

function onFinish() {
  console.log('Tour finished')
}
</script>
