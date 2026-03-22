<template>
  <div style="max-width: 400px">
    <h4>{{ options.length }} Items (Virtual Scroll)</h4>
    <a-select
      v-model:value="value"
      mode="multiple"
      style="width: 100%"
      placeholder="Please select"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options: { value: string; label: string; disabled?: boolean }[] = []
for (let i = 0; i < 100000; i++) {
  const val = `${i.toString(36)}${i}`
  options.push({
    value: val,
    label: val,
    disabled: i === 10,
  })
}

const value = ref<string[]>(['a10', 'c12'])
</script>
