<script setup lang="ts">
import { computed, ref, watch, getCurrentInstance, useSlots } from 'vue'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { getMonthDates, isSameDay, isSameMonth, isToday } from '@/_internal/date-panel/utils'
import { defaultLocale } from '@/_internal/date-panel/types'
import type { CalendarProps, CalendarEmits, CalendarSlots, CalendarMode, SelectInfo } from './types'
import { calendarDefaultProps } from './types'

defineOptions({ name: 'ACalendar' })

const props = withDefaults(defineProps<CalendarProps>(), calendarDefaultProps)
const emit = defineEmits<CalendarEmits>()
defineSlots<CalendarSlots>()
const slots = useSlots()

const instance = getCurrentInstance()!

// ---- Mode ----
const internalMode = ref<CalendarMode>(props.mode ?? 'month')

watch(() => props.mode, (val) => {
  if (val) internalMode.value = val
})

// ---- Value ----
function parseDayjs(val: Dayjs | string | null | undefined): Dayjs | null {
  if (!val) return null
  if (dayjs.isDayjs(val)) return val as Dayjs
  if (typeof val === 'string') {
    const d = props.valueFormat ? dayjs(val, props.valueFormat) : dayjs(val)
    return d.isValid() ? d : null
  }
  return null
}

function toOutput(val: Dayjs | null): Dayjs | string | null {
  if (!val) return null
  if (props.valueFormat) return val.format(props.valueFormat)
  return val
}

const internalValue = ref<Dayjs>(parseDayjs(props.value ?? props.defaultValue) ?? dayjs())
const viewDate = ref<Dayjs>(internalValue.value)

const isValueControlled = computed(() => {
  const rawProps = instance.vnode.props || {}
  return 'value' in rawProps
})

const selectedValue = computed(() => {
  if (isValueControlled.value) {
    return parseDayjs(props.value) ?? dayjs()
  }
  return internalValue.value
})

watch(() => props.value, (v) => {
  if (v !== undefined) {
    const parsed = parseDayjs(v)
    if (parsed) {
      internalValue.value = parsed
      viewDate.value = parsed
    }
  }
})

// ---- Date grid for month mode ----
const monthDates = computed(() => getMonthDates(viewDate.value))

// ---- Months grid for year mode ----
const months = computed(() =>
  Array.from({ length: 12 }, (_, i) => viewDate.value.month(i).startOf('month')),
)

// ---- Navigation ----
function handlePrevMonth() {
  viewDate.value = viewDate.value.subtract(1, 'month')
}

function handleNextMonth() {
  viewDate.value = viewDate.value.add(1, 'month')
}

function handlePrevYear() {
  viewDate.value = viewDate.value.subtract(1, 'year')
}

function handleNextYear() {
  viewDate.value = viewDate.value.add(1, 'year')
}

function handleYearChange(year: number) {
  viewDate.value = viewDate.value.year(year)
}

function handleMonthChange(month: number) {
  viewDate.value = viewDate.value.month(month)
}

function handleModeChange(mode: CalendarMode) {
  internalMode.value = mode
  emit('panelChange', toOutput(selectedValue.value), mode)
}

// ---- Selection ----
function handleDateSelect(date: Dayjs) {
  if (isDateDisabled(date)) return

  if (!isValueControlled.value) internalValue.value = date
  viewDate.value = date
  emit('update:value', toOutput(date))
  emit('change', toOutput(date))
  emit('select', date, { source: 'date' })
}

function handleMonthSelect(date: Dayjs) {
  if (isDateDisabled(date)) return

  if (!isValueControlled.value) internalValue.value = date
  viewDate.value = date
  emit('update:value', toOutput(date))
  emit('change', toOutput(date))
  emit('select', date, { source: 'month' })
}

// ---- Disabled ----
function isDateDisabled(date: Dayjs): boolean {
  if (props.disabledDate?.(date)) return true
  if (props.validRange) {
    return date.isBefore(props.validRange[0], 'day') || date.isAfter(props.validRange[1], 'day')
  }
  return false
}

// ---- Cell class ----
function getDateCellClass(date: Dayjs) {
  return {
    'ant-picker-calendar-date': true,
    'ant-picker-calendar-date-today': isToday(date),
    'ant-picker-calendar-date-selected': isSameDay(date, selectedValue.value),
    'ant-picker-calendar-date-disabled': isDateDisabled(date),
    'ant-picker-calendar-date-in-view': isSameMonth(date, viewDate.value),
  }
}

function getMonthCellClass(date: Dayjs) {
  return {
    'ant-picker-calendar-month': true,
    'ant-picker-calendar-month-selected': date.isSame(selectedValue.value, 'month'),
    'ant-picker-calendar-month-today': date.isSame(dayjs(), 'month'),
  }
}

// ---- Year options for select ----
const yearOptions = computed(() => {
  const current = viewDate.value.year()
  const start = current - 10
  const end = current + 10
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

const rootClass = computed(() => ({
  'ant-picker-calendar': true,
  'ant-picker-calendar-full': props.fullscreen,
  'ant-picker-calendar-mini': !props.fullscreen,
}))
</script>

<template>
  <div :class="rootClass">
    <!-- Header -->
    <div v-if="!slots.headerRender" class="ant-picker-calendar-header">
      <div class="ant-picker-calendar-header-left">
        <select
          class="ant-picker-calendar-year-select"
          :value="viewDate.year()"
          @change="handleYearChange(Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="y in yearOptions" :key="y" :value="y">{{ y }}</option>
        </select>
        <select
          v-if="internalMode === 'month'"
          class="ant-picker-calendar-month-select"
          :value="viewDate.month()"
          @change="handleMonthChange(Number(($event.target as HTMLSelectElement).value))"
        >
          <option v-for="(name, idx) in defaultLocale.monthNamesShort" :key="idx" :value="idx">{{ name }}</option>
        </select>
      </div>
      <div class="ant-picker-calendar-header-right">
        <div class="ant-picker-calendar-mode-switch">
          <button
            type="button"
            :class="['ant-picker-calendar-mode-btn', { active: internalMode === 'month' }]"
            @click="handleModeChange('month')"
          >
            Month
          </button>
          <button
            type="button"
            :class="['ant-picker-calendar-mode-btn', { active: internalMode === 'year' }]"
            @click="handleModeChange('year')"
          >
            Year
          </button>
        </div>
      </div>
    </div>

    <!-- Custom header -->
    <slot
      v-else
      name="headerRender"
      :value="selectedValue"
      :type="internalMode"
      :on-change="(d: Dayjs) => handleDateSelect(d)"
      :on-type-change="(t: CalendarMode) => handleModeChange(t)"
    />

    <!-- Month mode: date grid -->
    <div v-if="internalMode === 'month'" class="ant-picker-calendar-body">
      <table class="ant-picker-calendar-table">
        <thead>
          <tr>
            <th v-for="day in defaultLocale.dayNamesShort" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(_, rowIdx) in 6" :key="rowIdx">
            <td
              v-for="(date, colIdx) in monthDates.slice(rowIdx * 7, rowIdx * 7 + 7)"
              :key="colIdx"
              :class="getDateCellClass(date)"
              @click="handleDateSelect(date)"
            >
              <template v-if="slots.dateFullCellRender">
                <slot name="dateFullCellRender" :current="date" />
              </template>
              <template v-else>
                <div class="ant-picker-calendar-date-value">{{ date.date() }}</div>
                <div v-if="slots.dateCellRender" class="ant-picker-calendar-date-content">
                  <slot name="dateCellRender" :current="date" />
                </div>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Year mode: month grid -->
    <div v-else class="ant-picker-calendar-body">
      <table class="ant-picker-calendar-table">
        <tbody>
          <tr v-for="(_, rowIdx) in 4" :key="rowIdx">
            <td
              v-for="(date, colIdx) in months.slice(rowIdx * 3, rowIdx * 3 + 3)"
              :key="colIdx"
              :class="getMonthCellClass(date)"
              @click="handleMonthSelect(date)"
            >
              <template v-if="slots.monthFullCellRender">
                <slot name="monthFullCellRender" :current="date" />
              </template>
              <template v-else>
                <div class="ant-picker-calendar-month-value">
                  {{ defaultLocale.monthNamesShort[date.month()] }}
                </div>
                <div v-if="slots.monthCellRender" class="ant-picker-calendar-month-content">
                  <slot name="monthCellRender" :current="date" />
                </div>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
