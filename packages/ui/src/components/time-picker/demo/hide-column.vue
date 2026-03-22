<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(dayjs('12:08', 'HH:mm'))
</script>

<template>
  <div style="max-width: 200px">
    <a-time-picker v-model:value="value" format="HH:mm" />
  </div>
</template>
