<script setup lang="ts">
import { computed } from 'vue'
import type { Dayjs } from 'dayjs'
import PanelHeader from './PanelHeader.vue'
import { getDecadeYears, getDecadeRange, isSameYear } from './utils'

defineOptions({ name: 'YearPanel' })

const props = withDefaults(defineProps<{
  viewDate: Dayjs
  value?: Dayjs | null
  disabledDate?: (date: Dayjs) => boolean
}>(), {})

const emit = defineEmits<{
  (e: 'select', date: Dayjs): void
  (e: 'viewDateChange', date: Dayjs): void
  (e: 'titleClick'): void
}>()

const years = computed(() => getDecadeYears(props.viewDate))
const decadeRange = computed(() => getDecadeRange(props.viewDate))

const headerTitle = computed(() => `${decadeRange.value[0]}-${decadeRange.value[1]}`)

// Arrange into rows of 3
const rows = computed(() => {
  const result: number[][] = []
  for (let i = 0; i < years.value.length; i += 3) {
    result.push(years.value.slice(i, i + 3))
  }
  return result
})

function getCellClass(year: number) {
  const selected = props.value?.year() === year
  const today = new Date().getFullYear() === year
  const inView = year >= decadeRange.value[0] && year <= decadeRange.value[1]
  const dateForCheck = props.viewDate.year(year).startOf('year')
  const disabled = props.disabledDate?.(dateForCheck) ?? false

  return {
    'ant-picker-cell': true,
    'ant-picker-cell-in-view': inView,
    'ant-picker-cell-selected': selected,
    'ant-picker-cell-today': today,
    'ant-picker-cell-disabled': disabled,
  }
}

function handleSelect(year: number) {
  const date = props.viewDate.year(year)
  if (props.disabledDate?.(date.startOf('year'))) return
  emit('select', date)
}
</script>

<template>
  <div class="ant-picker-year-panel">
    <PanelHeader
      :title="headerTitle"
      :prev="false"
      :next="false"
      @super-prev="emit('viewDateChange', viewDate.subtract(10, 'year'))"
      @super-next="emit('viewDateChange', viewDate.add(10, 'year'))"
      @title-click="emit('titleClick')"
    />
    <div class="ant-picker-body">
      <table class="ant-picker-content">
        <tbody>
          <tr v-for="(row, rowIdx) in rows" :key="rowIdx">
            <td
              v-for="year in row"
              :key="year"
              :class="getCellClass(year)"
              @click="handleSelect(year)"
            >
              <div class="ant-picker-cell-inner">{{ year }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
