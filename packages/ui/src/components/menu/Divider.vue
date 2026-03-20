<template>
  <li role="separator" :class="classes" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MenuDividerProps } from './types'

defineOptions({ name: 'AMenuDivider' })

const props = withDefaults(defineProps<MenuDividerProps>(), {
  dashed: false,
})

const classes = computed(() => ({
  'ant-menu-item-divider': true,
  'ant-menu-item-divider-dashed': props.dashed,
}))
</script>
