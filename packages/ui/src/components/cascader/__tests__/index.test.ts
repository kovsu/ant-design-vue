import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Cascader from '../Cascader.vue'

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          { value: 'xihu', label: 'West Lake' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          { value: 'zhonghuamen', label: 'Zhonghua Gate' },
        ],
      },
    ],
  },
]

describe('Cascader', () => {
  it('renders with placeholder', () => {
    const wrapper = mount(Cascader, {
      props: { options, placeholder: 'Please select' },
    })
    expect(wrapper.find('.ant-cascader').exists()).toBe(true)
    expect(wrapper.find('.ant-select-selection-placeholder').text()).toBe('Please select')
  })

  it('renders selected path', () => {
    const wrapper = mount(Cascader, {
      props: { options, value: ['zhejiang', 'hangzhou', 'xihu'] },
    })
    expect(wrapper.find('.ant-select-selection-item').text()).toBe('Zhejiang / Hangzhou / West Lake')
  })

  it('applies disabled state', () => {
    const wrapper = mount(Cascader, { props: { options, disabled: true } })
    expect(wrapper.find('.ant-select-disabled').exists()).toBe(true)
  })

  it('applies size classes', () => {
    const small = mount(Cascader, { props: { options, size: 'small' } })
    const large = mount(Cascader, { props: { options, size: 'large' } })
    expect(small.find('.ant-select-sm').exists()).toBe(true)
    expect(large.find('.ant-select-lg').exists()).toBe(true)
  })

  it('shows clear button when allowClear and has value', () => {
    const wrapper = mount(Cascader, {
      props: { options, value: ['zhejiang', 'hangzhou', 'xihu'], allowClear: true },
    })
    expect(wrapper.find('.ant-select-clear').exists()).toBe(true)
  })

  it('renders cascading menus when open', () => {
    const wrapper = mount(Cascader, {
      props: { options, open: true },
    })
    const menus = wrapper.findAll('.ant-cascader-menu')
    expect(menus.length).toBeGreaterThanOrEqual(1)
  })

  it('applies status classes', () => {
    const error = mount(Cascader, { props: { options, status: 'error' } })
    const warning = mount(Cascader, { props: { options, status: 'warning' } })
    expect(error.find('.ant-select-status-error').exists()).toBe(true)
    expect(warning.find('.ant-select-status-warning').exists()).toBe(true)
  })

  it('renders arrow by default', () => {
    const wrapper = mount(Cascader, { props: { options } })
    expect(wrapper.find('.ant-select-show-arrow').exists()).toBe(true)
  })

  it('supports multiple mode', () => {
    const wrapper = mount(Cascader, {
      props: { options, multiple: true, value: [['zhejiang', 'hangzhou', 'xihu']] },
    })
    expect(wrapper.find('.ant-select-multiple').exists()).toBe(true)
  })

  it('exposes focus and blur methods', () => {
    const wrapper = mount(Cascader, { props: { options } })
    const vm = wrapper.vm as any
    expect(typeof vm.focus).toBe('function')
    expect(typeof vm.blur).toBe('function')
  })
})
