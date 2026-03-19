<script setup lang="ts">
import { ref } from 'vue'

const value = ref<[number, number]>([20, 50])
</script>

<template>
  <div style="max-width: 400px;">
    <a-slider v-model:value="value" range />
    <p>Value: {{ value }}</p>
  </div>
</template>
