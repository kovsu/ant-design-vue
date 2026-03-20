<template>
  <template v-for="item in items" :key="getItemKey(item)">
    <Divider v-if="isDividerItem(item)" :dashed="item.dashed" />
    <ItemGroup v-else-if="isGroupItem(item)">
      <template #title>{{ item.label }}</template>
      <MenuItems v-if="item.children" :items="item.children" />
    </ItemGroup>
    <SubMenu
      v-else-if="isSubMenuItem(item)"
      :menu-key="item.key"
      :title="typeof item.label === 'string' ? item.label : undefined"
      :disabled="item.disabled"
      :popup-class-name="item.popupClassName"
      :popup-offset="item.popupOffset"
    >
      <MenuItems v-if="item.children" :items="item.children" />
    </SubMenu>
    <MenuItem
      v-else
      :item-key="(item as MenuItemDataType).key"
      :disabled="(item as MenuItemDataType).disabled"
      :danger="(item as MenuItemDataType).danger"
      :title="(item as MenuItemDataType).title"
    >
      {{ (item as MenuItemDataType).label }}
    </MenuItem>
  </template>
</template>

<script setup lang="ts">
import type { ItemType, MenuItemDataType } from './types'
import { isDividerItem, isGroupItem, isSubMenuItem } from './types'
import MenuItem from './MenuItem.vue'
import SubMenu from './SubMenu.vue'
import ItemGroup from './ItemGroup.vue'
import Divider from './Divider.vue'

defineOptions({ name: 'MenuItems' })

defineProps<{ items: ItemType[] }>()

let autoKey = 0
function getItemKey(item: ItemType): string | number {
  if ('key' in item && item.key != null) return item.key
  return `__auto_${autoKey++}`
}
</script>
