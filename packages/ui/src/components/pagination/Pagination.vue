<template>
  <nav
    v-if="!shouldHide"
    :class="paginationClasses"
    role="navigation"
    aria-label="Pagination"
  >
    <!-- Simple mode -->
    <template v-if="props.simple">
      <li
        :class="['ant-pagination-prev', { 'ant-pagination-disabled': mergedCurrent <= 1 || props.disabled }]"
      >
        <button
          type="button"
          :disabled="mergedCurrent <= 1 || props.disabled"
          aria-label="Previous page"
          @click="onPageChange(mergedCurrent - 1)"
        >
          <LeftOutlined />
        </button>
      </li>
      <li class="ant-pagination-simple-pager">
        <input
          type="text"
          :value="mergedCurrent"
          :disabled="props.disabled"
          size="3"
          @keydown.enter="onJumperEnter"
          @change="onJumperChange"
        />
        <span class="ant-pagination-slash">/</span>
        {{ totalPages }}
      </li>
      <li
        :class="['ant-pagination-next', { 'ant-pagination-disabled': mergedCurrent >= totalPages || props.disabled }]"
      >
        <button
          type="button"
          :disabled="mergedCurrent >= totalPages || props.disabled"
          aria-label="Next page"
          @click="onPageChange(mergedCurrent + 1)"
        >
          <RightOutlined />
        </button>
      </li>
    </template>

    <!-- Full mode -->
    <template v-else>
      <!-- Total -->
      <li v-if="props.showTotal" class="ant-pagination-total-text">
        {{ props.showTotal(props.total!, currentRange) }}
      </li>

      <!-- Prev -->
      <li
        :class="['ant-pagination-prev', { 'ant-pagination-disabled': mergedCurrent <= 1 || props.disabled }]"
      >
        <button
          type="button"
          :disabled="mergedCurrent <= 1 || props.disabled"
          aria-label="Previous page"
          @click="onPageChange(mergedCurrent - 1)"
        >
          <LeftOutlined />
        </button>
      </li>

      <!-- Page items -->
      <template v-for="item in pageItems" :key="item.page">
        <li
          v-if="item.type === 'page'"
          :class="['ant-pagination-item', { 'ant-pagination-item-active': item.page === mergedCurrent }]"
        >
          <button
            type="button"
            :disabled="props.disabled"
            :aria-label="`Page ${item.page}`"
            :aria-current="item.page === mergedCurrent ? 'page' : undefined"
            @click="onPageChange(item.page)"
          >
            {{ item.page }}
          </button>
        </li>
        <li
          v-else-if="item.type === 'jump-prev'"
          class="ant-pagination-jump-prev"
        >
          <button
            type="button"
            :disabled="props.disabled"
            aria-label="Previous 5 pages"
            @click="onPageChange(Math.max(1, mergedCurrent - 5))"
          >
            <EllipsisOutlined />
          </button>
        </li>
        <li
          v-else-if="item.type === 'jump-next'"
          class="ant-pagination-jump-next"
        >
          <button
            type="button"
            :disabled="props.disabled"
            aria-label="Next 5 pages"
            @click="onPageChange(Math.min(totalPages, mergedCurrent + 5))"
          >
            <EllipsisOutlined />
          </button>
        </li>
      </template>

      <!-- Next -->
      <li
        :class="['ant-pagination-next', { 'ant-pagination-disabled': mergedCurrent >= totalPages || props.disabled }]"
      >
        <button
          type="button"
          :disabled="mergedCurrent >= totalPages || props.disabled"
          aria-label="Next page"
          @click="onPageChange(mergedCurrent + 1)"
        >
          <RightOutlined />
        </button>
      </li>

      <!-- Page size changer -->
      <li v-if="props.showSizeChanger" class="ant-pagination-options">
        <select
          class="ant-pagination-options-size-changer"
          :value="mergedPageSize"
          :disabled="props.disabled"
          aria-label="Items per page"
          @change="onSizeChange"
        >
          <option v-for="opt in props.pageSizeOptions" :key="opt" :value="opt">
            {{ opt }} / page
          </option>
        </select>
      </li>

      <!-- Quick jumper -->
      <li v-if="props.showQuickJumper" class="ant-pagination-options-quick-jumper">
        Go to
        <input
          type="text"
          :disabled="props.disabled"
          @keydown.enter="onJumperEnter"
          @change="onJumperChange"
        />
      </li>
    </template>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed, getCurrentInstance } from 'vue'
import { LeftOutlined, RightOutlined, EllipsisOutlined } from '@ant-design/icons-vue'
import type { PaginationProps, PaginationEmits, PaginationSlots } from './types'
import { paginationDefaultProps } from './types'

defineOptions({ name: 'APagination' })

const props = withDefaults(defineProps<PaginationProps>(), paginationDefaultProps)
const emit = defineEmits<PaginationEmits>()
defineSlots<PaginationSlots>()

// --- Current page ---
const instance = getCurrentInstance()!
const isCurrentControlled = computed(() => {
  const rawProps = instance.vnode.props || {}
  return 'current' in rawProps
})

const internalCurrent = ref(props.defaultCurrent ?? 1)
const mergedCurrent = computed(() => {
  if (isCurrentControlled.value) {
    return props.current ?? 1
  }
  return internalCurrent.value
})

// --- Page size ---
const isPageSizeControlled = computed(() => {
  const rawProps = instance.vnode.props || {}
  return 'pageSize' in rawProps || 'page-size' in rawProps
})

const internalPageSize = ref(props.defaultPageSize ?? 10)
const mergedPageSize = computed(() => {
  if (isPageSizeControlled.value) {
    return props.pageSize ?? 10
  }
  return internalPageSize.value
})

// --- Computed ---
const totalPages = computed(() => Math.max(1, Math.ceil(props.total! / mergedPageSize.value)))

const currentRange = computed<[number, number]>(() => {
  const start = (mergedCurrent.value - 1) * mergedPageSize.value + 1
  const end = Math.min(mergedCurrent.value * mergedPageSize.value, props.total!)
  return [start, end]
})

const shouldHide = computed(() => {
  return props.hideOnSinglePage && totalPages.value <= 1
})

const paginationClasses = computed(() => [
  'ant-pagination',
  {
    'ant-pagination-simple': props.simple,
    'ant-pagination-small': props.size === 'small',
    'ant-pagination-disabled': props.disabled,
  },
])

// --- Page items computation ---
interface PageItem {
  type: 'page' | 'jump-prev' | 'jump-next'
  page: number
}

const pageItems = computed<PageItem[]>(() => {
  const total = totalPages.value
  const current = mergedCurrent.value
  const items: PageItem[] = []

  if (total <= 7) {
    // Show all pages
    for (let i = 1; i <= total; i++) {
      items.push({ type: 'page', page: i })
    }
    return items
  }

  // Always show first page
  items.push({ type: 'page', page: 1 })

  if (current > 4) {
    items.push({ type: 'jump-prev', page: -1 })
  }

  // Middle pages
  const start = Math.max(2, current - 2)
  const end = Math.min(total - 1, current + 2)

  // Adjust if near edges
  const adjustedStart = current <= 4 ? 2 : start
  const adjustedEnd = current >= total - 3 ? total - 1 : end

  for (let i = adjustedStart; i <= adjustedEnd; i++) {
    items.push({ type: 'page', page: i })
  }

  if (current < total - 3) {
    items.push({ type: 'jump-next', page: -2 })
  }

  // Always show last page
  items.push({ type: 'page', page: total })

  return items
})

// --- Handlers ---
function onPageChange(page: number) {
  if (props.disabled) return
  const validPage = Math.max(1, Math.min(page, totalPages.value))
  if (validPage === mergedCurrent.value) return

  if (!isCurrentControlled.value) {
    internalCurrent.value = validPage
  }
  emit('update:current', validPage)
  emit('change', validPage, mergedPageSize.value)
}

function onSizeChange(e: Event) {
  const newSize = Number((e.target as HTMLSelectElement).value)
  if (!isPageSizeControlled.value) {
    internalPageSize.value = newSize
  }
  // Reset to page 1 when size changes (or adjust to valid page)
  const newTotalPages = Math.max(1, Math.ceil(props.total! / newSize))
  const newCurrent = Math.min(mergedCurrent.value, newTotalPages)

  emit('update:pageSize', newSize)
  emit('showSizeChange', newCurrent, newSize)

  if (newCurrent !== mergedCurrent.value) {
    if (!isCurrentControlled.value) {
      internalCurrent.value = newCurrent
    }
    emit('update:current', newCurrent)
  }
  emit('change', newCurrent, newSize)
}

function onJumperEnter(e: KeyboardEvent) {
  const input = e.target as HTMLInputElement
  const page = Number(input.value)
  if (!isNaN(page) && page >= 1 && page <= totalPages.value) {
    onPageChange(page)
  }
  input.value = ''
}

function onJumperChange(e: Event) {
  // Also handle blur/change on the input
  const input = e.target as HTMLInputElement
  const page = Number(input.value)
  if (!isNaN(page) && page >= 1 && page <= totalPages.value) {
    onPageChange(page)
  }
}
</script>
