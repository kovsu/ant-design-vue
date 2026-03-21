<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  useSlots,
  nextTick,
  type VNode,
} from 'vue'
import type { CarouselProps, CarouselEmits, CarouselSlots } from './types'
import { carouselDefaultProps } from './types'

defineOptions({ name: 'ACarousel' })
const props = withDefaults(defineProps<CarouselProps>(), carouselDefaultProps)
const emit = defineEmits<CarouselEmits>()
defineSlots<CarouselSlots>()
const slots = useSlots()

const trackRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)

const currentIndex = ref(props.initialSlide)
const isTransitioning = ref(false)
const isPaused = ref(false)

// Get slide count from slot children
const slideCount = computed(() => {
  const children = slots.default?.()
  if (!children) return 0
  return children.reduce((count: number, vnode: VNode) => {
    // Count fragment children (e.g. v-for)
    if (vnode.type === Symbol.for('v-fgm') || (typeof vnode.type === 'symbol' && String(vnode.type) === 'Symbol(v-fgm)')) {
      return count + ((vnode.children as VNode[])?.length || 0)
    }
    return count + 1
  }, 0)
})

const isVertical = computed(() => {
  return props.dotPosition === 'left' || props.dotPosition === 'right'
})

const isFade = computed(() => props.effect === 'fade')

// Classes
const containerClasses = computed(() => ({
  'ant-carousel': true,
  'ant-carousel-vertical': isVertical.value,
  [`ant-carousel-dots-${props.dotPosition}`]: true,
}))

// Track style for scrollx mode
const trackStyle = computed(() => {
  if (isFade.value) return {}

  const total = slideCount.value
  if (total === 0) return {}

  // With infinite, we have clone-first-at-end and clone-last-at-start
  const hasClones = props.infinite && total > 1
  const trackSlideCount = hasClones ? total + 2 : total
  const offset = hasClones ? currentIndex.value + 1 : currentIndex.value

  if (isVertical.value) {
    return {
      transform: `translateY(-${offset * (100 / trackSlideCount)}%)`,
      transition: isTransitioning.value
        ? `transform ${props.speed}ms ${props.easing}`
        : 'none',
      height: `${trackSlideCount * 100}%`,
    }
  }

  return {
    transform: `translateX(-${offset * (100 / trackSlideCount)}%)`,
    transition: isTransitioning.value
      ? `transform ${props.speed}ms ${props.easing}`
      : 'none',
    width: `${trackSlideCount * 100}%`,
  }
})

// Slide style
function getSlideStyle(index: number) {
  const total = slideCount.value
  if (total === 0) return {}

  if (isFade.value) {
    return {
      opacity: index === currentIndex.value ? 1 : 0,
      transition: `opacity ${props.speed}ms ${props.easing}`,
    }
  }

  const hasClones = props.infinite && total > 1
  const trackSlideCount = hasClones ? total + 2 : total

  if (isVertical.value) {
    return {
      height: `${100 / trackSlideCount}%`,
    }
  }

  return {
    width: `${100 / trackSlideCount}%`,
  }
}

// Navigation
function goTo(index: number, animate = true) {
  const total = slideCount.value
  if (total === 0 || isTransitioning.value) return

  let targetIndex = index
  if (targetIndex < 0) targetIndex = props.infinite ? total - 1 : 0
  if (targetIndex >= total) targetIndex = props.infinite ? 0 : total - 1

  if (targetIndex === currentIndex.value) return

  emit('beforeChange', currentIndex.value, targetIndex)

  if (animate) {
    isTransitioning.value = true
  }

  if (!isFade.value && props.infinite && total > 1) {
    // Handle infinite scrolling edge case
    if (currentIndex.value === total - 1 && targetIndex === 0) {
      // Going forward from last to first: scroll to clone at end
      currentIndex.value = total // position at the clone
      isTransitioning.value = true
      setTimeout(() => {
        isTransitioning.value = false
        currentIndex.value = 0
        nextTick(() => {
          emit('afterChange', 0)
        })
      }, animate ? props.speed : 0)
      return
    }
    if (currentIndex.value === 0 && targetIndex === total - 1) {
      // Going backward from first to last: scroll to clone at start
      currentIndex.value = -1
      isTransitioning.value = true
      setTimeout(() => {
        isTransitioning.value = false
        currentIndex.value = total - 1
        nextTick(() => {
          emit('afterChange', total - 1)
        })
      }, animate ? props.speed : 0)
      return
    }
  }

  currentIndex.value = targetIndex

  if (animate) {
    setTimeout(() => {
      isTransitioning.value = false
      emit('afterChange', targetIndex)
    }, props.speed)
  } else {
    emit('afterChange', targetIndex)
  }
}

function next() {
  const total = slideCount.value
  if (total === 0) return
  if (props.infinite) {
    goTo((currentIndex.value + 1) % total)
  } else {
    goTo(Math.min(currentIndex.value + 1, total - 1))
  }
}

function prev() {
  const total = slideCount.value
  if (total === 0) return
  if (props.infinite) {
    goTo((currentIndex.value - 1 + total) % total)
  } else {
    goTo(Math.max(currentIndex.value - 1, 0))
  }
}

// Autoplay
let autoplayTimer: ReturnType<typeof setInterval> | null = null

function startAutoplay() {
  stopAutoplay()
  if (props.autoplay && slideCount.value > 1) {
    autoplayTimer = setInterval(() => {
      if (!isPaused.value) {
        next()
      }
    }, props.autoplaySpeed)
  }
}

function stopAutoplay() {
  if (autoplayTimer !== null) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

function handleMouseEnter() {
  if (props.pauseOnHover) {
    isPaused.value = true
  }
}

function handleMouseLeave() {
  if (props.pauseOnHover) {
    isPaused.value = false
  }
}

watch(() => props.autoplay, (val) => {
  if (val) {
    startAutoplay()
  } else {
    stopAutoplay()
  }
})

watch(() => props.autoplaySpeed, () => {
  if (props.autoplay) {
    startAutoplay()
  }
})

// Touch/swipe support
let touchStartX = 0
let touchStartY = 0
let touchDelta = 0

function handleTouchStart(e: TouchEvent) {
  if (!props.swipeable) return
  const touch = e.touches[0]
  touchStartX = touch.clientX
  touchStartY = touch.clientY
  touchDelta = 0
}

function handleTouchMove(e: TouchEvent) {
  if (!props.swipeable) return
  const touch = e.touches[0]
  if (isVertical.value) {
    touchDelta = touch.clientY - touchStartY
  } else {
    touchDelta = touch.clientX - touchStartX
  }
}

function handleTouchEnd() {
  if (!props.swipeable) return
  const threshold = 50
  if (Math.abs(touchDelta) > threshold) {
    if (touchDelta > 0) {
      prev()
    } else {
      next()
    }
  }
  touchDelta = 0
}

// Keyboard
function handleKeydown(e: KeyboardEvent) {
  if (isVertical.value) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      prev()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      next()
    }
  } else {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      next()
    }
  }
}

// Dot click
function handleDotClick(index: number) {
  goTo(index)
}

// Resize observer
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  startAutoplay()

  if (typeof ResizeObserver !== 'undefined' && containerRef.value) {
    resizeObserver = new ResizeObserver(() => {
      // Force re-render on resize
    })
    resizeObserver.observe(containerRef.value)
  }
})

onBeforeUnmount(() => {
  stopAutoplay()
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

defineExpose({ goTo, next, prev })
</script>

<template>
  <div
    ref="containerRef"
    :class="containerClasses"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @touchstart.passive="handleTouchStart"
    @touchmove.passive="handleTouchMove"
    @touchend="handleTouchEnd"
    @keydown="handleKeydown"
  >
    <div class="ant-carousel-container">
      <!-- Scrollx mode -->
      <template v-if="!isFade">
        <div ref="trackRef" class="ant-carousel-track" :style="trackStyle">
          <!-- Clone last slide at beginning (for infinite) -->
          <div
            v-if="infinite && slideCount > 1 && $slots.default"
            class="ant-carousel-slide"
            :style="getSlideStyle(-1)"
            aria-hidden="true"
          >
            <component
              :is="(() => {
                const children = $slots.default!()
                return children[children.length - 1]
              })()"
            />
          </div>

          <!-- Actual slides -->
          <div
            v-for="(_, index) in slideCount"
            :key="index"
            class="ant-carousel-slide"
            :class="{ 'ant-carousel-slide-active': index === currentIndex }"
            :style="getSlideStyle(index)"
            :aria-hidden="index !== currentIndex"
            role="tabpanel"
          >
            <component
              :is="(() => {
                const children = $slots.default!()
                return children[index]
              })()"
            />
          </div>

          <!-- Clone first slide at end (for infinite) -->
          <div
            v-if="infinite && slideCount > 1 && $slots.default"
            class="ant-carousel-slide"
            :style="getSlideStyle(slideCount)"
            aria-hidden="true"
          >
            <component
              :is="(() => {
                const children = $slots.default!()
                return children[0]
              })()"
            />
          </div>
        </div>
      </template>

      <!-- Fade mode -->
      <template v-else>
        <div class="ant-carousel-track ant-carousel-track-fade">
          <div
            v-for="(_, index) in slideCount"
            :key="index"
            class="ant-carousel-slide ant-carousel-slide-fade"
            :class="{ 'ant-carousel-slide-active': index === currentIndex }"
            :style="getSlideStyle(index)"
            :aria-hidden="index !== currentIndex"
            role="tabpanel"
          >
            <component
              :is="(() => {
                const children = $slots.default!()
                return children[index]
              })()"
            />
          </div>
        </div>
      </template>
    </div>

    <!-- Dot indicators -->
    <ul
      v-if="dots && slideCount > 0"
      class="ant-carousel-dots"
      role="tablist"
    >
      <li
        v-for="index in slideCount"
        :key="index - 1"
        class="ant-carousel-dot"
        :class="{ 'ant-carousel-dot-active': index - 1 === currentIndex }"
        role="presentation"
      >
        <button
          type="button"
          role="tab"
          :aria-selected="index - 1 === currentIndex"
          :aria-label="`Slide ${index}`"
          @click="handleDotClick(index - 1)"
        />
      </li>
    </ul>
  </div>
</template>
