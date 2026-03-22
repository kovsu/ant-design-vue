<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>maxTagCount: {{ maxTagCount }}</h4>
    <div style="display: flex; gap: 8px">
      <a-button type="primary" @click="maxTagCount++">maxTagCount++</a-button>
      <a-button type="primary" @click="maxTagCount--">maxTagCount--</a-button>
    </div>
    <a-select
      v-model:value="value"
      mode="multiple"
      style="width: 100%"
      placeholder="Select items..."
      :max-tag-count="maxTagCount"
      :options="options"
    >
      <template #maxTagPlaceholder="{ omittedValues }">
        <span style="color: red">+ {{ omittedValues.length }} ...</span>
      </template>
    </a-select>

    <h4>maxTagCount: responsive</h4>
    <a-select
      v-model:value="value"
      mode="multiple"
      style="width: 100%"
      placeholder="Select items..."
      max-tag-count="responsive"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options: { value: string; label: string }[] = []
for (let i = 10; i < 36; i++) {
  const val = i.toString(36) + i
  options.push({ value: val, label: `Long Label: ${val}` })
}

const maxTagCount = ref(2)
const value = ref<string[]>(['a10', 'c12', 'h17', 'j19', 'k20'])
</script>
