<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>Custom Option Rendering with tagRender</h4>
    <a-select
      v-model:value="value"
      mode="multiple"
      style="width: 100%"
      placeholder="Select countries"
      option-label-prop="label"
      :options="options"
    >
      <template #option="{ label }">
        {{ label }}
      </template>
      <template #tagRender="{ label, closable, onClose }">
        <a-tag :closable="closable" style="margin-right: 3px" @close="onClose">
          {{ label }}
        </a-tag>
      </template>
    </a-select>
    <p>Selected: {{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string[]>(['china'])

const options = [
  { value: 'china', label: 'China' },
  { value: 'usa', label: 'USA' },
  { value: 'japan', label: 'Japan' },
  { value: 'korea', label: 'Korea' },
]
</script>
