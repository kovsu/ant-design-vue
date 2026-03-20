<template>
  <li class="ant-menu-item-group" role="presentation">
    <div class="ant-menu-item-group-title" role="presentation">
      <slot name="title">{{ props.title }}</slot>
    </div>
    <ul class="ant-menu-item-group-list" role="group">
      <slot />
    </ul>
  </li>
</template>

<script setup lang="ts">
import type { MenuItemGroupProps, MenuItemGroupSlots } from './types'

defineOptions({ name: 'AMenuItemGroup' })

const props = defineProps<MenuItemGroupProps>()
defineSlots<MenuItemGroupSlots>()
</script>
