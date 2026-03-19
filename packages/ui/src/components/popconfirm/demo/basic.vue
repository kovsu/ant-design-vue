<template>
  <div style="padding: 40px;">
    <a-popconfirm
      title="Are you sure delete this task?"
      description="This action cannot be undone."
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <a href="#">Delete</a>
    </a-popconfirm>
  </div>
</template>

<script setup lang="ts">
function onConfirm() {
  console.log('confirmed')
}
function onCancel() {
  console.log('cancelled')
}
</script>
