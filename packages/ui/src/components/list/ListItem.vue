<script setup lang="ts">
import { computed, inject, useSlots } from 'vue'
import type { ListItemProps, ListItemSlots } from './types'
import { LIST_KEY } from './types'

defineOptions({ name: 'AListItem' })
defineProps<ListItemProps>()
defineSlots<ListItemSlots>()
const slots = useSlots()

const listContext = inject(LIST_KEY, null)

const isVertical = computed(() => listContext?.itemLayout.value === 'vertical')

const hasActions = computed(() => !!slots.actions)
const hasExtra = computed(() => !!slots.extra)

const classes = computed(() => ({
  'ant-list-item': true,
  'ant-list-item-no-flex': false,
}))
</script>

<template>
  <li :class="classes">
    <template v-if="isVertical">
      <div class="ant-list-item-main">
        <div class="ant-list-item-content">
          <slot />
        </div>
        <ul v-if="hasActions" class="ant-list-item-action">
          <slot name="actions" />
        </ul>
      </div>
      <div v-if="hasExtra" class="ant-list-item-extra">
        <slot name="extra" />
      </div>
    </template>
    <template v-else>
      <div class="ant-list-item-content">
        <slot />
      </div>
      <ul v-if="hasActions" class="ant-list-item-action">
        <slot name="actions" />
      </ul>
      <div v-if="hasExtra" class="ant-list-item-extra">
        <slot name="extra" />
      </div>
    </template>
  </li>
</template>
