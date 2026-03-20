<script setup lang="ts">
import { computed } from 'vue'
import type { Dayjs } from 'dayjs'
import PanelHeader from './PanelHeader.vue'

defineOptions({ name: 'DecadePanel' })

const props = withDefaults(defineProps<{
  viewDate: Dayjs
  value?: Dayjs | null
}>(), {})

const emit = defineEmits<{
  (e: 'select', date: Dayjs): void
  (e: 'viewDateChange', date: Dayjs): void
}>()

const startCentury = computed(() => Math.floor(props.viewDate.year() / 100) * 100)

const decades = computed(() => {
  const start = startCentury.value - 10
  return Array.from({ length: 12 }, (_, i) => start + i * 10)
})

const headerTitle = computed(() => `${startCentury.value}-${startCentury.value + 99}`)

const rows = computed(() => {
  const result: number[][] = []
  for (let i = 0; i < decades.value.length; i += 3) {
    result.push(decades.value.slice(i, i + 3))
  }
  return result
})

function getCellClass(decade: number) {
  const currentDecade = Math.floor((props.value?.year() ?? -1) / 10) * 10
  const selected = decade === currentDecade
  const inView = decade >= startCentury.value && decade < startCentury.value + 100
  const today = Math.floor(new Date().getFullYear() / 10) * 10 === decade

  return {
    'ant-picker-cell': true,
    'ant-picker-cell-in-view': inView,
    'ant-picker-cell-selected': selected,
    'ant-picker-cell-today': today,
  }
}

function handleSelect(decade: number) {
  emit('select', props.viewDate.year(decade))
}
</script>

<template>
  <div class="ant-picker-decade-panel">
    <PanelHeader
      :title="headerTitle"
      :prev="false"
      :next="false"
      @super-prev="emit('viewDateChange', viewDate.subtract(100, 'year'))"
      @super-next="emit('viewDateChange', viewDate.add(100, 'year'))"
    />
    <div class="ant-picker-body">
      <table class="ant-picker-content">
        <tbody>
          <tr v-for="(row, rowIdx) in rows" :key="rowIdx">
            <td
              v-for="decade in row"
              :key="decade"
              :class="getCellClass(decade)"
              @click="handleSelect(decade)"
            >
              <div class="ant-picker-cell-inner">{{ decade }}-{{ decade + 9 }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
