<template>
  <div style="padding: 40px;">
    <a-button variant="solid" @click="open = true">Begin Tour</a-button>

    <a-divider />

    <a-space :size="60">
      <a-button ref="btn1Ref">Upload</a-button>
      <a-button ref="btn2Ref" variant="solid">Save</a-button>
      <a-button ref="btn3Ref">More</a-button>
    </a-space>

    <a-tour v-model:open="open" :steps="steps">
      <template #indicatorsRender="{ current, total }">
        <span>{{ current + 1 }} / {{ total }}</span>
      </template>
    </a-tour>
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
    title: 'Upload File',
    description: 'Put your files here.',
    target: () => btn1Ref.value?.$el ?? null,
  },
  {
    title: 'Save',
    description: 'Save your changes.',
    target: () => btn2Ref.value?.$el ?? null,
  },
  {
    title: 'Other Actions',
    description: 'Click to see other actions.',
    target: () => btn3Ref.value?.$el ?? null,
  },
])
</script>
