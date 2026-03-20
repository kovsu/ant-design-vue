import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Mentions from '../Mentions.vue'

const options = [
  { value: 'afc163', label: 'afc163' },
  { value: 'zombieJ', label: 'zombieJ' },
  { value: 'yesmeck', label: 'yesmeck' },
]

describe('Mentions', () => {
  it('renders textarea with placeholder', () => {
    const wrapper = mount(Mentions, {
      props: { options, placeholder: 'Type @ to mention' },
    })
    expect(wrapper.find('.ant-mentions').exists()).toBe(true)
    expect(wrapper.find('textarea').attributes('placeholder')).toBe('Type @ to mention')
  })

  it('renders with initial value', () => {
    const wrapper = mount(Mentions, {
      props: { options, value: 'Hello @world' },
    })
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('Hello @world')
  })

  it('applies disabled state', () => {
    const wrapper = mount(Mentions, { props: { options, disabled: true } })
    expect(wrapper.find('.ant-mentions-disabled').exists()).toBe(true)
    expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
  })

  it('applies status classes', () => {
    const error = mount(Mentions, { props: { options, status: 'error' } })
    const warning = mount(Mentions, { props: { options, status: 'warning' } })
    expect(error.find('.ant-mentions-status-error').exists()).toBe(true)
    expect(warning.find('.ant-mentions-status-warning').exists()).toBe(true)
  })

  it('emits update:value on input', async () => {
    const onUpdateValue = vi.fn()
    const wrapper = mount(Mentions, {
      props: { options, 'onUpdate:value': onUpdateValue },
    })
    await wrapper.find('textarea').setValue('Hello')
    expect(onUpdateValue).toHaveBeenCalledWith('Hello')
  })

  it('supports custom rows', () => {
    const wrapper = mount(Mentions, { props: { options, rows: 3 } })
    expect(wrapper.find('textarea').attributes('rows')).toBe('3')
  })

  it('exposes focus and blur methods', () => {
    const wrapper = mount(Mentions, { props: { options } })
    const vm = wrapper.vm as any
    expect(typeof vm.focus).toBe('function')
    expect(typeof vm.blur).toBe('function')
  })
})
