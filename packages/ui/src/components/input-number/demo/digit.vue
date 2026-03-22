<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
</script>

<template>
  <div>
    <a-input-number
      v-model:value="value"
      style="width: 200px"
      :min="0"
      :max="10"
      :step="0.00000000000001"
      string-mode
    />
  </div>
</template>
