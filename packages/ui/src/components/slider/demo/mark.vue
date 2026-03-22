<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(37)
const value2 = ref<[number, number]>([26, 37])
const value3 = ref(37)
const value4 = ref(37)
const value5 = ref(37)

const marks: Record<number, string | { style: Record<string, string>; label: string }> = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: { color: '#f50' },
    label: '100°C',
  },
}
</script>

<template>
  <div style="max-width: 400px">
    <h4>included=true</h4>
    <a-slider v-model:value="value1" :marks="marks" />
    <a-slider v-model:value="value2" range :marks="marks" />

    <h4 style="margin-top: 32px">included=false</h4>
    <a-slider v-model:value="value3" :marks="marks" :included="false" />

    <h4 style="margin-top: 32px">marks &amp; step</h4>
    <a-slider v-model:value="value4" :marks="marks" :step="10" />

    <h4 style="margin-top: 32px">step=null</h4>
    <a-slider v-model:value="value5" :marks="marks" :step="null" />
  </div>
</template>
