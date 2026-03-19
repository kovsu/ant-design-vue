<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import type { LayoutProps, SiderHookProvider } from './types'
import { siderHookProviderKey } from './types'

defineOptions({ name: 'ALayout' })
const props = defineProps<LayoutProps>()

const siders = ref<string[]>([])

const siderHook: SiderHookProvider = {
  addSider: (id: string) => {
    siders.value = [...siders.value, id]
  },
  removeSider: (id: string) => {
    siders.value = siders.value.filter(s => s !== id)
  },
}

provide(siderHookProviderKey, siderHook)

const hasSider = computed(() => {
  if (typeof props.hasSider === 'boolean') return props.hasSider
  return siders.value.length > 0
})

const classes = computed(() => ({
  'ant-layout': true,
  'ant-layout-has-sider': hasSider.value,
}))
</script>

<template>
  <section :class="classes">
    <slot />
  </section>
</template>
