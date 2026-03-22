<template>
  <div>
    <a-q-r-code :value="text" />
    <div style="margin-top: 16px">
      <a-input v-model:value="text" placeholder="Enter text" :maxlength="60" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('https://ant-design-vue.com')
</script>
