import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import Popover from '../Popover.vue'

describe('Popover', () => {
  it('should render correctly', () => {
    const wrapper = mount(Popover, {
      props: { title: 'Title', content: 'Content' },
      slots: { default: () => h('span', 'Trigger') },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders the trigger element', () => {
    const wrapper = mount(Popover, {
      props: { title: 'Title', content: 'Content' },
      slots: { default: () => h('span', 'Trigger') },
    })
    expect(wrapper.text()).toContain('Trigger')
  })

  it('shows title and content when open', () => {
    const wrapper = mount(Popover, {
      props: { title: 'My Title', content: 'My Content', open: true },
      slots: { default: () => h('span', 'Trigger') },
    })
    expect(wrapper.find('.ant-popover-title').text()).toBe('My Title')
    expect(wrapper.find('.ant-popover-inner-content').text()).toBe('My Content')
  })

  it('supports title and content slots', () => {
    const wrapper = mount(Popover, {
      props: { open: true },
      slots: {
        default: () => h('span', 'Trigger'),
        title: () => h('strong', 'Slot Title'),
        content: () => h('em', 'Slot Content'),
      },
    })
    expect(wrapper.find('.ant-popover-title').html()).toContain('<strong>Slot Title</strong>')
    expect(wrapper.find('.ant-popover-inner-content').html()).toContain('<em>Slot Content</em>')
  })

  it('does not show title div when no title', () => {
    const wrapper = mount(Popover, {
      props: { content: 'Content', open: true },
      slots: { default: () => h('span', 'Trigger') },
    })
    expect(wrapper.find('.ant-popover-title').exists()).toBe(false)
  })

  it('is disabled when no title and no content', () => {
    const wrapper = mount(Popover, {
      slots: { default: () => h('span', 'Trigger') },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('emits openChange on trigger', async () => {
    const wrapper = mount(Popover, {
      props: { title: 'test', content: 'test', trigger: 'click' },
      slots: { default: () => h('span', 'Trigger') },
    })
    await wrapper.find('.ant-trigger-wrapper').trigger('click')
    expect(wrapper.emitted('update:open')).toBeTruthy()
    expect(wrapper.emitted('openChange')).toBeTruthy()
  })

  it('supports overlayClassName', () => {
    const wrapper = mount(Popover, {
      props: {
        title: 'test',
        content: 'test',
        open: true,
        overlayClassName: 'my-popover',
      },
      slots: { default: () => h('span', 'Trigger') },
    })
    expect(wrapper.find('.my-popover').exists()).toBe(true)
  })
})
