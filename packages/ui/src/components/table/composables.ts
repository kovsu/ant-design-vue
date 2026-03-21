import { computed, ref, watch, type Ref } from 'vue'
import type {
  ColumnType,
  ColumnsType,
  ColumnGroupType,
  CompareFn,
  FilterValue,
  FlattenedRow,
  GetRowKey,
  InternalColumnType,
  Key,
  SortOrder,
  SorterResult,
  TablePaginationConfig,
  TableRowSelection,
} from './types'
import { EXPAND_COLUMN, SELECTION_COLUMN } from './types'

// ==================== Utilities ====================

export function getRowKeyFn<T>(rowKey: GetRowKey<T>): (record: T, index: number) => Key {
  if (typeof rowKey === 'function') return rowKey
  return (record: any) => record[rowKey]
}

export function getColumnKey<T>(column: ColumnType<T>, index: number): Key {
  if (column.key !== undefined) return column.key
  if (column.dataIndex !== undefined) {
    return Array.isArray(column.dataIndex) ? column.dataIndex.join('.') : column.dataIndex
  }
  return `__col_${index}`
}

export function getPathValue(record: any, path: string | number | (string | number)[] | undefined): any {
  if (path === undefined || path === null) return record
  const pathArray = Array.isArray(path) ? path : String(path).split('.')
  let value = record
  for (const key of pathArray) {
    if (value == null) return undefined
    value = value[key]
  }
  return value
}

function isColumnGroup<T>(column: ColumnType<T> | ColumnGroupType<T>): column is ColumnGroupType<T> {
  return 'children' in column && Array.isArray((column as ColumnGroupType<T>).children)
}

// ==================== Column Processing ====================

/** Flatten column groups into leaf columns for body rendering */
export function flattenColumns<T>(columns: ColumnsType<T>): ColumnType<T>[] {
  const result: ColumnType<T>[] = []
  for (const col of columns) {
    if (isColumnGroup(col)) {
      result.push(...flattenColumns(col.children))
    } else {
      result.push(col)
    }
  }
  return result
}

/** Get header rows for multi-level header rendering */
export function getHeaderRows<T>(columns: ColumnsType<T>, currentRow = 0, rows: ColumnType<T>[][] = []): ColumnType<T>[][] {
  rows[currentRow] = rows[currentRow] || []

  for (const col of columns) {
    const cell: any = { ...col }
    if (isColumnGroup(col)) {
      cell.hasChildren = true
      // Count total leaf children for colSpan
      cell.colSpan = countLeafColumns(col.children)
      getHeaderRows(col.children, currentRow + 1, rows)
    } else {
      // Leaf columns span all remaining header rows
      cell.rowSpan = getMaxDepth(columns)
    }
    rows[currentRow].push(cell)
  }

  return rows
}

function countLeafColumns<T>(columns: ColumnsType<T>): number {
  let count = 0
  for (const col of columns) {
    if (isColumnGroup(col)) {
      count += countLeafColumns(col.children)
    } else {
      count += 1
    }
  }
  return count
}

function getMaxDepth<T>(columns: ColumnsType<T>): number {
  let maxDepth = 1
  for (const col of columns) {
    if (isColumnGroup(col)) {
      maxDepth = Math.max(maxDepth, 1 + getMaxDepth(col.children))
    }
  }
  return maxDepth
}

// ==================== useColumns ====================

export function useColumns<T>(
  columns: () => ColumnsType<T> | undefined,
  rowSelection: () => TableRowSelection<T> | undefined,
  expandable: () => boolean,
  expandFixed: () => 'left' | 'right' | boolean | undefined,
) {
  const mergedColumns = computed<ColumnsType<T>>(() => {
    const cols = (columns() || []).slice()
    const selection = rowSelection()
    const hasExpand = expandable()

    // Replace SELECTION_COLUMN sentinel with actual selection column
    if (selection) {
      const selectionIdx = cols.indexOf(SELECTION_COLUMN as any)
      if (selectionIdx >= 0) {
        cols[selectionIdx] = {
          _isSelectionColumn: true,
          fixed: selection.fixed || 'left',
          width: selection.columnWidth || 32,
          className: 'ant-table-selection-column',
        } as any
      } else {
        // Prepend selection column
        cols.unshift({
          _isSelectionColumn: true,
          fixed: selection.fixed || 'left',
          width: selection.columnWidth || 32,
          className: 'ant-table-selection-column',
        } as any)
      }
    }

    // Replace EXPAND_COLUMN sentinel with actual expand column
    if (hasExpand) {
      const expandIdx = cols.indexOf(EXPAND_COLUMN as any)
      if (expandIdx >= 0) {
        cols[expandIdx] = {
          _isExpandColumn: true,
          fixed: expandFixed(),
          width: 32,
          className: 'ant-table-expand-column',
        } as any
      } else {
        // Prepend expand column
        cols.unshift({
          _isExpandColumn: true,
          fixed: expandFixed(),
          width: 32,
          className: 'ant-table-expand-column',
        } as any)
      }
    }

    return cols
  })

  // Leaf columns (flattened, for body rendering)
  const flatColumns = computed(() => flattenColumns(mergedColumns.value))

  // Assign keys to flat columns
  const flatColumnsWithKeys = computed<InternalColumnType<T>[]>(() =>
    flatColumns.value.map((col, i) => ({
      ...col,
      _key: getColumnKey(col, i),
    })),
  )

  // Header rows for multi-level header
  const headerRows = computed(() => getHeaderRows(mergedColumns.value))

  return {
    mergedColumns,
    flatColumns: flatColumnsWithKeys,
    headerRows,
  }
}

// ==================== useSorter ====================

interface SortState<T> {
  column: ColumnType<T>
  key: Key
  order: SortOrder
  multiplePriority?: number
}

export function useSorter<T>(
  flatColumns: () => InternalColumnType<T>[],
  dataSource: () => T[],
  onChange: (sorterStates: SortState<T>[], action: 'sort') => void,
  defaultSortDirections: () => SortOrder[],
) {
  // Collect initial sort state from columns
  function getDefaultSortStates(): SortState<T>[] {
    const states: SortState<T>[] = []
    for (const col of flatColumns()) {
      if (col.sortOrder !== undefined || col.defaultSortOrder) {
        states.push({
          column: col,
          key: col._key,
          order: col.sortOrder ?? col.defaultSortOrder ?? null,
          multiplePriority: typeof col.sorter === 'object' ? col.sorter.multiple : undefined,
        })
      }
    }
    return states
  }

  const sortStates = ref<SortState<T>[]>(getDefaultSortStates()) as Ref<SortState<T>[]>

  // Sync controlled sortOrder from columns
  watch(
    () => flatColumns().map((c) => c.sortOrder),
    () => {
      const controlled = flatColumns().filter((c) => c.sortOrder !== undefined)
      if (controlled.length > 0) {
        sortStates.value = controlled.map((col) => ({
          column: col,
          key: col._key,
          order: col.sortOrder!,
          multiplePriority: typeof col.sorter === 'object' ? col.sorter.multiple : undefined,
        }))
      }
    },
  )

  function getNextSortOrder(column: ColumnType<T>, currentOrder: SortOrder): SortOrder {
    const directions = column.sortDirections || defaultSortDirections()
    const currentIndex = directions.indexOf(currentOrder)
    return directions[(currentIndex + 1) % directions.length]
  }

  function triggerSort(column: InternalColumnType<T>) {
    const isMultiSort = typeof column.sorter === 'object' && column.sorter.multiple !== undefined
    const existing = sortStates.value.find((s) => s.key === column._key)
    const nextOrder = getNextSortOrder(column, existing?.order ?? null)

    let newStates: SortState<T>[]
    if (isMultiSort) {
      // Multi-sort: update or add this column, keep others
      newStates = sortStates.value.filter((s) => s.key !== column._key)
      if (nextOrder !== null) {
        newStates.push({
          column,
          key: column._key,
          order: nextOrder,
          multiplePriority: (column.sorter as any).multiple,
        })
      }
    } else {
      // Single sort: replace all
      if (nextOrder !== null) {
        newStates = [{ column, key: column._key, order: nextOrder }]
      } else {
        newStates = []
      }
    }

    sortStates.value = newStates
    onChange(newStates, 'sort')
  }

  // Get sort order for a specific column
  function getSortOrder(columnKey: Key): SortOrder {
    return sortStates.value.find((s) => s.key === columnKey)?.order ?? null
  }

  // Sort the data
  const sortedData = computed<T[]>(() => {
    const data = dataSource()
    const activeSorts = sortStates.value.filter((s) => s.order !== null && s.column.sorter)

    if (activeSorts.length === 0) return data

    // Sort by multiplePriority if available, otherwise first wins
    const sorted = activeSorts.slice().sort(
      (a, b) => (a.multiplePriority ?? 0) - (b.multiplePriority ?? 0),
    )

    return [...data].sort((a, b) => {
      for (const state of sorted) {
        const { column, order } = state
        const compareFn: CompareFn<T> | undefined =
          typeof column.sorter === 'function'
            ? column.sorter
            : typeof column.sorter === 'object'
              ? column.sorter.compare
              : undefined

        if (!compareFn) continue

        const result = compareFn(a, b, order)
        if (result !== 0) {
          return order === 'ascend' ? result : -result
        }
      }
      return 0
    })
  })

  // Build SorterResult for onChange callback
  function getSorterResult(): SorterResult<T> | SorterResult<T>[] {
    const results = sortStates.value.map((s) => ({
      column: s.column,
      order: s.order,
      field: s.column.dataIndex,
      columnKey: s.key,
    }))
    return results.length <= 1 ? (results[0] || {}) : results
  }

  return {
    sortStates,
    sortedData,
    triggerSort,
    getSortOrder,
    getSorterResult,
  }
}

// ==================== useFilter ====================

interface FilterState<T> {
  column: ColumnType<T>
  key: Key
  filteredValue: FilterValue | null
}

export function useFilter<T>(
  flatColumns: () => InternalColumnType<T>[],
  dataSource: () => T[],
  onChange: (filterStates: FilterState<T>[], action: 'filter') => void,
) {
  function getDefaultFilterStates(): FilterState<T>[] {
    const states: FilterState<T>[] = []
    for (const col of flatColumns()) {
      if (col.filteredValue !== undefined || col.defaultFilteredValue !== undefined) {
        states.push({
          column: col,
          key: col._key,
          filteredValue: col.filteredValue ?? col.defaultFilteredValue ?? null,
        })
      }
    }
    return states
  }

  const filterStates = ref<FilterState<T>[]>(getDefaultFilterStates()) as Ref<FilterState<T>[]>

  // Sync controlled filteredValue
  watch(
    () => flatColumns().map((c) => c.filteredValue),
    () => {
      const controlled = flatColumns().filter((c) => c.filteredValue !== undefined)
      if (controlled.length > 0) {
        const newStates = filterStates.value.slice()
        for (const col of controlled) {
          const idx = newStates.findIndex((s) => s.key === col._key)
          const state = { column: col, key: col._key, filteredValue: col.filteredValue! }
          if (idx >= 0) {
            newStates[idx] = state
          } else {
            newStates.push(state)
          }
        }
        filterStates.value = newStates
      }
    },
  )

  function getFilteredValue(columnKey: Key): FilterValue | null {
    return filterStates.value.find((s) => s.key === columnKey)?.filteredValue ?? null
  }

  function triggerFilter(column: InternalColumnType<T>, filteredValue: FilterValue | null) {
    const newStates = filterStates.value.filter((s) => s.key !== column._key)
    if (filteredValue && filteredValue.length > 0) {
      newStates.push({ column, key: column._key, filteredValue })
    }
    filterStates.value = newStates
    onChange(newStates, 'filter')
  }

  // Filter data
  const filteredData = computed<T[]>(() => {
    let data = dataSource()
    for (const state of filterStates.value) {
      const { column, filteredValue } = state
      if (!filteredValue || filteredValue.length === 0) continue
      if (!column.onFilter) continue
      data = data.filter((record) =>
        filteredValue.some((value) => column.onFilter!(value, record)),
      )
    }
    return data
  })

  function getFiltersMap(): Record<string, FilterValue | null> {
    const map: Record<string, FilterValue | null> = {}
    for (const col of flatColumns()) {
      const key = col._key
      map[String(key)] = getFilteredValue(key)
    }
    return map
  }

  return {
    filterStates,
    filteredData,
    triggerFilter,
    getFilteredValue,
    getFiltersMap,
  }
}

// ==================== useSelection ====================

export function useSelection<T>(
  rowSelection: () => TableRowSelection<T> | undefined,
  flattenedRows: () => FlattenedRow<T>[],
  getRowKey: () => (record: T, index: number) => Key,
) {
  const internalSelectedKeys = ref<Key[]>([]) as Ref<Key[]>

  // Initialize from defaults
  watch(
    () => rowSelection()?.defaultSelectedRowKeys,
    (keys) => {
      if (keys && internalSelectedKeys.value.length === 0) {
        internalSelectedKeys.value = keys.slice()
      }
    },
    { immediate: true },
  )

  // Sync controlled value
  watch(
    () => rowSelection()?.selectedRowKeys,
    (keys) => {
      if (keys !== undefined) {
        internalSelectedKeys.value = keys.slice()
      }
    },
    { immediate: true },
  )

  const selectedKeySet = computed(() => new Set(internalSelectedKeys.value))

  function isSelected(key: Key): boolean {
    return selectedKeySet.value.has(key)
  }

  function getSelectedRows(): T[] {
    const keySet = selectedKeySet.value
    return flattenedRows()
      .filter((row) => keySet.has(row.key))
      .map((row) => row.record)
  }

  function triggerSelectionChange(keys: Key[], info?: { nativeEvent?: Event; record?: T; selected?: boolean }) {
    const config = rowSelection()
    if (!config) return

    internalSelectedKeys.value = keys
    const rows = flattenedRows()
      .filter((row) => new Set(keys).has(row.key))
      .map((row) => row.record)
    config.onChange?.(keys, rows)

    if (info?.record !== undefined && info.selected !== undefined) {
      config.onSelect?.(info.record, info.selected, rows, info.nativeEvent!)
    }
  }

  function toggleRow(key: Key, record: T, selected: boolean, nativeEvent: Event) {
    const config = rowSelection()
    if (!config) return

    let newKeys: Key[]
    if (config.type === 'radio') {
      newKeys = selected ? [key] : []
    } else {
      const keySet = new Set(internalSelectedKeys.value)
      if (selected) {
        keySet.add(key)
      } else {
        keySet.delete(key)
      }
      newKeys = Array.from(keySet)
    }

    triggerSelectionChange(newKeys, { nativeEvent, record, selected })
  }

  // Select all / none / invert
  function selectAll(selected: boolean) {
    const config = rowSelection()
    if (!config) return

    const allKeys = flattenedRows()
      .filter((row) => {
        if (!config.getCheckboxProps) return true
        const props = config.getCheckboxProps(row.record)
        return !props.disabled
      })
      .map((row) => row.key)

    let newKeys: Key[]
    if (selected) {
      const keySet = new Set([...internalSelectedKeys.value, ...allKeys])
      newKeys = Array.from(keySet)
    } else {
      const disableKeys = new Set(allKeys)
      if (config.preserveSelectedRowKeys) {
        // Keep keys not in current page
        newKeys = internalSelectedKeys.value.filter((k) => !disableKeys.has(k))
      } else {
        newKeys = []
      }
    }

    triggerSelectionChange(newKeys)
  }

  function invertSelection() {
    const config = rowSelection()
    if (!config) return

    const allKeys = flattenedRows()
      .filter((row) => {
        if (!config.getCheckboxProps) return true
        const props = config.getCheckboxProps(row.record)
        return !props.disabled
      })
      .map((row) => row.key)

    const keySet = new Set(internalSelectedKeys.value)
    const newKeys: Key[] = []

    // Keep keys not in current page
    if (config.preserveSelectedRowKeys) {
      const pageKeys = new Set(allKeys)
      for (const k of internalSelectedKeys.value) {
        if (!pageKeys.has(k)) newKeys.push(k)
      }
    }

    // Toggle current page keys
    for (const k of allKeys) {
      if (!keySet.has(k)) newKeys.push(k)
    }

    triggerSelectionChange(newKeys)
  }

  // Check state for header checkbox
  const allSelected = computed(() => {
    const config = rowSelection()
    if (!config) return false
    const rows = flattenedRows()
    if (rows.length === 0) return false

    const selectableRows = rows.filter((row) => {
      if (!config.getCheckboxProps) return true
      return !config.getCheckboxProps(row.record).disabled
    })
    if (selectableRows.length === 0) return false
    return selectableRows.every((row) => selectedKeySet.value.has(row.key))
  })

  const someSelected = computed(() => {
    const config = rowSelection()
    if (!config) return false
    const rows = flattenedRows()
    if (rows.length === 0) return false
    return rows.some((row) => selectedKeySet.value.has(row.key)) && !allSelected.value
  })

  return {
    selectedKeySet,
    isSelected,
    getSelectedRows,
    toggleRow,
    selectAll,
    invertSelection,
    allSelected,
    someSelected,
    triggerSelectionChange,
  }
}

// ==================== useExpansion ====================

export function useExpansion<T>(
  dataSource: () => T[],
  getRowKeyFn: () => (record: T, index: number) => Key,
  childrenColumnName: () => string,
  defaultExpandAllRows: () => boolean | undefined,
  defaultExpandedRowKeys: () => Key[] | undefined,
  controlledExpandedRowKeys: () => Key[] | undefined,
  onExpand: (expanded: boolean, record: T) => void,
  onExpandedRowsChange: (keys: Key[]) => void,
) {
  // Collect all keys for expandAll
  function getAllExpandableKeys(): Key[] {
    const keys: Key[] = []
    const childField = childrenColumnName()
    function traverse(list: T[], index: number = 0) {
      for (const record of list) {
        const children = (record as any)[childField]
        if (children && children.length > 0) {
          keys.push(getRowKeyFn()(record, index))
          traverse(children, index + 1)
        }
      }
    }
    traverse(dataSource())
    return keys
  }

  const internalExpandedKeys = ref<Key[]>(
    defaultExpandedRowKeys() ?? (defaultExpandAllRows() ? getAllExpandableKeys() : []),
  ) as Ref<Key[]>

  // Sync controlled
  watch(
    () => controlledExpandedRowKeys(),
    (keys) => {
      if (keys !== undefined) {
        internalExpandedKeys.value = keys.slice()
      }
    },
    { immediate: true },
  )

  const expandedKeySet = computed(() => new Set(internalExpandedKeys.value))

  function isExpanded(key: Key): boolean {
    return expandedKeySet.value.has(key)
  }

  function toggleExpand(record: T, key: Key) {
    const expanded = !isExpanded(key)
    const keySet = new Set(internalExpandedKeys.value)
    if (expanded) {
      keySet.add(key)
    } else {
      keySet.delete(key)
    }
    const newKeys = Array.from(keySet)
    internalExpandedKeys.value = newKeys
    onExpand(expanded, record)
    onExpandedRowsChange(newKeys)
  }

  // Flatten tree data into rows
  function flattenData(data: T[]): FlattenedRow<T>[] {
    const rows: FlattenedRow<T>[] = []
    const childField = childrenColumnName()
    const getKey = getRowKeyFn()

    function traverse(list: T[], indent: number, parentKey?: Key) {
      for (let i = 0; i < list.length; i++) {
        const record = list[i]
        const key = getKey(record, rows.length)
        const children = (record as any)[childField] as T[] | undefined
        const hasChildren = !!(children && children.length > 0)
        const expanded = expandedKeySet.value.has(key)

        rows.push({ record, key, index: rows.length, indent, parentKey, hasChildren, expanded })

        if (hasChildren && expanded) {
          traverse(children, indent + 1, key)
        }
      }
    }

    traverse(data, 0)
    return rows
  }

  const flattenedRows = computed(() => flattenData(dataSource()))

  return {
    expandedKeySet,
    isExpanded,
    toggleExpand,
    flattenedRows,
  }
}

// ==================== usePagination ====================

export function usePagination<T>(
  dataLength: () => number,
  pagination: () => false | TablePaginationConfig | undefined,
) {
  const internalCurrent = ref(1)
  const internalPageSize = ref(10)

  const mergedPagination = computed<false | TablePaginationConfig>(() => {
    const config = pagination()
    if (config === false) return false
    if (!config) return { current: internalCurrent.value, pageSize: internalPageSize.value, total: dataLength() }
    return {
      ...config,
      current: config.current ?? internalCurrent.value,
      pageSize: config.pageSize ?? config.defaultPageSize ?? internalPageSize.value,
      total: config.total ?? dataLength(),
    }
  })

  function setCurrent(page: number) {
    internalCurrent.value = page
  }

  function setPageSize(size: number) {
    internalPageSize.value = size
    // Reset to page 1 when page size changes
    internalCurrent.value = 1
  }

  // Slice data for current page
  function paginateData(data: T[]): T[] {
    const config = mergedPagination.value
    if (config === false) return data
    const { current = 1, pageSize = 10 } = config
    const start = (current - 1) * pageSize
    return data.slice(start, start + pageSize)
  }

  return {
    mergedPagination,
    setCurrent,
    setPageSize,
    paginateData,
  }
}
