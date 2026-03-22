<template>
  <div>
    <a-q-r-code :error-level="level" value="https://ant-design-vue.com" />
    <div style="margin-top: 16px; display: flex; gap: 8px">
      <a-button
        v-for="lv in levels"
        :key="lv"
        :variant="level === lv ? 'solid' : 'outlined'"
        @click="level = lv"
      >
        {{ lv }}
      </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { QRCodeErrorLevel } from '@ui/components/qrcode/types'

const levels: QRCodeErrorLevel[] = ['L', 'M', 'Q', 'H']
const level = ref<QRCodeErrorLevel>('L')
</script>
