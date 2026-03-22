<template>
  <div>
    <a-transfer
      v-model:targetKeys="targetKeys"
      :data-source="mockData"
      :disabled="disabled"
      :show-search="showSearch"
      :filter-option="(inputValue: string, item: any) => item.title.indexOf(inputValue) !== -1"
      :show-select-all="false"
      @change="onChange"
    >
      <template
        #children="{
          direction,
          filteredItems,
          selectedKeys,
          disabled: listDisabled,
          onItemSelectAll,
          onItemSelect,
        }"
      >
        <a-table
          :row-selection="
            getRowSelection({
              disabled: listDisabled,
              selectedKeys,
              onItemSelectAll,
              onItemSelect,
            })
          "
          :columns="direction === 'left' ? leftColumns : rightColumns"
          :data-source="filteredItems"
          size="small"
          :style="{ pointerEvents: listDisabled ? 'none' : undefined }"
          :custom-row="
            ({ key, disabled: itemDisabled }: any) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return
                onItemSelect(key, !selectedKeys.includes(key))
              },
            })
          "
        />
      </template>
    </a-transfer>
    <div style="margin-top: 16px; display: flex; gap: 16px">
      <a-switch
        v-model:checked="disabled"
        un-checked-children="disabled"
        checked-children="disabled"
      />
      <a-switch
        v-model:checked="showSearch"
        un-checked-children="showSearch"
        checked-children="showSearch"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface MockItem {
  key: string
  title: string
  description: string
  disabled: boolean
}

const mockData: MockItem[] = Array.from({ length: 10 }, (_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
  disabled: i % 4 === 0,
}))

const originTargetKeys = mockData.filter((item) => +item.key % 3 > 1).map((item) => item.key)

const leftColumns = [
  { dataIndex: 'title', title: 'Name' },
  { dataIndex: 'description', title: 'Description' },
]
const rightColumns = [
  { dataIndex: 'title', title: 'Name' },
]

const targetKeys = ref<string[]>(originTargetKeys)
const disabled = ref(false)
const showSearch = ref(false)

const onChange = (nextTargetKeys: string[]) => {
  console.log('nextTargetKeys', nextTargetKeys)
}

const getRowSelection = ({
  disabled,
  selectedKeys,
  onItemSelectAll,
  onItemSelect,
}: Record<string, any>) => {
  return {
    getCheckboxProps: (item: Record<string, string | boolean>) => ({
      disabled: disabled || item.disabled,
    }),
    onSelectAll(selected: boolean, selectedRows: Record<string, string | boolean>[]) {
      const treeSelectedKeys = selectedRows
        .filter((item) => !item.disabled)
        .map(({ key }) => key)
      onItemSelectAll(treeSelectedKeys, selected)
    },
    onSelect({ key }: Record<string, string>, selected: boolean) {
      onItemSelect(key, selected)
    },
    selectedRowKeys: selectedKeys,
  }
}
</script>
