<script setup lang="ts">
import { ref } from 'vue'

const dataSource = Array.from({ length: 6 }, (_, i) => ({
  key: `item-${i + 1}`,
  title: `Item ${i + 1}`,
  description: `Description of item ${i + 1}`,
}))

const targetKeys = ref(['item-2', 'item-4'])
</script>

<template>
  <a-transfer
    v-model:targetKeys="targetKeys"
    :data-source="dataSource"
    :titles="['Source', 'Target']"
    disabled
  />
</template>
