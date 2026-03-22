<template>
  <div style="display: flex; align-items: center; gap: 8px">
    <a-rate v-model:value="value" />
    <span v-if="value" style="color: rgba(0, 0, 0, 0.45)">{{ desc[value - 1] }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(3)
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']
</script>
