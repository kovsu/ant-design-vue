<template>
  <div>
    <a-alert v-if="selectedDate" style="margin-bottom: 16px">
      <template #message>
        Selected: {{ selectedDate.format('YYYY-MM-DD') }}
      </template>
    </a-alert>
    <div style="max-width: 300px">
      <a-calendar v-model:value="selectedDate" :fullscreen="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const selectedDate = ref<Dayjs>(dayjs())
</script>
