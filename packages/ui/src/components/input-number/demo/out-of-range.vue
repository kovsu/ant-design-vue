<script setup lang="ts">
import { ref } from 'vue'

const value = ref(99)
</script>

<template>
  <div style="display: flex; align-items: center; gap: 16px">
    <a-input-number v-model:value="value" :min="1" :max="10" />
    <a-button type="primary" @click="value = 99">Reset to 99</a-button>
  </div>
</template>
