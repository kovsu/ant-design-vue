<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <h4>Show Tree Line</h4>
    <div style="display: flex; gap: 16px">
      <a-switch
        v-model:checked="treeLine"
        checked-children="treeLine"
        un-checked-children="treeLine"
      />
      <a-switch
        v-model:checked="showLeafIcon"
        :disabled="!treeLine"
        checked-children="showLeafIcon"
        un-checked-children="showLeafIcon"
      />
    </div>
    <a-tree-select
      v-model:value="value"
      style="width: 100%"
      placeholder="Please select"
      :tree-line="treeLine"
      :tree-data="treeData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const treeLine = ref(true)
const showLeafIcon = ref(false)
const value = ref<string | undefined>(undefined)

const treeData = [
  {
    label: 'parent 1',
    value: 'parent 1',
    children: [
      {
        label: 'parent 1-0',
        value: 'parent 1-0',
        children: [
          { label: 'my leaf', value: 'leaf1' },
          { label: 'your leaf', value: 'leaf2' },
        ],
      },
      { label: 'parent 1-1', value: 'parent 1-1' },
    ],
  },
]
</script>
