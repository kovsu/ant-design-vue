<template>
  <Portal :visible="shouldRender" :get-container="props.getContainer">
    <div :class="wrapClasses" :style="wrapStyle" @click="onMaskClick" @keydown="onKeydown">
      <Transition name="ant-zoom" @after-leave="onAfterLeave">
        <div
          v-if="shouldRender"
          v-show="mergedOpen"
          ref="modalRef"
          :class="modalClasses"
          :style="modalStyle"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="titleId"
          tabindex="-1"
          @click.stop
        >
          <!-- Close button -->
          <button
            v-if="props.closable"
            type="button"
            class="ant-modal-close"
            aria-label="Close"
            @click="onCancel"
          >
            <slot name="closeIcon">
              <CloseOutlined />
            </slot>
          </button>

          <!-- Header -->
          <div v-if="hasTitle" :id="titleId" class="ant-modal-header">
            <div class="ant-modal-title">
              <slot name="title">{{ props.title }}</slot>
            </div>
          </div>

          <!-- Body -->
          <div class="ant-modal-body" :style="props.bodyStyle">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="showFooter" class="ant-modal-footer">
            <slot name="footer">
              <button
                class="ant-btn ant-btn-outlined"
                v-bind="cancelBtnAttrs"
                @click="onCancel"
              >
                {{ props.cancelText }}
              </button>
              <button
                class="ant-btn ant-btn-solid"
                v-bind="okBtnAttrs"
                :disabled="props.confirmLoading"
                @click="onOk"
              >
                <span v-if="props.confirmLoading" class="ant-btn-loading-icon">
                  <LoadingOutlined />
                </span>
                {{ props.okText }}
              </button>
            </slot>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Mask -->
    <Transition name="ant-fade">
      <div
        v-if="shouldRender"
        v-show="mergedOpen"
        class="ant-modal-mask"
        :style="maskStyles"
      />
    </Transition>
  </Portal>
</template>

<script setup lang="ts">
import { ref, computed, watch, useSlots, onMounted, onBeforeUnmount, nextTick, getCurrentInstance } from 'vue'
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons-vue'
import { Portal } from '@/_internal/portal'
import type { ModalProps, ModalEmits, ModalSlots } from './types'
import { modalDefaultProps } from './types'

defineOptions({ name: 'AModal' })

const props = withDefaults(defineProps<ModalProps>(), modalDefaultProps)
const emit = defineEmits<ModalEmits>()
defineSlots<ModalSlots>()
const slots = useSlots()

const modalRef = ref<HTMLElement | null>(null)

// --- Unique ID for aria-labelledby ---
let _uid = 0
const titleId = `ant-modal-title-${++_uid}`

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
  if (props.forceRender) return true
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
      modalRef.value?.focus()
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

// --- Title detection ---
const hasTitle = computed(() => {
  return !!(props.title || slots.title)
})

// --- Footer ---
// Vue boolean-casts absent `footer` to false, so we must check raw vnode props
const showFooter = computed(() => {
  const rawProps = instance.vnode.props || {}
  if ('footer' in rawProps) {
    return rawProps.footer !== false && rawProps.footer !== null
  }
  return true
})

// --- Button attrs ---
const okBtnAttrs = computed(() => {
  const attrs: Record<string, any> = {}
  if (props.okButtonProps) {
    Object.assign(attrs, props.okButtonProps)
  }
  return attrs
})

const cancelBtnAttrs = computed(() => {
  const attrs: Record<string, any> = {}
  if (props.cancelButtonProps) {
    Object.assign(attrs, props.cancelButtonProps)
  }
  return attrs
})

// --- Styles ---
const wrapClasses = computed(() => [
  'ant-modal-wrap',
  { 'ant-modal-centered': props.centered },
  props.wrapClassName,
])

const wrapStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex != null) {
    style.zIndex = String(props.zIndex)
  }
  return style
})

const modalStyle = computed(() => {
  const style: Record<string, string> = {}
  const width = props.width
  if (typeof width === 'number') {
    style.width = `${width}px`
  } else if (width) {
    style.width = width
  }
  return style
})

const modalClasses = computed(() => ['ant-modal'])

const maskStyles = computed(() => {
  const style: Record<string, string> = {}
  if (props.zIndex != null) {
    style.zIndex = String(props.zIndex)
  }
  if (props.maskStyle) {
    Object.assign(style, props.maskStyle)
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

function onCancel(e?: MouseEvent | KeyboardEvent) {
  emit('cancel', e as MouseEvent | KeyboardEvent)
  setOpen(false)
}

function onOk(e: MouseEvent) {
  emit('ok', e)
}

function onMaskClick(e: MouseEvent) {
  if (props.maskClosable && props.mask) {
    onCancel(e)
  }
}

function onKeydown(e: KeyboardEvent) {
  if (props.keyboard && e.key === 'Escape') {
    e.stopPropagation()
    onCancel(e)
  }
}

function onAfterLeave() {
  props.afterClose?.()
  emit('afterClose')
  if (props.destroyOnClose) {
    hasBeenOpened.value = false
  }
}
</script>
