<template>
  <div style="max-width: 300px">
    <h4>Custom Field Names</h4>
    <a-select
      v-model:value="value"
      style="width: 200px"
      :options="options"
      :field-names="{ label: 'name', value: 'id', options: 'children' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('lucy')

const options = [
  {
    id: 'jack',
    name: 'Jack',
    children: [
      { id: 'small-jack', name: 'Small Jack' },
    ],
  },
  { id: 'lucy', name: 'Lucy' },
  { id: 'disabled', name: 'Disabled', disabled: true },
  { id: 'yiminghe', name: 'Yiminghe' },
]
</script>
