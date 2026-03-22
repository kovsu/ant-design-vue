<script setup lang="ts">
function onConfirm() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000)
  })
}

function onCancel() {
  console.log('Clicked cancel')
}
</script>

<template>
  <div style="padding: 40px;">
    <a-popconfirm title="Title" @confirm="onConfirm" @cancel="onCancel">
      <a-button variant="solid">Open Popconfirm with Promise</a-button>
    </a-popconfirm>
  </div>
</template>
