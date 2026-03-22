<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from '../types'

const fileList = ref<UploadFile[]>([])
const uploading = ref(false)

function handleRemove(file: UploadFile) {
  const index = fileList.value.indexOf(file)
  const newFileList = fileList.value.slice()
  newFileList.splice(index, 1)
  fileList.value = newFileList
}

function beforeUpload(file: File) {
  fileList.value = [...fileList.value, file as unknown as UploadFile]
  return false
}

function handleUpload() {
  const formData = new FormData()
  fileList.value.forEach((file) => {
    formData.append('files[]', file as any)
  })
  uploading.value = true

  fetch('https://httpbin.org/post', {
    method: 'POST',
    body: formData,
  })
    .then(() => {
      fileList.value = []
      uploading.value = false
      console.log('Upload successfully.')
    })
    .catch(() => {
      uploading.value = false
      console.log('Upload failed.')
    })
}
</script>

<template>
  <div>
    <a-upload
      :file-list="fileList"
      :before-upload="beforeUpload"
      @remove="handleRemove"
    >
      <a-button>Select File</a-button>
    </a-upload>
    <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="uploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >
      {{ uploading ? 'Uploading' : 'Start Upload' }}
    </a-button>
  </div>
</template>
