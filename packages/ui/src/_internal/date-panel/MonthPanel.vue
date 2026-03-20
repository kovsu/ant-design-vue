<script setup lang="ts">
import { computed } from 'vue'
import type { Dayjs } from 'dayjs'
import PanelHeader from './PanelHeader.vue'
import { isSameMonth, isToday } from './utils'
import type { DateLocale } from './types'
import { defaultLocale } from './types'

defineOptions({ name: 'MonthPanel' })

const props = withDefaults(defineProps<{
  viewDate: Dayjs
  value?: Dayjs | null
  disabledDate?: (date: Dayjs) => boolean
  locale?: DateLocale
}>(), {})

const emit = defineEmits<{
  (e: 'select', date: Dayjs): void
  (e: 'viewDateChange', date: Dayjs): void
  (e: 'titleClick'): void
}>()

const loc = computed(() => props.locale ?? defaultLocale)

const months = computed(() => {
  return Array.from({ length: 12 }, (_, i) => props.viewDate.month(i).startOf('month'))
})

// Arrange into rows of 3
const rows = computed(() => {
  const result: Dayjs[][] = []
  for (let i = 0; i < 12; i += 3) {
    result.push(months.value.slice(i, i + 3))
  }
  return result
})

function getCellClass(date: Dayjs) {
  const selected = isSameMonth(date, props.value)
  const isCurrent = isSameMonth(date, props.viewDate.startOf('month'))
  // A month is "today" if it contains today
  const today = date.isSame(new Date(), 'month')
  const disabled = props.disabledDate?.(date) ?? false

  return {
    'ant-picker-cell': true,
    'ant-picker-cell-in-view': true,
    'ant-picker-cell-selected': selected,
    'ant-picker-cell-today': today,
    'ant-picker-cell-disabled': disabled,
  }
}

function handleSelect(date: Dayjs) {
  if (props.disabledDate?.(date)) return
  emit('select', date)
}
</script>

<template>
  <div class="ant-picker-month-panel">
    <PanelHeader
      :title="String(viewDate.year())"
      :prev="false"
      :next="false"
      @super-prev="emit('viewDateChange', viewDate.subtract(1, 'year'))"
      @super-next="emit('viewDateChange', viewDate.add(1, 'year'))"
      @title-click="emit('titleClick')"
    />
    <div class="ant-picker-body">
      <table class="ant-picker-content">
        <tbody>
          <tr v-for="(row, rowIdx) in rows" :key="rowIdx">
            <td
              v-for="(date, colIdx) in row"
              :key="colIdx"
              :class="getCellClass(date)"
              @click="handleSelect(date)"
            >
              <div class="ant-picker-cell-inner">{{ loc.monthNamesShort[date.month()] }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
