<template>
  <div :class="linkClasses">
    <a
      :class="['ant-anchor-link-title', { 'ant-anchor-link-title-active': isActive }]"
      :href="props.href"
      :target="props.target"
      :title="props.title"
      @click="onClick"
    >
      <slot name="title">{{ props.title }}</slot>
    </a>
    <!-- Nested links -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onBeforeUnmount } from 'vue'
import type { AnchorLinkProps, AnchorLinkSlots, AnchorContext } from './types'
import { ANCHOR_KEY } from './types'

defineOptions({ name: 'AAnchorLink' })

const props = defineProps<AnchorLinkProps>()
defineSlots<AnchorLinkSlots>()

const anchorContext = inject(ANCHOR_KEY, null)

const isActive = computed(() => anchorContext?.activeLink.value === props.href)

const linkClasses = computed(() => [
  'ant-anchor-link',
  { 'ant-anchor-link-active': isActive.value },
])

onMounted(() => {
  anchorContext?.registerLink(props.href)
})

onBeforeUnmount(() => {
  anchorContext?.unregisterLink(props.href)
})

function onClick(e: MouseEvent) {
  anchorContext?.handleClick(e, {
    title: props.title ?? '',
    href: props.href,
  })
}
</script>
