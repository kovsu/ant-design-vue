<template>
  <div style="max-width: 400px">
    <h4>Lookup Patterns - Uncertain Category</h4>
    <a-auto-complete
      v-model:value="value"
      :dropdown-match-select-width="252"
      style="width: 300px"
      :options="dataSource"
      @search="handleSearch"
    >
      <template #option="item">
        <div style="display: flex; justify-content: space-between">
          <span>
            Found {{ item.query }} on
            <a
              :href="`https://s.taobao.com/search?q=${item.query}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.category }}
            </a>
          </span>
          <span>{{ item.count }} results</span>
        </div>
      </template>
    </a-auto-complete>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface SearchOption {
  query: string
  category: string
  value: string
  count: number
}

const value = ref('')
const dataSource = ref<SearchOption[]>([])

const getRandomInt = (max: number, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const searchResult = (query: string): SearchOption[] => {
  return new Array(getRandomInt(5))
    .join('.')
    .split('.')
    .map((_item, idx) => ({
      query,
      category: `${query}${idx}`,
      value: `${query}${idx}`,
      count: getRandomInt(200, 100),
    }))
}

const handleSearch = (val: string) => {
  dataSource.value = val ? searchResult(val) : []
}
</script>
