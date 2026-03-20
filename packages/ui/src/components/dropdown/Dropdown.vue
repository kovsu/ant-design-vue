<template>
  <Trigger
    ref="triggerRef"
    v-bind="openProps"
    :trigger="props.trigger"
    :placement="floatingPlacement"
    :mouse-enter-delay="props.mouseEnterDelay"
    :mouse-leave-delay="props.mouseLeaveDelay"
    :arrow="showArrow"
    :offset="showArrow ? 12 : 4"
    :auto-adjust-overflow="true"
    :destroy-on-hide="props.destroyPopupOnHide"
    :popup-class="popupClasses"
    :popup-style="props.overlayStyle"
    :disabled="props.disabled"
    :get-popup-container="resolvedGetContainer"
    :z-index="props.zIndex"
    :transition-name="transitionName"
    @update:open="onOpenChange"
  >
    <slot />
    <template #popup>
      <slot name="overlay">
        <a-menu
          v-if="props.menu?.items"
          v-bind="menuProps"
        />
      </slot>
    </template>
  </Trigger>
</template>

<script setup lang="ts">
import { computed, shallowRef, getCurrentInstance } from 'vue'
import type { Placement } from '@floating-ui/vue'
import { Trigger } from '@/_internal/trigger'
import { useConfigInject } from '@/hooks'
import { resolveFloatingPlacement } from '../tooltip/types'
import type { DropdownProps, DropdownEmits, DropdownSlots, DropdownPlacement } from './types'
import { dropdownDefaultProps } from './types'

defineOptions({ name: 'ADropdown' })

const props = withDefaults(defineProps<DropdownProps>(), dropdownDefaultProps)
const emit = defineEmits<DropdownEmits>()
defineSlots<DropdownSlots>()

const { getPopupContainer } = useConfigInject()

const triggerRef = shallowRef<InstanceType<typeof Trigger> | null>(null)

// --- Controlled / uncontrolled open ---
const instance = getCurrentInstance()!
const isUserControlled = computed(() => {
  const rawProps = instance.vnode.props || {}
  return 'open' in rawProps || 'visible' in rawProps
})

const openProps = computed(() => {
  if (!isUserControlled.value) return {}
  const open = props.open ?? props.visible ?? false
  return { open }
})

// --- Arrow ---
const showArrow = computed(() => {
  if (props.arrow == null || props.arrow === false) return false
  return true
})

// --- Placement mapping ---
const floatingPlacement = computed<Placement>(() => {
  const map: Record<DropdownPlacement, Placement> = {
    topLeft: 'top-start',
    topCenter: 'top',
    topRight: 'top-end',
    top: 'top',
    bottomLeft: 'bottom-start',
    bottomCenter: 'bottom',
    bottomRight: 'bottom-end',
    bottom: 'bottom',
  }
  return map[props.placement!] ?? 'bottom-start'
})

// --- Transition based on placement (slide up for bottom, slide down for top) ---
const transitionName = computed(() => {
  const p = props.placement!
  if (p.startsWith('top')) return 'ant-slide-down'
  return 'ant-slide-up'
})

// --- Container ---
const resolvedGetContainer = computed(() => {
  if (props.getPopupContainer) {
    return () => props.getPopupContainer!(triggerRef.value?.triggerRef ?? document.body)
  }
  return getPopupContainer.value
})

// --- Popup classes ---
const popupClasses = computed(() => {
  const classes: string[] = ['ant-dropdown']
  if (props.overlayClassName) classes.push(props.overlayClassName)
  if (showArrow.value) classes.push('ant-dropdown-show-arrow')
  return classes
})

// --- Menu props for items-driven usage ---
const menuProps = computed(() => {
  if (!props.menu) return {}
  const { items, ...rest } = props.menu
  return {
    ...rest,
    items,
    mode: 'vertical' as const,
    selectable: rest.selectable ?? false,
  }
})

// --- Emit handler ---
function onOpenChange(open: boolean) {
  emit('update:open', open)
  emit('openChange', open)
  emit('update:visible', open)
  emit('visibleChange', open)
}

// --- Expose ---
defineExpose({
  triggerRef,
})
</script>
