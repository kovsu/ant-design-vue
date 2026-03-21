<script setup lang="ts">
import { ref, watch } from 'vue'
import SearchOutlined from '@ant-design/icons-vue/SearchOutlined'
import CloseCircleFilled from '@ant-design/icons-vue/CloseCircleFilled'

defineOptions({ name: 'ATransferSearch' })

const props = defineProps<{
  value?: string
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const internalValue = ref(props.value ?? '')

watch(
  () => props.value,
  (v) => {
    if (v !== undefined) internalValue.value = v
  },
)

function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  internalValue.value = val
  emit('change', val)
}

function handleClear() {
  internalValue.value = ''
  emit('change', '')
  inputRef.value?.focus()
}
</script>

<template>
  <div class="ant-transfer-list-search">
    <span class="ant-transfer-list-search-icon">
      <SearchOutlined />
    </span>
    <input
      ref="inputRef"
      class="ant-transfer-list-search-input"
      type="text"
      :value="internalValue"
      :placeholder="placeholder || 'Search here'"
      :disabled="disabled"
      @input="handleInput"
    />
    <button
      v-if="internalValue"
      type="button"
      class="ant-transfer-list-search-clear"
      aria-label="Clear search"
      :disabled="disabled"
      @click="handleClear"
    >
      <CloseCircleFilled />
    </button>
  </div>
</template>
