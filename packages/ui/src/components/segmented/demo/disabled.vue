<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('Weekly')
const value2 = ref('Daily')
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <p>Fully disabled:</p>
    <a-segmented
      v-model:value="value1"
      :options="['Daily', 'Weekly', 'Monthly']"
      disabled
    />
    <p>Per-option disabled:</p>
    <a-segmented
      v-model:value="value2"
      :options="[
        { value: 'Daily', label: 'Daily' },
        { value: 'Weekly', label: 'Weekly', disabled: true },
        { value: 'Monthly', label: 'Monthly' },
      ]"
    />
  </div>
</template>
