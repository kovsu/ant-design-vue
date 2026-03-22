<script setup lang="ts">
import { ref } from 'vue'

const integerValue = ref(1)
const decimalValue = ref(0)
</script>

<template>
  <div>
    <div style="display: flex; align-items: center; gap: 16px">
      <a-slider v-model:value="integerValue" :min="1" :max="20" style="flex: 1" />
      <a-input-number v-model:value="integerValue" :min="1" :max="20" style="width: 80px" />
    </div>
    <div style="display: flex; align-items: center; gap: 16px; margin-top: 16px">
      <a-slider v-model:value="decimalValue" :min="0" :max="1" :step="0.01" style="flex: 1" />
      <a-input-number
        v-model:value="decimalValue"
        :min="0"
        :max="1"
        :step="0.01"
        style="width: 80px"
      />
    </div>
  </div>
</template>
