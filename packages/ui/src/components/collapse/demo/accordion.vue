<template>
  <a-collapse v-model:active-key="activeKey" accordion>
    <a-collapse-panel panel-key="1" header="This is panel header 1">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel panel-key="2" header="This is panel header 2">
      <p>{{ text }}</p>
    </a-collapse-panel>
    <a-collapse-panel panel-key="3" header="This is panel header 3">
      <p>{{ text }}</p>
    </a-collapse-panel>
  </a-collapse>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeKey = ref<(string | number)[]>([])
const text = 'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.'
</script>
