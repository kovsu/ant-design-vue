<script setup lang="ts">
import { computed, ref } from 'vue'
import DeleteOutlined from '@ant-design/icons-vue/DeleteOutlined'
import type { TransferItem, TransferDirection } from './types'
import TransferSearch from './TransferSearch.vue'

defineOptions({ name: 'ATransferList' })

const props = withDefaults(
  defineProps<{
    direction: TransferDirection
    dataSource: TransferItem[]
    selectedKeys: string[]
    title?: string
    showSearch?: boolean
    showSelectAll?: boolean
    searchPlaceholder?: string
    notFoundContent?: string
    disabled?: boolean
    oneWay?: boolean
    filterOption?: (inputValue: string, option: TransferItem) => boolean
    renderItem?: (item: TransferItem) => any
  }>(),
  {
    title: '',
    showSearch: false,
    showSelectAll: true,
    disabled: false,
    oneWay: false,
  },
)

const emit = defineEmits<{
  (e: 'select', keys: string[]): void
  (e: 'search', value: string): void
  (e: 'scroll', event: Event): void
  (e: 'remove', key: string): void
}>()

const searchValue = ref('')

const filteredItems = computed(() => {
  if (!searchValue.value) return props.dataSource

  return props.dataSource.filter((item) => {
    if (props.filterOption) {
      return props.filterOption(searchValue.value, item)
    }
    const title = item.title ?? item.key
    return title.toLowerCase().includes(searchValue.value.toLowerCase())
  })
})

const enabledItems = computed(() => filteredItems.value.filter((item) => !item.disabled))

const selectedCount = computed(() => {
  return filteredItems.value.filter((item) => props.selectedKeys.includes(item.key)).length
})

const isAllSelected = computed(() => {
  if (enabledItems.value.length === 0) return false
  return enabledItems.value.every((item) => props.selectedKeys.includes(item.key))
})

const isPartialSelected = computed(() => {
  if (isAllSelected.value) return false
  return enabledItems.value.some((item) => props.selectedKeys.includes(item.key))
})

const headerClasses = computed(() => ({
  'ant-transfer-list-header': true,
}))

function handleSelectAll() {
  if (props.disabled) return

  if (isAllSelected.value) {
    // Deselect all enabled filtered items, keep selected items that are not in filteredItems
    const filteredKeys = new Set(enabledItems.value.map((item) => item.key))
    const newKeys = props.selectedKeys.filter((key) => !filteredKeys.has(key))
    emit('select', newKeys)
  } else {
    // Select all enabled filtered items
    const enabledKeys = enabledItems.value.map((item) => item.key)
    const existing = new Set(props.selectedKeys)
    enabledKeys.forEach((key) => existing.add(key))
    emit('select', Array.from(existing))
  }
}

function handleItemSelect(item: TransferItem) {
  if (props.disabled || item.disabled) return

  const key = item.key
  const index = props.selectedKeys.indexOf(key)
  const newKeys = [...props.selectedKeys]

  if (index > -1) {
    newKeys.splice(index, 1)
  } else {
    newKeys.push(key)
  }

  emit('select', newKeys)
}

function handleSearch(value: string) {
  searchValue.value = value
  emit('search', value)
}

function handleScroll(event: Event) {
  emit('scroll', event)
}

function handleRemove(key: string) {
  emit('remove', key)
}

function getItemTitle(item: TransferItem): string {
  return item.title ?? item.key
}
</script>

<template>
  <div class="ant-transfer-list">
    <div :class="headerClasses">
      <template v-if="showSelectAll">
        <label class="ant-transfer-list-header-select-all">
          <span
            :class="{
              'ant-checkbox': true,
              'ant-checkbox-checked': isAllSelected,
              'ant-checkbox-indeterminate': isPartialSelected,
              'ant-checkbox-disabled': disabled || enabledItems.length === 0,
            }"
          >
            <input
              type="checkbox"
              class="ant-checkbox-input"
              :checked="isAllSelected"
              :disabled="disabled || enabledItems.length === 0"
              @change="handleSelectAll"
            />
            <span class="ant-checkbox-inner" />
          </span>
        </label>
      </template>
      <span class="ant-transfer-list-header-title">{{ title }}</span>
      <span class="ant-transfer-list-header-count">
        <template v-if="selectedCount > 0">{{ selectedCount }}/</template>{{ filteredItems.length }} items
      </span>
    </div>

    <div class="ant-transfer-list-body">
      <TransferSearch
        v-if="showSearch"
        :value="searchValue"
        :placeholder="searchPlaceholder"
        :disabled="disabled"
        @change="handleSearch"
      />

      <ul
        v-if="filteredItems.length > 0"
        class="ant-transfer-list-content"
        role="listbox"
        @scroll="handleScroll"
      >
        <li
          v-for="item in filteredItems"
          :key="item.key"
          :class="{
            'ant-transfer-list-content-item': true,
            'ant-transfer-list-content-item-selected': selectedKeys.includes(item.key),
            'ant-transfer-list-content-item-disabled': item.disabled || disabled,
          }"
          role="option"
          :aria-selected="selectedKeys.includes(item.key)"
          @click="!oneWay || direction === 'left' ? handleItemSelect(item) : undefined"
        >
          <template v-if="!oneWay || direction === 'left'">
            <span
              :class="{
                'ant-checkbox': true,
                'ant-checkbox-checked': selectedKeys.includes(item.key),
                'ant-checkbox-disabled': item.disabled || disabled,
              }"
            >
              <input
                type="checkbox"
                class="ant-checkbox-input"
                :checked="selectedKeys.includes(item.key)"
                :disabled="item.disabled || disabled"
                @change.stop="handleItemSelect(item)"
              />
              <span class="ant-checkbox-inner" />
            </span>
          </template>
          <span class="ant-transfer-list-content-item-text">
            <slot name="render" :item="item">
              {{ getItemTitle(item) }}
            </slot>
          </span>
          <button
            v-if="oneWay && direction === 'right'"
            type="button"
            class="ant-transfer-list-content-item-remove"
            aria-label="Remove"
            :disabled="disabled"
            @click.stop="handleRemove(item.key)"
          >
            <DeleteOutlined />
          </button>
        </li>
      </ul>

      <div v-else class="ant-transfer-list-empty">
        <slot name="notFoundContent">
          {{ notFoundContent || 'No data' }}
        </slot>
      </div>
    </div>

    <div v-if="$slots.footer" class="ant-transfer-list-footer">
      <slot name="footer" :direction="direction" />
    </div>
  </div>
</template>
