<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile, UploadChangeParam } from '../types'

const fileList = ref<UploadFile[]>([
  {
    uid: '1',
    name: 'readme.md',
    status: 'done',
    url: '#',
  },
  {
    uid: '2',
    name: 'package.json',
    status: 'done',
    url: '#',
  },
  {
    uid: '3',
    name: 'broken-file.txt',
    status: 'error',
  },
])

function handleChange(info: UploadChangeParam) {
  // Keep only the latest 5 files
  let newFileList = [...info.fileList]
  newFileList = newFileList.slice(-5)
  fileList.value = newFileList
}
</script>

<template>
  <a-upload
    action="https://httpbin.org/post"
    :file-list="fileList"
    @change="handleChange"
  >
    <button type="button" class="ant-btn">
      <span>Upload</span>
    </button>
  </a-upload>
</template>
