<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import type { TextAreaProps, TextAreaEmits, TextAreaSlots } from './types'
import { textAreaDefaultProps } from './types'

defineOptions({ name: 'ATextarea' })
const props = withDefaults(defineProps<TextAreaProps>(), textAreaDefaultProps)
const emit = defineEmits<TextAreaEmits>()
defineSlots<TextAreaSlots>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const internalValue = ref(props.value ?? props.defaultValue ?? '')

watch(
  () => props.value,
  (v) => {
    if (v !== undefined) internalValue.value = String(v)
  },
)

const currentValue = computed(() =>
  props.value !== undefined ? String(props.value) : String(internalValue.value),
)

// AutoSize logic
const textareaStyle = ref<Record<string, string>>({})

function calcAutoSize() {
  if (!props.autoSize || !textareaRef.value) return

  const textarea = textareaRef.value
  // Reset height to get accurate scrollHeight
  textarea.style.height = 'auto'
  textarea.style.overflowY = 'hidden'

  const computed = window.getComputedStyle(textarea)
  const lineHeight = parseFloat(computed.lineHeight) || 20
  const paddingTop = parseFloat(computed.paddingTop) || 0
  const paddingBottom = parseFloat(computed.paddingBottom) || 0
  const borderTop = parseFloat(computed.borderTopWidth) || 0
  const borderBottom = parseFloat(computed.borderBottomWidth) || 0

  const innerHeight = textarea.scrollHeight
  const extras = borderTop + borderBottom

  if (typeof props.autoSize === 'object') {
    const { minRows, maxRows } = props.autoSize
    const minHeight = minRows
      ? lineHeight * minRows + paddingTop + paddingBottom + extras
      : undefined
    const maxHeight = maxRows
      ? lineHeight * maxRows + paddingTop + paddingBottom + extras
      : undefined

    let height = innerHeight + extras
    if (minHeight && height < minHeight) height = minHeight
    if (maxHeight && height > maxHeight) {
      height = maxHeight
      textarea.style.overflowY = 'auto'
    }

    textareaStyle.value = { height: `${height}px` }
  } else {
    textareaStyle.value = { height: `${innerHeight + extras}px` }
  }
}

onMounted(() => {
  if (props.autoSize) {
    nextTick(calcAutoSize)
  }
})

watch(currentValue, () => {
  if (props.autoSize) {
    nextTick(calcAutoSize)
  }
})

function handleInput(e: Event) {
  const val = (e.target as HTMLTextAreaElement).value
  internalValue.value = val
  emit('update:value', val)
  emit('input', e)
}

function handleChange(e: Event) {
  emit('change', e)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') emit('pressEnter', e)
}

function handleFocus(e: FocusEvent) {
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  emit('blur', e)
}

const countText = computed(() => {
  if (!props.showCount) return ''
  const len = currentValue.value.length
  return props.maxlength ? `${len} / ${props.maxlength}` : String(len)
})

const wrapperClasses = computed(() => ({
  'ant-input-textarea': true,
  'ant-input-textarea-show-count': props.showCount,
  'ant-input-textarea-sm': props.size === 'small',
  'ant-input-textarea-lg': props.size === 'large',
  'ant-input-textarea-borderless': !props.bordered,
  [`ant-input-textarea-status-${props.status}`]: !!props.status,
}))

defineExpose({
  focus: (opts?: FocusOptions) => textareaRef.value?.focus(opts),
  blur: () => textareaRef.value?.blur(),
  textarea: textareaRef,
})
</script>

<template>
  <span :class="wrapperClasses" :data-count="showCount ? countText : undefined">
    <textarea
      ref="textareaRef"
      class="ant-input"
      :class="{
        'ant-input-disabled': disabled,
        'ant-input-borderless': !bordered,
      }"
      :value="currentValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :maxlength="maxlength"
      :autofocus="autofocus"
      :id="id"
      :name="name"
      :style="textareaStyle"
      @input="handleInput"
      @change="handleChange"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span v-if="showCount" class="ant-input-textarea-suffix">
      <slot name="count">
        <span class="ant-input-show-count-suffix">{{ countText }}</span>
      </slot>
    </span>
  </span>
</template>
