<template>
  <div>
    <a-transfer
      v-model:target-keys="targetKeys"
      v-model:selected-keys="selectedKeys"
      :data-source="mockData"
      :one-way="true"
      :titles="['Source', 'Target']"
      :render="(item: any) => item.title"
      :disabled="disabled"
      @change="handleChange"
      @selectChange="handleSelectChange"
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
  disabled: boolean
}

const mockData: MockItem[] = Array.from({ length: 20 }, (_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
  disabled: i % 3 < 1,
}))

const disabled = ref(false)
const targetKeys = ref<string[]>([])
const selectedKeys = ref<string[]>(['1', '4'])

const handleChange = (nextTargetKeys: string[], direction: string, moveKeys: string[]) => {
  console.log('targetKeys:', nextTargetKeys)
  console.log('direction:', direction)
  console.log('moveKeys:', moveKeys)
}

const handleSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
  console.log('sourceSelectedKeys:', sourceSelectedKeys)
  console.log('targetSelectedKeys:', targetSelectedKeys)
}
</script>
