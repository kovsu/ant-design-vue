<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref(3)
const value2 = ref(3)
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div>
      <span>allowClear: true (default) — click same star to clear</span>
      <br />
      <a-rate v-model:value="value1" />
    </div>
    <div>
      <span>allowClear: false</span>
      <br />
      <a-rate v-model:value="value2" :allow-clear="false" />
    </div>
  </div>
</template>
