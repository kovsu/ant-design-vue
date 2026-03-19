<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import type { SiderProps, SiderEmits, SiderSlots } from './types'
import { siderDefaultProps, siderHookProviderKey, siderCollapsedKey } from './types'
import type { Breakpoint } from '@/hooks'

defineOptions({ name: 'ALayoutSider' })
const props = withDefaults(defineProps<SiderProps>(), siderDefaultProps)
const emit = defineEmits<SiderEmits>()
defineSlots<SiderSlots>()

const siderHook = inject(siderHookProviderKey, null)
const uniqueId = `ant-sider-${Math.random().toString(36).slice(2, 8)}`

// Register with parent Layout (synchronous, during setup)
siderHook?.addSider(uniqueId)
onUnmounted(() => siderHook?.removeSider(uniqueId))

// Collapse state
const internalCollapsed = ref(props.defaultCollapsed)

const isCollapsed = computed(() =>
  props.collapsed !== undefined ? props.collapsed : internalCollapsed.value,
)

function setCollapsed(val: boolean, type: 'clickTrigger' | 'responsive') {
  if (props.collapsed === undefined) {
    internalCollapsed.value = val
  }
  emit('update:collapsed', val)
  emit('collapse', val, type)
}

watch(
  () => props.collapsed,
  (val) => {
    if (val !== undefined) internalCollapsed.value = val
  },
)

// Responsive breakpoint
const below = ref(false)
let mql: MediaQueryList | null = null
let mqlHandler: ((e: MediaQueryListEvent) => void) | null = null

const BREAKPOINT_MAP: Record<Breakpoint, string> = {
  xs: '(max-width: 479.98px)',
  sm: '(max-width: 575.98px)',
  md: '(max-width: 767.98px)',
  lg: '(max-width: 991.98px)',
  xl: '(max-width: 1199.98px)',
  xxl: '(max-width: 1599.98px)',
}

onMounted(() => {
  if (!props.breakpoint) return

  mql = window.matchMedia(BREAKPOINT_MAP[props.breakpoint])
  below.value = mql.matches

  mqlHandler = (e: MediaQueryListEvent) => {
    below.value = e.matches
    emit('breakpoint', e.matches)
    if (isCollapsed.value !== e.matches) {
      setCollapsed(e.matches, 'responsive')
    }
  }
  mql.addEventListener('change', mqlHandler)

  // Initial check
  if (mql.matches) {
    emit('breakpoint', true)
    setCollapsed(true, 'responsive')
  }
})

onUnmounted(() => {
  if (mql && mqlHandler) {
    mql.removeEventListener('change', mqlHandler)
  }
})

function handleTriggerClick() {
  setCollapsed(!isCollapsed.value, 'clickTrigger')
}

// Provide collapsed state to children
provide(siderCollapsedKey, isCollapsed)

// Computed
const siderWidth = computed(() => {
  const raw = isCollapsed.value ? props.collapsedWidth : props.width
  return typeof raw === 'number' ? `${raw}px` : raw
})

const siderStyle = computed(() => ({
  flex: `0 0 ${siderWidth.value}`,
  maxWidth: siderWidth.value,
  minWidth: siderWidth.value,
  width: siderWidth.value,
}))

const classes = computed(() => ({
  'ant-layout-sider': true,
  [`ant-layout-sider-${props.theme}`]: true,
  'ant-layout-sider-collapsed': isCollapsed.value,
  'ant-layout-sider-has-trigger': props.collapsible,
  'ant-layout-sider-below': below.value,
  'ant-layout-sider-zero-width': Number(props.collapsedWidth) === 0 && isCollapsed.value,
}))

const showTrigger = computed(() => props.collapsible)
</script>

<template>
  <aside :class="classes" :style="siderStyle">
    <div class="ant-layout-sider-children">
      <slot />
    </div>
    <button
      v-if="showTrigger"
      type="button"
      class="ant-layout-sider-trigger"
      :style="{ width: siderWidth }"
      :aria-expanded="!isCollapsed"
      :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      @click="handleTriggerClick"
    >
      <slot name="trigger" :collapsed="isCollapsed">
        <span class="ant-layout-sider-trigger-icon" aria-hidden="true">
          {{ isCollapsed ? (reverseArrow ? '◀' : '▶') : (reverseArrow ? '▶' : '◀') }}
        </span>
      </slot>
    </button>
  </aside>
</template>
