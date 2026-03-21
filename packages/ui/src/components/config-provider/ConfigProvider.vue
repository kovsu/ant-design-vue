<template>
  <slot />
</template>

<script setup lang="ts">
import { provide, computed } from 'vue'
import type { ConfigProviderProps, ConfigProviderContext } from './types'
import { configProviderDefaultProps, CONFIG_PROVIDER_KEY } from './types'
import defaultLocale from './locale/en_US'

defineOptions({ name: 'AConfigProvider' })
const props = withDefaults(defineProps<ConfigProviderProps>(), configProviderDefaultProps)

const context: ConfigProviderContext = {
  size: computed(() => props.size!),
  direction: computed(() => props.direction!),
  disabled: computed(() => props.disabled!),
  getPopupContainer: computed(() => {
    return props.getPopupContainer ?? (() => document.body)
  }),
  locale: computed(() => props.locale ?? defaultLocale),
  form: computed(() => props.form),
  renderEmpty: computed(() => props.renderEmpty),
  virtual: computed(() => props.virtual),
  autoInsertSpaceInButton: computed(() => props.autoInsertSpaceInButton),
  wave: computed(() => props.wave),
}

provide(CONFIG_PROVIDER_KEY, context)
</script>
