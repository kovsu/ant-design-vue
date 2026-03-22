<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from '../types'

const fileList = ref<UploadFile[]>([])

async function previewFile(file: File): Promise<string> {
  console.log('Your upload file:', file)
  // Custom preview logic - return a thumbnail URL
  // In real usage, you might generate a preview or call an API
  return URL.createObjectURL(file)
}
</script>

<template>
  <a-upload
    v-model:file-list="fileList"
    list-type="picture"
    action="https://httpbin.org/post"
    :preview-file="previewFile"
  >
    <a-button>Upload</a-button>
  </a-upload>
</template>
