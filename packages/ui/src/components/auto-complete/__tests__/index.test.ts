import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AutoComplete from '../AutoComplete.vue'

const options = [
  { value: 'Burns Bay Road' },
  { value: 'Downing Street' },
  { value: 'Wall Street' },
]

describe('AutoComplete', () => {
  it('renders with placeholder', () => {
    const wrapper = mount(AutoComplete, {
      props: { options, placeholder: 'Search...' },
    })
    expect(wrapper.find('.ant-select-auto-complete').exists()).toBe(true)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Search...')
  })

  it('renders input with current value', () => {
    const wrapper = mount(AutoComplete, {
      props: { options, value: 'test' },
    })
    expect((wrapper.find('input').element as HTMLInputElement).value).toBe('test')
  })

  it('applies size classes', () => {
    const small = mount(AutoComplete, { props: { options, size: 'small' } })
    const large = mount(AutoComplete, { props: { options, size: 'large' } })
    expect(small.find('.ant-select-sm').exists()).toBe(true)
    expect(large.find('.ant-select-lg').exists()).toBe(true)
  })

  it('applies disabled state', () => {
    const wrapper = mount(AutoComplete, { props: { options, disabled: true } })
    expect(wrapper.find('.ant-select-disabled').exists()).toBe(true)
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('shows clear button when allowClear and has value', () => {
    const wrapper = mount(AutoComplete, {
      props: { options, value: 'test', allowClear: true },
    })
    expect(wrapper.find('.ant-select-clear').exists()).toBe(true)
  })

  it('emits update:value on input', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(AutoComplete, {
      props: { options, 'onUpdate:value': onUpdateValue },
    })
    await wrapper.find('input').setValue('new value')
    expect(onUpdateValue).toHaveBeenCalledWith('new value')
  })

  it('exposes focus and blur methods', () => {
    const wrapper = mount(AutoComplete, { props: { options } })
    const vm = wrapper.vm as any
    expect(typeof vm.focus).toBe('function')
    expect(typeof vm.blur).toBe('function')
  })
})
