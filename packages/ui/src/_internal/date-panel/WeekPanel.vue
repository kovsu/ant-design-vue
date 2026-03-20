<script setup lang="ts">
import { computed } from 'vue'
import type { Dayjs } from 'dayjs'
import PanelHeader from './PanelHeader.vue'
import { getMonthDates, isSameWeek, isSameMonth, isToday } from './utils'
import type { DateLocale } from './types'
import { defaultLocale } from './types'

defineOptions({ name: 'WeekPanel' })

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
const dates = computed(() => getMonthDates(props.viewDate))

const headerTitle = computed(() => {
  const m = loc.value.monthNames[props.viewDate.month()]
  return `${m} ${props.viewDate.year()}`
})

function getRowClass(firstDateInRow: Dayjs) {
  const selected = isSameWeek(firstDateInRow, props.value)
  return {
    'ant-picker-week-panel-row': true,
    'ant-picker-week-panel-row-selected': selected,
  }
}

function getCellClass(date: Dayjs) {
  return {
    'ant-picker-cell': true,
    'ant-picker-cell-in-view': isSameMonth(date, props.viewDate),
    'ant-picker-cell-today': isToday(date),
    'ant-picker-cell-disabled': props.disabledDate?.(date) ?? false,
  }
}

function handleRowClick(firstDateInRow: Dayjs) {
  emit('select', firstDateInRow.startOf('week'))
}
</script>

<template>
  <div class="ant-picker-week-panel">
    <PanelHeader
      :title="headerTitle"
      @super-prev="emit('viewDateChange', viewDate.subtract(1, 'year'))"
      @prev="emit('viewDateChange', viewDate.subtract(1, 'month'))"
      @next="emit('viewDateChange', viewDate.add(1, 'month'))"
      @super-next="emit('viewDateChange', viewDate.add(1, 'year'))"
      @title-click="emit('titleClick')"
    />
    <div class="ant-picker-body">
      <table class="ant-picker-content">
        <thead>
          <tr>
            <th>Wk</th>
            <th v-for="day in loc.dayNamesShort" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(_, rowIdx) in 6"
            :key="rowIdx"
            :class="getRowClass(dates[rowIdx * 7])"
            @click="handleRowClick(dates[rowIdx * 7])"
          >
            <td class="ant-picker-cell ant-picker-cell-week">
              <div class="ant-picker-cell-inner">{{ dates[rowIdx * 7].week() }}</div>
            </td>
            <td
              v-for="(date, colIdx) in dates.slice(rowIdx * 7, rowIdx * 7 + 7)"
              :key="colIdx"
              :class="getCellClass(date)"
            >
              <div class="ant-picker-cell-inner">{{ date.date() }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
