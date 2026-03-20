<script setup lang="ts">
import { computed } from 'vue'
import type { Dayjs } from 'dayjs'
import PanelHeader from './PanelHeader.vue'
import { getMonthDates, isSameDay, isSameMonth, isToday, isInRange, isRangeStart, isRangeEnd } from './utils'
import type { DateLocale } from './types'
import { defaultLocale } from './types'

defineOptions({ name: 'DatePanel' })

const props = withDefaults(defineProps<{
  viewDate: Dayjs
  value?: Dayjs | null
  rangeStart?: Dayjs | null
  rangeEnd?: Dayjs | null
  hoverValue?: Dayjs | null
  disabledDate?: (date: Dayjs) => boolean
  locale?: DateLocale
  showHeader?: boolean
}>(), {
  showHeader: true,
})

const emit = defineEmits<{
  (e: 'select', date: Dayjs): void
  (e: 'viewDateChange', date: Dayjs): void
  (e: 'titleClick'): void
  (e: 'cellHover', date: Dayjs): void
}>()

const loc = computed(() => props.locale ?? defaultLocale)
const dates = computed(() => getMonthDates(props.viewDate))

const headerTitle = computed(() => {
  const m = loc.value.monthNames[props.viewDate.month()]
  return `${m} ${props.viewDate.year()}`
})

// Compute the effective range for highlighting
const effectiveStart = computed(() => props.rangeStart ?? null)
const effectiveEnd = computed(() => props.rangeEnd ?? props.hoverValue ?? null)

function getCellClass(date: Dayjs) {
  const inMonth = isSameMonth(date, props.viewDate)
  const selected = isSameDay(date, props.value)
  const today = isToday(date)
  const disabled = props.disabledDate?.(date) ?? false

  const start = effectiveStart.value
  const end = effectiveEnd.value
  const inRange = start && end
    ? isInRange(date, start.isBefore(end, 'day') ? start : end, end.isAfter(start, 'day') ? end : start)
    : false
  const rangeStartCell = start && end ? isRangeStart(date, start.isBefore(end, 'day') ? start : end) : false
  const rangeEndCell = start && end ? isRangeEnd(date, end.isAfter(start, 'day') ? end : start) : false

  return {
    'ant-picker-cell': true,
    'ant-picker-cell-in-view': inMonth,
    'ant-picker-cell-selected': selected && inMonth,
    'ant-picker-cell-today': today,
    'ant-picker-cell-disabled': disabled,
    'ant-picker-cell-in-range': inRange && inMonth,
    'ant-picker-cell-range-start': rangeStartCell && inMonth,
    'ant-picker-cell-range-end': rangeEndCell && inMonth,
  }
}

function handleSelect(date: Dayjs) {
  if (props.disabledDate?.(date)) return
  emit('select', date)
}
</script>

<template>
  <div class="ant-picker-date-panel">
    <PanelHeader
      v-if="showHeader"
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
            <th v-for="day in loc.dayNamesShort" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(_, rowIdx) in 6" :key="rowIdx">
            <td
              v-for="(date, colIdx) in dates.slice(rowIdx * 7, rowIdx * 7 + 7)"
              :key="colIdx"
              :class="getCellClass(date)"
              :title="date.format('YYYY-MM-DD')"
              @click="handleSelect(date)"
              @mouseenter="emit('cellHover', date)"
            >
              <div class="ant-picker-cell-inner">{{ date.date() }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
