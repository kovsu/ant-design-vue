<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
const condition = ref(true)

function onConfirm() {
  open.value = false
  console.log('Next step.')
}

function onCancel() {
  open.value = false
  console.log('Cancelled.')
}

function onOpenChange(visible: boolean) {
  if (!visible) {
    open.value = false
    return
  }
  // Determining condition before showing the popconfirm
  if (condition.value) {
    onConfirm()
  } else {
    open.value = true
  }
}
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; padding: 40px;">
    <a-popconfirm
      title="Are you sure delete this task?"
      :open="open"
      ok-text="Yes"
      cancel-text="No"
      @open-change="onOpenChange"
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <a href="#">Delete a task</a>
    </a-popconfirm>
    <div>
      Whether directly execute:
      <a-checkbox v-model:checked="condition" />
    </div>
  </div>
</template>
