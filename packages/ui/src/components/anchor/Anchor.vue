<template>
  <div :class="anchorClasses">
    <div class="ant-anchor-wrapper">
      <!-- Ink indicator (vertical only) -->
      <span
        v-if="props.direction === 'vertical'"
        class="ant-anchor-ink"
        :style="inkStyle"
      />

      <!-- Items-based rendering -->
      <template v-if="props.items">
        <div
          v-for="item in props.items"
          :key="item.key"
          :class="['ant-anchor-link', { 'ant-anchor-link-active': activeLink === item.href }]"
        >
          <a
            :class="['ant-anchor-link-title', { 'ant-anchor-link-title-active': activeLink === item.href }]"
            :href="item.href"
            :target="item.target"
            :title="item.title"
            @click="onLinkClick($event, item)"
          >
            {{ item.title }}
          </a>
          <!-- Nested children (vertical only) -->
          <template v-if="item.children && props.direction === 'vertical'">
            <div
              v-for="child in item.children"
              :key="child.key"
              :class="['ant-anchor-link', 'ant-anchor-link-nested', { 'ant-anchor-link-active': activeLink === child.href }]"
            >
              <a
                :class="['ant-anchor-link-title', { 'ant-anchor-link-title-active': activeLink === child.href }]"
                :href="child.href"
                :target="child.target"
                :title="child.title"
                @click="onLinkClick($event, child)"
              >
                {{ child.title }}
              </a>
            </div>
          </template>
        </div>
      </template>

      <!-- Slot-based rendering -->
      <template v-else>
        <slot />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  provide,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
} from 'vue'
import type { AnchorProps, AnchorEmits, AnchorSlots, AnchorContext, AnchorLinkItem } from './types'
import { anchorDefaultProps, ANCHOR_KEY } from './types'

defineOptions({ name: 'AAnchor' })

const props = withDefaults(defineProps<AnchorProps>(), anchorDefaultProps)
const emit = defineEmits<AnchorEmits>()
defineSlots<AnchorSlots>()

// --- State ---
const registeredLinks = ref<Set<string>>(new Set())
const currentActiveLink = ref('')
const animating = ref(false)

// --- Active link ---
const activeLink = computed(() => {
  if (props.getCurrentAnchor) {
    return props.getCurrentAnchor(currentActiveLink.value)
  }
  return currentActiveLink.value
})

// --- Ink indicator ---
const inkStyle = computed(() => {
  if (!activeLink.value || props.direction !== 'vertical') {
    return { display: 'none' }
  }
  // The ink position is calculated in CSS based on active link
  return {}
})

// --- Classes ---
const anchorClasses = computed(() => [
  'ant-anchor',
  `ant-anchor-${props.direction}`,
])

// --- Scroll handling ---
function getContainer(): HTMLElement | Window {
  if (props.getContainer) return props.getContainer()
  return window
}

function getScrollTop(container: HTMLElement | Window): number {
  if (container === window) return window.pageYOffset || document.documentElement.scrollTop
  return (container as HTMLElement).scrollTop
}

function getOffsetTop(element: HTMLElement, container: HTMLElement | Window): number {
  if (container === window) {
    return element.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop)
  }
  const containerRect = (container as HTMLElement).getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()
  return elementRect.top - containerRect.top + (container as HTMLElement).scrollTop
}

function getAllAnchors(): string[] {
  if (props.items) {
    const anchors: string[] = []
    for (const item of props.items) {
      anchors.push(item.href)
      if (item.children) {
        for (const child of item.children) {
          anchors.push(child.href)
        }
      }
    }
    return anchors
  }
  return Array.from(registeredLinks.value)
}

function findActiveLink(): string {
  const container = getContainer()
  const scrollTop = getScrollTop(container)
  const targetOffset = props.targetOffset ?? props.offsetTop ?? 0
  const bounds = props.bounds!
  const anchors = getAllAnchors()

  let activeHref = ''

  for (const href of anchors) {
    const id = href.startsWith('#') ? href.slice(1) : href
    const element = document.getElementById(id)
    if (!element) continue

    const offsetTop = getOffsetTop(element, container)
    if (offsetTop <= scrollTop + targetOffset + bounds) {
      activeHref = href
    }
  }

  return activeHref
}

function handleScroll() {
  if (animating.value) return
  const active = findActiveLink()
  if (active !== currentActiveLink.value) {
    currentActiveLink.value = active
    emit('change', active)
  }
}

let scrollListener: (() => void) | null = null

onMounted(() => {
  const container = getContainer()
  scrollListener = handleScroll
  container.addEventListener('scroll', scrollListener, { passive: true })

  // Initial detection
  nextTick(handleScroll)
})

onBeforeUnmount(() => {
  if (scrollListener) {
    const container = getContainer()
    container.removeEventListener('scroll', scrollListener)
  }
})

// --- Click handler ---
function scrollToAnchor(href: string) {
  const id = href.startsWith('#') ? href.slice(1) : href
  const element = document.getElementById(id)
  if (!element) return

  const container = getContainer()
  const offsetTop = props.targetOffset ?? props.offsetTop ?? 0

  animating.value = true

  const targetScrollTop = getOffsetTop(element, container) - offsetTop

  if (container === window) {
    window.scrollTo({ top: targetScrollTop, behavior: 'smooth' })
  } else {
    (container as HTMLElement).scrollTo({ top: targetScrollTop, behavior: 'smooth' })
  }

  // Update active link immediately
  currentActiveLink.value = href
  emit('change', href)

  // Reset animating flag after scroll completes
  setTimeout(() => {
    animating.value = false
  }, 500)
}

function onLinkClick(e: MouseEvent, link: AnchorLinkItem | { title: string; href: string }) {
  emit('click', e, { title: link.title ?? '', href: link.href })

  if (props.replace) {
    e.preventDefault()
    if (typeof window !== 'undefined') {
      window.location.replace(link.href)
    }
    return
  }

  e.preventDefault()
  scrollToAnchor(link.href)
}

// --- Provide context for AnchorLink children ---
provide(ANCHOR_KEY, {
  activeLink,
  registerLink: (href: string) => {
    registeredLinks.value.add(href)
  },
  unregisterLink: (href: string) => {
    registeredLinks.value.delete(href)
  },
  handleClick: onLinkClick,
})
</script>
