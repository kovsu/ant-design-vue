<script setup lang="ts">
import { ref } from 'vue'

const dataSource = Array.from({ length: 10 }, (_, i) => ({
  key: `item-${i + 1}`,
  title: `Item ${i + 1}`,
  description: `Description of item ${i + 1}`,
  disabled: i === 3,
}))

const targetKeys = ref(['item-4', 'item-5'])
const selectedKeys = ref<string[]>([])
</script>

<template>
  <a-transfer
    v-model:target-keys="targetKeys"
    v-model:selected-keys="selectedKeys"
    :data-source="dataSource"
    :titles="['Source', 'Target']"
  />
</template>
