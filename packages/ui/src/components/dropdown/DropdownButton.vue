<template>
  <a-space-compact class="ant-dropdown-button">
    <a-button
      :type="props.type"
      :size="props.size"
      :loading="props.loading"
      :disabled="props.disabled"
      :danger="props.danger"
      :href="props.href"
      @click="handleButtonClick"
    >
      <slot />
    </a-button>
    <Dropdown
      :trigger="props.trigger"
      :placement="props.placement"
      :disabled="props.disabled"
      :open="props.open"
      :arrow="props.arrow"
      :overlay-class-name="props.overlayClassName"
      :overlay-style="props.overlayStyle"
      :destroy-popup-on-hide="props.destroyPopupOnHide"
      :get-popup-container="props.getPopupContainer"
      :menu="props.menu"
      @update:open="onOpenChange"
      @open-change="onDropdownOpenChange"
    >
      <a-button
        :type="props.type"
        :size="props.size"
        :disabled="props.disabled"
        :danger="props.danger"
      >
        <slot name="icon">
          <EllipsisOutlined />
        </slot>
      </a-button>
      <template #overlay>
        <slot name="overlay" />
      </template>
    </Dropdown>
  </a-space-compact>
</template>

<script setup lang="ts">
import EllipsisOutlined from '@ant-design/icons-vue/EllipsisOutlined'
import Dropdown from './Dropdown.vue'
import type { DropdownButtonProps, DropdownButtonEmits, DropdownButtonSlots } from './types'
import { dropdownButtonDefaultProps } from './types'

defineOptions({ name: 'ADropdownButton' })

const props = withDefaults(defineProps<DropdownButtonProps>(), dropdownButtonDefaultProps)
const emit = defineEmits<DropdownButtonEmits>()
defineSlots<DropdownButtonSlots>()

function handleButtonClick(e: MouseEvent) {
  emit('click', e)
}

function onOpenChange(open: boolean) {
  emit('update:open', open)
}

function onDropdownOpenChange(open: boolean) {
  emit('openChange', open)
}
</script>
