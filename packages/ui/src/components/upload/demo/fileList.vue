<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile, UploadChangeParam } from '../types'

const fileList = ref<UploadFile[]>([
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'http://www.baidu.com/xxx.png',
  },
])

function handleChange(info: UploadChangeParam) {
  let resFileList = [...info.fileList]

  // 1. Limit the number of uploaded files
  // Only show two recent uploaded files, old ones will be replaced
  resFileList = resFileList.slice(-2)

  // 2. Read from response and show file link
  resFileList = resFileList.map(file => {
    if (file.response) {
      file.url = file.response.url
    }
    return file
  })

  fileList.value = resFileList
}
</script>

<template>
  <a-upload
    action="https://httpbin.org/post"
    :multiple="true"
    :file-list="fileList"
    @change="handleChange"
  >
    <a-button>Upload</a-button>
  </a-upload>
</template>
