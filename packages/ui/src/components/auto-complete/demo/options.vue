<template>
  <div style="max-width: 300px">
    <h4>Custom Option Rendering</h4>
    <a-auto-complete
      v-model:value="value"
      style="width: 200px"
      placeholder="Enter an email"
      :options="options"
      @search="handleSearch"
    >
      <template #option="{ value: val }">
        {{ val.split('@')[0] }} @
        <span style="font-weight: bold">{{ val.split('@')[1] }}</span>
      </template>
    </a-auto-complete>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const options = ref<{ value: string }[]>([])

const handleSearch = (val: string) => {
  if (!val || val.includes('@')) {
    options.value = []
  } else {
    options.value = ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
      value: `${val}@${domain}`,
    }))
  }
}
</script>
