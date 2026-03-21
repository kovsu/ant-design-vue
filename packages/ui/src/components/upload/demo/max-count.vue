<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from '../types'

const fileList = ref<UploadFile[]>([])
</script>

<template>
  <a-upload
    v-model:fileList="fileList"
    action="https://httpbin.org/post"
    :max-count="3"
    multiple
  >
    <button type="button" class="ant-btn">
      <span>Upload (max 3 files)</span>
    </button>
  </a-upload>
</template>
