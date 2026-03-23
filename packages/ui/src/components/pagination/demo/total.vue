<template>
  <div style="display: flex; flex-direction: column; gap: 16px">
    <a-pagination
      v-model:current="current1"
      v-model:page-size="pageSize1"
      :total="85"
      :show-total="(total: number) => `Total ${total} items`"
    />
    <a-pagination
      v-model:current="current2"
      v-model:page-size="pageSize2"
      :total="85"
      :show-total="(total: number, range: [number, number]) => `${range[0]}-${range[1]} of ${total} items`"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const current1 = ref(1)
const current2 = ref(2)
const pageSize1 = ref(20)
const pageSize2 = ref(20)
</script>
