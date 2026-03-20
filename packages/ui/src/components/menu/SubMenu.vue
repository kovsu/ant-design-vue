<template>
  <!-- Inline mode: expand/collapse in place -->
  <li v-if="isInlineMode" :class="classes">
    <div
      class="ant-menu-submenu-title"
      :style="titleInlineStyle"
      role="menuitem"
      :tabindex="props.disabled ? -1 : 0"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      @click="handleTitleClick"
      @keydown.enter="handleTitleClick"
    >
      <span v-if="$slots.icon" class="ant-menu-item-icon">
        <slot name="icon" />
      </span>
      <span class="ant-menu-title-content">
        <slot name="title">{{ props.title }}</slot>
      </span>
      <i class="ant-menu-submenu-arrow" />
    </div>
    <Transition name="ant-motion-collapse">
      <ul v-show="isOpen" :class="innerClasses" role="menu">
        <slot />
      </ul>
    </Transition>
  </li>

  <!-- Popup mode: vertical/horizontal -->
  <li v-else :class="classes">
    <Trigger
      :trigger="menuContext?.triggerSubMenuAction.value ?? 'hover'"
      :placement="popupPlacement"
      :mouse-enter-delay="100"
      :mouse-leave-delay="100"
      :arrow="false"
      :offset="4"
      :disabled="props.disabled"
      :popup-class="popupWrapperClasses"
      :get-popup-container="resolvedGetContainer"
      transition-name="ant-slide-up"
      @update:open="handlePopupOpenChange"
    >
      <div
        class="ant-menu-submenu-title"
        role="menuitem"
        :tabindex="props.disabled ? -1 : 0"
        :aria-expanded="isOpen"
        :aria-haspopup="true"
        @click="handleTitleClick"
      >
        <span v-if="$slots.icon" class="ant-menu-item-icon">
          <slot name="icon" />
        </span>
        <span class="ant-menu-title-content">
          <slot name="title">{{ props.title }}</slot>
        </span>
        <i class="ant-menu-submenu-arrow" />
      </div>
      <template #popup>
        <ul :class="innerClasses" role="menu">
          <slot />
        </ul>
      </template>
    </Trigger>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, provide } from 'vue'
import type { Placement } from '@floating-ui/vue'
import { Trigger } from '@/_internal/trigger'
import type { SubMenuProps, SubMenuSlots } from './types'
import { subMenuDefaultProps, menuContextKey, subMenuLevelKey } from './types'

defineOptions({ name: 'ASubMenu' })

const props = withDefaults(defineProps<SubMenuProps>(), subMenuDefaultProps)
defineSlots<SubMenuSlots>()

const menuContext = inject(menuContextKey, null)
const levelContext = inject(subMenuLevelKey, { level: 0, parentKeys: [] })

const isInlineMode = computed(() => menuContext?.mode.value === 'inline')

const isOpen = computed(() => {
  if (props.menuKey == null || !menuContext) return false
  return menuContext.openKeys.value.includes(props.menuKey)
})

const classes = computed(() => ({
  'ant-menu-submenu': true,
  'ant-menu-submenu-open': isOpen.value,
  'ant-menu-submenu-disabled': props.disabled,
  [`ant-menu-submenu-${isInlineMode.value ? 'inline' : menuContext?.mode.value ?? 'vertical'}`]: true,
}))

const innerClasses = computed(() => ({
  'ant-menu': true,
  'ant-menu-sub': true,
  [`ant-menu-${isInlineMode.value ? 'inline' : 'vertical'}`]: true,
  [`ant-menu-${menuContext?.theme.value ?? 'light'}`]: !isInlineMode.value,
}))

const titleInlineStyle = computed(() => {
  if (!menuContext || menuContext.mode.value !== 'inline') return undefined
  const indent = menuContext.inlineIndent.value
  const level = levelContext.level
  return { paddingLeft: `${indent * level}px` }
})

const popupPlacement = computed<Placement>(() => {
  if (menuContext?.mode.value === 'horizontal' && levelContext.level === 0) {
    return 'bottom-start'
  }
  return 'right-start'
})

const popupWrapperClasses = computed(() => {
  const classes: string[] = ['ant-menu-submenu-popup']
  if (props.popupClassName) classes.push(props.popupClassName)
  return classes
})

const resolvedGetContainer = computed(() => {
  if (!menuContext?.getPopupContainer?.value) return undefined
  return () => menuContext!.getPopupContainer!.value!(document.body)
})

function handleTitleClick(e: MouseEvent | KeyboardEvent) {
  if (props.disabled || props.menuKey == null) return
  if (isInlineMode.value) {
    menuContext?.onSubMenuOpenChange(props.menuKey, !isOpen.value)
  }
}

function handlePopupOpenChange(open: boolean) {
  if (props.disabled || props.menuKey == null) return
  menuContext?.onSubMenuOpenChange(props.menuKey, open)
}

// Provide nested level
provide(subMenuLevelKey, {
  level: levelContext.level + 1,
  parentKeys: [...levelContext.parentKeys, ...(props.menuKey != null ? [props.menuKey] : [])],
})
</script>
