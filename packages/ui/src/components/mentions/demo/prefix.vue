<template>
  <div style="max-width: 400px">
    <h4>Custom Trigger Prefix</h4>
    <a-mentions
      v-model:value="value"
      placeholder="Type @ to mention people, # to mention tag"
      :prefix="['@', '#']"
      :options="options"
      @search="onSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const MOCK_DATA: Record<string, string[]> = {
  '@': ['afc163', 'zombieJ', 'yesmeck'],
  '#': ['1.0', '2.0', '3.0'],
}

const currentPrefix = ref('@')
const value = ref('')

const options = computed(() =>
  (MOCK_DATA[currentPrefix.value] || []).map((val) => ({
    value: val,
    label: val,
  })),
)

const onSearch = (_: string, prefix: string) => {
  currentPrefix.value = prefix
}
</script>
