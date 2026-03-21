<script setup lang="ts">
import { ref } from 'vue'
import type { QRCodeStatus } from '../types'

const status = ref<QRCodeStatus>('active')

function handleRefresh() {
  status.value = 'loading'
  setTimeout(() => {
    status.value = 'active'
  }, 2000)
}
</script>

<template>
  <div style="display: flex; gap: 16px; flex-wrap: wrap">
    <a-q-r-code value="https://ant-design-vue.com" status="loading" />
    <a-q-r-code value="https://ant-design-vue.com" status="expired" @refresh="handleRefresh" />
    <a-q-r-code value="https://ant-design-vue.com" status="scanned" />
    <a-q-r-code value="https://ant-design-vue.com" :status="status" @refresh="handleRefresh" />
  </div>
</template>
