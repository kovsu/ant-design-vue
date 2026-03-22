<template>
  <div style="max-width: 300px">
    <h4>Option Group</h4>
    <a-select
      v-model:value="value"
      style="width: 200px"
      :options="options"
      placeholder="Select from groups"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | undefined>(undefined)

const options = [
  {
    label: 'Manager',
    options: [
      { value: 'jack', label: 'Jack' },
      { value: 'lucy', label: 'Lucy' },
    ],
  },
  {
    label: 'Engineer',
    options: [
      { value: 'yiminghe', label: 'Yiminghe' },
      { value: 'tom', label: 'Tom' },
    ],
  },
]
</script>
