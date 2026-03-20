import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from '../Select.vue'

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
  { value: 'disabled', label: 'Disabled', disabled: true },
]

describe('Select', () => {
  it('renders with placeholder', () => {
    const wrapper = mount(Select, {
      props: { options, placeholder: 'Please select' },
    })
    expect(wrapper.find('.ant-select').exists()).toBe(true)
    expect(wrapper.find('.ant-select-selection-placeholder').text()).toBe('Please select')
  })

  it('renders selected value', () => {
    const wrapper = mount(Select, {
      props: { options, value: 'lucy' },
    })
    expect(wrapper.find('.ant-select-selection-item').text()).toBe('Lucy')
  })

  it('applies size classes', () => {
    const small = mount(Select, { props: { options, size: 'small' } })
    const large = mount(Select, { props: { options, size: 'large' } })
    expect(small.find('.ant-select-sm').exists()).toBe(true)
    expect(large.find('.ant-select-lg').exists()).toBe(true)
  })

  it('applies disabled state', () => {
    const wrapper = mount(Select, { props: { options, disabled: true } })
    expect(wrapper.find('.ant-select-disabled').exists()).toBe(true)
  })

  it('applies status classes', () => {
    const error = mount(Select, { props: { options, status: 'error' } })
    const warning = mount(Select, { props: { options, status: 'warning' } })
    expect(error.find('.ant-select-status-error').exists()).toBe(true)
    expect(warning.find('.ant-select-status-warning').exists()).toBe(true)
  })

  it('renders multiple mode with tags', () => {
    const wrapper = mount(Select, {
      props: { options, mode: 'multiple', value: ['jack', 'lucy'] },
    })
    expect(wrapper.find('.ant-select-multiple').exists()).toBe(true)
    const items = wrapper.findAll('.ant-select-selection-item')
    expect(items.length).toBe(2)
  })

  it('shows clear button when allowClear and has value', () => {
    const wrapper = mount(Select, {
      props: { options, value: 'jack', allowClear: true },
    })
    expect(wrapper.find('.ant-select-clear').exists()).toBe(true)
  })

  it('does not show clear when no value', () => {
    const wrapper = mount(Select, {
      props: { options, allowClear: true },
    })
    expect(wrapper.find('.ant-select-clear').exists()).toBe(false)
  })

  it('shows arrow by default in single mode', () => {
    const wrapper = mount(Select, { props: { options } })
    expect(wrapper.find('.ant-select-show-arrow').exists()).toBe(true)
  })

  it('has correct single-select class', () => {
    const wrapper = mount(Select, {
      props: { options },
    })
    expect(wrapper.find('.ant-select-single').exists()).toBe(true)
  })

  it('renders borderless variant', () => {
    const wrapper = mount(Select, { props: { options, bordered: false } })
    expect(wrapper.find('.ant-select-borderless').exists()).toBe(true)
  })

  it('shows loading spinner', () => {
    const wrapper = mount(Select, { props: { options, loading: true } })
    expect(wrapper.find('.ant-select-arrow-loading').exists()).toBe(true)
  })

  it('renders grouped options', () => {
    const groupedOptions = [
      { label: 'Group A', options: [{ value: 'a1', label: 'A1' }] },
      { label: 'Group B', options: [{ value: 'b1', label: 'B1' }] },
    ]
    const wrapper = mount(Select, {
      props: { options: groupedOptions, open: true },
    })
    expect(wrapper.find('.ant-select').exists()).toBe(true)
  })

  it('supports maxTagCount in multiple mode', () => {
    const wrapper = mount(Select, {
      props: {
        options,
        mode: 'multiple',
        value: ['jack', 'lucy', 'tom'],
        maxTagCount: 2,
      },
    })
    // Should show 2 tags + overflow indicator
    const items = wrapper.findAll('.ant-select-selection-item')
    expect(items.length).toBe(3) // 2 tags + 1 overflow
  })

  it('exposes focus and blur methods', () => {
    const wrapper = mount(Select, { props: { options } })
    const vm = wrapper.vm as any
    expect(typeof vm.focus).toBe('function')
    expect(typeof vm.blur).toBe('function')
  })
})
