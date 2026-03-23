<script setup lang="ts">
import { computed, ref, useSlots, watch, provide, toRef, onMounted, onBeforeUnmount } from 'vue'
import { useConfigInject } from '@/hooks/useConfigInject'
import Spin from '../spin/Spin.vue'
import Pagination from '../pagination/Pagination.vue'
import Empty from '../empty/Empty.vue'
import FilterDropdown from './FilterDropdown.vue'
import type {
  TableProps,
  TableEmits,
  TableSlots,
  ColumnType,
  InternalColumnType,
  Key,
  SortOrder,
  FilterValue,
  FlattenedRow,
  TableLayout,
  TableLocale,
} from './types'
import { tableDefaultProps, defaultTableLocale, tableContextKey } from './types'
import {
  useColumns,
  useSorter,
  useFilter,
  useSelection,
  useExpansion,
  usePagination,
  getRowKeyFn,
  getColumnKey,
  getPathValue,
  getHeaderRows,
} from './composables'

defineOptions({ name: 'ATable', inheritAttrs: false })

const props = withDefaults(defineProps<TableProps>(), {
  rowKey: 'key',
  showHeader: true,
  sortDirections: () => ['ascend', 'descend'] as SortOrder[],
  showSorterTooltip: true,
  childrenColumnName: 'children',
  indentSize: 15,
  showExpandColumn: true,
})
const emit = defineEmits<TableEmits>()
defineSlots<TableSlots>()
const slots = useSlots()

const { size: configSize, direction, renderEmpty, locale: configLocale } = useConfigInject()

// ==================== Refs ====================

const tableRef = ref<HTMLDivElement | null>(null)
const scrollBodyRef = ref<HTMLDivElement | null>(null)

// ==================== Locale ====================

const mergedLocale = computed<TableLocale>(() => ({
  ...defaultTableLocale,
  ...(configLocale.value as any)?.Table,
  ...props.locale,
}))

// ==================== Size ====================

const mergedSize = computed(() => {
  const s = props.size
  if (s) return s
  // Map config size to table size
  const cs = configSize.value
  if (cs === 'sm') return 'small'
  if (cs === 'lg') return 'large'
  return 'middle'
})

// ==================== Row Key ====================

const getRowKey = computed(() => getRowKeyFn(props.rowKey!))

// ==================== Expandable ====================

const hasExpandable = computed(() => {
  return !!(
    props.expandedRowRender ||
    slots.expandedRowRender ||
    hasTreeData.value
  )
})

const hasTreeData = computed(() => {
  const childField = props.childrenColumnName!
  return (props.dataSource || []).some(
    (record: any) => record[childField] && record[childField].length > 0,
  )
})

const {
  expandedKeySet,
  isExpanded,
  toggleExpand,
  flattenedRows: rawFlattenedRows,
} = useExpansion(
  () => props.dataSource || [],
  () => getRowKey.value,
  () => props.childrenColumnName!,
  () => props.defaultExpandAllRows,
  () => props.defaultExpandedRowKeys,
  () => props.expandedRowKeys,
  (expanded, record) => {
    emit('expand', expanded, record)
  },
  (keys) => {
    emit('update:expandedRowKeys', keys)
    emit('expandedRowsChange', keys)
  },
)

// ==================== Columns ====================

const { mergedColumns, flatColumns, headerRows } = useColumns(
  () => props.columns,
  () => props.rowSelection,
  () => hasExpandable.value && props.showExpandColumn !== false,
  () => props.expandFixed,
)

// ==================== Sorting ====================

function handleTableChange(action: 'sort' | 'filter' | 'paginate') {
  const paginationConfig = mergedPagination.value === false ? {} : mergedPagination.value
  emit(
    'change',
    paginationConfig as any,
    getFiltersMap(),
    getSorterResult() as any,
    { currentDataSource: processedData.value, action },
  )
}

const {
  sortedData,
  triggerSort,
  getSortOrder,
  getSorterResult,
} = useSorter(
  () => flatColumns.value,
  () => props.dataSource || [],
  (_states, action) => handleTableChange(action),
  () => props.sortDirections!,
)

// ==================== Filtering ====================

const {
  filteredData,
  triggerFilter,
  getFilteredValue,
  getFiltersMap,
} = useFilter(
  () => flatColumns.value,
  () => sortedData.value,
  (_states, action) => handleTableChange(action),
)

// ==================== Processed Data (sorted + filtered) ====================

const processedData = computed(() => filteredData.value)

// ==================== Pagination ====================

const { mergedPagination, setCurrent, setPageSize, paginateData } = usePagination(
  () => processedData.value.length,
  () => props.pagination,
)

function handlePageChange(page: number, pageSize: number) {
  setCurrent(page)
  handleTableChange('paginate')
  // Scroll to top
  if (props.scroll?.scrollToFirstRowOnChange !== false && scrollBodyRef.value) {
    scrollBodyRef.value.scrollTop = 0
  }
}

function handlePageSizeChange(_current: number, size: number) {
  setPageSize(size)
  handleTableChange('paginate')
}

// ==================== Paginated + Flattened Rows ====================

const paginatedData = computed(() => paginateData(processedData.value))

// Re-flatten with the paginated data subset for tree expansion
const displayRows = computed<FlattenedRow[]>(() => {
  const childField = props.childrenColumnName!
  const getKey = getRowKey.value
  const rows: FlattenedRow[] = []

  function traverse(list: any[], indent: number, parentKey?: Key) {
    for (let i = 0; i < list.length; i++) {
      const record = list[i]
      const key = getKey(record, rows.length)
      const children = record[childField] as any[] | undefined
      const hasChildren = !!(children && children.length > 0)
      const expanded = expandedKeySet.value.has(key)
      rows.push({ record, key, index: rows.length, indent, parentKey, hasChildren, expanded })
      if (hasChildren && expanded) {
        traverse(children, indent + 1, key)
      }
    }
  }

  traverse(paginatedData.value, 0)
  return rows
})

// ==================== Selection ====================

const {
  isSelected,
  toggleRow,
  selectAll,
  invertSelection,
  allSelected,
  someSelected,
} = useSelection(
  () => props.rowSelection,
  () => displayRows.value,
  () => getRowKey.value,
)

// ==================== Row expandable check ====================

function isRowExpandable(record: any): boolean {
  if (props.rowExpandable) return props.rowExpandable(record)
  const childField = props.childrenColumnName!
  const children = record[childField]
  if (children && children.length > 0) return true
  return !!(props.expandedRowRender || slots.expandedRowRender)
}

// ==================== Fixed Columns ====================

const hasFixedLeft = computed(() =>
  flatColumns.value.some((c) => c.fixed === 'left' || c.fixed === true),
)
const hasFixedRight = computed(() =>
  flatColumns.value.some((c) => c.fixed === 'right'),
)

// Track scroll position for fixed column shadows
const scrollState = ref<'left' | 'right' | 'middle' | 'both'>('left')

function handleScroll(e: Event) {
  const target = e.target as HTMLDivElement
  const { scrollLeft, scrollWidth, clientWidth } = target
  const maxScroll = scrollWidth - clientWidth

  if (scrollLeft === 0) {
    scrollState.value = 'left'
  } else if (Math.abs(scrollLeft - maxScroll) < 1) {
    scrollState.value = 'right'
  } else {
    scrollState.value = 'middle'
  }
}

// ==================== Fixed column offsets ====================

const fixedLeftOffsets = computed(() => {
  const offsets: number[] = []
  let left = 0
  for (const col of flatColumns.value) {
    if (col.fixed === 'left' || col.fixed === true) {
      offsets.push(left)
      left += parseWidth(col.width) || 0
    } else {
      offsets.push(-1)
    }
  }
  return offsets
})

const fixedRightOffsets = computed(() => {
  const offsets: number[] = []
  const cols = flatColumns.value
  let right = 0
  for (let i = cols.length - 1; i >= 0; i--) {
    if (cols[i].fixed === 'right') {
      offsets[i] = right
      right += parseWidth(cols[i].width) || 0
    } else {
      offsets[i] = -1
    }
  }
  return offsets
})

function parseWidth(w: string | number | undefined): number {
  if (typeof w === 'number') return w
  if (typeof w === 'string') return parseInt(w, 10) || 0
  return 0
}

function getCellFixedStyle(colIndex: number): Record<string, string> | undefined {
  const col = flatColumns.value[colIndex]
  if (!col) return undefined

  if (col.fixed === 'left' || col.fixed === true) {
    const left = fixedLeftOffsets.value[colIndex]
    if (left >= 0) return { position: 'sticky', left: `${left}px`, zIndex: '2' }
  }
  if (col.fixed === 'right') {
    const right = fixedRightOffsets.value[colIndex]
    if (right >= 0) return { position: 'sticky', right: `${right}px`, zIndex: '2' }
  }
  return undefined
}

function isLastFixedLeft(colIndex: number): boolean {
  const cols = flatColumns.value
  if (cols[colIndex]?.fixed !== 'left' && cols[colIndex]?.fixed !== true) return false
  const next = cols[colIndex + 1]
  return !next || (next.fixed !== 'left' && next.fixed !== true)
}

function isFirstFixedRight(colIndex: number): boolean {
  const cols = flatColumns.value
  if (cols[colIndex]?.fixed !== 'right') return false
  const prev = cols[colIndex - 1]
  return !prev || prev.fixed !== 'right'
}

// ==================== Table Layout ====================

const mergedTableLayout = computed<TableLayout>(() => {
  if (props.tableLayout) return props.tableLayout
  if (hasFixedLeft.value || hasFixedRight.value || props.scroll?.x) return 'fixed'
  return 'auto'
})

// ==================== Scroll Styles ====================

const scrollXStyle = computed(() => {
  const x = props.scroll?.x
  if (!x) return undefined
  if (x === true) return { width: '100%', minWidth: '100%', tableLayout: 'auto' as const }
  return { width: typeof x === 'number' ? `${x}px` : x }
})

const scrollYStyle = computed(() => {
  const y = props.scroll?.y
  if (!y) return undefined
  return { maxHeight: typeof y === 'number' ? `${y}px` : y, overflowY: 'auto' as const }
})

// ==================== Loading ====================

const mergedLoading = computed(() => {
  if (typeof props.loading === 'boolean') {
    return props.loading ? { spinning: true } : null
  }
  return props.loading || null
})

// ==================== Classes ====================

const tableClasses = computed(() => ({
  'ant-table-wrapper': true,
  'ant-table-wrapper-rtl': direction.value === 'rtl',
}))

const innerTableClasses = computed(() => ({
  'ant-table': true,
  'ant-table-bordered': props.bordered,
  [`ant-table-${mergedSize.value}`]: true,
  'ant-table-fixed-header': !!props.scroll?.y,
  'ant-table-fixed-column': hasFixedLeft.value || hasFixedRight.value,
  'ant-table-scroll-horizontal': !!props.scroll?.x,
  'ant-table-has-fix-left': hasFixedLeft.value,
  'ant-table-has-fix-right': hasFixedRight.value,
  [`ant-table-ping-left`]: scrollState.value === 'middle' || scrollState.value === 'right',
  [`ant-table-ping-right`]: scrollState.value === 'middle' || scrollState.value === 'left',
  'ant-table-empty': !displayRows.value.length,
}))

// ==================== Sort click handler ====================

function handleHeaderClick(col: InternalColumnType, e: MouseEvent) {
  if (col.sorter) {
    triggerSort(col)
  }
}

// ==================== Cell value helper ====================

function getCellValue(record: any, column: ColumnType): any {
  return getPathValue(record, column.dataIndex)
}

// ==================== Render helpers ====================

function getSortIconClass(columnKey: Key): string {
  const order = getSortOrder(columnKey)
  if (order === 'ascend') return 'ant-table-column-sorter-up active'
  if (order === 'descend') return 'ant-table-column-sorter-down active'
  return ''
}

// ==================== Row class ====================

function getRowClassName(record: any, index: number, indent: number): string {
  if (!props.rowClassName) return ''
  if (typeof props.rowClassName === 'function') return props.rowClassName(record, index, indent)
  return props.rowClassName
}

// ==================== Provide context ====================

provide(tableContextKey, {
  tableLayout: mergedTableLayout as any,
  scroll: toRef(props, 'scroll') as any,
  bordered: toRef(props, 'bordered') as any,
  size: mergedSize as any,
  expandIconColumnIndex: computed(() => 0) as any,
})

// ==================== Pagination position ====================

const paginationPositions = computed(() => {
  if (mergedPagination.value === false) return { top: false, bottom: false }
  const config = mergedPagination.value
  const positions = config.position || ['bottomRight']
  return {
    top: positions.some((p) => p.startsWith('top')),
    bottom: positions.some((p) => p.startsWith('bottom')),
    positions,
  }
})

function getPaginationAlign(positions: string[]): 'start' | 'center' | 'end' {
  const pos = positions.find((p) => p.startsWith('top') || p.startsWith('bottom')) || 'bottomRight'
  if (pos.endsWith('Left')) return 'start'
  if (pos.endsWith('Center')) return 'center'
  return 'end'
}

// ==================== Responsive columns (breakpoint-based hiding) ====================

const activeBreakpoints = ref<Set<string>>(new Set())

onMounted(() => {
  if (typeof window === 'undefined') return
  const queries: Record<string, string> = {
    xs: '(max-width: 575.98px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)',
  }

  for (const [bp, query] of Object.entries(queries)) {
    const mql = window.matchMedia(query)
    if (mql.matches) activeBreakpoints.value.add(bp)
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        activeBreakpoints.value.add(bp)
      } else {
        activeBreakpoints.value.delete(bp)
      }
      // Trigger reactivity
      activeBreakpoints.value = new Set(activeBreakpoints.value)
    }
    mql.addEventListener('change', handler)
  }
})

function isColumnVisible(col: ColumnType): boolean {
  if (!col.responsive || col.responsive.length === 0) return true
  return col.responsive.some((bp) => activeBreakpoints.value.has(bp))
}

// Visible column indices for body rendering
const visibleColumnIndices = computed(() => {
  return flatColumns.value
    .map((col, i) => ({ col, i }))
    .filter(({ col }) => isColumnVisible(col))
})
</script>

<template>
  <div :class="tableClasses" v-bind="$attrs">
    <!-- Spin wrapper -->
    <Spin v-if="mergedLoading" v-bind="mergedLoading">
      <div :class="innerTableClasses">
        <!-- Title -->
        <div v-if="title || slots.title" class="ant-table-title">
          <slot name="title" :data="paginatedData">
            <template v-if="title">{{ title(paginatedData) }}</template>
          </slot>
        </div>

        <!-- Pagination top -->
        <div
          v-if="mergedPagination !== false && paginationPositions.top"
          :class="['ant-table-pagination ant-table-pagination-top', `ant-table-pagination-${getPaginationAlign(paginationPositions.positions)}`]"
        >
          <Pagination
            v-bind="mergedPagination"
            @change="handlePageChange"
            @showSizeChange="handlePageSizeChange"
          />
        </div>

        <!-- Table content -->
        <div class="ant-table-container">
          <div
            ref="scrollBodyRef"
            class="ant-table-content"
            :style="scrollYStyle"
            @scroll="handleScroll"
          >
            <table
              :style="scrollXStyle"
              :class="{ 'ant-table-layout-fixed': mergedTableLayout === 'fixed' }"
              role="table"
            >
              <!-- Colgroup -->
              <colgroup>
                <col
                  v-for="({ col }) in visibleColumnIndices"
                  :key="col._key"
                  :style="col.width ? { width: typeof col.width === 'number' ? `${col.width}px` : col.width, minWidth: col.minWidth ? `${col.minWidth}px` : undefined } : undefined"
                />
              </colgroup>

              <!-- Header -->
              <thead v-if="showHeader" class="ant-table-thead">
                <tr
                  v-for="(headerRow, rowIndex) in headerRows"
                  :key="rowIndex"
                  v-bind="customHeaderRow?.(headerRow as any, rowIndex)"
                >
                  <th
                    v-for="(col, colIndex) in headerRow"
                    :key="getColumnKey(col, colIndex)"
                    :class="[
                      'ant-table-cell',
                      col.className,
                      col.align ? `ant-table-cell-align-${col.align}` : '',
                      {
                        'ant-table-cell-fix-left': col.fixed === 'left' || col.fixed === true,
                        'ant-table-cell-fix-left-last': isLastFixedLeft(colIndex),
                        'ant-table-cell-fix-right': col.fixed === 'right',
                        'ant-table-cell-fix-right-first': isFirstFixedRight(colIndex),
                        'ant-table-column-has-sorters': col.sorter,
                        'ant-table-column-sort': getSortOrder(getColumnKey(col, colIndex)) !== null,
                      },
                    ]"
                    :colspan="(col as any).colSpan > 1 ? (col as any).colSpan : undefined"
                    :rowspan="(col as any).rowSpan > 1 ? (col as any).rowSpan : undefined"
                    :style="getCellFixedStyle(colIndex)"
                    v-bind="col.customHeaderCell?.(col)"
                    :aria-sort="getSortOrder(getColumnKey(col, colIndex)) === 'ascend' ? 'ascending' : getSortOrder(getColumnKey(col, colIndex)) === 'descend' ? 'descending' : undefined"
                    @click="handleHeaderClick(col as InternalColumnType, $event)"
                  >
                    <!-- Selection column header -->
                    <template v-if="(col as any)._isSelectionColumn">
                      <template v-if="rowSelection?.type !== 'radio' && !rowSelection?.hideSelectAll">
                        <label class="ant-checkbox-wrapper" @click.stop>
                          <span
                            :class="['ant-checkbox', {
                              'ant-checkbox-checked': allSelected,
                              'ant-checkbox-indeterminate': someSelected,
                            }]"
                          >
                            <input
                              type="checkbox"
                              class="ant-checkbox-input"
                              :checked="allSelected"
                              :aria-label="mergedLocale.selectAll as string"
                              @change="selectAll(!allSelected)"
                            />
                            <span class="ant-checkbox-inner" />
                          </span>
                        </label>
                        <span v-if="rowSelection?.columnTitle" class="ant-table-selection-extra">
                          {{ rowSelection.columnTitle }}
                        </span>
                      </template>
                    </template>

                    <!-- Expand column header -->
                    <template v-else-if="(col as any)._isExpandColumn">
                      <slot name="expandColumnTitle" />
                    </template>

                    <!-- Regular column header -->
                    <template v-else>
                      <!-- Filter dropdown wraps the header -->
                      <FilterDropdown
                        v-if="col.filters?.length || col.filterDropdown || col.customFilterDropdown"
                        :column="col as InternalColumnType"
                        :filtered-value="getFilteredValue(getColumnKey(col, colIndex))"
                        :locale="mergedLocale as any"
                        @filter="triggerFilter"
                      >
                        <template #title>
                          <slot name="headerCell" :title="col.title" :column="col">
                            <template v-if="typeof col.title === 'function'">
                              <component :is="() => (col.title as Function)({ sortOrder: getSortOrder(getColumnKey(col, colIndex)), sortColumn: col, filters: getFiltersMap() })" />
                            </template>
                            <template v-else>
                              {{ col.title }}
                            </template>
                          </slot>
                          <!-- Sorter icons -->
                          <span v-if="col.sorter" class="ant-table-column-sorter">
                            <span class="ant-table-column-sorter-inner">
                              <span
                                :class="['ant-table-column-sorter-up', { active: getSortOrder(getColumnKey(col, colIndex)) === 'ascend' }]"
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" /></svg>
                              </span>
                              <span
                                :class="['ant-table-column-sorter-down', { active: getSortOrder(getColumnKey(col, colIndex)) === 'descend' }]"
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" /></svg>
                              </span>
                            </span>
                          </span>
                        </template>
                        <template v-if="slots.customFilterIcon" #filterIcon="filterProps">
                          <slot name="customFilterIcon" v-bind="filterProps" />
                        </template>
                        <template v-if="slots.customFilterDropdown" #customFilterDropdown="filterProps">
                          <slot name="customFilterDropdown" v-bind="filterProps" />
                        </template>
                      </FilterDropdown>

                      <!-- No filter — plain header -->
                      <template v-else>
                        <div :class="{ 'ant-table-column-sorters': !!col.sorter }">
                          <span class="ant-table-column-title">
                            <slot name="headerCell" :title="col.title" :column="col">
                              <template v-if="typeof col.title === 'function'">
                                <component :is="() => (col.title as Function)({ sortOrder: getSortOrder(getColumnKey(col, colIndex)), sortColumn: col, filters: getFiltersMap() })" />
                              </template>
                              <template v-else>
                                {{ col.title }}
                              </template>
                            </slot>
                          </span>
                          <span v-if="col.sorter" class="ant-table-column-sorter">
                            <span class="ant-table-column-sorter-inner">
                              <span
                                :class="['ant-table-column-sorter-up', { active: getSortOrder(getColumnKey(col, colIndex)) === 'ascend' }]"
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" /></svg>
                              </span>
                              <span
                                :class="['ant-table-column-sorter-down', { active: getSortOrder(getColumnKey(col, colIndex)) === 'descend' }]"
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" /></svg>
                              </span>
                            </span>
                          </span>
                        </div>
                      </template>
                    </template>
                  </th>
                </tr>
              </thead>

              <!-- Body -->
              <tbody class="ant-table-tbody">
                <template v-if="displayRows.length > 0">
                  <template v-for="row in displayRows" :key="row.key">
                    <!-- Data row -->
                    <tr
                      :class="[
                        'ant-table-row',
                        `ant-table-row-level-${row.indent}`,
                        getRowClassName(row.record, row.index, row.indent),
                        { 'ant-table-row-selected': isSelected(row.key) },
                      ]"
                      v-bind="customRow?.(row.record, row.index)"
                      @click="expandRowByClick && isRowExpandable(row.record) ? toggleExpand(row.record, row.key) : undefined"
                    >
                      <td
                        v-for="({ col, i: colIndex }) in visibleColumnIndices"
                        :key="col._key"
                        :class="[
                          'ant-table-cell',
                          col.className,
                          col.align ? `ant-table-cell-align-${col.align}` : '',
                          {
                            'ant-table-cell-fix-left': col.fixed === 'left' || col.fixed === true,
                            'ant-table-cell-fix-left-last': isLastFixedLeft(colIndex),
                            'ant-table-cell-fix-right': col.fixed === 'right',
                            'ant-table-cell-fix-right-first': isFirstFixedRight(colIndex),
                            'ant-table-cell-ellipsis': col.ellipsis,
                            'ant-table-column-sort': getSortOrder(col._key) !== null,
                          },
                        ]"
                        :style="getCellFixedStyle(colIndex)"
                        v-bind="col.customCell?.(row.record, row.index, col)"
                      >
                        <!-- Selection column -->
                        <template v-if="(col as any)._isSelectionColumn">
                          <label class="ant-checkbox-wrapper" @click.stop>
                            <template v-if="rowSelection?.type === 'radio'">
                              <span
                                :class="['ant-radio', { 'ant-radio-checked': isSelected(row.key) }]"
                              >
                                <input
                                  type="radio"
                                  class="ant-radio-input"
                                  :checked="isSelected(row.key)"
                                  :disabled="rowSelection?.getCheckboxProps?.(row.record)?.disabled"
                                  :name="'ant-table-radio'"
                                  @change="toggleRow(row.key, row.record, !isSelected(row.key), $event)"
                                />
                                <span class="ant-radio-inner" />
                              </span>
                            </template>
                            <template v-else>
                              <span
                                :class="['ant-checkbox', { 'ant-checkbox-checked': isSelected(row.key) }]"
                              >
                                <input
                                  type="checkbox"
                                  class="ant-checkbox-input"
                                  :checked="isSelected(row.key)"
                                  :disabled="rowSelection?.getCheckboxProps?.(row.record)?.disabled"
                                  @change="toggleRow(row.key, row.record, !isSelected(row.key), $event)"
                                />
                                <span class="ant-checkbox-inner" />
                              </span>
                            </template>
                          </label>
                        </template>

                        <!-- Expand column -->
                        <template v-else-if="(col as any)._isExpandColumn">
                          <button
                            v-if="isRowExpandable(row.record)"
                            type="button"
                            :class="['ant-table-row-expand-icon', {
                              'ant-table-row-expand-icon-expanded': row.expanded,
                              'ant-table-row-expand-icon-collapsed': !row.expanded,
                            }]"
                            :aria-label="row.expanded ? (mergedLocale.collapse as string) : (mergedLocale.expand as string)"
                            :aria-expanded="row.expanded"
                            @click.stop="toggleExpand(row.record, row.key)"
                          />
                          <span v-else class="ant-table-row-expand-icon ant-table-row-expand-icon-spaced" />
                        </template>

                        <!-- Data cell -->
                        <template v-else>
                          <!-- Tree indent -->
                          <span
                            v-if="row.indent > 0 && colIndex === (hasExpandable && showExpandColumn !== false ? 1 : 0) + (rowSelection ? 1 : 0)"
                            class="ant-table-row-indent"
                            :style="{ paddingLeft: `${row.indent * (indentSize || 15)}px` }"
                          />
                          <!-- Inline expand icon for first data column in tree mode -->
                          <template v-if="hasTreeData && !showExpandColumn && colIndex === (rowSelection ? 1 : 0)">
                            <button
                              v-if="row.hasChildren"
                              type="button"
                              :class="['ant-table-row-expand-icon', 'ant-table-row-expand-icon-inline', {
                                'ant-table-row-expand-icon-expanded': row.expanded,
                                'ant-table-row-expand-icon-collapsed': !row.expanded,
                              }]"
                              @click.stop="toggleExpand(row.record, row.key)"
                            />
                            <span v-else class="ant-table-row-expand-icon ant-table-row-expand-icon-spaced" />
                          </template>
                          <!-- Cell content -->
                          <template v-if="col.customRender">
                            <component
                              :is="() => col.customRender!({ value: getCellValue(row.record, col), text: getCellValue(row.record, col), record: row.record, index: row.index, column: col })"
                            />
                          </template>
                          <template v-else-if="col.ellipsis">
                            <span
                              class="ant-table-cell-content"
                              :title="typeof col.ellipsis === 'object' && col.ellipsis.showTitle === false ? undefined : String(getCellValue(row.record, col) ?? '')"
                            >
                              <slot name="bodyCell" :text="getCellValue(row.record, col)" :value="getCellValue(row.record, col)" :record="row.record" :index="row.index" :column="col">
                                {{ getCellValue(row.record, col) }}
                              </slot>
                            </span>
                          </template>
                          <template v-else>
                            <slot name="bodyCell" :text="getCellValue(row.record, col)" :value="getCellValue(row.record, col)" :record="row.record" :index="row.index" :column="col">
                              {{ getCellValue(row.record, col) }}
                            </slot>
                          </template>
                        </template>
                      </td>
                    </tr>

                    <!-- Expanded row -->
                    <tr
                      v-if="row.expanded && (expandedRowRender || slots.expandedRowRender) && isRowExpandable(row.record)"
                      :key="`${row.key}-expand`"
                      :class="[
                        'ant-table-expanded-row',
                        `ant-table-expanded-row-level-${row.indent}`,
                        expandedRowClassName?.(row.record, row.index, row.indent),
                      ]"
                    >
                      <td :colspan="visibleColumnIndices.length" class="ant-table-cell">
                        <slot name="expandedRowRender" :record="row.record" :index="row.index" :indent="row.indent" :expanded="row.expanded">
                          <template v-if="expandedRowRender">
                            <component :is="() => expandedRowRender!({ record: row.record, index: row.index, indent: row.indent, expanded: row.expanded })" />
                          </template>
                        </slot>
                      </td>
                    </tr>
                  </template>
                </template>

                <!-- Empty state -->
                <template v-else>
                  <tr class="ant-table-placeholder">
                    <td :colspan="visibleColumnIndices.length" class="ant-table-cell">
                      <div class="ant-table-empty">
                        <slot name="emptyText">
                          <template v-if="renderEmpty">
                            <component :is="renderEmpty('Table')" />
                          </template>
                          <Empty v-else :description="typeof mergedLocale.emptyText === 'string' ? mergedLocale.emptyText : 'No data'" />
                        </slot>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>

              <!-- Summary -->
              <slot v-if="slots.summary" name="summary" :data="paginatedData" />
            </table>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="footer || slots.footer" class="ant-table-footer">
          <slot name="footer" :data="paginatedData">
            <template v-if="footer">{{ footer(paginatedData) }}</template>
          </slot>
        </div>

        <!-- Pagination bottom -->
        <div
          v-if="mergedPagination !== false && paginationPositions.bottom"
          :class="['ant-table-pagination ant-table-pagination-bottom', `ant-table-pagination-${getPaginationAlign(paginationPositions.positions)}`]"
        >
          <Pagination
            v-bind="mergedPagination"
            @change="handlePageChange"
            @showSizeChange="handlePageSizeChange"
          />
        </div>
      </div>
    </Spin>

    <!-- Without Spin wrapper -->
    <template v-else>
      <div :class="innerTableClasses">
        <!-- Title -->
        <div v-if="title || slots.title" class="ant-table-title">
          <slot name="title" :data="paginatedData">
            <template v-if="title">{{ title(paginatedData) }}</template>
          </slot>
        </div>

        <!-- Pagination top -->
        <div
          v-if="mergedPagination !== false && paginationPositions.top"
          :class="['ant-table-pagination ant-table-pagination-top', `ant-table-pagination-${getPaginationAlign(paginationPositions.positions)}`]"
        >
          <Pagination
            v-bind="mergedPagination"
            @change="handlePageChange"
            @showSizeChange="handlePageSizeChange"
          />
        </div>

        <!-- Table content -->
        <div class="ant-table-container">
          <div
            ref="scrollBodyRef"
            class="ant-table-content"
            :style="scrollYStyle"
            @scroll="handleScroll"
          >
            <table
              :style="scrollXStyle"
              :class="{ 'ant-table-layout-fixed': mergedTableLayout === 'fixed' }"
              role="table"
            >
              <!-- Colgroup -->
              <colgroup>
                <col
                  v-for="({ col }) in visibleColumnIndices"
                  :key="col._key"
                  :style="col.width ? { width: typeof col.width === 'number' ? `${col.width}px` : col.width, minWidth: col.minWidth ? `${col.minWidth}px` : undefined } : undefined"
                />
              </colgroup>

              <!-- Header -->
              <thead v-if="showHeader" class="ant-table-thead">
                <tr
                  v-for="(headerRow, rowIndex) in headerRows"
                  :key="rowIndex"
                  v-bind="customHeaderRow?.(headerRow as any, rowIndex)"
                >
                  <th
                    v-for="(col, colIndex) in headerRow"
                    :key="getColumnKey(col, colIndex)"
                    :class="[
                      'ant-table-cell',
                      col.className,
                      col.align ? `ant-table-cell-align-${col.align}` : '',
                      {
                        'ant-table-cell-fix-left': col.fixed === 'left' || col.fixed === true,
                        'ant-table-cell-fix-left-last': isLastFixedLeft(colIndex),
                        'ant-table-cell-fix-right': col.fixed === 'right',
                        'ant-table-cell-fix-right-first': isFirstFixedRight(colIndex),
                        'ant-table-column-has-sorters': col.sorter,
                        'ant-table-column-sort': getSortOrder(getColumnKey(col, colIndex)) !== null,
                      },
                    ]"
                    :colspan="(col as any).colSpan > 1 ? (col as any).colSpan : undefined"
                    :rowspan="(col as any).rowSpan > 1 ? (col as any).rowSpan : undefined"
                    :style="getCellFixedStyle(colIndex)"
                    v-bind="col.customHeaderCell?.(col)"
                    :aria-sort="getSortOrder(getColumnKey(col, colIndex)) === 'ascend' ? 'ascending' : getSortOrder(getColumnKey(col, colIndex)) === 'descend' ? 'descending' : undefined"
                    @click="handleHeaderClick(col as InternalColumnType, $event)"
                  >
                    <!-- Selection column header -->
                    <template v-if="(col as any)._isSelectionColumn">
                      <template v-if="rowSelection?.type !== 'radio' && !rowSelection?.hideSelectAll">
                        <label class="ant-checkbox-wrapper" @click.stop>
                          <span
                            :class="['ant-checkbox', {
                              'ant-checkbox-checked': allSelected,
                              'ant-checkbox-indeterminate': someSelected,
                            }]"
                          >
                            <input
                              type="checkbox"
                              class="ant-checkbox-input"
                              :checked="allSelected"
                              :aria-label="mergedLocale.selectAll as string"
                              @change="selectAll(!allSelected)"
                            />
                            <span class="ant-checkbox-inner" />
                          </span>
                        </label>
                        <span v-if="rowSelection?.columnTitle" class="ant-table-selection-extra">
                          {{ rowSelection.columnTitle }}
                        </span>
                      </template>
                    </template>

                    <!-- Expand column header -->
                    <template v-else-if="(col as any)._isExpandColumn">
                      <slot name="expandColumnTitle" />
                    </template>

                    <!-- Regular column header -->
                    <template v-else>
                      <FilterDropdown
                        v-if="col.filters?.length || col.filterDropdown || col.customFilterDropdown"
                        :column="col as InternalColumnType"
                        :filtered-value="getFilteredValue(getColumnKey(col, colIndex))"
                        :locale="mergedLocale as any"
                        @filter="triggerFilter"
                      >
                        <template #title>
                          <slot name="headerCell" :title="col.title" :column="col">
                            <template v-if="typeof col.title === 'function'">
                              <component :is="() => (col.title as Function)({ sortOrder: getSortOrder(getColumnKey(col, colIndex)), sortColumn: col, filters: getFiltersMap() })" />
                            </template>
                            <template v-else>
                              {{ col.title }}
                            </template>
                          </slot>
                          <span v-if="col.sorter" class="ant-table-column-sorter">
                            <span class="ant-table-column-sorter-inner">
                              <span
                                :class="['ant-table-column-sorter-up', { active: getSortOrder(getColumnKey(col, colIndex)) === 'ascend' }]"
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" /></svg>
                              </span>
                              <span
                                :class="['ant-table-column-sorter-down', { active: getSortOrder(getColumnKey(col, colIndex)) === 'descend' }]"
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" /></svg>
                              </span>
                            </span>
                          </span>
                        </template>
                        <template v-if="slots.customFilterIcon" #filterIcon="filterProps">
                          <slot name="customFilterIcon" v-bind="filterProps" />
                        </template>
                        <template v-if="slots.customFilterDropdown" #customFilterDropdown="filterProps">
                          <slot name="customFilterDropdown" v-bind="filterProps" />
                        </template>
                      </FilterDropdown>
                      <template v-else>
                        <div :class="{ 'ant-table-column-sorters': !!col.sorter }">
                          <span class="ant-table-column-title">
                            <slot name="headerCell" :title="col.title" :column="col">
                              <template v-if="typeof col.title === 'function'">
                                <component :is="() => (col.title as Function)({ sortOrder: getSortOrder(getColumnKey(col, colIndex)), sortColumn: col, filters: getFiltersMap() })" />
                              </template>
                              <template v-else>
                                {{ col.title }}
                              </template>
                            </slot>
                          </span>
                          <span v-if="col.sorter" class="ant-table-column-sorter">
                            <span class="ant-table-column-sorter-inner">
                              <span
                                :class="['ant-table-column-sorter-up', { active: getSortOrder(getColumnKey(col, colIndex)) === 'ascend' }]"
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z" /></svg>
                              </span>
                              <span
                                :class="['ant-table-column-sorter-down', { active: getSortOrder(getColumnKey(col, colIndex)) === 'descend' }]"
                                aria-hidden="true"
                              >
                                <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"><path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" /></svg>
                              </span>
                            </span>
                          </span>
                        </div>
                      </template>
                    </template>
                  </th>
                </tr>
              </thead>

              <!-- Body -->
              <tbody class="ant-table-tbody">
                <template v-if="displayRows.length > 0">
                  <template v-for="row in displayRows" :key="row.key">
                    <tr
                      :class="[
                        'ant-table-row',
                        `ant-table-row-level-${row.indent}`,
                        getRowClassName(row.record, row.index, row.indent),
                        { 'ant-table-row-selected': isSelected(row.key) },
                      ]"
                      v-bind="customRow?.(row.record, row.index)"
                      @click="expandRowByClick && isRowExpandable(row.record) ? toggleExpand(row.record, row.key) : undefined"
                    >
                      <td
                        v-for="({ col, i: colIndex }) in visibleColumnIndices"
                        :key="col._key"
                        :class="[
                          'ant-table-cell',
                          col.className,
                          col.align ? `ant-table-cell-align-${col.align}` : '',
                          {
                            'ant-table-cell-fix-left': col.fixed === 'left' || col.fixed === true,
                            'ant-table-cell-fix-left-last': isLastFixedLeft(colIndex),
                            'ant-table-cell-fix-right': col.fixed === 'right',
                            'ant-table-cell-fix-right-first': isFirstFixedRight(colIndex),
                            'ant-table-cell-ellipsis': col.ellipsis,
                            'ant-table-column-sort': getSortOrder(col._key) !== null,
                          },
                        ]"
                        :style="getCellFixedStyle(colIndex)"
                        v-bind="col.customCell?.(row.record, row.index, col)"
                      >
                        <!-- Selection column -->
                        <template v-if="(col as any)._isSelectionColumn">
                          <label class="ant-checkbox-wrapper" @click.stop>
                            <template v-if="rowSelection?.type === 'radio'">
                              <span
                                :class="['ant-radio', { 'ant-radio-checked': isSelected(row.key) }]"
                              >
                                <input
                                  type="radio"
                                  class="ant-radio-input"
                                  :checked="isSelected(row.key)"
                                  :disabled="rowSelection?.getCheckboxProps?.(row.record)?.disabled"
                                  :name="'ant-table-radio'"
                                  @change="toggleRow(row.key, row.record, !isSelected(row.key), $event)"
                                />
                                <span class="ant-radio-inner" />
                              </span>
                            </template>
                            <template v-else>
                              <span
                                :class="['ant-checkbox', { 'ant-checkbox-checked': isSelected(row.key) }]"
                              >
                                <input
                                  type="checkbox"
                                  class="ant-checkbox-input"
                                  :checked="isSelected(row.key)"
                                  :disabled="rowSelection?.getCheckboxProps?.(row.record)?.disabled"
                                  @change="toggleRow(row.key, row.record, !isSelected(row.key), $event)"
                                />
                                <span class="ant-checkbox-inner" />
                              </span>
                            </template>
                          </label>
                        </template>

                        <!-- Expand column -->
                        <template v-else-if="(col as any)._isExpandColumn">
                          <button
                            v-if="isRowExpandable(row.record)"
                            type="button"
                            :class="['ant-table-row-expand-icon', {
                              'ant-table-row-expand-icon-expanded': row.expanded,
                              'ant-table-row-expand-icon-collapsed': !row.expanded,
                            }]"
                            :aria-label="row.expanded ? (mergedLocale.collapse as string) : (mergedLocale.expand as string)"
                            :aria-expanded="row.expanded"
                            @click.stop="toggleExpand(row.record, row.key)"
                          />
                          <span v-else class="ant-table-row-expand-icon ant-table-row-expand-icon-spaced" />
                        </template>

                        <!-- Data cell -->
                        <template v-else>
                          <span
                            v-if="row.indent > 0 && colIndex === (hasExpandable && showExpandColumn !== false ? 1 : 0) + (rowSelection ? 1 : 0)"
                            class="ant-table-row-indent"
                            :style="{ paddingLeft: `${row.indent * (indentSize || 15)}px` }"
                          />
                          <template v-if="hasTreeData && !showExpandColumn && colIndex === (rowSelection ? 1 : 0)">
                            <button
                              v-if="row.hasChildren"
                              type="button"
                              :class="['ant-table-row-expand-icon', 'ant-table-row-expand-icon-inline', {
                                'ant-table-row-expand-icon-expanded': row.expanded,
                                'ant-table-row-expand-icon-collapsed': !row.expanded,
                              }]"
                              @click.stop="toggleExpand(row.record, row.key)"
                            />
                            <span v-else class="ant-table-row-expand-icon ant-table-row-expand-icon-spaced" />
                          </template>
                          <template v-if="col.customRender">
                            <component
                              :is="() => col.customRender!({ value: getCellValue(row.record, col), text: getCellValue(row.record, col), record: row.record, index: row.index, column: col })"
                            />
                          </template>
                          <template v-else-if="col.ellipsis">
                            <span
                              class="ant-table-cell-content"
                              :title="typeof col.ellipsis === 'object' && col.ellipsis.showTitle === false ? undefined : String(getCellValue(row.record, col) ?? '')"
                            >
                              <slot name="bodyCell" :text="getCellValue(row.record, col)" :value="getCellValue(row.record, col)" :record="row.record" :index="row.index" :column="col">
                                {{ getCellValue(row.record, col) }}
                              </slot>
                            </span>
                          </template>
                          <template v-else>
                            <slot name="bodyCell" :text="getCellValue(row.record, col)" :value="getCellValue(row.record, col)" :record="row.record" :index="row.index" :column="col">
                              {{ getCellValue(row.record, col) }}
                            </slot>
                          </template>
                        </template>
                      </td>
                    </tr>

                    <!-- Expanded row -->
                    <tr
                      v-if="row.expanded && (expandedRowRender || slots.expandedRowRender) && isRowExpandable(row.record)"
                      :key="`${row.key}-expand`"
                      :class="[
                        'ant-table-expanded-row',
                        `ant-table-expanded-row-level-${row.indent}`,
                        expandedRowClassName?.(row.record, row.index, row.indent),
                      ]"
                    >
                      <td :colspan="visibleColumnIndices.length" class="ant-table-cell">
                        <slot name="expandedRowRender" :record="row.record" :index="row.index" :indent="row.indent" :expanded="row.expanded">
                          <template v-if="expandedRowRender">
                            <component :is="() => expandedRowRender!({ record: row.record, index: row.index, indent: row.indent, expanded: row.expanded })" />
                          </template>
                        </slot>
                      </td>
                    </tr>
                  </template>
                </template>

                <template v-else>
                  <tr class="ant-table-placeholder">
                    <td :colspan="visibleColumnIndices.length" class="ant-table-cell">
                      <div class="ant-table-empty">
                        <slot name="emptyText">
                          <template v-if="renderEmpty">
                            <component :is="renderEmpty('Table')" />
                          </template>
                          <Empty v-else :description="typeof mergedLocale.emptyText === 'string' ? mergedLocale.emptyText : 'No data'" />
                        </slot>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>

              <!-- Summary -->
              <slot v-if="slots.summary" name="summary" :data="paginatedData" />
            </table>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="footer || slots.footer" class="ant-table-footer">
          <slot name="footer" :data="paginatedData">
            <template v-if="footer">{{ footer(paginatedData) }}</template>
          </slot>
        </div>

        <!-- Pagination bottom -->
        <div
          v-if="mergedPagination !== false && paginationPositions.bottom"
          :class="['ant-table-pagination ant-table-pagination-bottom', `ant-table-pagination-${getPaginationAlign(paginationPositions.positions)}`]"
        >
          <Pagination
            v-bind="mergedPagination"
            @change="handlePageChange"
            @showSizeChange="handlePageSizeChange"
          />
        </div>
      </div>
    </template>
  </div>
</template>
