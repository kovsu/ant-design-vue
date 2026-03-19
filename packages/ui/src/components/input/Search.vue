<script setup lang="ts">
import { computed, ref } from 'vue'
import type { SearchProps, SearchEmits } from './types'
import { searchDefaultProps } from './types'
import Input from './Input.vue'

defineOptions({ name: 'AInputSearch' })
const props = withDefaults(defineProps<SearchProps>(), searchDefaultProps)
const emit = defineEmits<SearchEmits>()

const inputRef = ref<InstanceType<typeof Input> | null>(null)
const internalValue = ref(props.value ?? '')

const currentValue = computed(() =>
  props.value !== undefined ? String(props.value) : String(internalValue.value),
)

function handleUpdateValue(val: string) {
  internalValue.value = val
  emit('update:value', val)
}

function handleChange(e: Event) {
  emit('change', e)
}

function handleFocus(e: FocusEvent) {
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  emit('blur', e)
}

function handlePressEnter(e: KeyboardEvent) {
  emit('pressEnter', e)
  emit('search', currentValue.value, e)
}

function handleSearch(e: MouseEvent) {
  if (props.disabled || props.loading) return
  emit('search', currentValue.value, e)
}

const searchBtnText = computed(() => {
  if (typeof props.enterButton === 'string') return props.enterButton
  return 'Search'
})

defineExpose({
  focus: (opts?: FocusOptions) => inputRef.value?.focus(opts),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div
    class="ant-input-search"
    :class="{
      'ant-input-search-sm': size === 'small',
      'ant-input-search-lg': size === 'large',
      'ant-input-search-with-button': enterButton,
    }"
  >
    <Input
      ref="inputRef"
      :value="currentValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      :bordered="bordered"
      :status="status"
      :allow-clear="allowClear"
      @update:value="handleUpdateValue"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @press-enter="handlePressEnter"
    >
      <template v-if="enterButton" #addonAfter>
        <button
          type="button"
          class="ant-input-search-button"
          :class="{
            'ant-input-search-button-loading': loading,
          }"
          :disabled="disabled"
          @click="handleSearch"
        >
          <span v-if="loading" class="ant-input-search-loading">&#8987;</span>
          <span v-else>{{ searchBtnText }}</span>
        </button>
      </template>
      <template v-else #suffix>
        <button
          type="button"
          class="ant-input-search-icon"
          :class="{ 'ant-input-search-icon-loading': loading }"
          :disabled="disabled"
          tabindex="-1"
          aria-label="Search"
          @click="handleSearch"
        >
          <span v-if="loading">&#8987;</span>
          <span v-else>&#128269;</span>
        </button>
      </template>
    </Input>
  </div>
</template>
