<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>Disabled</h4>
    <a-mentions
      v-model:value="value1"
      :options="options"
      placeholder="Disabled mentions"
      disabled
    />

    <h4>Readonly</h4>
    <a-mentions
      v-model:value="value2"
      :options="options"
      placeholder="Readonly mentions"
      readonly
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')

const options = [
  { value: 'afc163', label: 'afc163' },
  { value: 'zombieJ', label: 'zombieJ' },
  { value: 'yesmeck', label: 'yesmeck' },
]
</script>
