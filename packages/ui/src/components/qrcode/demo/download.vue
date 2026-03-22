<template>
  <div>
    <a-q-r-code ref="qrcodeRef" value="https://ant-design-vue.com" />
    <div style="margin-top: 16px">
      <a-button variant="solid" @click="download">Download</a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const qrcodeRef = ref()

const download = async () => {
  const url = await qrcodeRef.value?.toDataURL()
  if (!url) return
  const a = document.createElement('a')
  a.download = 'QRCode.png'
  a.href = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
</script>
