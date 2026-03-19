<script setup lang="ts">
import { ref } from 'vue'

const value = ref(30)
const rangeValue = ref<[number, number]>([20, 50])
const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: '100°C',
}
</script>

<template>
  <div style="display: flex; gap: 48px; height: 300px;">
    <a-slider v-model:value="value" vertical />
    <a-slider v-model:value="rangeValue" vertical range />
    <a-slider vertical :marks="marks" :default-value="37" />
  </div>
</template>
