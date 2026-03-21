<script setup lang="ts">
import { provide, toRef } from 'vue'
import type { SummaryProps } from './types'
import { summaryContextKey } from './types'

defineOptions({ name: 'ATableSummary' })

const props = withDefaults(defineProps<SummaryProps>(), {
  fixed: undefined,
})

provide(summaryContextKey, {
  fixed: toRef(props, 'fixed') as any,
  stickyOffsets: toRef({ left: [], right: [] }) as any,
})
</script>

<template>
  <tfoot :class="['ant-table-summary', { 'ant-table-summary-fixed': fixed }]">
    <slot />
  </tfoot>
</template>
