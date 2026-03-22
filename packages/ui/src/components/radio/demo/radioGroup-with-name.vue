<script setup lang="ts">
import { ref } from 'vue'

const value = ref('1')
</script>

<template>
  <div>
    <a-radio-group v-model:value="value" name="radioGroup">
      <a-radio value="1">A</a-radio>
      <a-radio value="2">B</a-radio>
      <a-radio value="3">C</a-radio>
      <a-radio value="4">D</a-radio>
    </a-radio-group>
  </div>
</template>
