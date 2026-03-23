<template>
  <div>
    <a-transfer
      v-model:target-keys="targetKeys"
      class="tree-transfer"
      :data-source="dataSource"
      :render="(item: any) => item.title"
      :show-select-all="false"
    >
      <template #children="{ direction, selectedKeys, onItemSelect }">
        <a-tree
          v-if="direction === 'left'"
          block-node
          checkable
          check-strictly
          default-expand-all
          :checked-keys="[...selectedKeys, ...targetKeys]"
          :tree-data="treeData"
          @check="
            (_: any, props: any) => {
              onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect)
            }
          "
          @select="
            (_: any, props: any) => {
              onChecked(props, [...selectedKeys, ...targetKeys], onItemSelect)
            }
          "
        />
      </template>
    </a-transfer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface TreeNode {
  key: string
  title: string
  children?: TreeNode[]
  disabled?: boolean
}

const tData: TreeNode[] = [
  { key: '0-0', title: '0-0' },
  {
    key: '0-1',
    title: '0-1',
    children: [
      { key: '0-1-0', title: '0-1-0' },
      { key: '0-1-1', title: '0-1-1' },
    ],
  },
  { key: '0-2', title: '0-2' },
]

const transferDataSource: TreeNode[] = []
function flatten(list: TreeNode[] = []) {
  list.forEach((item) => {
    transferDataSource.push(item)
    flatten(item.children)
  })
}
flatten(JSON.parse(JSON.stringify(tData)))

function isChecked(selectedKeys: (string | number)[], eventKey: string | number) {
  return selectedKeys.indexOf(eventKey) !== -1
}

function handleTreeData(treeNodes: TreeNode[], targetKeys: string[] = []): TreeNode[] {
  return treeNodes.map(({ children, ...props }) => ({
    ...props,
    disabled: targetKeys.includes(props.key),
    children: handleTreeData(children ?? [], targetKeys),
  }))
}

const targetKeys = ref<string[]>([])
const dataSource = ref(transferDataSource)

const treeData = computed(() => {
  return handleTreeData(tData, targetKeys.value)
})

const onChecked = (
  e: any,
  checkedKeys: string[],
  onItemSelect: (key: any, checked: boolean) => void,
) => {
  const { eventKey } = e.node
  onItemSelect(eventKey, !isChecked(checkedKeys, eventKey))
}
</script>

<style scoped>
.tree-transfer :deep(.ant-transfer-list:first-child) {
  width: 50%;
  flex: none;
}
</style>
