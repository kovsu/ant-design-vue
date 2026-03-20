<template>
  <li
    :class="classes"
    :style="inlineStyle"
    role="menuitem"
    :tabindex="props.disabled ? -1 : 0"
    :aria-disabled="props.disabled || undefined"
    @click="handleClick"
    @keydown.enter="handleKeyDown"
  >
    <span v-if="$slots.icon" class="ant-menu-item-icon">
      <slot name="icon" />
    </span>
    <span class="ant-menu-title-content">
      <slot />
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import type { MenuItemProps, MenuItemSlots } from './types'
import { menuItemDefaultProps, menuContextKey, subMenuLevelKey } from './types'

defineOptions({ name: 'AMenuItem' })

const props = withDefaults(defineProps<MenuItemProps>(), menuItemDefaultProps)
defineSlots<MenuItemSlots>()

const menuContext = inject(menuContextKey, null)
const levelContext = inject(subMenuLevelKey, { level: 0, parentKeys: [] })

const isSelected = computed(() => {
  if (props.itemKey == null || !menuContext) return false
  return menuContext.selectedKeys.value.includes(props.itemKey)
})

const classes = computed(() => ({
  'ant-menu-item': true,
  'ant-menu-item-selected': isSelected.value,
  'ant-menu-item-disabled': props.disabled,
  'ant-menu-item-danger': props.danger,
}))

const inlineStyle = computed(() => {
  if (!menuContext || menuContext.mode.value !== 'inline') return undefined
  const indent = menuContext.inlineIndent.value
  const level = levelContext.level
  if (level === 0) return undefined
  return { paddingLeft: `${indent * level}px` }
})

function handleClick(e: MouseEvent) {
  if (props.disabled || !menuContext) return
  menuContext.onItemClick({
    key: props.itemKey!,
    keyPath: [...levelContext.parentKeys, props.itemKey!],
    domEvent: e,
  })
}

function handleKeyDown(e: KeyboardEvent) {
  if (props.disabled || !menuContext) return
  menuContext.onItemClick({
    key: props.itemKey!,
    keyPath: [...levelContext.parentKeys, props.itemKey!],
    domEvent: e,
  })
}
</script>
