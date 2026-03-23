<script setup lang="ts">
import { computed, ref, useSlots, watch } from 'vue'
import type { InputProps, InputEmits, InputSlots } from './types'
import { inputDefaultProps } from './types'

defineOptions({ name: 'AInput' })
const props = withDefaults(defineProps<InputProps>(), inputDefaultProps)
const emit = defineEmits<InputEmits>()
defineSlots<InputSlots>()
const slots = useSlots()

const inputRef = ref<HTMLInputElement | null>(null)
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

function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
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

function handleClear() {
  internalValue.value = ''
  emit('update:value', '')
  emit('clear')
  inputRef.value?.focus()
}

const hasAddon = computed(() => !!slots.addonBefore || !!slots.addonAfter)
const hasPrefix = computed(() => !!slots.prefix || !!props.prefix)
const hasSuffix = computed(
  () => !!slots.suffix || !!props.suffix || props.allowClear || props.showCount,
)
const showClearIcon = computed(
  () => props.allowClear && currentValue.value && !props.disabled && !props.readonly,
)

const inputClasses = computed(() => ({
  'ant-input': !hasAddon.value && !hasPrefix.value && !hasSuffix.value,
  'ant-input-sm': props.size === 'small',
  'ant-input-lg': props.size === 'large',
  'ant-input-disabled': props.disabled,
  'ant-input-borderless': !props.bordered,
  [`ant-input-status-${props.status}`]: !!props.status,
}))

const wrapperClasses = computed(() => ({
  'ant-input-affix-wrapper': true,
  'ant-input-affix-wrapper-sm': props.size === 'small',
  'ant-input-affix-wrapper-lg': props.size === 'large',
  'ant-input-affix-wrapper-disabled': props.disabled,
  'ant-input-affix-wrapper-borderless': !props.bordered,
  [`ant-input-affix-wrapper-status-${props.status}`]: !!props.status,
}))

const countText = computed(() => {
  if (!props.showCount) return ''
  const len = currentValue.value.length
  return props.maxlength ? `${len} / ${props.maxlength}` : String(len)
})

defineExpose({
  focus: (opts?: FocusOptions) => inputRef.value?.focus(opts),
  blur: () => inputRef.value?.blur(),
  input: inputRef,
})
</script>

<template>
  <!-- With addon wrapper -->
  <span
    v-if="hasAddon"
    class="ant-input-group-wrapper"
    :class="{ [`ant-input-group-wrapper-${size}`]: size }"
  >
    <span class="ant-input-wrapper ant-input-group">
      <span v-if="$slots.addonBefore" class="ant-input-group-addon">
        <slot name="addonBefore" />
      </span>
      <!-- affix wrapper inside addon -->
      <span v-if="hasPrefix || hasSuffix" :class="wrapperClasses">
        <span v-if="hasPrefix" class="ant-input-prefix">
          <slot name="prefix">{{ props.prefix }}</slot>
        </span>
        <input
          :id="id"
          ref="inputRef"
          class="ant-input"
          :type="type"
          :value="currentValue"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :maxlength="maxlength"
          :autofocus="autofocus"
          :name="name"
          @input="handleInput"
          @change="handleChange"
          @keydown="handleKeydown"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <span class="ant-input-suffix">
          <button
            v-if="showClearIcon"
            type="button"
            class="ant-input-clear-icon"
            aria-label="Clear input"
            @click="handleClear"
          >
            <slot name="clearIcon">
              <span class="ant-input-clear-icon-inner">&times;</span>
            </slot>
          </button>
          <span v-if="showCount" class="ant-input-show-count-suffix">{{ countText }}</span>
          <slot name="suffix">{{ props.suffix }}</slot>
        </span>
      </span>
      <!-- plain input inside addon -->
      <input
        v-else
        :id="id"
        ref="inputRef"
        :class="inputClasses"
        :type="type"
        :value="currentValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        :autofocus="autofocus"
        :name="name"
        @input="handleInput"
        @change="handleChange"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <span v-if="$slots.addonAfter" class="ant-input-group-addon">
        <slot name="addonAfter" />
      </span>
    </span>
  </span>

  <!-- With prefix/suffix but no addon -->
  <span v-else-if="hasPrefix || hasSuffix" :class="wrapperClasses">
    <span v-if="hasPrefix" class="ant-input-prefix">
      <slot name="prefix" />
    </span>
    <input
      :id="id"
      ref="inputRef"
      class="ant-input"
      :type="type"
      :value="currentValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :autofocus="autofocus"
      :name="name"
      @input="handleInput"
      @change="handleChange"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span class="ant-input-suffix">
      <button
        v-if="showClearIcon"
        type="button"
        class="ant-input-clear-icon"
        aria-label="Clear input"
        @click="handleClear"
      >
        <slot name="clearIcon">
          <span class="ant-input-clear-icon-inner">&times;</span>
        </slot>
      </button>
      <span v-if="showCount" class="ant-input-show-count-suffix">{{ countText }}</span>
      <slot name="suffix" />
    </span>
  </span>

  <!-- Plain input -->
  <input
    v-else
    :id="id"
    ref="inputRef"
    :class="inputClasses"
    :type="type"
    :value="currentValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :maxlength="maxlength"
    :autofocus="autofocus"
    :name="name"
    @input="handleInput"
    @change="handleChange"
    @keydown="handleKeydown"
    @focus="handleFocus"
    @blur="handleBlur"
  />
</template>
