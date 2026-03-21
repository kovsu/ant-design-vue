<script setup lang="ts">
import { ref } from 'vue'
import type { UploadFile } from '../types'

const fileList = ref<UploadFile[]>([])

function handleChange(info: any) {
  fileList.value = info.fileList
}
</script>

<template>
  <a-upload
    action="https://httpbin.org/post"
    :file-list="fileList"
    @change="handleChange"
  >
    <button type="button" class="ant-btn">
      <span>Click to Upload</span>
    </button>
  </a-upload>
</template>
