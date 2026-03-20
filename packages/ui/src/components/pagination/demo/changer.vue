<template>
  <a-pagination
    v-model:current="current"
    v-model:pageSize="pageSize"
    :total="500"
    show-size-changer
    :show-total="(total: number) => `Total ${total} items`"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const current = ref(1)
const pageSize = ref(10)
</script>
