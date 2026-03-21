<script setup lang="ts">
import { computed, provide, useSlots } from 'vue'
import type { ListProps, ListSlots } from './types'
import { listDefaultProps, LIST_KEY } from './types'

defineOptions({ name: 'AList' })
const props = withDefaults(defineProps<ListProps>(), listDefaultProps)
defineSlots<ListSlots>()
const slots = useSlots()

const classes = computed(() => ({
  'ant-list': true,
  'ant-list-bordered': props.bordered,
  'ant-list-split': props.split,
  'ant-list-sm': props.size === 'sm',
  'ant-list-lg': props.size === 'lg',
  'ant-list-vertical': props.itemLayout === 'vertical',
  'ant-list-grid': !!props.grid,
  'ant-list-loading': props.loading,
}))

const isEmpty = computed(
  () => props.dataSource.length === 0 && !slots.default,
)

function getRowKey(item: any, index: number): string | number {
  if (!props.rowKey) return index
  if (typeof props.rowKey === 'function') return props.rowKey(item)
  return item[props.rowKey] ?? index
}

const gridStyle = computed(() => {
  if (!props.grid) return undefined
  const { gutter } = props.grid
  if (!gutter) return undefined
  return {
    marginLeft: `${-gutter / 2}px`,
    marginRight: `${-gutter / 2}px`,
  }
})

const gridColStyle = computed(() => {
  if (!props.grid) return undefined
  const { gutter, column } = props.grid
  const style: Record<string, string> = {}
  if (gutter) {
    style.paddingLeft = `${gutter / 2}px`
    style.paddingRight = `${gutter / 2}px`
  }
  if (column) {
    style.width = `${100 / column}%`
    style.maxWidth = `${100 / column}%`
  }
  return style
})

provide(LIST_KEY, {
  grid: computed(() => props.grid),
  itemLayout: computed(() => props.itemLayout),
  size: computed(() => props.size),
})
</script>

<template>
  <div :class="classes">
    <div v-if="$slots.header" class="ant-list-header">
      <slot name="header" />
    </div>

    <div v-if="loading" class="ant-list-spin">
      <a-spin :spinning="true">
        <div class="ant-list-items" :style="gridStyle">
          <template v-if="grid">
            <div
              v-for="(item, index) in dataSource"
              :key="getRowKey(item, index)"
              class="ant-list-item-col"
              :style="gridColStyle"
            >
              <slot name="renderItem" :item="item" :index="index" />
            </div>
          </template>
          <template v-else>
            <slot name="renderItem" v-for="(item, index) in dataSource" :item="item" :index="index" />
          </template>
          <slot v-if="!dataSource.length && $slots.default" />
        </div>
      </a-spin>
    </div>

    <template v-else>
      <template v-if="isEmpty">
        <div class="ant-list-empty-text">
          <a-empty />
        </div>
      </template>
      <template v-else>
        <ul class="ant-list-items" :style="gridStyle">
          <template v-if="grid">
            <div
              v-for="(item, index) in dataSource"
              :key="getRowKey(item, index)"
              class="ant-list-item-col"
              :style="gridColStyle"
            >
              <slot name="renderItem" :item="item" :index="index" />
            </div>
          </template>
          <template v-else>
            <slot name="renderItem" v-for="(item, index) in dataSource" :item="item" :index="index" />
          </template>
          <slot v-if="!dataSource.length && $slots.default" />
        </ul>
      </template>
    </template>

    <div v-if="$slots.footer" class="ant-list-footer">
      <slot name="footer" />
    </div>

    <div v-if="$slots.loadMore" class="ant-list-load-more">
      <slot name="loadMore" />
    </div>
  </div>
</template>
