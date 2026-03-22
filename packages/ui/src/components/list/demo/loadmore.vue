<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface ListItem {
  loading?: boolean
  name: string
  description: string
}

const count = 3

function generateItems(start: number): ListItem[] {
  return Array.from({ length: count }, (_, i) => ({
    name: `User ${start + i + 1}`,
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  }))
}

const initLoading = ref(true)
const loading = ref(false)
const data = ref<ListItem[]>([])
const list = ref<ListItem[]>([])

onMounted(() => {
  // Simulate initial data fetch
  setTimeout(() => {
    const items = generateItems(0)
    data.value = items
    list.value = items
    initLoading.value = false
  }, 500)
})

function onLoadMore() {
  loading.value = true
  // Show skeleton placeholders
  list.value = data.value.concat(
    Array.from({ length: count }, () => ({ loading: true, name: '', description: '' })),
  )

  // Simulate loading more data
  setTimeout(() => {
    const newItems = generateItems(data.value.length)
    const newData = data.value.concat(newItems)
    data.value = newData
    list.value = newData
    loading.value = false
    nextTick(() => {
      window.dispatchEvent(new Event('resize'))
    })
  }, 1000)
}
</script>

<template>
  <a-list
    :loading="initLoading"
    item-layout="horizontal"
    :data-source="list"
    style="min-height: 350px;"
  >
    <template #loadMore>
      <div
        v-if="!initLoading && !loading"
        style="text-align: center; margin-top: 12px; height: 32px; line-height: 32px;"
      >
        <a-button @click="onLoadMore">Load more</a-button>
      </div>
    </template>
    <template #renderItem="{ item }">
      <a-list-item>
        <template #actions>
          <a>edit</a>
          <a>more</a>
        </template>
        <a-list-item-meta :description="item.description">
          <template #title>
            <a href="https://www.antdv.com/">{{ item.name }}</a>
          </template>
        </a-list-item-meta>
        <div>content</div>
      </a-list-item>
    </template>
  </a-list>
</template>
