<template>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center;">
    <template v-for="tag in tags" :key="tag">
      <a-tooltip v-if="tag.length > 20" :title="tag">
        <a-tag closable @close="handleClose(tag)">
          {{ `${tag.slice(0, 20)}...` }}
        </a-tag>
      </a-tooltip>
      <a-tag v-else closable @close="handleClose(tag)">
        {{ tag }}
      </a-tag>
    </template>

    <a-input
      v-if="inputVisible"
      ref="inputRef"
      v-model:value="inputValue"
      type="text"
      size="small"
      style="width: 78px;"
      @blur="handleInputConfirm"
      @keyup.enter="handleInputConfirm"
    />
    <a-tag v-else style="border-style: dashed; cursor: pointer;" @click="showInput">
      + New Tag
    </a-tag>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

const tags = ref(['Unremovable', 'Tag 2', 'Tag 3'])
const inputVisible = ref(false)
const inputValue = ref('')
const inputRef = ref<{ focus: () => void } | null>(null)

function handleClose(removedTag: string) {
  tags.value = tags.value.filter(tag => tag !== removedTag)
}

function showInput() {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value?.focus()
  })
}

function handleInputConfirm() {
  const value = inputValue.value.trim()
  if (value && !tags.value.includes(value)) {
    tags.value = [...tags.value, value]
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
