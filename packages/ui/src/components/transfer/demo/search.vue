<script setup lang="ts">
import { ref } from 'vue'

const dataSource = Array.from({ length: 20 }, (_, i) => ({
  key: `item-${i + 1}`,
  title: `Item ${i + 1}`,
  description: `Description of item ${i + 1}`,
}))

const targetKeys = ref(['item-5', 'item-10'])
</script>

<template>
  <a-transfer
    v-model:targetKeys="targetKeys"
    :data-source="dataSource"
    :titles="['Source', 'Target']"
    show-search
    search-placeholder="Search items"
  />
</template>
