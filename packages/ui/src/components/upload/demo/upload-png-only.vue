<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile, UploadChangeParam } from '../types'

const fileList = ref<UploadFile[]>([
  {
    uid: '1',
    name: 'xxx.png',
    status: 'done',
    url: 'http://www.baidu.com/xxx.png',
  },
  {
    uid: '2',
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  },
])

function handleChange(info: UploadChangeParam) {
  if (info.file.status !== 'uploading') {
    console.log(info.file, info.fileList)
  }
}

function beforeUpload(file: File) {
  const isPNG = file.type === 'image/png'
  if (!isPNG) {
    console.warn(`${file.name} is not a png file`)
  }
  return isPNG
}
</script>

<template>
  <a-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <a-button>Upload png only</a-button>
  </a-upload>
</template>
