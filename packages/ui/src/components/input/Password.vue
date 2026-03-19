<script setup lang="ts">
import { computed, ref } from 'vue'
import type { PasswordProps, PasswordEmits } from './types'
import { passwordDefaultProps } from './types'
import Input from './Input.vue'

defineOptions({ name: 'AInputPassword' })
const props = withDefaults(defineProps<PasswordProps>(), passwordDefaultProps)
const emit = defineEmits<PasswordEmits>()

const inputRef = ref<InstanceType<typeof Input> | null>(null)
const internalVisible = ref(false)

const isVisible = computed(() =>
  props.visible !== undefined ? props.visible : internalVisible.value,
)

const inputType = computed(() => (isVisible.value ? 'text' : 'password'))

function toggleVisibility() {
  const next = !isVisible.value
  internalVisible.value = next
  emit('update:visible', next)
}

function handleUpdateValue(val: string) {
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
}

defineExpose({
  focus: (opts?: FocusOptions) => inputRef.value?.focus(opts),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <div
    class="ant-input-password"
    :class="{
      'ant-input-password-sm': size === 'small',
      'ant-input-password-lg': size === 'large',
    }"
  >
    <Input
      ref="inputRef"
      :value="value"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :size="size"
      :bordered="bordered"
      :status="status"
      @update:value="handleUpdateValue"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @press-enter="handlePressEnter"
    >
      <template #suffix>
        <button
          v-if="visibilityToggle"
          type="button"
          class="ant-input-password-icon"
          :aria-label="isVisible ? 'Hide password' : 'Show password'"
          tabindex="-1"
          @click="toggleVisibility"
        >
          <span v-if="isVisible" class="ant-input-password-icon-visible">&#9673;</span>
          <span v-else class="ant-input-password-icon-hidden">&#9675;</span>
        </button>
      </template>
    </Input>
  </div>
</template>
