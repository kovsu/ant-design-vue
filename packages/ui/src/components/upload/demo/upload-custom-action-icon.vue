<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile, UploadChangeParam } from '../types'

const fileList = ref<UploadFile[]>([
  {
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    response: 'Server Error 500',
    url: 'http://www.baidu.com/xxx.png',
  },
  {
    uid: '2',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  },
  {
    uid: '3',
    name: 'zzz.png',
    status: 'error',
    response: 'Server Error 500',
    url: 'http://www.baidu.com/zzz.png',
  },
])

function handleChange(info: UploadChangeParam) {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
}
</script>

<template>
  <a-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    :show-upload-list="{ showDownloadIcon: true, showRemoveIcon: true }"
    @change="handleChange"
  >
    <a-button>Upload</a-button>
    <template #downloadIcon>download</template>
    <template #removeIcon>
      <span style="color: red; cursor: pointer">x</span>
    </template>
  </a-upload>
</template>
