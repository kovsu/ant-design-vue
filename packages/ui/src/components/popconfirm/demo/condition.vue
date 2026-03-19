<template>
  <div style="display: flex; flex-direction: column; gap: 16px; padding: 40px;">
    <a-popconfirm
      title="Are you sure delete this task?"
      :open="open"
      @confirm="onConfirm"
      @cancel="onCancel"
      @open-change="onOpenChange"
    >
      <a-button danger>Delete a task (controlled)</a-button>
    </a-popconfirm>
    <a-popconfirm title="Disabled popconfirm" :disabled="true">
      <a-button>Disabled</a-button>
    </a-popconfirm>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)

function onConfirm() {
  open.value = false
  console.log('confirmed')
}

function onCancel() {
  open.value = false
  console.log('cancelled')
}

function onOpenChange(val: boolean) {
  if (!val) {
    open.value = val
    return
  }
  // Show confirm only when condition is met
  open.value = true
}
</script>
