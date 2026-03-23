<script setup lang="ts">
import { computed, ref, shallowRef, watch, nextTick, getCurrentInstance, onMounted, useSlots } from 'vue'
import type { Placement } from '@floating-ui/vue'
import { Trigger } from '@/_internal/trigger'
import { VirtualList } from '@/_internal/virtual-list'
import { useConfigInject } from '@/hooks'
import type { AutoCompleteProps, AutoCompleteEmits, AutoCompleteSlots, AutoCompleteOption, AutoCompletePlacement } from './types'
import { autoCompleteDefaultProps } from './types'

defineOptions({ name: 'AAutoComplete', inheritAttrs: false })

const props = withDefaults(defineProps<AutoCompleteProps>(), autoCompleteDefaultProps)
const emit = defineEmits<AutoCompleteEmits>()
defineSlots<AutoCompleteSlots>()
const slots = useSlots()

const { getPopupContainer } = useConfigInject()

const instance = getCurrentInstance()!
const triggerRef = shallowRef<InstanceType<typeof Trigger> | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const wrapperRef = ref<HTMLDivElement | null>(null)

// --- Internal state ---
const internalValue = ref(props.value ?? props.defaultValue ?? '')
const internalOpen = ref(props.defaultOpen ?? false)
const activeIndex = ref(-1)
const focused = ref(false)

const isOpenControlled = computed(() => {
  const rawProps = instance.vnode.props || {}
  return 'open' in rawProps
})

// Watch external value
watch(
  () => props.value,
  (v) => { if (v !== undefined) internalValue.value = v },
)

const currentValue = computed(() =>
  props.value !== undefined ? props.value : internalValue.value,
)

// --- Filter options ---
const filteredOptions = computed<AutoCompleteOption[]>(() => {
  const opts = props.options ?? []
  if (props.filterOption === false) return opts

  const filterFn = typeof props.filterOption === 'function'
    ? props.filterOption
    : (input: string, option: AutoCompleteOption) => {
        const text = String(option.label ?? option.value)
        return text.toLowerCase().includes(input.toLowerCase())
      }

  return opts.filter((opt) => filterFn(currentValue.value, opt))
})

// --- Open state ---
const mergedOpen = computed(() => {
  if (isOpenControlled.value) return props.open ?? false
  return internalOpen.value
})

function setOpen(open: boolean) {
  if (props.disabled) return
  internalOpen.value = open
  emit('dropdownVisibleChange', open)
  if (!open) {
    activeIndex.value = -1
  } else if (props.defaultActiveFirstOption && filteredOptions.value.length) {
    activeIndex.value = 0
  }
}

// --- Handlers ---
function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  internalValue.value = val
  emit('update:value', val)
  emit('change', val)
  emit('search', val)
  if (!mergedOpen.value && val) {
    setOpen(true)
  }
  if (!val) {
    setOpen(false)
  }
  activeIndex.value = props.defaultActiveFirstOption ? 0 : -1
}

function handleFocus(e: FocusEvent) {
  focused.value = true
  emit('focus', e)
}

function handleBlur(e: FocusEvent) {
  focused.value = false
  emit('blur', e)
}

function handleClear(e: MouseEvent) {
  e.stopPropagation()
  internalValue.value = ''
  emit('update:value', '')
  emit('change', '')
  emit('clear')
  inputRef.value?.focus()
}

function handleOptionClick(option: AutoCompleteOption) {
  if (option.disabled) return
  const val = option.value
  internalValue.value = val
  emit('update:value', val)
  emit('change', val)
  emit('select', val, option)
  setOpen(false)
}

function handleKeydown(e: KeyboardEvent) {
  const opts = filteredOptions.value.filter((o) => !o.disabled)
  if (!opts.length && e.key !== 'Escape') return

  switch (e.key) {
    case 'ArrowDown': {
      e.preventDefault()
      if (!mergedOpen.value) { setOpen(true); return }
      activeIndex.value = activeIndex.value < filteredOptions.value.length - 1
        ? findNextEnabled(activeIndex.value, 1)
        : findNextEnabled(-1, 1)
      if (props.backfill && activeIndex.value >= 0) {
        const opt = filteredOptions.value[activeIndex.value]
        internalValue.value = opt.value
        emit('update:value', opt.value)
      }
      break
    }
    case 'ArrowUp': {
      e.preventDefault()
      if (!mergedOpen.value) { setOpen(true); return }
      activeIndex.value = activeIndex.value > 0
        ? findNextEnabled(activeIndex.value, -1)
        : findNextEnabled(filteredOptions.value.length, -1)
      if (props.backfill && activeIndex.value >= 0) {
        const opt = filteredOptions.value[activeIndex.value]
        internalValue.value = opt.value
        emit('update:value', opt.value)
      }
      break
    }
    case 'Enter': {
      e.preventDefault()
      if (mergedOpen.value && activeIndex.value >= 0 && activeIndex.value < filteredOptions.value.length) {
        handleOptionClick(filteredOptions.value[activeIndex.value])
      }
      break
    }
    case 'Escape': {
      setOpen(false)
      break
    }
  }
}

function findNextEnabled(from: number, direction: 1 | -1): number {
  const opts = filteredOptions.value
  let idx = from + direction
  while (idx >= 0 && idx < opts.length) {
    if (!opts[idx].disabled) return idx
    idx += direction
  }
  return from >= 0 && from < opts.length ? from : -1
}

function handleSelectorClick() {
  if (props.disabled) return
  inputRef.value?.focus()
  if (currentValue.value && filteredOptions.value.length) {
    setOpen(true)
  }
}

function handleSelectorMousedown(e: MouseEvent) {
  if (e.target !== inputRef.value) {
    e.preventDefault()
  }
}

// --- Placement ---
const floatingPlacement = computed<Placement>(() => {
  const map: Record<AutoCompletePlacement, Placement> = {
    bottomLeft: 'bottom-start',
    bottomRight: 'bottom-end',
    topLeft: 'top-start',
    topRight: 'top-end',
  }
  return map[props.placement!] ?? 'bottom-start'
})

const resolvedGetContainer = computed(() => {
  if (props.getPopupContainer) {
    return () => props.getPopupContainer!(wrapperRef.value ?? document.body)
  }
  return getPopupContainer.value
})

const openProps = computed(() => {
  if (!isOpenControlled.value) return { open: internalOpen.value }
  return { open: props.open ?? false }
})

const showClear = computed(
  () => props.allowClear && currentValue.value && !props.disabled,
)

const wrapperClasses = computed(() => ({
  'ant-select': true,
  'ant-select-auto-complete': true,
  'ant-select-single': true,
  'ant-select-show-search': true,
  'ant-select-open': mergedOpen.value,
  'ant-select-focused': focused.value,
  'ant-select-disabled': props.disabled,
  'ant-select-allow-clear': props.allowClear,
  'ant-select-sm': props.size === 'small',
  'ant-select-lg': props.size === 'large',
  'ant-select-borderless': !props.bordered,
  [`ant-select-status-${props.status}`]: !!props.status,
}))

function isSelected(value: string) {
  return currentValue.value === value
}

onMounted(() => {
  if (props.autofocus) {
    nextTick(() => inputRef.value?.focus())
  }
})

defineExpose({
  focus: (opts?: FocusOptions) => inputRef.value?.focus(opts),
  blur: () => inputRef.value?.blur(),
})
</script>

<template>
  <Trigger
    ref="triggerRef"
    v-bind="openProps"
    trigger="click"
    :placement="floatingPlacement"
    :arrow="false"
    :offset="4"
    :auto-adjust-overflow="true"
    :popup-class="['ant-select-dropdown', popupClassName]"
    :disabled="props.disabled"
    :get-popup-container="resolvedGetContainer"
    :transition-name="'ant-slide-up'"
    :destroy-on-hide="false"
    @update:open="setOpen"
  >
    <div
      ref="wrapperRef"
      :class="wrapperClasses"
      v-bind="$attrs"
      @click="handleSelectorClick"
      @mousedown="handleSelectorMousedown"
    >
      <div class="ant-select-selector">
        <span class="ant-select-selection-search">
          <input
            ref="inputRef"
            class="ant-select-selection-search-input"
            :value="currentValue"
            :placeholder="placeholder"
            :disabled="disabled"
            autocomplete="off"
            role="combobox"
            :aria-expanded="mergedOpen"
            aria-haspopup="listbox"
            aria-autocomplete="list"
            @input="handleInput"
            @keydown="handleKeydown"
            @focus="handleFocus"
            @blur="handleBlur"
          />
        </span>
      </div>

      <span
        v-if="showClear"
        class="ant-select-clear"
        @click="handleClear"
      >
        <slot name="clearIcon">
          <span class="ant-select-clear-icon">&times;</span>
        </slot>
      </span>
    </div>

    <template #popup>
      <div class="ant-select-dropdown-content">
        <template v-if="filteredOptions.length > 0">
          <div role="listbox" class="ant-select-item-list">
            <div
              v-for="(item, index) in filteredOptions"
              :key="item.value"
              :class="{
                'ant-select-item': true,
                'ant-select-item-option': true,
                'ant-select-item-option-active': index === activeIndex,
                'ant-select-item-option-selected': isSelected(item.value),
                'ant-select-item-option-disabled': item.disabled,
              }"
              role="option"
              :aria-selected="isSelected(item.value)"
              :aria-disabled="item.disabled"
              @click="handleOptionClick(item)"
              @mouseenter="activeIndex = index"
            >
              <div class="ant-select-item-option-content">
                <slot name="option" :value="item.value" :label="item.label" :disabled="item.disabled">
                  {{ item.label ?? item.value }}
                </slot>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="ant-select-item ant-select-item-empty">
          <slot name="notFoundContent">No data</slot>
        </div>
      </div>
    </template>
  </Trigger>
</template>
