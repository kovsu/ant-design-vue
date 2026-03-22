<template>
  <div>
    <div style="margin-bottom: 16px">
      <a-button @click="add">ADD</a-button>
    </div>
    <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit">
      <a-tab-pane
        v-for="pane in panes"
        :key="pane.key"
        :tab="pane.title"
        :closable="pane.closable"
      >
        {{ pane.content }}
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Pane {
  title: string
  content: string
  key: string
  closable?: boolean
}

const panes = ref<Pane[]>(
  Array.from({ length: 2 }, (_, i) => ({
    title: `Tab ${i + 1}`,
    content: `Content of Tab Pane ${i + 1}`,
    key: String(i + 1),
  })),
)
const activeKey = ref(panes.value[0].key)
const newTabIndex = ref(0)

const add = () => {
  const key = `newTab${newTabIndex.value++}`
  panes.value.push({
    title: `New Tab ${key}`,
    content: `Content of new Tab ${key}`,
    key,
  })
  activeKey.value = key
}

const remove = (targetKey: string) => {
  let lastIndex = 0
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1
    }
  })
  panes.value = panes.value.filter((pane) => pane.key !== targetKey)
  if (panes.value.length && activeKey.value === targetKey) {
    activeKey.value = lastIndex >= 0 ? panes.value[lastIndex].key : panes.value[0].key
  }
}

const onEdit = (targetKey: string | number) => {
  remove(String(targetKey))
}
</script>
