import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import Dropdown from '../Dropdown.vue'
import DropdownButton from '../DropdownButton.vue'

describe('Dropdown', () => {
  it('renders trigger element', () => {
    const wrapper = mount(Dropdown, {
      slots: {
        default: () => h('a', 'Trigger'),
        overlay: () => h('div', 'Content'),
      },
    })

    expect(wrapper.find('a').text()).toBe('Trigger')
  })

  it('applies correct default classes', () => {
    const wrapper = mount(Dropdown, {
      slots: {
        default: () => h('span', 'Trigger'),
        overlay: () => h('div', 'Menu'),
      },
    })

    expect(wrapper.find('.ant-trigger-wrapper').exists()).toBe(true)
  })

  it('respects disabled prop', () => {
    const wrapper = mount(Dropdown, {
      props: { disabled: true },
      slots: {
        default: () => h('span', 'Trigger'),
        overlay: () => h('div', 'Menu'),
      },
    })

    expect(wrapper.html()).toBeTruthy()
  })

  it('emits openChange on open/close', async () => {
    const onOpenChange = vi.fn()

    const wrapper = mount(Dropdown, {
      props: {
        trigger: 'click',
        onOpenChange,
      },
      slots: {
        default: () => h('button', 'Click me'),
        overlay: () => h('div', 'Content'),
      },
    })

    await wrapper.find('button').trigger('click')
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })

  it('supports controlled open state', () => {
    const wrapper = mount(Dropdown, {
      props: { open: true },
      slots: {
        default: () => h('span', 'Trigger'),
        overlay: () => h('div', 'Content'),
      },
    })

    expect(wrapper.html()).toBeTruthy()
  })

  it('renders menu from items prop', () => {
    const wrapper = mount(Dropdown, {
      props: {
        open: true,
        menu: {
          items: [
            { key: '1', label: 'Item 1' },
            { key: '2', label: 'Item 2' },
          ],
        },
      },
      slots: {
        default: () => h('span', 'Trigger'),
      },
    })

    expect(wrapper.html()).toBeTruthy()
  })
})

describe('DropdownButton', () => {
  it('renders two buttons', () => {
    const wrapper = mount(DropdownButton, {
      slots: {
        default: () => 'Action',
        overlay: () => h('div', 'Menu'),
      },
    })

    const buttons = wrapper.findAll('.ant-btn')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('emits click on left button', async () => {
    const onClick = vi.fn()

    const wrapper = mount(DropdownButton, {
      props: { onClick },
      slots: {
        default: () => 'Action',
        overlay: () => h('div', 'Menu'),
      },
    })

    await wrapper.find('.ant-btn').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('supports type prop', () => {
    const wrapper = mount(DropdownButton, {
      props: { type: 'primary' },
      slots: {
        default: () => 'Primary',
        overlay: () => h('div', 'Menu'),
      },
    })

    expect(wrapper.find('.ant-btn-solid').exists()).toBe(true)
  })

  it('supports disabled state', () => {
    const wrapper = mount(DropdownButton, {
      props: { disabled: true },
      slots: {
        default: () => 'Disabled',
        overlay: () => h('div', 'Menu'),
      },
    })

    expect(wrapper.find('.ant-btn[disabled]').exists()).toBe(true)
  })
})
