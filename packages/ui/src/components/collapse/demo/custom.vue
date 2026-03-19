<template>
  <a-collapse
    v-model:active-key="activeKey"
    :bordered="false"
    style="background: rgb(255, 255, 255);"
  >
    <template #expandIcon="{ isActive }">
      <span
        style="display: inline-block; transition: transform 0.3s;"
        :style="{ transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)' }"
      >&#9654;</span>
    </template>
    <a-collapse-panel panel-key="1" header="This is panel header 1" :style="customStyle">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel panel-key="2" header="This is panel header 2" :style="customStyle">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel panel-key="3" header="This is panel header 3" :style="customStyle">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref<(string | number)[]>(['1'])
const text = 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
const customStyle = 'background: #f7f7f7; border-radius: 4px; margin-bottom: 24px; border: 0; overflow: hidden;'
</script>
