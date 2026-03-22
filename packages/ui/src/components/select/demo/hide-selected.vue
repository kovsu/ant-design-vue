<template>
  <div style="max-width: 400px">
    <h4>Hide Already Selected</h4>
    <a-select
      v-model:value="selectedItems"
      mode="multiple"
      placeholder="Selected items are hidden"
      style="width: 100%"
      :options="filteredOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const allOptions = ['Apples', 'Nails', 'Bananas', 'Helicopters']
const selectedItems = ref<string[]>([])

const filteredOptions = computed(() =>
  allOptions
    .filter(o => !selectedItems.value.includes(o))
    .map(o => ({ value: o, label: o })),
)
</script>
