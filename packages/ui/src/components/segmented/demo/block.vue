<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Daily')
</script>

<template>
  <div style="max-width: 600px;">
    <a-segmented
      v-model:value="value"
      :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']"
      block
    />
  </div>
</template>
