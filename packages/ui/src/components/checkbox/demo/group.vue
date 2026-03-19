<script setup lang="ts">
import { ref } from 'vue'

const value = ref(['Apple'])
const options = ['Apple', 'Pear', 'Orange']
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <a-checkbox-group v-model:value="value" :options="options" />
    <p>Selected: {{ value }}</p>

    <a-checkbox-group v-model:value="value">
      <a-checkbox value="Apple">Apple</a-checkbox>
      <a-checkbox value="Pear">Pear</a-checkbox>
      <a-checkbox value="Orange">Orange</a-checkbox>
    </a-checkbox-group>
  </div>
</template>
