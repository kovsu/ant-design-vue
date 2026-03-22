<script setup lang="ts">
import { ref, computed } from 'vue'

const sliderValue = ref(0)
const min = 0
const max = 20

const preColor = computed(() => {
  const mid = (max - min) / 2
  return sliderValue.value >= mid ? '' : 'rgba(0, 0, 0, 0.45)'
})

const nextColor = computed(() => {
  const mid = (max - min) / 2
  return sliderValue.value >= mid ? 'rgba(0, 0, 0, 0.45)' : ''
})
</script>

<template>
  <div
    style="
      position: relative;
      padding: 0 30px;
      display: flex;
      align-items: center;
      gap: 12px;
      max-width: 400px;
    "
  >
    <span :style="{ color: preColor, fontSize: '16px' }">&#9785;</span>
    <a-slider v-model:value="sliderValue" :min="min" :max="max" style="flex: 1" />
    <span :style="{ color: nextColor, fontSize: '16px' }">&#9786;</span>
  </div>
</template>
