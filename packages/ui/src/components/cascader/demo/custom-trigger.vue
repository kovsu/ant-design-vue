<template>
  <div>
    <h4>Custom Trigger</h4>
    <span>{{ text }}</span>
    &nbsp;
    <a-cascader
      v-model:value="value"
      :options="options"
      placeholder="Please select"
      @change="onChange"
    >
      <a href="#" @click.prevent>Change city</a>
    </a-cascader>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref<(string | number)[]>([])
const text = ref('Unselected')

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          { value: 'zhonghuamen', label: 'Zhong Hua Men' },
        ],
      },
    ],
  },
]

const onChange = (_value: any, selectedOptions: any[]) => {
  text.value = selectedOptions.map(o => o.label).join(', ')
}
</script>
