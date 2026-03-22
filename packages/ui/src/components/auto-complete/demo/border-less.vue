<template>
  <div style="max-width: 300px">
    <h4>Borderless AutoComplete</h4>
    <a-auto-complete
      v-model:value="value"
      :options="options"
      style="width: 200px"
      placeholder="Borderless"
      :bordered="false"
      @search="onSearch"
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
</script>
