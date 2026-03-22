<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from '../types'

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
</script>

<template>
  <a-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
  >
    <a-button>Upload</a-button>
  </a-upload>
</template>
