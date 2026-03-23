<template>
  <div :class="tabsClasses">
    <!-- Tab bar -->
    <div
      :class="navClasses"
      role="tablist"
      :aria-orientation="isHorizontal ? 'horizontal' : 'vertical'"
      :style="props.tabBarStyle"
    >
      <!-- Left extra -->
      <div v-if="$slots.leftExtra" class="ant-tabs-extra ant-tabs-extra-left">
        <slot name="leftExtra" />
      </div>

      <div ref="navWrapRef" class="ant-tabs-nav-wrap">
        <div ref="navListRef" class="ant-tabs-nav-list">
          <!-- Tab buttons -->
          <div
            v-for="tab in resolvedTabs"
            :key="tab.key"
            :class="tabClasses(tab)"
            role="tab"
            :aria-selected="tab.key === mergedActiveKey"
            :aria-disabled="tab.disabled"
            :tabindex="tab.key === mergedActiveKey ? 0 : -1"
            @click="onTabClick(tab, $event)"
            @keydown.enter="onTabClick(tab, $event)"
            @keydown.space.prevent="onTabClick(tab, $event)"
          >
            <span class="ant-tabs-tab-label">
              <component :is="() => tab.label" v-if="isVNode(tab.label)" />
              <template v-else>{{ tab.label }}</template>
            </span>
            <!-- Remove button for editable-card -->
            <button
              v-if="props.type === 'editable-card' && tab.closable !== false"
              type="button"
              class="ant-tabs-tab-remove"
              aria-label="Remove tab"
              @click.stop="onRemove(tab.key)"
            >
              <slot name="removeIcon">
                <CloseOutlined />
              </slot>
            </button>
          </div>

          <!-- Ink bar (line type only) -->
          <div
            v-if="props.type === 'line'"
            class="ant-tabs-ink-bar"
            :style="inkBarStyle"
          />
        </div>
      </div>

      <!-- Add button for editable-card -->
      <button
        v-if="props.type === 'editable-card' && !props.hideAdd"
        type="button"
        class="ant-tabs-nav-add"
        aria-label="Add tab"
        @click="onAdd"
      >
        <slot name="addIcon">
          <PlusOutlined />
        </slot>
      </button>

      <!-- Right extra -->
      <div v-if="$slots.rightExtra" class="ant-tabs-extra ant-tabs-extra-right">
        <slot name="rightExtra" />
      </div>
    </div>

    <!-- Tab content -->
    <div class="ant-tabs-content-holder">
      <div class="ant-tabs-content">
        <!-- Items-based content -->
        <template v-if="props.items">
          <div
            v-for="tab in resolvedTabs"
            v-show="tab.key === mergedActiveKey"
            :key="tab.key"
            :class="['ant-tabs-tabpane', { 'ant-tabs-tabpane-active': tab.key === mergedActiveKey }]"
            role="tabpanel"
            :aria-hidden="tab.key !== mergedActiveKey"
          >
            <template v-if="shouldRenderPane(tab)">
              <component :is="() => tab.children" v-if="isVNode(tab.children)" />
              <template v-else>{{ tab.children }}</template>
            </template>
          </div>
        </template>
        <!-- Slot-based content (TabPane children) -->
        <template v-else>
          <slot />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  provide,
  onMounted,
  nextTick,
  useSlots,
  isVNode,
  getCurrentInstance,
} from 'vue'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons-vue'
import type {
  TabsProps,
  TabsEmits,
  TabsSlots,
  InternalTab,
  TabItem,
  TabsContext,
} from './types'
import { tabsDefaultProps, TABS_KEY } from './types'

defineOptions({ name: 'ATabs' })

const props = withDefaults(defineProps<TabsProps>(), tabsDefaultProps)
const emit = defineEmits<TabsEmits>()
defineSlots<TabsSlots>()
const slots = useSlots()

const navWrapRef = ref<HTMLElement | null>(null)
const navListRef = ref<HTMLElement | null>(null)

// --- Active key ---
const instance = getCurrentInstance()!
const isControlled = computed(() => {
  const rawProps = instance.vnode.props || {}
  return 'activeKey' in rawProps || 'active-key' in rawProps
})

const internalActiveKey = ref<string | number>('')

const mergedActiveKey = computed(() => {
  if (isControlled.value) {
    return props.activeKey ?? ''
  }
  return internalActiveKey.value
})

// Initialize default active key
onMounted(() => {
  if (!isControlled.value) {
    if (props.defaultActiveKey != null) {
      internalActiveKey.value = props.defaultActiveKey
    } else if (resolvedTabs.value.length > 0) {
      // Find first non-disabled tab
      const first = resolvedTabs.value.find((t) => !t.disabled)
      if (first) internalActiveKey.value = first.key
    }
  }
})

// --- TabPane registration (for slot-based usage) ---
const registeredPanes = ref<Map<string | number, InternalTab>>(new Map())

provide(TABS_KEY, {
  activeKey: mergedActiveKey,
  registerPane: (key: string | number) => {
    // handled by TabPane via provide/inject
  },
  unregisterPane: (key: string | number) => {
    registeredPanes.value.delete(key)
  },
  destroyInactiveTabPane: computed(() => props.destroyInactiveTabPane),
})

// --- Resolved tabs ---
const resolvedTabs = computed<(InternalTab & { children?: any })[]>(() => {
  if (props.items) {
    return props.items.map((item) => ({
      key: item.key,
      label: item.label ?? String(item.key),
      disabled: item.disabled,
      closable: item.closable,
      forceRender: item.forceRender,
      children: item.children,
    }))
  }
  // For slot-based usage, tabs come from registered panes
  return Array.from(registeredPanes.value.values())
})

// --- Layout ---
const isHorizontal = computed(() => props.tabPosition === 'top' || props.tabPosition === 'bottom')

// --- Tab classes ---
const tabsClasses = computed(() => [
  'ant-tabs',
  `ant-tabs-${props.tabPosition}`,
  `ant-tabs-${props.type}`,
  `ant-tabs-${props.size}`,
  {
    'ant-tabs-centered': props.centered,
  },
])

const navClasses = computed(() => ['ant-tabs-nav'])

function tabClasses(tab: InternalTab) {
  return [
    'ant-tabs-tab',
    {
      'ant-tabs-tab-active': tab.key === mergedActiveKey.value,
      'ant-tabs-tab-disabled': tab.disabled,
    },
  ]
}

// --- Ink bar ---
const inkBarStyle = ref<Record<string, string>>({})

function updateInkBar() {
  if (props.type !== 'line' || !navListRef.value) return

  const activeTab = navListRef.value.querySelector('.ant-tabs-tab-active') as HTMLElement
  if (!activeTab) {
    inkBarStyle.value = { width: '0', transform: 'translateX(0)' }
    return
  }

  if (isHorizontal.value) {
    inkBarStyle.value = {
      width: `${activeTab.offsetWidth}px`,
      transform: `translateX(${activeTab.offsetLeft}px)`,
    }
  } else {
    inkBarStyle.value = {
      height: `${activeTab.offsetHeight}px`,
      transform: `translateY(${activeTab.offsetTop}px)`,
    }
  }
}

watch(mergedActiveKey, () => {
  nextTick(updateInkBar)
})

onMounted(() => {
  nextTick(updateInkBar)
})

// --- Should render pane ---
function shouldRenderPane(tab: InternalTab & { forceRender?: boolean }) {
  if (tab.forceRender) return true
  if (props.destroyInactiveTabPane) {
    return tab.key === mergedActiveKey.value
  }
  return true
}

// --- Handlers ---
function setActiveKey(key: string | number) {
  if (!isControlled.value) {
    internalActiveKey.value = key
  }
  emit('update:activeKey', key)
  emit('change', key)
}

function onTabClick(tab: InternalTab, event: MouseEvent | KeyboardEvent) {
  if (tab.disabled) return
  emit('tabClick', tab.key, event)
  if (tab.key !== mergedActiveKey.value) {
    setActiveKey(tab.key)
  }
}

function onAdd() {
  emit('edit', '', 'add')
}

function onRemove(key: string | number) {
  emit('edit', key, 'remove')
}

// --- Expose for TabPane registration ---
function _registerPane(tab: InternalTab) {
  registeredPanes.value.set(tab.key, tab)
  nextTick(updateInkBar)
}

function _unregisterPane(key: string | number) {
  registeredPanes.value.delete(key)
}

defineExpose({
  _registerPane,
  _unregisterPane,
})
</script>
