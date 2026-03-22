<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile, UploadChangeParam } from '../types'

function getBase64(img: Blob, callback: (base64Url: string) => void) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

const fileList = ref<UploadFile[]>([])
const loading = ref(false)
const imageUrl = ref('')

function handleChange(info: UploadChangeParam) {
  if (info.file.status === 'uploading') {
    loading.value = true
    return
  }
  if (info.file.status === 'done') {
    getBase64(info.file.originFileObj!, (base64Url: string) => {
      imageUrl.value = base64Url
      loading.value = false
    })
  }
  if (info.file.status === 'error') {
    loading.value = false
  }
}

function beforeUpload(file: File) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    console.warn('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    console.warn('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
</script>

<template>
  <a-upload
    v-model:file-list="fileList"
    name="avatar"
    list-type="picture-card"
    :show-upload-list="false"
    action="https://httpbin.org/post"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width: 100%" />
    <div v-else>
      <span v-if="loading">Loading...</span>
      <span v-else>+ Upload</span>
    </div>
  </a-upload>
</template>
