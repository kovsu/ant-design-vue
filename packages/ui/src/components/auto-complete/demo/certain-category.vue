<template>
  <div style="max-width: 300px">
    <h4>Lookup Patterns - Certain Category</h4>
    <a-auto-complete
      v-model:value="value"
      :dropdown-match-select-width="500"
      style="width: 250px"
      :options="dataSource"
    >
      <template #option="item">
        <template v-if="item.options">
          <span>
            {{ item.value }}
            <a
              style="float: right"
              href="https://www.google.com/search?q=antd"
              target="_blank"
              rel="noopener noreferrer"
            >
              more
            </a>
          </span>
        </template>
        <template v-else-if="item.value === 'all'">
          <a
            href="https://www.google.com/search?q=ant-design-vue"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all results
          </a>
        </template>
        <template v-else>
          <div style="display: flex; justify-content: space-between">
            {{ item.value }}
            <span>{{ item.count }} people</span>
          </div>
        </template>
      </template>
    </a-auto-complete>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dataSource = [
  {
    value: 'Libraries',
    options: [
      { value: 'AntDesignVue', count: 10000 },
      { value: 'AntDesignVue UI', count: 10600 },
    ],
  },
  {
    value: 'Solutions',
    options: [
      { value: 'AntDesignVue UI FAQ', count: 60100 },
      { value: 'AntDesignVue FAQ', count: 30010 },
    ],
  },
  {
    value: 'Articles',
    options: [
      { value: 'AntDesignVue design language', count: 100000 },
    ],
  },
  {
    value: 'all',
  },
]

const value = ref('')
</script>
