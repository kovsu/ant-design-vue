<script setup lang="ts">
import type { SummaryCellProps } from './types'

defineOptions({ name: 'ATableSummaryCell' })

const props = withDefaults(defineProps<SummaryCellProps>(), {
  colSpan: 1,
  rowSpan: 1,
  align: undefined,
})
</script>

<template>
  <td
    class="ant-table-cell"
    :colspan="colSpan > 1 ? colSpan : undefined"
    :rowspan="rowSpan > 1 ? rowSpan : undefined"
    :style="align ? { textAlign: align } : undefined"
  >
    <slot />
  </td>
</template>
