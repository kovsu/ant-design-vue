<script setup lang="ts">
import { computed, provide, useSlots, type VNode } from 'vue'
import type { DescriptionsProps, DescriptionsSlots } from './types'
import { descriptionsDefaultProps, descriptionsContextKey } from './types'

defineOptions({ name: 'ADescriptions' })
const props = withDefaults(defineProps<DescriptionsProps>(), descriptionsDefaultProps)
defineSlots<DescriptionsSlots>()
const slots = useSlots()

provide(descriptionsContextKey, {
  labelStyle: computed(() => props.labelStyle),
  contentStyle: computed(() => props.contentStyle),
})

const hasTitle = computed(() => !!props.title || !!slots.title)
const hasExtra = computed(() => !!slots.extra)

// Flatten fragments and collect DescriptionsItem VNodes
function flattenChildren(children: VNode[]): VNode[] {
  const result: VNode[] = []
  for (const child of children) {
    if (child.type === Symbol.for('v-fgt') && Array.isArray(child.children)) {
      result.push(...flattenChildren(child.children as VNode[]))
    } else {
      result.push(child)
    }
  }
  return result
}

// Arrange items into rows based on column count and span
const rows = computed(() => {
  const children = slots.default?.() || []
  const items = flattenChildren(children)

  const result: { node: VNode; span: number }[][] = []
  let currentRow: { node: VNode; span: number }[] = []
  let currentSpan = 0

  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const span = Math.min(Number(item.props?.span) || 1, props.column)
    const isLast = i === items.length - 1

    if (isLast) {
      // Last item fills remaining columns
      const remaining = props.column - currentSpan
      currentRow.push({ node: item, span: Math.max(remaining, span) })
      result.push(currentRow)
    } else if (currentSpan + span >= props.column) {
      // Item fills or overflows the row — push it and start a new row
      currentRow.push({ node: item, span: props.column - currentSpan })
      result.push(currentRow)
      currentRow = []
      currentSpan = 0
    } else {
      currentRow.push({ node: item, span })
      currentSpan += span
    }
  }

  return result
})

const classes = computed(() => ({
  'ant-descriptions': true,
  'ant-descriptions-bordered': props.bordered,
  [`ant-descriptions-${props.size}`]: props.size !== 'default',
}))
</script>

<template>
  <div :class="classes">
    <div v-if="hasTitle || hasExtra" class="ant-descriptions-header">
      <div v-if="hasTitle" class="ant-descriptions-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="hasExtra" class="ant-descriptions-extra">
        <slot name="extra" />
      </div>
    </div>
    <div class="ant-descriptions-view">
      <table>
        <tbody>
          <template v-if="layout === 'horizontal'">
            <tr v-for="(row, ri) in rows" :key="ri" class="ant-descriptions-row">
              <template v-for="(cell, ci) in row" :key="ci">
                <th
                  class="ant-descriptions-item-label"
                  :class="{ 'ant-descriptions-item-colon': colon }"
                  :style="cell.node.props?.labelStyle || labelStyle"
                >
                  <template v-if="cell.node.children && (cell.node.children as any).label">
                    <component :is="(cell.node.children as any).label" />
                  </template>
                  <template v-else>
                    {{ cell.node.props?.label || '' }}
                  </template>
                </th>
                <td
                  class="ant-descriptions-item-content"
                  :colspan="cell.span * 2 - 1"
                  :style="cell.node.props?.contentStyle || contentStyle"
                >
                  <component :is="cell.node" />
                </td>
              </template>
            </tr>
          </template>
          <template v-else>
            <!-- Vertical layout: label row then content row -->
            <template v-for="(row, ri) in rows" :key="ri">
              <tr class="ant-descriptions-row">
                <th
                  v-for="(cell, ci) in row"
                  :key="ci"
                  class="ant-descriptions-item-label"
                  :class="{ 'ant-descriptions-item-colon': colon }"
                  :colspan="cell.span"
                  :style="cell.node.props?.labelStyle || labelStyle"
                >
                  <template v-if="cell.node.children && (cell.node.children as any).label">
                    <component :is="(cell.node.children as any).label" />
                  </template>
                  <template v-else>
                    {{ cell.node.props?.label || '' }}
                  </template>
                </th>
              </tr>
              <tr class="ant-descriptions-row">
                <td
                  v-for="(cell, ci) in row"
                  :key="ci"
                  class="ant-descriptions-item-content"
                  :colspan="cell.span"
                  :style="cell.node.props?.contentStyle || contentStyle"
                >
                  <component :is="cell.node" />
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>
