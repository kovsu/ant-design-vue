<script setup lang="ts">
import { ref } from 'vue'

const value = ref(30)
</script>

<template>
  <div style="max-width: 400px">
    <p>Tooltip is always visible (tooltip-open=true):</p>
    <a-slider v-model:value="value" :tooltip-open="true" />
  </div>
</template>
