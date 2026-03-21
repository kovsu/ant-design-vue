<script setup lang="ts">
import { ref } from 'vue'

const dataSource = Array.from({ length: 10 }, (_, i) => ({
  key: `item-${i + 1}`,
  title: `Item ${i + 1}`,
  description: `Description of item ${i + 1}`,
}))

const targetKeys = ref(['item-3', 'item-6'])
</script>

<template>
  <a-transfer
    v-model:targetKeys="targetKeys"
    :data-source="dataSource"
    :titles="['Source', 'Target']"
    one-way
  />
</template>
