<template>
  <div>
    <a-transfer
      v-model:target-keys="targetKeys"
      :data-source="mockData"
      :render="(item: any) => item.title"
      :disabled="disabled"
      @change="handleChange"
    />
    <a-switch
      v-model:checked="disabled"
      un-checked-children="enabled"
      checked-children="disabled"
      style="margin-top: 16px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface MockItem {
  key: string
  title: string
  description: string
}

const mockData: MockItem[] = Array.from({ length: 200 }, (_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}))

const oriTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key)

const disabled = ref(false)
const targetKeys = ref<string[]>(oriTargetKeys)

const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
  console.log('targetKeys:', nextTargetKeys)
  console.log('direction:', direction)
  console.log('moveKeys:', moveKeys)
}
</script>
