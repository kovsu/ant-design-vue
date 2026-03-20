<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>Basic Mentions</h4>
    <a-mentions
      v-model:value="value"
      placeholder="Type @ to mention someone"
      :options="options"
    />

    <h4>Custom Prefix</h4>
    <a-mentions
      v-model:value="value2"
      :prefix="['@', '#']"
      placeholder="Type @ or # to trigger"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const value2 = ref('')

const options = [
  { value: 'afc163', label: 'afc163' },
  { value: 'zombieJ', label: 'zombieJ' },
  { value: 'yesmeck', label: 'yesmeck' },
]
</script>
