<template>
  <Portal :visible="shouldRender" :get-container="props.getContainer">
    <!-- Mask -->
    <Transition name="ant-fade">
      <div
        v-if="props.mask && shouldRender"
        v-show="mergedOpen"
        class="ant-drawer-mask"
        :style="maskStyle"
        @click="onMaskClick"
      />
    </Transition>

    <!-- Drawer -->
    <Transition :name="transitionName" @after-enter="onAfterOpen" @after-leave="onAfterClose">
      <div
        v-if="shouldRender"
        v-show="mergedOpen"
        ref="drawerRef"
        :class="drawerClasses"
        :style="drawerStyle"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
        @keydown="onKeydown"
      >
        <!-- Header -->
        <div v-if="hasHeader" class="ant-drawer-header" :style="props.headerStyle">
          <div class="ant-drawer-header-title">
            <button
              v-if="props.closable"
              type="button"
              class="ant-drawer-close"
              aria-label="Close"
              @click="onClose"
            >
              <slot name="closeIcon">
                <CloseOutlined />
              </slot>
            </button>
            <div v-if="hasTitle" :id="titleId" class="ant-drawer-title">
              <slot name="title">{{ props.title }}</slot>
            </div>
          </div>
          <div v-if="hasExtra" class="ant-drawer-extra">
            <slot name="extra">{{ props.extra }}</slot>
          </div>
        </div>

        <!-- Body -->
        <div class="ant-drawer-body" :style="props.bodyStyle">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="ant-drawer-footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Portal>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue'
import { CloseOutlined } from '@ant-design/icons-vue'
import { Portal } from '@/_internal/portal'
import type { DrawerProps, DrawerEmits, DrawerSlots } from './types'
import { drawerDefaultProps } from './types'

defineOptions({ name: 'ADrawer' })

const props = withDefaults(defineProps<DrawerProps>(), drawerDefaultProps)
const emit = defineEmits<DrawerEmits>()
defineSlots<DrawerSlots>()
const slots = useSlots()

const drawerRef = ref<HTMLElement | null>(null)

let _uid = 0
const titleId = `ant-drawer-title-${++_uid}`

// --- Open state ---
const instance = getCurrentInstance()!
const isControlled = computed(() => {
  const rawProps = instance.vnode.props || {}
  return 'open' in rawProps || 'visible' in rawProps
})
const internalOpen = ref(false)
const mergedOpen = computed(() => {
  if (isControlled.value) {
    return props.open ?? props.visible ?? false
  }
  return internalOpen.value
})

const hasBeenOpened = ref(mergedOpen.value)
const shouldRender = computed(() => {
  if (props.destroyOnClose) return mergedOpen.value
  return hasBeenOpened.value
})

watch(mergedOpen, (val) => {
  if (val) hasBeenOpened.value = true
})

// --- Focus management ---
let previousActiveElement: HTMLElement | null = null

watch(mergedOpen, (val) => {
  if (val) {
    nextTick(() => {
      previousActiveElement = document.activeElement as HTMLElement
      drawerRef.value?.focus()
    })
  } else {
    nextTick(() => {
      previousActiveElement?.focus()
      previousActiveElement = null
    })
  }
})

// --- Lock body scroll ---
watch(mergedOpen, (val) => {
  if (typeof document === 'undefined') return
  if (val) {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }
  } else {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  }
})

// --- Computed ---
const hasTitle = computed(() => !!(props.title || slots.title))
const hasExtra = computed(() => !!(props.extra || slots.extra))
const hasHeader = computed(() => hasTitle.value || hasExtra.value || props.closable)

const sizeWidthMap = { default: 378, large: 736 }
const sizeHeightMap = { default: 378, large: 736 }

const resolvedWidth = computed(() => {
  if (props.width != null) return props.width
  return sizeWidthMap[props.size!]
})

const resolvedHeight = computed(() => {
  if (props.height != null) return props.height
  return sizeHeightMap[props.size!]
})

const transitionName = computed(() => {
  const map: Record<string, string> = {
    right: 'ant-slide-right',
    left: 'ant-slide-left',
    top: 'ant-slide-top',
    bottom: 'ant-slide-bottom',
  }
  return map[props.placement!]
})

const drawerClasses = computed(() => [
  'ant-drawer',
  `ant-drawer-${props.placement}`,
  props.rootClassName,
])

const drawerStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex != null) {
    style.zIndex = String(props.zIndex)
  }
  const isHorizontal = props.placement === 'left' || props.placement === 'right'
  if (isHorizontal) {
    const w = resolvedWidth.value
    style.width = typeof w === 'number' ? `${w}px` : w!
  } else {
    const h = resolvedHeight.value
    style.height = typeof h === 'number' ? `${h}px` : h!
  }
  return style
})

const maskStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex != null) {
    style.zIndex = String(props.zIndex)
  }
  return style
})

// --- Handlers ---
function setOpen(open: boolean) {
  if (!isControlled.value) {
    internalOpen.value = open
  }
  emit('update:open', open)
  emit('update:visible', open)
}

function onClose(e?: MouseEvent | KeyboardEvent) {
  emit('close', e as MouseEvent | KeyboardEvent)
  setOpen(false)
}

function onMaskClick(e: MouseEvent) {
  if (props.maskClosable) {
    onClose(e)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (props.keyboard && e.key === 'Escape') {
    e.stopPropagation()
    onClose(e)
  }
}

function onAfterOpen() {
  emit('afterOpenChange', true)
  emit('afterVisibleChange', true)
  props.afterOpenChange?.(true)
}

function onAfterClose() {
  emit('afterOpenChange', false)
  emit('afterVisibleChange', false)
  props.afterOpenChange?.(false)
  if (props.destroyOnClose) {
    hasBeenOpened.value = false
  }
}
</script>
