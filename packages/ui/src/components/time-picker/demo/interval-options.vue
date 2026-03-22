<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(null)
</script>

<template>
  <div style="max-width: 200px">
    <a-time-picker v-model:value="value" :minute-step="15" :second-step="10" />
  </div>
</template>
