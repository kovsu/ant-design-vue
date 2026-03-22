<script setup lang="ts">
import { ref } from 'vue'
import type { Dayjs } from 'dayjs'

const value = ref<Dayjs | null>(null)
const open = ref(false)

function handleClose() {
  open.value = false
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px; max-width: 200px">
    <a-time-picker v-model:value="value" v-model:open="open">
      <template #renderExtraFooter>
        <a-button size="small" type="primary" @click="handleClose">OK</a-button>
      </template>
    </a-time-picker>
  </div>
</template>
