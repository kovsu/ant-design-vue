<template>
  <div style="max-width: 400px">
    <h4>Placement (Top)</h4>
    <a-mentions
      v-model:value="value"
      placement="top"
      :options="options"
      placeholder="Type @ to see suggestions above"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  { value: 'afc163', label: 'afc163' },
  { value: 'zombieJ', label: 'zombieJ' },
  { value: 'yesmeck', label: 'yesmeck' },
]
</script>
