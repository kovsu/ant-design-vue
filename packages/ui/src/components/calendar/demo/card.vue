<template>
  <div style="max-width: 300px">
    <a-calendar v-model:value="value" :fullscreen="false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs>(dayjs())
</script>
