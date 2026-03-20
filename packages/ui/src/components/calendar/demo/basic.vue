<template>
  <a-calendar v-model:value="value" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs>(dayjs())
</script>
