<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(null)
</script>

<template>
  <div style="max-width: 200px">
    <a-time-picker
      v-model:value="value"
      :default-value="dayjs('00:00:00', 'HH:mm:ss')"
    >
      <template #suffixIcon>
        <span>&#9786;</span>
      </template>
    </a-time-picker>
  </div>
</template>
