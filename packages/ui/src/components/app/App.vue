<script setup lang="ts">
import { provide } from 'vue'
import type { AppProps, AppSlots, AppConfig } from './types'
import { appContextKey } from './useApp'
import { message } from '../message'
import { notification } from '../notification'
import Modal from '../modal'

defineOptions({ name: 'AApp' })
const props = defineProps<AppProps>()
defineSlots<AppSlots>()

const appConfig: AppConfig = {
  message,
  notification,
  modal: {
    confirm: (config) => Modal.confirm(config),
    info: (config) => Modal.info(config),
    success: (config) => Modal.success(config),
    error: (config) => Modal.error(config),
    warning: (config) => Modal.warning(config),
  },
}

provide(appContextKey, appConfig)
</script>

<template>
  <div :class="['ant-app', props.rootClassName]">
    <slot />
  </div>
</template>
