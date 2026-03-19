<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import type { CollapsePanelProps, CollapsePanelSlots } from './types'
import { collapsePanelDefaultProps, collapseContextKey } from './types'

defineOptions({ name: 'ACollapsePanel' })
const props = withDefaults(defineProps<CollapsePanelProps>(), collapsePanelDefaultProps)
defineSlots<CollapsePanelSlots>()
const slots = useSlots()

const context = inject(collapseContextKey, null)

const isActive = computed(() => {
  if (!context || props.panelKey == null) return false
  return context.activeKeys.value.includes(props.panelKey)
})

const resolvedCollapsible = computed(() => {
  return props.collapsible ?? context?.collapsible.value
})

const isDisabled = computed(() => resolvedCollapsible.value === 'disabled')

const expandIconPosition = computed(() => context?.expandIconPosition.value ?? 'start')

const showArrowComputed = computed(() => props.showArrow && resolvedCollapsible.value !== 'icon')

const shouldRender = computed(() => {
  if (props.forceRender) return true
  if (context?.destroyInactivePanel.value) return isActive.value
  return true
})

const itemClasses = computed(() => ({
  'ant-collapse-item': true,
  'ant-collapse-item-active': isActive.value,
  'ant-collapse-item-disabled': isDisabled.value,
  'ant-collapse-no-arrow': !props.showArrow,
}))

function handleToggle() {
  if (isDisabled.value || props.panelKey == null) return
  context?.togglePanel(props.panelKey)
}

function handleHeaderClick() {
  if (resolvedCollapsible.value === 'icon') return
  handleToggle()
}

function handleArrowClick(event: MouseEvent) {
  event.stopPropagation()
  handleToggle()
}

function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    if (resolvedCollapsible.value === 'icon') {
      handleToggle()
    } else {
      handleHeaderClick()
    }
  }
}
</script>

<template>
  <div :class="itemClasses">
    <div
      class="ant-collapse-header"
      role="tab"
      :aria-expanded="isActive"
      :tabindex="isDisabled ? -1 : 0"
      @click="handleHeaderClick"
      @keydown="handleKeyDown"
    >
      <span
        v-if="showArrowComputed && expandIconPosition === 'start'"
        class="ant-collapse-arrow"
        :class="{ 'ant-collapse-arrow-active': isActive }"
        aria-hidden="true"
        @click="handleArrowClick"
      >
        <slot name="expandIcon" :is-active="isActive">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
          </svg>
        </slot>
      </span>
      <span class="ant-collapse-header-text">
        <slot name="header">{{ header }}</slot>
      </span>
      <div v-if="$slots.extra || extra" class="ant-collapse-extra">
        <slot name="extra">{{ extra }}</slot>
      </div>
      <span
        v-if="showArrowComputed && expandIconPosition === 'end'"
        class="ant-collapse-arrow"
        :class="{ 'ant-collapse-arrow-active': isActive }"
        aria-hidden="true"
        @click="handleArrowClick"
      >
        <slot name="expandIcon" :is-active="isActive">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" />
          </svg>
        </slot>
      </span>
    </div>
    <div
      v-if="shouldRender"
      v-show="isActive"
      class="ant-collapse-content"
      :class="{ 'ant-collapse-content-active': isActive }"
      role="tabpanel"
    >
      <div class="ant-collapse-content-box">
        <slot />
      </div>
    </div>
  </div>
</template>
