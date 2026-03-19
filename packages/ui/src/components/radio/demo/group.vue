<script setup lang="ts">
import { ref } from 'vue'

const value = ref('A')
const optionsValue = ref('Apple')
const options = ['Apple', 'Pear', 'Orange']
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-radio-group v-model:value="value">
      <a-radio value="A">A</a-radio>
      <a-radio value="B">B</a-radio>
      <a-radio value="C">C</a-radio>
      <a-radio value="D">D</a-radio>
    </a-radio-group>
    <p>Selected: {{ value }}</p>

    <a-radio-group v-model:value="optionsValue" :options="options" />
    <p>Selected: {{ optionsValue }}</p>
  </div>
</template>
