<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, useSlots } from 'vue'
import type { BackTopProps, BackTopEmits, BackTopSlots } from './types'
import { backTopDefaultProps } from './types'

defineOptions({ name: 'ABackTop' })
const props = withDefaults(defineProps<BackTopProps>(), backTopDefaultProps)
const emit = defineEmits<BackTopEmits>()
defineSlots<BackTopSlots>()
const slots = useSlots()

const visible = ref(false)

function getTarget(): HTMLElement | Window {
  if (props.target) return props.target()
  return window
}

function getScrollTop(target: HTMLElement | Window): number {
  if (target === window) {
    return document.documentElement.scrollTop || document.body.scrollTop
  }
  return (target as HTMLElement).scrollTop
}

function handleScroll() {
  const target = getTarget()
  const scrollTop = getScrollTop(target)
  visible.value = scrollTop >= props.visibilityHeight
}

let scrollTarget: HTMLElement | Window | null = null

onMounted(() => {
  scrollTarget = getTarget()
  scrollTarget.addEventListener('scroll', handleScroll, { passive: true })
  // Check initial scroll position
  handleScroll()
})

onBeforeUnmount(() => {
  if (scrollTarget) {
    scrollTarget.removeEventListener('scroll', handleScroll)
    scrollTarget = null
  }
})

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function scrollToTop() {
  const target = getTarget()
  const startTop = getScrollTop(target)
  const startTime = performance.now()
  const duration = props.duration

  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const eased = easeInOutCubic(progress)
    const scrollTo = startTop * (1 - eased)

    if (target === window) {
      window.scrollTo(0, scrollTo)
    } else {
      ;(target as HTMLElement).scrollTop = scrollTo
    }

    if (progress < 1) {
      requestAnimationFrame(step)
    }
  }

  requestAnimationFrame(step)
}

function handleClick(event: MouseEvent) {
  scrollToTop()
  emit('click', event)
}

const classes = computed(() => ({
  'ant-float-btn': true,
  'ant-float-btn-back-top': true,
  'ant-float-btn-primary': props.type === 'primary',
  'ant-float-btn-default': props.type === 'default',
  'ant-float-btn-circle': props.shape === 'circle',
  'ant-float-btn-square': props.shape === 'square',
  'ant-float-btn-with-description': !!props.description || !!slots.description,
}))

const tooltipText = computed(() => props.tooltip)

const hasBadge = computed(() => {
  if (!props.badge) return false
  return props.badge.dot || (props.badge.count != null && props.badge.count > 0)
})

const badgeText = computed(() => {
  if (!props.badge) return ''
  if (props.badge.dot) return ''
  if (props.badge.count != null && props.badge.count > 0) {
    return props.badge.count > 99 ? '99+' : String(props.badge.count)
  }
  return ''
})
</script>

<template>
  <Transition name="ant-float-btn-fade">
    <button
      v-show="visible"
      type="button"
      :class="classes"
      :title="tooltipText"
      @click="handleClick"
    >
      <div class="ant-float-btn-body">
        <div class="ant-float-btn-content">
          <div class="ant-float-btn-icon">
            <slot>
              <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                <path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z" />
              </svg>
            </slot>
          </div>
          <div v-if="description || $slots.description" class="ant-float-btn-description">
            <slot name="description">{{ description }}</slot>
          </div>
        </div>
        <div v-if="hasBadge" class="ant-float-btn-badge" :class="{ 'ant-float-btn-badge-dot': badge?.dot }">
          <template v-if="!badge?.dot">{{ badgeText }}</template>
        </div>
      </div>
    </button>
  </Transition>
</template>
