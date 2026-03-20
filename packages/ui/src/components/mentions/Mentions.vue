<script setup lang="ts">
import { computed, ref, shallowRef, watch, nextTick, onMounted } from 'vue'
import type { Placement } from '@floating-ui/vue'
import { Trigger } from '@/_internal/trigger'
import { useConfigInject } from '@/hooks'
import type { MentionsProps, MentionsEmits, MentionsSlots, MentionOption } from './types'
import { mentionsDefaultProps } from './types'

defineOptions({ name: 'AMentions', inheritAttrs: false })

const props = withDefaults(defineProps<MentionsProps>(), mentionsDefaultProps)
const emit = defineEmits<MentionsEmits>()
defineSlots<MentionsSlots>()

const { getPopupContainer } = useConfigInject()

const triggerRef = shallowRef<InstanceType<typeof Trigger> | null>(null)
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const wrapperRef = ref<HTMLDivElement | null>(null)

// --- Internal state ---
const internalValue = ref(props.value ?? props.defaultValue ?? '')
const dropdownOpen = ref(false)
const activeIndex = ref(-1)
const searchValue = ref('')
const activePrefix = ref('')
const mentionStart = ref(-1)
const focused = ref(false)

watch(
  () => props.value,
  (v) => { if (v !== undefined) internalValue.value = v },
)

const currentValue = computed(() =>
  props.value !== undefined ? props.value : internalValue.value,
)

// --- Prefix detection ---
const prefixes = computed(() => {
  const p = props.prefix
  return Array.isArray(p) ? p : [p!]
})

function getLastMention(text: string, cursorPos: number): { prefix: string; search: string; start: number } | null {
  const beforeCursor = text.slice(0, cursorPos)

  for (const prefix of prefixes.value) {
    // Look for the last prefix that's not followed by the split char
    const lastIdx = beforeCursor.lastIndexOf(prefix)
    if (lastIdx < 0) continue

    // Prefix must be at start or preceded by whitespace/split
    if (lastIdx > 0) {
      const charBefore = beforeCursor[lastIdx - 1]
      if (charBefore !== ' ' && charBefore !== '\n' && charBefore !== props.split) continue
    }

    const afterPrefix = beforeCursor.slice(lastIdx + prefix.length)
    // Must not contain the split character
    if (props.split && afterPrefix.includes(props.split)) continue

    return {
      prefix,
      search: afterPrefix,
      start: lastIdx,
    }
  }

  return null
}

// --- Filter options ---
const filteredOptions = computed<MentionOption[]>(() => {
  const opts = props.options ?? []
  if (!searchValue.value && props.filterOption !== false) return opts
  if (props.filterOption === false) return opts

  const filterFn = typeof props.filterOption === 'function'
    ? props.filterOption
    : (input: string, option: MentionOption) => {
        const text = String(option.label ?? option.value)
        return text.toLowerCase().includes(input.toLowerCase())
      }

  return opts.filter((opt) => filterFn(searchValue.value, opt))
})

// --- Handlers ---
function handleInput(e: Event) {
  const el = e.target as HTMLTextAreaElement
  const val = el.value
  const cursorPos = el.selectionStart ?? val.length

  internalValue.value = val
  emit('update:value', val)
  emit('change', val)

  // Detect mention trigger
  const mention = getLastMention(val, cursorPos)
  if (mention) {
    activePrefix.value = mention.prefix
    searchValue.value = mention.search
    mentionStart.value = mention.start
    emit('search', mention.search, mention.prefix)

    const opts = props.options ?? []
    if (opts.length > 0 || props.filterOption === false) {
      dropdownOpen.value = true
      activeIndex.value = 0
    }
  } else {
    dropdownOpen.value = false
    searchValue.value = ''
  }
}

function handleFocus(e: FocusEvent) {
  focused.value = true
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  focused.value = false
  emit('blur', e)
  // Delay to allow option click
  setTimeout(() => {
    dropdownOpen.value = false
  }, 150)
}

function selectOption(option: MentionOption) {
  if (option.disabled) return

  const el = textareaRef.value
  if (!el) return

  const val = currentValue.value
  const prefix = activePrefix.value
  const start = mentionStart.value
  const cursorPos = el.selectionStart ?? val.length

  const mentionText = option.value
  const before = val.slice(0, start)
  const after = val.slice(cursorPos)
  const insertion = `${prefix}${mentionText}${props.split}`
  const newValue = before + insertion + after

  internalValue.value = newValue
  emit('update:value', newValue)
  emit('change', newValue)
  emit('select', option, prefix)

  dropdownOpen.value = false
  searchValue.value = ''

  // Restore cursor position
  nextTick(() => {
    const newCursorPos = start + insertion.length
    el.setSelectionRange(newCursorPos, newCursorPos)
    el.focus()
  })
}

function handleKeydown(e: KeyboardEvent) {
  if (!dropdownOpen.value) return

  const opts = filteredOptions.value
  switch (e.key) {
    case 'ArrowDown': {
      e.preventDefault()
      activeIndex.value = activeIndex.value < opts.length - 1 ? activeIndex.value + 1 : 0
      break
    }
    case 'ArrowUp': {
      e.preventDefault()
      activeIndex.value = activeIndex.value > 0 ? activeIndex.value - 1 : opts.length - 1
      break
    }
    case 'Enter': {
      e.preventDefault()
      if (activeIndex.value >= 0 && activeIndex.value < opts.length) {
        selectOption(opts[activeIndex.value])
      }
      break
    }
    case 'Escape': {
      dropdownOpen.value = false
      break
    }
  }
}

// --- Placement ---
const floatingPlacement = computed<Placement>(() =>
  props.placement === 'top' ? 'top-start' : 'bottom-start',
)

const resolvedGetContainer = computed(() => {
  if (props.getPopupContainer) {
    return () => props.getPopupContainer!(wrapperRef.value ?? document.body)
  }
  return getPopupContainer.value
})

// --- Classes ---
const wrapperClasses = computed(() => ({
  'ant-mentions': true,
  'ant-mentions-focused': focused.value,
  'ant-mentions-disabled': props.disabled,
  [`ant-mentions-status-${props.status}`]: !!props.status,
}))

onMounted(() => {
  if (props.autofocus) {
    nextTick(() => textareaRef.value?.focus())
  }
})

defineExpose({
  focus: (opts?: FocusOptions) => textareaRef.value?.focus(opts),
  blur: () => textareaRef.value?.blur(),
})
</script>

<template>
  <Trigger
    ref="triggerRef"
    :open="dropdownOpen"
    trigger="click"
    :placement="floatingPlacement"
    :arrow="false"
    :offset="4"
    :auto-adjust-overflow="true"
    :popup-class="'ant-mentions-dropdown'"
    :disabled="props.disabled"
    :get-popup-container="resolvedGetContainer"
    :transition-name="'ant-slide-up'"
    :destroy-on-hide="true"
    @update:open="(v: boolean) => { if (!v) dropdownOpen = false }"
  >
    <div ref="wrapperRef" :class="wrapperClasses" v-bind="$attrs">
      <textarea
        ref="textareaRef"
        class="ant-mentions-input"
        :value="currentValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="rows"
        :autofocus="autofocus"
        :id="id"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>

    <template #popup>
      <div class="ant-mentions-dropdown-content">
        <template v-if="filteredOptions.length > 0">
          <div
            v-for="(item, index) in filteredOptions"
            :key="item.value"
            :class="{
              'ant-mentions-dropdown-item': true,
              'ant-mentions-dropdown-item-active': index === activeIndex,
              'ant-mentions-dropdown-item-disabled': item.disabled,
            }"
            @mousedown.prevent="selectOption(item)"
            @mouseenter="activeIndex = index"
          >
            <slot name="option" :value="item.value" :label="item.label" :disabled="item.disabled">
              {{ item.label ?? item.value }}
            </slot>
          </div>
        </template>
        <div v-else class="ant-mentions-dropdown-item ant-mentions-dropdown-item-empty">
          <slot name="notFoundContent">
            {{ notFoundContent ?? 'No data' }}
          </slot>
        </div>
      </div>
    </template>
  </Trigger>
</template>
