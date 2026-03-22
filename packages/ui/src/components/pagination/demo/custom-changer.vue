<template>
  <a-pagination
    v-model:current="current"
    v-model:pageSize="pageSize"
    :page-size-options="[10, 20, 30, 40, 50]"
    :total="50"
    show-size-changer
    @showSizeChange="onShowSizeChange"
  >
    <template #buildOptionText="{ value: val }">
      <span v-if="val !== 50">{{ val }} items/page</span>
      <span v-else>All</span>
    </template>
  </a-pagination>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current = ref(1)
const pageSize = ref(10)

const onShowSizeChange = (current: number, size: number) => {
  console.log(current, size)
}
</script>
