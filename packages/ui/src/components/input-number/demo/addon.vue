<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(100)
const value2 = ref(100)
const value3 = ref(100)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-input-number v-model:value="value1" addon-before="+" addon-after="$" />
    <a-input-number v-model:value="value2">
      <template #addonBefore>+</template>
      <template #addonAfter>$</template>
    </a-input-number>
    <a-input-number v-model:value="value3">
      <template #addonAfter>%</template>
    </a-input-number>
  </div>
</template>
