<template>
  <ul :class="classes" role="menu">
    <template v-if="props.items?.length">
      <MenuItems :items="props.items" />
    </template>
    <slot v-else />
  </ul>
</template>

<script setup lang="ts">
import { computed, provide, ref, toRef, getCurrentInstance } from 'vue'
import type { MenuProps, MenuEmits, MenuSlots, MenuKey, MenuItemInfo, MenuContextType } from './types'
import { menuDefaultProps, menuContextKey, subMenuLevelKey } from './types'
import MenuItems from './MenuItems.vue'

defineOptions({ name: 'AMenu' })

const props = withDefaults(defineProps<MenuProps>(), menuDefaultProps)
const emit = defineEmits<MenuEmits>()
defineSlots<MenuSlots>()

const instance = getCurrentInstance()!

// --- Selected keys (controlled / uncontrolled) ---
const isSelectedControlled = computed(() => 'selectedKeys' in (instance.vnode.props || {}))
const internalSelectedKeys = ref<MenuKey[]>(props.defaultSelectedKeys ?? [])
const mergedSelectedKeys = computed(() =>
  isSelectedControlled.value ? (props.selectedKeys ?? []) : internalSelectedKeys.value,
)

// --- Open keys (controlled / uncontrolled) ---
const isOpenControlled = computed(() => 'openKeys' in (instance.vnode.props || {}))
const internalOpenKeys = ref<MenuKey[]>(props.defaultOpenKeys ?? [])
const mergedOpenKeys = computed(() =>
  isOpenControlled.value ? (props.openKeys ?? []) : internalOpenKeys.value,
)

// --- Mode: inline-collapsed forces vertical ---
const realMode = computed(() => {
  if (props.inlineCollapsed && props.mode === 'inline') return 'vertical'
  return props.mode!
})

// --- Item click handler ---
function onItemClick(info: MenuItemInfo) {
  emit('click', info)

  if (!props.selectable) return

  const key = info.key
  let newKeys: MenuKey[]

  if (props.multiple) {
    const idx = mergedSelectedKeys.value.indexOf(key)
    newKeys = [...mergedSelectedKeys.value]
    if (idx > -1) {
      newKeys.splice(idx, 1)
      emit('deselect', info)
    } else {
      newKeys.push(key)
      emit('select', info)
    }
  } else {
    newKeys = [key]
    emit('select', info)
  }

  if (!isSelectedControlled.value) {
    internalSelectedKeys.value = newKeys
  }
  emit('update:selectedKeys', newKeys)
}

// --- SubMenu open change ---
function onSubMenuOpenChange(key: MenuKey, open: boolean) {
  let newKeys: MenuKey[]
  if (open) {
    newKeys = [...mergedOpenKeys.value, key]
  } else {
    newKeys = mergedOpenKeys.value.filter(k => k !== key)
  }

  if (!isOpenControlled.value) {
    internalOpenKeys.value = newKeys
  }
  emit('update:openKeys', newKeys)
  emit('openChange', newKeys)
}

// --- Provide context ---
provide(menuContextKey, {
  mode: realMode,
  theme: toRef(props, 'theme'),
  selectedKeys: mergedSelectedKeys,
  openKeys: mergedOpenKeys,
  inlineCollapsed: toRef(props, 'inlineCollapsed'),
  inlineIndent: toRef(props, 'inlineIndent'),
  triggerSubMenuAction: toRef(props, 'triggerSubMenuAction'),
  getPopupContainer: toRef(props, 'getPopupContainer'),
  isDropdownMenu: false,
  onItemClick,
  onSubMenuOpenChange,
} as MenuContextType)

provide(subMenuLevelKey, {
  level: 0,
  parentKeys: [],
})

// --- Root classes ---
const classes = computed(() => ({
  'ant-menu': true,
  'ant-menu-root': true,
  [`ant-menu-${realMode.value}`]: true,
  [`ant-menu-${props.theme}`]: true,
  'ant-menu-inline-collapsed': props.inlineCollapsed,
}))
</script>
