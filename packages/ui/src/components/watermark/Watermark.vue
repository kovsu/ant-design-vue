<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { WatermarkProps, WatermarkSlots } from './types'
import { watermarkDefaultProps } from './types'

defineOptions({ name: 'AWatermark' })
const props = withDefaults(defineProps<WatermarkProps>(), watermarkDefaultProps)
defineSlots<WatermarkSlots>()

const containerRef = ref<HTMLElement | null>(null)
const watermarkRef = ref<HTMLDivElement | null>(null)
let observer: MutationObserver | null = null
let stopObserving = false

// Resolved font
const mergedFont = computed(() => ({
  color: props.font?.color ?? 'rgba(0, 0, 0, 0.15)',
  fontSize: props.font?.fontSize ?? 16,
  fontWeight: props.font?.fontWeight ?? 'normal',
  fontStyle: props.font?.fontStyle ?? 'normal',
  fontFamily: props.font?.fontFamily ?? 'sans-serif',
}))

const mergedGap = computed(() => props.gap ?? [100, 100])

function getMarkSize(): [number, number] {
  const contentLines = Array.isArray(props.content) ? props.content : [props.content || '']
  const fontSize = mergedFont.value.fontSize
  const defaultWidth = props.image ? 120 : fontSize * Math.max(...contentLines.map((l) => l.length)) + 8
  const defaultHeight = props.image ? 64 : fontSize * contentLines.length * 1.5 + 8
  return [props.width ?? defaultWidth, props.height ?? defaultHeight]
}

function renderWatermark() {
  if (typeof document === 'undefined') return

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const ratio = window.devicePixelRatio || 1
  const [markWidth, markHeight] = getMarkSize()
  const [gapX, gapY] = mergedGap.value

  const canvasWidth = (markWidth + gapX) * ratio
  const canvasHeight = (markHeight + gapY) * ratio
  canvas.width = canvasWidth
  canvas.height = canvasHeight

  ctx.save()

  // Move to center of the watermark cell for rotation
  const centerX = (canvasWidth / 2)
  const centerY = (canvasHeight / 2)
  ctx.translate(centerX, centerY)
  ctx.rotate((props.rotate * Math.PI) / 180)
  ctx.translate(-centerX, -centerY)

  if (props.image) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.referrerPolicy = 'no-referrer'
    img.onload = () => {
      const drawWidth = markWidth * ratio
      const drawHeight = markHeight * ratio
      const x = (canvasWidth - drawWidth) / 2
      const y = (canvasHeight - drawHeight) / 2
      ctx.drawImage(img, x, y, drawWidth, drawHeight)
      applyWatermark(canvas.toDataURL(), canvasWidth, canvasHeight, ratio)
    }
    img.onerror = () => {
      // Fall back to text rendering if image fails
      drawText(ctx, canvasWidth, canvasHeight, ratio, markWidth, markHeight)
      applyWatermark(canvas.toDataURL(), canvasWidth, canvasHeight, ratio)
    }
    img.src = props.image
  } else {
    drawText(ctx, canvasWidth, canvasHeight, ratio, markWidth, markHeight)
    applyWatermark(canvas.toDataURL(), canvasWidth, canvasHeight, ratio)
  }

  ctx.restore()
}

function drawText(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  ratio: number,
  _markWidth: number,
  _markHeight: number,
) {
  const font = mergedFont.value
  ctx.font = `${font.fontStyle} ${font.fontWeight} ${font.fontSize * ratio}px ${font.fontFamily}`
  ctx.fillStyle = font.color
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  const contentLines = Array.isArray(props.content) ? props.content : [props.content || '']
  const lineHeight = font.fontSize * ratio * 1.5
  const totalHeight = lineHeight * contentLines.length
  const startY = (canvasHeight - totalHeight) / 2 + lineHeight / 2

  contentLines.forEach((line, index) => {
    ctx.fillText(line, canvasWidth / 2, startY + index * lineHeight)
  })
}

function applyWatermark(dataUrl: string, canvasWidth: number, canvasHeight: number, ratio: number) {
  if (!containerRef.value) return

  const [gapX, gapY] = mergedGap.value
  const offsetLeft = props.offset?.[0] ?? gapX / 2
  const offsetTop = props.offset?.[1] ?? gapY / 2

  // Create or reuse the watermark div
  stopObserving = true

  if (!watermarkRef.value) {
    watermarkRef.value = document.createElement('div')
    containerRef.value.appendChild(watermarkRef.value)
  }

  const wmDiv = watermarkRef.value
  wmDiv.setAttribute('style', [
    'position: absolute',
    'inset: 0',
    `z-index: ${props.zIndex}`,
    'pointer-events: none',
    'background-repeat: repeat',
    `background-size: ${canvasWidth / ratio}px`,
    `background-image: url(${dataUrl})`,
    `background-position: ${offsetLeft}px ${offsetTop}px`,
  ].join('; '))

  nextTick(() => {
    stopObserving = false
  })
}

function setupObserver() {
  if (typeof MutationObserver === 'undefined' || !containerRef.value) return

  observer = new MutationObserver((mutations) => {
    if (stopObserving) return

    let needRerender = false
    for (const mutation of mutations) {
      // Check if watermark div was removed
      if (mutation.type === 'childList') {
        for (const node of Array.from(mutation.removedNodes)) {
          if (node === watermarkRef.value) {
            watermarkRef.value = null
            needRerender = true
            break
          }
        }
      }
      // Check if watermark div style was modified
      if (mutation.type === 'attributes' && mutation.target === watermarkRef.value) {
        needRerender = true
      }
    }
    if (needRerender) {
      renderWatermark()
    }
  })

  observer.observe(containerRef.value, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  })
}

// Re-render when props change
watch(
  () => [props.content, props.image, props.font, props.rotate, props.width, props.height, props.gap, props.offset, props.zIndex],
  () => {
    renderWatermark()
  },
  { deep: true },
)

onMounted(() => {
  renderWatermark()
  setupObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <div ref="containerRef" class="ant-watermark" style="position: relative">
    <slot />
  </div>
</template>
