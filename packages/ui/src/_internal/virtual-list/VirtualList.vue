<script setup lang="ts">
import { computed, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import type { VirtualListProps, VirtualListSlots, VirtualListExpose } from './types'
import { virtualListDefaultProps } from './types'

defineOptions({ name: 'VirtualList' })

const props = withDefaults(defineProps<VirtualListProps>(), virtualListDefaultProps)
defineSlots<VirtualListSlots>()

const containerRef = ref<HTMLDivElement | null>(null)
const scrollTop = ref(0)

function getItemKey(item: any, index: number): string | number {
  if (typeof props.itemKey === 'function') return props.itemKey(item)
  if (typeof props.itemKey === 'string' && item != null) return item[props.itemKey] ?? index
  return index
}

const totalHeight = computed(() => props.data.length * props.itemHeight)

const visibleRange = computed(() => {
  const start = Math.floor(scrollTop.value / props.itemHeight)
  const visibleCount = Math.ceil(props.height / props.itemHeight)
  const overscan = props.overscan!
  const startIndex = Math.max(0, start - overscan)
  const endIndex = Math.min(props.data.length, start + visibleCount + overscan)
  return { startIndex, endIndex }
})

const visibleItems = computed(() => {
  const { startIndex, endIndex } = visibleRange.value
  const items: { item: any; index: number; key: string | number; style: Record<string, string> }[] = []
  for (let i = startIndex; i < endIndex; i++) {
    items.push({
      item: props.data[i],
      index: i,
      key: getItemKey(props.data[i], i),
      style: {
        position: 'absolute',
        top: `${i * props.itemHeight}px`,
        height: `${props.itemHeight}px`,
        left: '0',
        right: '0',
      },
    })
  }
  return items
})

function handleScroll() {
  if (containerRef.value) {
    scrollTop.value = containerRef.value.scrollTop
  }
}

function scrollTo(index: number) {
  if (containerRef.value) {
    const top = Math.max(0, Math.min(index * props.itemHeight, totalHeight.value - props.height))
    containerRef.value.scrollTop = top
    scrollTop.value = top
  }
}

function scrollToTop() {
  scrollTo(0)
}

function scrollToBottom() {
  if (containerRef.value) {
    const top = totalHeight.value - props.height
    containerRef.value.scrollTop = Math.max(0, top)
    scrollTop.value = Math.max(0, top)
  }
}

function getScrollTop(): number {
  return containerRef.value?.scrollTop ?? 0
}

// Reset scroll when data changes significantly
watch(
  () => props.data.length,
  () => {
    if (containerRef.value && scrollTop.value > totalHeight.value) {
      scrollToTop()
    }
  },
)

const expose: VirtualListExpose = { scrollTo, scrollToTop, scrollToBottom, getScrollTop }
defineExpose(expose)
</script>

<template>
  <div
    ref="containerRef"
    class="ant-virtual-list"
    :style="{ height: `${props.height}px`, overflow: 'auto', position: 'relative' }"
    @scroll="handleScroll"
  >
    <div class="ant-virtual-list-holder" :style="{ height: `${totalHeight}px`, position: 'relative' }">
      <template v-for="entry in visibleItems" :key="entry.key">
        <slot
          :item="entry.item"
          :index="entry.index"
          :style="entry.style"
        />
      </template>
    </div>
  </div>
</template>
