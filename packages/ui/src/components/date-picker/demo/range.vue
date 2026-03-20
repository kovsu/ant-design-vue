<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px">
    <a-range-picker v-model:value="value" />
    <p>
      Selected:
      {{ value ? `${value[0]?.format('YYYY-MM-DD')} ~ ${value[1]?.format('YYYY-MM-DD')}` : 'None' }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const value = ref<[Dayjs | null, Dayjs | null] | null>(null)
</script>
