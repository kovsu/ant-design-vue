<script setup lang="ts">
import { ref } from 'vue'
import type { TreeDataNode, Key, TreeDropInfo } from '../types'

const treeData = ref<TreeDataNode[]>([
  {
    title: 'Expand to load',
    key: '0-0',
    children: [
      { title: 'Child Node 0', key: '0-0-0' },
      { title: 'Child Node 1', key: '0-0-1' },
      { title: 'Child Node 2', key: '0-0-2' },
    ],
  },
  {
    title: 'Expand to load',
    key: '0-1',
    children: [
      { title: 'Child Node 3', key: '0-1-0' },
      { title: 'Child Node 4', key: '0-1-1' },
    ],
  },
  {
    title: 'Tree Node',
    key: '0-2',
  },
])

const expandedKeys = ref<Key[]>(['0-0', '0-1'])

function onDrop(info: TreeDropInfo) {
  const dropKey = info.node.key
  const dragKey = info.dragNode.key
  const dropPos = info.dropPosition
  const dropToGap = info.dropToGap

  // Find and remove drag node
  const data = [...treeData.value]
  let dragObj: TreeDataNode | undefined

  function loop(
    nodes: TreeDataNode[],
    key: Key,
    callback: (item: TreeDataNode, index: number, arr: TreeDataNode[]) => void,
  ) {
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].key === key) {
        callback(nodes[i], i, nodes)
        return
      }
      if (nodes[i].children) {
        loop(nodes[i].children!, key, callback)
      }
    }
  }

  loop(data, dragKey, (item, index, arr) => {
    arr.splice(index, 1)
    dragObj = item
  })

  if (!dragObj) return

  if (!dropToGap) {
    // Drop on the node (add as child)
    loop(data, dropKey, (item) => {
      item.children = item.children || []
      item.children.unshift(dragObj!)
    })
  } else if (dropPos === -1) {
    // Drop before
    loop(data, dropKey, (_item, index, arr) => {
      arr.splice(index, 0, dragObj!)
    })
  } else {
    // Drop after
    loop(data, dropKey, (_item, index, arr) => {
      arr.splice(index + 1, 0, dragObj!)
    })
  }

  treeData.value = data
}
</script>

<template>
  <a-tree
    :tree-data="treeData"
    :expanded-keys="expandedKeys"
    draggable
    block-node
    @drop="onDrop"
    @expand="(keys: Key[]) => (expandedKeys = keys)"
  />
</template>
