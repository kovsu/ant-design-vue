<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>Error Status</h4>
    <a-mentions
      v-model:value="value1"
      :options="options"
      status="error"
      placeholder="Error status"
    />

    <h4>Warning Status</h4>
    <a-mentions
      v-model:value="value2"
      :options="options"
      status="warning"
      placeholder="Warning status"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('@afc163')
const value2 = ref('')

const options = [
  { value: 'afc163', label: 'afc163' },
  { value: 'zombieJ', label: 'zombieJ' },
  { value: 'yesmeck', label: 'yesmeck' },
]
</script>
