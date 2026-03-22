<template>
  <a-transfer
    v-model:targetKeys="targetKeys"
    :data-source="mockData"
    :list-style="{ width: '300px', height: '300px' }"
    @change="handleChange"
  >
    <template #render="{ item }">
      <span style="color: red">{{ item.title }} - {{ item.description }}</span>
    </template>
  </a-transfer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface MockItem {
  key: string
  title: string
  description: string
  chosen: boolean
}

const mockData = ref<MockItem[]>([])
const targetKeys = ref<string[]>([])

const getMock = () => {
  const keys: string[] = []
  const data: MockItem[] = []
  for (let i = 0; i < 20; i++) {
    const item: MockItem = {
      key: i.toString(),
      title: `content${i + 1}`,
      description: `description of content${i + 1}`,
      chosen: Math.random() * 2 > 1,
    }
    if (item.chosen) {
      keys.push(item.key)
    }
    data.push(item)
  }
  mockData.value = data
  targetKeys.value = keys
}

onMounted(() => {
  getMock()
})

const handleChange = (keys: string[], direction: string, moveKeys: string[]) => {
  console.log(keys, direction, moveKeys)
}
</script>
