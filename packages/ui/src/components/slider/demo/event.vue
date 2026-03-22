<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(30)
const value2 = ref<[number, number]>([20, 50])

const onChange = (value: number | [number, number]) => {
  console.log('onChange:', value)
}

const onAfterChange = (value: number | [number, number]) => {
  console.log('afterChange:', value)
}
</script>

<template>
  <div style="max-width: 400px">
    <a-slider v-model:value="value1" @change="onChange" @afterChange="onAfterChange" />
    <a-slider
      v-model:value="value2"
      range
      :step="10"
      @change="onChange"
      @afterChange="onAfterChange"
    />
  </div>
</template>
