<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
const keyboard = ref(true)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <a-input-number v-model:value="value" :keyboard="keyboard" :min="1" :max="10" />
    <label>
      <input v-model="keyboard" type="checkbox" />
      Toggle keyboard
    </label>
  </div>
</template>
