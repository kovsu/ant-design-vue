<template>
  <a-transfer
    v-model:target-keys="targetKeys"
    :data-source="mockData"
    show-search
    :list-style="{ width: '250px', height: '300px' }"
    :operations="['to right', 'to left']"
    :render="(item: any) => `${item.title}-${item.description}`"
    @change="handleChange"
  >
    <template #footer="{ direction }">
      <a-button
        v-if="direction === 'left'"
        size="small"
        style="float: left; margin: 5px"
        @click="getMock"
      >
        left reload
      </a-button>
      <a-button
        v-else
        size="small"
        style="float: right; margin: 5px"
        @click="getMock"
      >
        right reload
      </a-button>
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
