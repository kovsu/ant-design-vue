<template>
  <Teleport :to="container" :disabled="!container">
    <slot />
  </Teleport>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, watch, onBeforeUnmount } from 'vue'

defineOptions({ name: 'Portal' })

const props = withDefaults(
  defineProps<{
    /** Function that returns the container element for the portal */
    getContainer?: () => HTMLElement
    /** Whether the portal content should be rendered */
    visible?: boolean
  }>(),
  {
    visible: true,
  },
)

const container = shallowRef<HTMLElement | null>(null)
let createdContainer: HTMLElement | null = null

function resolveContainer() {
  if (typeof document === 'undefined') return

  if (props.getContainer) {
    container.value = props.getContainer()
  } else {
    // Default: create a div appended to document.body
    if (!createdContainer) {
      createdContainer = document.createElement('div')
      document.body.appendChild(createdContainer)
    }
    container.value = createdContainer
  }
}

onMounted(() => {
  if (props.visible) {
    resolveContainer()
  }
})

watch(
  () => props.visible,
  (val) => {
    if (val && !container.value) {
      resolveContainer()
    }
  },
)

watch(
  () => props.getContainer,
  () => {
    resolveContainer()
  },
)

onBeforeUnmount(() => {
  if (createdContainer && createdContainer.parentNode) {
    createdContainer.parentNode.removeChild(createdContainer)
    createdContainer = null
  }
})
</script>
