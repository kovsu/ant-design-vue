<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile, UploadChangeParam } from '../types'

const fileList = ref<UploadFile[]>([
  {
    uid: '-1',
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-3',
    name: 'zzz.png',
    status: 'error',
    url: 'http://www.baidu.com/zzz.png',
  },
])

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
    <template #itemRender="{ file, actions }">
      <div style="display: flex; align-items: center; gap: 8px">
        <span :style="file.status === 'error' ? 'color: red' : ''">{{ file.name }}</span>
        <a href="javascript:;" @click="actions.download">download</a>
        <a href="javascript:;" @click="actions.remove">delete</a>
      </div>
    </template>
  </a-upload>
</template>
