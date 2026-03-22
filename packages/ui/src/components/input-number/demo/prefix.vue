<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(1)
const value2 = ref(2)
const value3 = ref(3)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <a-input-number v-model:value="value1" prefix="$" style="width: 100%" />
    <a-input-number v-model:value="value2" prefix="$" style="width: 100%">
      <template #addonBefore>User</template>
    </a-input-number>
    <a-input-number v-model:value="value3" prefix="$" disabled style="width: 100%" />
  </div>
</template>
