<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile, UploadChangeParam } from '../types'

const fileList = ref<UploadFile[]>([])
const headers = { authorization: 'authorization-text' }

function handleChange(info: UploadChangeParam) {
  if (info.file.status === 'done') {
    console.log(`${info.file.name} file uploaded successfully`)
  } else if (info.file.status === 'error') {
    console.log(`${info.file.name} file upload failed.`)
  }
}
</script>

<template>
  <a-upload
    v-model:file-list="fileList"
    name="file"
    action="https://httpbin.org/post"
    :headers="headers"
    @change="handleChange"
  >
    <a-button>Click to Upload</a-button>
  </a-upload>
</template>
