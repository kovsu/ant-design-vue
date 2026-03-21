<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import LeftOutlined from '@ant-design/icons-vue/LeftOutlined'
import RightOutlined from '@ant-design/icons-vue/RightOutlined'
import type { TransferProps, TransferEmits, TransferSlots, TransferDirection } from './types'
import { transferDefaultProps } from './types'
import TransferList from './TransferList.vue'

defineOptions({ name: 'ATransfer' })
const props = withDefaults(defineProps<TransferProps>(), transferDefaultProps)
const emit = defineEmits<TransferEmits>()
defineSlots<TransferSlots>()

// Internal selected keys state
const internalSelectedKeys = ref<string[]>([...props.selectedKeys])

watch(
  () => props.selectedKeys,
  (keys) => {
    internalSelectedKeys.value = [...keys]
  },
)

const mergedSelectedKeys = computed(() => {
  return internalSelectedKeys.value
})

// Split data source into left (source) and right (target)
const targetKeySet = computed(() => new Set(props.targetKeys))

const sourceItems = computed(() => {
  return props.dataSource.filter((item) => {
    const key = props.rowKey ? props.rowKey(item) : item.key
    return !targetKeySet.value.has(key)
  })
})

const targetItems = computed(() => {
  return props.dataSource.filter((item) => {
    const key = props.rowKey ? props.rowKey(item) : item.key
    return targetKeySet.value.has(key)
  })
})

// Split selected keys into source and target selections
const sourceSelectedKeys = computed(() => {
  const sourceKeySet = new Set(sourceItems.value.map((item) => item.key))
  return mergedSelectedKeys.value.filter((key) => sourceKeySet.has(key))
})

const targetSelectedKeys = computed(() => {
  const targetKeySet = new Set(targetItems.value.map((item) => item.key))
  return mergedSelectedKeys.value.filter((key) => targetKeySet.has(key))
})

// Can move checks
const canMoveRight = computed(() => {
  return sourceSelectedKeys.value.length > 0
})

const canMoveLeft = computed(() => {
  return targetSelectedKeys.value.length > 0
})

const classes = computed(() => ({
  'ant-transfer': true,
  'ant-transfer-disabled': props.disabled,
}))

function updateSelectedKeys(keys: string[]) {
  internalSelectedKeys.value = keys
  emit('update:selectedKeys', keys)
}

function handleSourceSelect(keys: string[]) {
  // Keep target selections, update source selections
  const targetKeys = targetSelectedKeys.value
  const newKeys = [...keys, ...targetKeys]
  updateSelectedKeys(newKeys)
  emit('selectChange', keys, targetKeys)
}

function handleTargetSelect(keys: string[]) {
  // Keep source selections, update target selections
  const sourceKeys = sourceSelectedKeys.value
  const newKeys = [...sourceKeys, ...keys]
  updateSelectedKeys(newKeys)
  emit('selectChange', sourceKeys, keys)
}

function moveToRight() {
  if (props.disabled || !canMoveRight.value) return

  const moveKeys = sourceSelectedKeys.value.filter((key) => {
    const item = props.dataSource.find((d) => d.key === key)
    return item && !item.disabled
  })

  if (moveKeys.length === 0) return

  const newTargetKeys = [...props.targetKeys, ...moveKeys]
  emit('update:targetKeys', newTargetKeys)
  emit('change', newTargetKeys, 'right', moveKeys)

  // Clear moved items from selected
  const moveKeySet = new Set(moveKeys)
  const newSelectedKeys = mergedSelectedKeys.value.filter((key) => !moveKeySet.has(key))
  updateSelectedKeys(newSelectedKeys)
}

function moveToLeft() {
  if (props.disabled || !canMoveLeft.value) return

  const moveKeys = targetSelectedKeys.value.filter((key) => {
    const item = props.dataSource.find((d) => d.key === key)
    return item && !item.disabled
  })

  if (moveKeys.length === 0) return

  const moveKeySet = new Set(moveKeys)
  const newTargetKeys = props.targetKeys.filter((key) => !moveKeySet.has(key))
  emit('update:targetKeys', newTargetKeys)
  emit('change', newTargetKeys, 'left', moveKeys)

  // Clear moved items from selected
  const newSelectedKeys = mergedSelectedKeys.value.filter((key) => !moveKeySet.has(key))
  updateSelectedKeys(newSelectedKeys)
}

function handleRemove(key: string) {
  if (props.disabled) return

  const newTargetKeys = props.targetKeys.filter((k) => k !== key)
  emit('update:targetKeys', newTargetKeys)
  emit('change', newTargetKeys, 'left', [key])
}

function handleSourceSearch(value: string) {
  emit('search', 'left', value)
}

function handleTargetSearch(value: string) {
  emit('search', 'right', value)
}

function handleSourceScroll(event: Event) {
  emit('scroll', 'left', event)
}

function handleTargetScroll(event: Event) {
  emit('scroll', 'right', event)
}
</script>

<template>
  <div :class="classes">
    <TransferList
      direction="left"
      :data-source="sourceItems"
      :selected-keys="sourceSelectedKeys"
      :title="titles[0]"
      :show-search="showSearch"
      :show-select-all="showSelectAll"
      :search-placeholder="searchPlaceholder"
      :not-found-content="notFoundContent"
      :disabled="disabled"
      :filter-option="filterOption"
      :render-item="render"
      @select="handleSourceSelect"
      @search="handleSourceSearch"
      @scroll="handleSourceScroll"
    >
      <template v-if="$slots.render" #render="{ item }">
        <slot name="render" :item="item" />
      </template>
      <template v-if="$slots.footer" #footer="{ direction: dir }">
        <slot name="footer" :direction="dir" />
      </template>
      <template v-if="$slots.notFoundContent" #notFoundContent>
        <slot name="notFoundContent" />
      </template>
    </TransferList>

    <div class="ant-transfer-operation">
      <button
        type="button"
        class="ant-btn ant-btn-primary ant-btn-sm ant-btn-icon-only"
        :disabled="disabled || !canMoveRight"
        aria-label="Move selected to right"
        @click="moveToRight"
      >
        <RightOutlined />
        <span v-if="operations[0]" class="ant-transfer-operation-text">{{ operations[0] }}</span>
      </button>
      <button
        v-if="!oneWay"
        type="button"
        class="ant-btn ant-btn-primary ant-btn-sm ant-btn-icon-only"
        :disabled="disabled || !canMoveLeft"
        aria-label="Move selected to left"
        @click="moveToLeft"
      >
        <LeftOutlined />
        <span v-if="operations[1]" class="ant-transfer-operation-text">{{ operations[1] }}</span>
      </button>
    </div>

    <TransferList
      direction="right"
      :data-source="targetItems"
      :selected-keys="targetSelectedKeys"
      :title="titles[1]"
      :show-search="showSearch"
      :show-select-all="showSelectAll && !oneWay"
      :search-placeholder="searchPlaceholder"
      :not-found-content="notFoundContent"
      :disabled="disabled"
      :one-way="oneWay"
      :filter-option="filterOption"
      :render-item="render"
      @select="handleTargetSelect"
      @search="handleTargetSearch"
      @scroll="handleTargetScroll"
      @remove="handleRemove"
    >
      <template v-if="$slots.render" #render="{ item }">
        <slot name="render" :item="item" />
      </template>
      <template v-if="$slots.footer" #footer="{ direction: dir }">
        <slot name="footer" :direction="dir" />
      </template>
      <template v-if="$slots.notFoundContent" #notFoundContent>
        <slot name="notFoundContent" />
      </template>
    </TransferList>
  </div>
</template>
