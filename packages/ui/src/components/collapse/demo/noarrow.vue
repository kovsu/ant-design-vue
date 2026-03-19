<template>
  <a-collapse v-model:active-key="activeKey">
    <a-collapse-panel panel-key="1" header="This is panel header with arrow icon">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel panel-key="2" header="This is panel header with no arrow icon" :show-arrow="false">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref<(string | number)[]>(['1'])
const text = 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
</script>
