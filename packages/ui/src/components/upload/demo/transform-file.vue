<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from '../types'

const fileList = ref<UploadFile[]>([])

function beforeUpload(file: File): Promise<Blob> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = document.createElement('img')
      img.src = reader.result as string
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0)
        ctx.fillStyle = 'red'
        ctx.textBaseline = 'middle'
        ctx.font = '33px Arial'
        ctx.fillText('Ant Design Vue', 20, 20)
        canvas.toBlob((blob) => resolve(blob!))
      }
    }
  })
}
</script>

<template>
  <a-upload
    v-model:file-list="fileList"
    action="https://httpbin.org/post"
    :before-upload="beforeUpload"
  >
    <a-button>Upload</a-button>
  </a-upload>
</template>
