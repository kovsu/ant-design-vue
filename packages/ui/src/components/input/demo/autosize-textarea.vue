<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <a-textarea
      v-model:value="value1"
      placeholder="Autosize height based on content lines"
      auto-size
    />
    <a-textarea
      v-model:value="value2"
      placeholder="Autosize with min 2 and max 5 lines"
      :auto-size="{ minRows: 2, maxRows: 5 }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
</script>
