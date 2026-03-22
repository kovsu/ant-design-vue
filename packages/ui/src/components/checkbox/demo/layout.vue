<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>([])
</script>

<template>
  <a-checkbox-group v-model:value="value" style="width: 100%;">
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
      <a-checkbox value="A">A</a-checkbox>
      <a-checkbox value="B">B</a-checkbox>
      <a-checkbox value="C">C</a-checkbox>
      <a-checkbox value="D">D</a-checkbox>
      <a-checkbox value="E">E</a-checkbox>
    </div>
  </a-checkbox-group>
</template>
