<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { QRCodeProps, QRCodeEmits } from './types'
import { qrCodeDefaultProps } from './types'
import qrcodegen from './qrcodegen'

defineOptions({ name: 'AQRCode' })
const props = withDefaults(defineProps<QRCodeProps>(), qrCodeDefaultProps)
const emit = defineEmits<QRCodeEmits>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

const ERROR_LEVEL_MAP = {
  L: qrcodegen.QrCode.Ecc.LOW,
  M: qrcodegen.QrCode.Ecc.MEDIUM,
  Q: qrcodegen.QrCode.Ecc.QUARTILE,
  H: qrcodegen.QrCode.Ecc.HIGH,
} as const

const wrapperClasses = computed(() => ({
  'ant-qrcode': true,
  'ant-qrcode-borderless': !props.bordered,
}))

function drawQRCode() {
  const canvas = canvasRef.value
  if (!canvas) return

  const size = props.size
  const ratio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1

  // Always set canvas dimensions (even if context unavailable, e.g. in SSR/test)
  canvas.width = size * ratio
  canvas.height = size * ratio
  canvas.style.width = `${size}px`
  canvas.style.height = `${size}px`

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.scale(ratio, ratio)

  // Fill background
  ctx.fillStyle = props.bgColor
  ctx.fillRect(0, 0, size, size)

  // Encode QR data
  let cells: boolean[][]
  try {
    cells = qrcodegen.QrCode.encodeText(
      props.value,
      ERROR_LEVEL_MAP[props.errorLevel],
    ).getModules()
  } catch {
    // If encoding fails, leave canvas with just the background
    return
  }

  const moduleCount = cells.length
  if (moduleCount === 0) return

  // Calculate cell size with some padding
  const margin = 4
  const availableSize = size - margin * 2
  const cellSize = availableSize / moduleCount

  // Draw dark modules
  ctx.fillStyle = props.color
  for (let row = 0; row < moduleCount; row++) {
    for (let col = 0; col < moduleCount; col++) {
      if (cells[row][col]) {
        ctx.fillRect(
          margin + col * cellSize,
          margin + row * cellSize,
          cellSize,
          cellSize,
        )
      }
    }
  }

  // Draw icon if provided
  if (props.icon) {
    const iconSize = props.iconSize
    const iconX = (size - iconSize) / 2
    const iconY = (size - iconSize) / 2

    // Clear the center area (excavation) so icon is readable
    const excavationPadding = 2
    ctx.fillStyle = props.bgColor
    ctx.fillRect(
      iconX - excavationPadding,
      iconY - excavationPadding,
      iconSize + excavationPadding * 2,
      iconSize + excavationPadding * 2,
    )

    // Load and draw the icon image
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      ctx.drawImage(img, iconX, iconY, iconSize, iconSize)
    }
    img.src = props.icon
  }
}

function handleRefresh(event: MouseEvent) {
  emit('refresh', event)
}

function toDataURL(type?: string, quality?: number): string | undefined {
  return canvasRef.value?.toDataURL(type, quality)
}

defineExpose({ toDataURL })

onMounted(() => {
  drawQRCode()
})

watch(
  () => [props.value, props.size, props.color, props.bgColor, props.errorLevel, props.icon, props.iconSize],
  () => {
    drawQRCode()
  },
)
</script>

<template>
  <div :class="wrapperClasses">
    <canvas ref="canvasRef" />
    <!-- Mask overlay for non-active states -->
    <div v-if="status !== 'active'" class="ant-qrcode-mask">
      <template v-if="status === 'loading'">
        <span class="ant-qrcode-loading">
          <span class="ant-qrcode-loading-icon" />
        </span>
      </template>
      <template v-else-if="status === 'expired'">
        <p class="ant-qrcode-expired-text">QR code expired</p>
        <button class="ant-qrcode-expired-btn" type="button" @click="handleRefresh">
          Refresh
        </button>
      </template>
      <template v-else-if="status === 'scanned'">
        <p class="ant-qrcode-scanned-text">Scanned</p>
      </template>
    </div>
  </div>
</template>
