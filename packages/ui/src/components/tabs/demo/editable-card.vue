<template>
  <a-tabs v-model:activeKey="activeKey" type="editable-card" @edit="onEdit">
    <a-tab-pane
      v-for="pane in panes"
      :key="pane.key"
      :tab="pane.title"
      :closable="pane.closable"
    >
      {{ pane.content }}
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Pane {
  title: string
  content: string
  key: string
  closable?: boolean
}

const panes = ref<Pane[]>([
  { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
  { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
  { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
])

const activeKey = ref(panes.value[0].key)
const newTabIndex = ref(0)

const add = () => {
  const key = `newTab${++newTabIndex.value}`
  panes.value.push({ title: 'New Tab', content: 'Content of new Tab', key })
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

const onEdit = (targetKey: string | number | MouseEvent, action: string) => {
  if (action === 'add') {
    add()
  } else {
    remove(targetKey as string)
  }
}
</script>
