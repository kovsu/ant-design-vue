<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from '../types'

const fileList = ref<UploadFile[]>([
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    name: 'image2.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
])
</script>

<template>
  <a-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    list-type="picture-card"
    accept="image/*"
  />
</template>
