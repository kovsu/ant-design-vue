import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'
import Popconfirm from '../Popconfirm.vue'

describe('Popconfirm', () => {
  it('should render correctly', () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?' },
      slots: { default: () => h('span', 'Delete') },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the trigger element', () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?' },
      slots: { default: () => h('span', 'Delete') },
    })
    expect(wrapper.text()).toContain('Delete')
  })

  it('shows confirmation content when open', () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?', open: true },
      slots: { default: () => h('span', 'Delete') },
    })
    expect(wrapper.find('.ant-popconfirm-title').text()).toBe('Are you sure?')
    expect(wrapper.find('.ant-popconfirm-buttons').exists()).toBe(true)
  })

  it('shows description when provided', () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?', description: 'This cannot be undone.', open: true },
      slots: { default: () => h('span', 'Delete') },
    })
    expect(wrapper.find('.ant-popconfirm-description').text()).toBe('This cannot be undone.')
  })

  it('does not show description when not provided', () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?', open: true },
      slots: { default: () => h('span', 'Delete') },
    })
    expect(wrapper.find('.ant-popconfirm-description').exists()).toBe(false)
  })

  it('shows default OK and Cancel buttons', () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?', open: true },
      slots: { default: () => h('span', 'Delete') },
    })
    const buttons = wrapper.find('.ant-popconfirm-buttons')
    expect(buttons.text()).toContain('OK')
    expect(buttons.text()).toContain('Cancel')
  })

  it('supports custom okText and cancelText', () => {
    const wrapper = mount(Popconfirm, {
      props: {
        title: 'Are you sure?',
        open: true,
        okText: 'Yes',
        cancelText: 'No',
      },
      slots: { default: () => h('span', 'Delete') },
    })
    const buttons = wrapper.find('.ant-popconfirm-buttons')
    expect(buttons.text()).toContain('Yes')
    expect(buttons.text()).toContain('No')
  })

  it('hides cancel button when showCancel is false', () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?', open: true, showCancel: false },
      slots: { default: () => h('span', 'Delete') },
    })
    const buttons = wrapper.findAll('.ant-popconfirm-buttons .ant-btn')
    // Only the OK button
    expect(buttons.length).toBe(1)
  })

  it('renders the default warning icon', () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?', open: true },
      slots: { default: () => h('span', 'Delete') },
    })
    expect(wrapper.find('.ant-popconfirm-message-icon svg').exists()).toBe(true)
  })

  it('emits confirm event', async () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?', open: true },
      slots: { default: () => h('span', 'Delete') },
    })
    const buttons = wrapper.findAll('.ant-popconfirm-buttons .ant-btn')
    const okBtn = buttons[buttons.length - 1]
    await okBtn.trigger('click')
    expect(wrapper.emitted('confirm')).toBeTruthy()
  })

  it('emits cancel event', async () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?', open: true },
      slots: { default: () => h('span', 'Delete') },
    })
    const buttons = wrapper.findAll('.ant-popconfirm-buttons .ant-btn')
    const cancelBtn = buttons[0]
    await cancelBtn.trigger('click')
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?', disabled: true },
      slots: { default: () => h('span', 'Delete') },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('supports icon slot', () => {
    const wrapper = mount(Popconfirm, {
      props: { title: 'Are you sure?', open: true },
      slots: {
        default: () => h('span', 'Delete'),
        icon: () => h('span', { class: 'custom-icon' }, '?'),
      },
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })
})
