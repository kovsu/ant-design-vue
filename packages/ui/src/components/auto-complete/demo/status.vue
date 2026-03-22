<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px">
    <h4>Error Status</h4>
    <a-auto-complete
      v-model:value="value"
      :options="options"
      style="width: 200px"
      placeholder="Error status"
      status="error"
      @search="onSearch"
    />

    <h4>Warning Status with Allow Clear</h4>
    <a-auto-complete
      v-model:value="value2"
      :options="options2"
      style="width: 200px"
      placeholder="Warning status"
      status="warning"
      allow-clear
      @search="onSearch2"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
})

const value = ref('')
const options = ref<{ value: string }[]>([])
const onSearch = (searchText: string) => {
  options.value = !searchText
    ? []
    : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}

const value2 = ref('')
const options2 = ref<{ value: string }[]>([])
const onSearch2 = (searchText: string) => {
  options2.value = !searchText
    ? []
    : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)]
}
</script>
