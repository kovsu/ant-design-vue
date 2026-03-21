<script setup lang="ts">
import { ref } from 'vue'

const value = ref('Daily')
const options = ['Daily', 'Weekly', 'Monthly']
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-segmented v-model:value="value" :options="options" size="sm" />
    <a-segmented v-model:value="value" :options="options" size="md" />
    <a-segmented v-model:value="value" :options="options" size="lg" />
  </div>
</template>
