<script setup lang="ts">
import { ref } from 'vue'

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: { color: '#f50' },
    label: '100°C',
  },
}

const value = ref(37)
</script>

<template>
  <div style="max-width: 400px;">
    <h4>Slider with marks</h4>
    <a-slider v-model:value="value" :marks="marks" />

    <h4 style="margin-top: 48px;">included=false</h4>
    <a-slider :marks="marks" :included="false" :default-value="37" />

    <h4 style="margin-top: 48px;">marks &amp; step</h4>
    <a-slider :marks="marks" :step="10" :default-value="37" />
  </div>
</template>
