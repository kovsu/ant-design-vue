import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TreeSelect from '../TreeSelect.vue'

const treeData = [
  {
    value: 'parent-1',
    label: 'Parent 1',
    children: [
      { value: 'child-1-1', label: 'Child 1-1' },
      { value: 'child-1-2', label: 'Child 1-2' },
    ],
  },
  {
    value: 'parent-2',
    label: 'Parent 2',
    children: [
      { value: 'child-2-1', label: 'Child 2-1' },
    ],
  },
]

describe('TreeSelect', () => {
  it('renders with placeholder', () => {
    const wrapper = mount(TreeSelect, {
      props: { treeData, placeholder: 'Please select' },
    })
    expect(wrapper.find('.ant-tree-select').exists()).toBe(true)
    expect(wrapper.find('.ant-select-selection-placeholder').text()).toBe('Please select')
  })

  it('renders selected value', () => {
    const wrapper = mount(TreeSelect, {
      props: { treeData, value: 'child-1-1' },
    })
    expect(wrapper.find('.ant-select-selection-item').text()).toBe('Child 1-1')
  })

  it('applies disabled state', () => {
    const wrapper = mount(TreeSelect, { props: { treeData, disabled: true } })
    expect(wrapper.find('.ant-select-disabled').exists()).toBe(true)
  })

  it('applies size classes', () => {
    const small = mount(TreeSelect, { props: { treeData, size: 'small' } })
    const large = mount(TreeSelect, { props: { treeData, size: 'large' } })
    expect(small.find('.ant-select-sm').exists()).toBe(true)
    expect(large.find('.ant-select-lg').exists()).toBe(true)
  })

  it('shows clear button when allowClear and has value', () => {
    const wrapper = mount(TreeSelect, {
      props: { treeData, value: 'child-1-1', allowClear: true },
    })
    expect(wrapper.find('.ant-select-clear').exists()).toBe(true)
  })

  it('renders tree nodes when open', () => {
    const wrapper = mount(TreeSelect, {
      props: { treeData, open: true, treeDefaultExpandAll: true },
    })
    const nodes = wrapper.findAll('.ant-tree-select-tree-node')
    expect(nodes.length).toBeGreaterThanOrEqual(1)
  })

  it('supports multiple mode', () => {
    const wrapper = mount(TreeSelect, {
      props: { treeData, multiple: true, value: ['child-1-1', 'child-2-1'] },
    })
    expect(wrapper.find('.ant-select-multiple').exists()).toBe(true)
    const tags = wrapper.findAll('.ant-select-selection-item')
    expect(tags.length).toBe(2)
  })

  it('supports treeCheckable mode', () => {
    const wrapper = mount(TreeSelect, {
      props: { treeData, treeCheckable: true, open: true, treeDefaultExpandAll: true },
    })
    expect(wrapper.find('.ant-select-multiple').exists()).toBe(true)
    expect(wrapper.findAll('.ant-tree-select-tree-checkbox').length).toBeGreaterThan(0)
  })

  it('applies status classes', () => {
    const error = mount(TreeSelect, { props: { treeData, status: 'error' } })
    const warning = mount(TreeSelect, { props: { treeData, status: 'warning' } })
    expect(error.find('.ant-select-status-error').exists()).toBe(true)
    expect(warning.find('.ant-select-status-warning').exists()).toBe(true)
  })

  it('exposes focus and blur methods', () => {
    const wrapper = mount(TreeSelect, { props: { treeData } })
    const vm = wrapper.vm as any
    expect(typeof vm.focus).toBe('function')
    expect(typeof vm.blur).toBe('function')
  })
})
