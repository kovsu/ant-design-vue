<script setup lang="ts">
import { computed, ref, useSlots, getCurrentInstance } from 'vue'
import Tree from './Tree.vue'
import type {
  DirectoryTreeProps, TreeSlots,
  TreeEmits, Key, FlatNode, EventDataNode,
} from './types'
import { directoryTreeDefaultProps } from './types'
import { useFieldNames, useFlattenedTree, getAllKeys, calcRangeKeys } from './composables'

defineOptions({ name: 'ADirectoryTree', inheritAttrs: false })

const props = withDefaults(defineProps<DirectoryTreeProps>(), directoryTreeDefaultProps)
const emit = defineEmits<TreeEmits>()
defineSlots<TreeSlots>()
const slots = useSlots()

const fields = useFieldNames(() => props.fieldNames)
const treeRef = ref<InstanceType<typeof Tree> | null>(null)

// Vue boolean casting: since `false` is in the union type, Vue defaults it to false.
// Capture instance during setup to check if prop was explicitly passed.
const instance = getCurrentInstance()!
const expandAction = computed(() => {
  if (props.expandAction === false) {
    const rawProps = instance.vnode.props || {}
    if ('expandAction' in rawProps || 'expand-action' in rawProps) return false
    return 'click' // default when not explicitly set
  }
  return props.expandAction ?? 'click'
})

// Track the last-selected key for shift+click range selection
const lastSelectedKey = ref<Key | null>(null)

// Flatten for range calc (using same expand keys as the tree)
const internalExpanded = ref<Key[]>(
  props.expandedKeys
    ?? props.defaultExpandedKeys
    ?? (props.defaultExpandAll ? getAllKeys(props.treeData, fields) : []),
)

const expandedKeys = computed(() =>
  props.expandedKeys !== undefined ? props.expandedKeys : internalExpanded.value,
)

const flatForRange = useFlattenedTree(
  () => props.treeData,
  () => expandedKeys.value,
  fields,
)

// Intercept select for directory-specific behavior
function handleSelect(
  selectedKeys: Key[],
  info: { event: 'select'; selected: boolean; node: EventDataNode; selectedNodes: any[]; nativeEvent: MouseEvent },
) {
  const { nativeEvent, node } = info

  if (props.multiple) {
    if (nativeEvent.shiftKey && lastSelectedKey.value !== null) {
      // Range selection
      const rangeKeys = calcRangeKeys(flatForRange.value, lastSelectedKey.value, node.key)
      const merged = new Set([...selectedKeys, ...rangeKeys])
      const finalKeys = Array.from(merged)
      emit('update:selectedKeys', finalKeys)
      emit('select', finalKeys, { ...info, selectedNodes: [] })
    } else if (nativeEvent.ctrlKey || nativeEvent.metaKey) {
      // Toggle selection (default tree behavior is fine)
      emit('update:selectedKeys', selectedKeys)
      emit('select', selectedKeys, info)
    } else {
      // Single click without modifier: select only this node
      emit('update:selectedKeys', [node.key])
      emit('select', [node.key], { ...info, selectedNodes: [] })
    }
  } else {
    emit('update:selectedKeys', selectedKeys)
    emit('select', selectedKeys, info)
  }

  lastSelectedKey.value = node.key
}

// Expand on click/dblclick based on expandAction
function handleExpand(
  expandedKeys: Key[],
  info: { node: EventDataNode; expanded: boolean; nativeEvent: MouseEvent },
) {
  internalExpanded.value = expandedKeys
  emit('update:expandedKeys', expandedKeys)
  emit('expand', expandedKeys, info)
}

// When expandAction is 'click', also expand on select
function handleNodeSelect(
  selectedKeys: Key[],
  info: { event: 'select'; selected: boolean; node: EventDataNode; selectedNodes: any[]; nativeEvent: MouseEvent },
) {
  handleSelect(selectedKeys, info)

  // Expand on click
  if (expandAction.value === 'click' && !info.node.isLeaf) {
    const keys = [...expandedKeys.value]
    const idx = keys.indexOf(info.node.key)
    if (idx >= 0) keys.splice(idx, 1)
    else keys.push(info.node.key)

    internalExpanded.value = keys
    emit('update:expandedKeys', keys)
    emit('expand', keys, {
      node: info.node,
      expanded: !expandedKeys.value.includes(info.node.key),
      nativeEvent: info.nativeEvent,
    })
  }
}

// Pass through all other events
function handleCheck(...args: any[]) {
  emit('check', ...(args as [any, any]))
}

function handleDragstart(info: any) { emit('dragstart', info) }
function handleDragenter(info: any) { emit('dragenter', info) }
function handleDragover(info: any) { emit('dragover', info) }
function handleDragleave(info: any) { emit('dragleave', info) }
function handleDragend(info: any) { emit('dragend', info) }
function handleDrop(info: any) { emit('drop', info) }
function handleRightClick(info: any) { emit('rightClick', info) }
function handleLoad(...args: any[]) { emit('load', ...(args as [any, any])) }

const treeClasses = computed(() => ({
  'ant-tree-directory': true,
}))

defineExpose({
  scrollTo: (info: any) => treeRef.value?.scrollTo(info),
})
</script>

<template>
  <Tree
    ref="treeRef"
    v-bind="{ ...$props, showIcon: props.showIcon, blockNode: props.blockNode }"
    :class="treeClasses"
    :expanded-keys="expandedKeys"
    @select="handleNodeSelect"
    @expand="handleExpand"
    @check="handleCheck"
    @dragstart="handleDragstart"
    @dragenter="handleDragenter"
    @dragover="handleDragover"
    @dragleave="handleDragleave"
    @dragend="handleDragend"
    @drop="handleDrop"
    @right-click="handleRightClick"
    @load="handleLoad"
  >
    <template v-if="slots.title" #title="slotProps">
      <slot name="title" v-bind="slotProps" />
    </template>
    <template v-if="slots.icon || showIcon" #icon="slotProps">
      <slot name="icon" v-bind="slotProps">
        <span v-if="slotProps.isLeaf" class="ant-tree-icon-file" />
        <span v-else-if="slotProps.expanded" class="ant-tree-icon-folder-open" />
        <span v-else class="ant-tree-icon-folder" />
      </slot>
    </template>
    <template v-if="slots.switcherIcon" #switcherIcon="slotProps">
      <slot name="switcherIcon" v-bind="slotProps" />
    </template>
    <template v-if="slots.leafIcon" #leafIcon>
      <slot name="leafIcon" />
    </template>
  </Tree>
</template>
