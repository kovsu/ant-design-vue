<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from '../types'

const fileList = ref<UploadFile[]>([])
</script>

<template>
  <a-upload
    v-model:fileList="fileList"
    action="https://httpbin.org/post"
    drag
    multiple
  >
    <p class="ant-upload-drag-icon">
      <span style="font-size: 48px; color: #1677ff;">&#128229;</span>
    </p>
    <p class="ant-upload-text">Click or drag file to this area to upload</p>
    <p class="ant-upload-hint">Support for a single or bulk upload.</p>
  </a-upload>
</template>
