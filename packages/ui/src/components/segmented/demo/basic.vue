<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Daily')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-segmented
      v-model:value="value"
      :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']"
    />
    <p>Selected: {{ value }}</p>
  </div>
</template>
