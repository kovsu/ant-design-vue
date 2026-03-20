<script setup lang="ts">
import { computed } from 'vue'
import type { Dayjs } from 'dayjs'
import PanelHeader from './PanelHeader.vue'
import { getQuarter } from './utils'

defineOptions({ name: 'QuarterPanel' })

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

const quarters = computed(() => {
  return [1, 2, 3, 4].map(q => ({
    quarter: q,
    date: props.viewDate.month((q - 1) * 3).startOf('month'),
    label: `Q${q}`,
  }))
})

function getCellClass(q: { quarter: number; date: Dayjs }) {
  const selectedQ = props.value ? getQuarter(props.value) : -1
  const selectedYear = props.value?.year()
  const selected = q.quarter === selectedQ && props.viewDate.year() === selectedYear
  const isCurrent = q.quarter === getQuarter(props.viewDate) && props.viewDate.isSame(new Date(), 'year')
  const today = getQuarter(props.viewDate.startOf('day')) === q.quarter && props.viewDate.isSame(new Date(), 'year')
  const disabled = props.disabledDate?.(q.date) ?? false

  return {
    'ant-picker-cell': true,
    'ant-picker-cell-in-view': true,
    'ant-picker-cell-selected': selected,
    'ant-picker-cell-today': today,
    'ant-picker-cell-disabled': disabled,
  }
}

function handleSelect(q: { quarter: number; date: Dayjs }) {
  if (props.disabledDate?.(q.date)) return
  emit('select', q.date)
}
</script>

<template>
  <div class="ant-picker-quarter-panel">
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
          <tr>
            <td
              v-for="q in quarters"
              :key="q.quarter"
              :class="getCellClass(q)"
              @click="handleSelect(q)"
            >
              <div class="ant-picker-cell-inner">{{ q.label }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
