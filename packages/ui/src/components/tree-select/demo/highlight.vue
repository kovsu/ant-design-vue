<template>
  <div style="max-width: 400px">
    <h4>Search Value Highlight</h4>
    <a-tree-select
      v-model:value="value"
      v-model:search-value="searchValue"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      allow-clear
      tree-default-expand-all
      :tree-data="treeData"
    >
      <template #title="{ value: val, label }">
        <b v-if="val === 'parent 1-1'" style="color: #08c">{{ label }}</b>
        <template v-else>
          <template
            v-for="(fragment, i) in label
              .toString()
              .split(new RegExp(`(?<=${searchValue})|(?=${searchValue})`, 'i'))"
          >
            <span
              v-if="fragment.toLowerCase() === searchValue.toLowerCase()"
              :key="i"
              style="color: #08c"
            >
              {{ fragment }}
            </span>
            <template v-else>{{ fragment }}</template>
          </template>
        </template>
      </template>
    </a-tree-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<string | undefined>(undefined)
const searchValue = ref('')

const treeData = [
  {
    label: 'parent 1',
    value: 'parent 1',
    children: [
      {
        label: 'parent 1-0',
        value: 'parent 1-0',
        children: [
          {
            label: 'parent 1-0-0',
            value: 'parent 1-0-0',
            children: [
              { label: 'my leaf', value: 'leaf1' },
              { label: 'your leaf', value: 'leaf2' },
            ],
          },
          { label: 'parent 1-0-1', value: 'parent 1-0-1' },
        ],
      },
      { label: 'parent 1-1', value: 'parent 1-1' },
    ],
  },
]
</script>
