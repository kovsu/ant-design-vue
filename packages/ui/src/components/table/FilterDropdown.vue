<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { InternalColumnType, ColumnFilterItem, Key, FilterValue } from './types'

defineOptions({ name: 'ATableFilterDropdown' })

const props = defineProps<{
  column: InternalColumnType
  filteredValue: FilterValue | null
  locale: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'filter', column: InternalColumnType, value: FilterValue | null): void
}>()

const visible = ref(false)
const selectedKeys = ref<Key[]>((props.filteredValue || []) as Key[])
const searchValue = ref('')

watch(
  () => props.filteredValue,
  (val) => {
    selectedKeys.value = (val || []) as Key[]
  },
)

// Sync controlled visibility
watch(
  () => props.column.filterDropdownOpen,
  (val) => {
    if (val !== undefined) visible.value = val
  },
  { immediate: true },
)

const isFiltered = computed(() => {
  return props.filteredValue !== null && props.filteredValue !== undefined && props.filteredValue.length > 0
})

const filteredOptions = computed(() => {
  const filters = props.column.filters || []
  if (!searchValue.value) return filters
  const search = searchValue.value.toLowerCase()
  const filterFn = typeof props.column.filterSearch === 'function'
    ? props.column.filterSearch
    : (input: string, item: ColumnFilterItem) =>
        String(item.text).toLowerCase().includes(input.toLowerCase())
  return filters.filter((item) => filterFn(search, item))
})

function handleToggle(value: string | number | boolean) {
  const key = value as Key
  const newKeys = selectedKeys.value.includes(key)
    ? selectedKeys.value.filter((k) => k !== key)
    : props.column.filterMultiple === false
      ? [key]
      : [...selectedKeys.value, key]
  selectedKeys.value = newKeys
}

function handleConfirm() {
  visible.value = false
  emit('filter', props.column, selectedKeys.value.length > 0 ? (selectedKeys.value as FilterValue) : null)
}

function handleReset() {
  selectedKeys.value = []
  searchValue.value = ''
}

function handleResetAndConfirm() {
  handleReset()
  visible.value = false
  emit('filter', props.column, null)
}

function toggleVisible() {
  const next = !visible.value
  visible.value = next
  props.column.onFilterDropdownOpenChange?.(next)
}
</script>

<template>
  <div class="ant-table-filter-column">
    <span class="ant-table-column-title">
      <slot name="title" />
    </span>
    <span
      role="button"
      tabindex="-1"
      :class="['ant-table-filter-trigger', { 'ant-table-filter-trigger-active': isFiltered }]"
      @click="toggleVisible"
    >
      <slot name="filterIcon" :filtered="isFiltered" :column="column">
        <span class="ant-table-filter-icon">
          <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
            <path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376.3V854c0 17.7 14.3 32 32 32h283.6c17.7 0 32-14.3 32-32V578.3L907 202c12.2-21.3-3.1-48-27.5-48z" />
          </svg>
        </span>
      </slot>
    </span>
    <Teleport to="body">
      <div v-if="visible" class="ant-table-filter-dropdown" @click.stop>
        <!-- Custom filter dropdown -->
        <template v-if="column.customFilterDropdown || column.filterDropdown">
          <component
            :is="column.filterDropdown"
            v-if="column.filterDropdown"
            :selected-keys="selectedKeys"
            :set-selected-keys="(keys: Key[]) => (selectedKeys = keys)"
            :confirm="handleConfirm"
            :clear-filters="handleResetAndConfirm"
            :filters="column.filters"
            :visible="visible"
            :close="() => (visible = false)"
            :column="column"
          />
          <slot
            v-else
            name="customFilterDropdown"
            :selected-keys="selectedKeys"
            :set-selected-keys="(keys: Key[]) => (selectedKeys = keys)"
            :confirm="handleConfirm"
            :clear-filters="handleResetAndConfirm"
            :filters="column.filters"
            :visible="visible"
            :close="() => (visible = false)"
            :column="column"
          />
        </template>
        <!-- Default filter menu -->
        <template v-else>
          <div v-if="column.filterSearch" class="ant-table-filter-dropdown-search">
            <input
              v-model="searchValue"
              class="ant-table-filter-dropdown-search-input"
              :placeholder="locale.filterSearchPlaceholder || 'Search in filters'"
            />
          </div>
          <ul class="ant-table-filter-dropdown-menu">
            <li
              v-for="item in filteredOptions"
              :key="String(item.value)"
              :class="['ant-table-filter-dropdown-menu-item', { 'ant-table-filter-dropdown-menu-item-selected': selectedKeys.includes(item.value as Key) }]"
              @click="handleToggle(item.value)"
            >
              <span class="ant-table-filter-dropdown-menu-item-checkbox">
                <span
                  :class="['ant-checkbox', { 'ant-checkbox-checked': selectedKeys.includes(item.value as Key) }]"
                >
                  <span class="ant-checkbox-inner" />
                </span>
              </span>
              <span class="ant-table-filter-dropdown-menu-item-text">{{ item.text }}</span>
            </li>
            <li v-if="filteredOptions.length === 0" class="ant-table-filter-dropdown-menu-item-empty">
              {{ locale.filterEmptyText || 'No filters' }}
            </li>
          </ul>
          <div class="ant-table-filter-dropdown-btns">
            <button
              class="ant-table-filter-dropdown-link ant-table-filter-dropdown-link-reset"
              :disabled="selectedKeys.length === 0"
              @click="handleResetAndConfirm"
            >
              {{ locale.filterReset || 'Reset' }}
            </button>
            <button
              class="ant-table-filter-dropdown-link ant-table-filter-dropdown-link-confirm"
              @click="handleConfirm"
            >
              {{ locale.filterConfirm || 'OK' }}
            </button>
          </div>
        </template>
      </div>
    </Teleport>
    <!-- Click-away overlay -->
    <Teleport to="body">
      <div v-if="visible" class="ant-table-filter-dropdown-overlay" @click="handleConfirm" />
    </Teleport>
  </div>
</template>
