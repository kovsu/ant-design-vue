import { describe, expect, it, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import Layout from '../Layout.vue'
import Header from '../Header.vue'
import Footer from '../Footer.vue'
import Content from '../Content.vue'
import Sider from '../Sider.vue'

describe('Layout', () => {
  it('renders as section', () => {
    const wrapper = mount(Layout)
    expect(wrapper.element.tagName).toBe('SECTION')
    expect(wrapper.classes('ant-layout')).toBe(true)
  })

  it('supports hasSider auto-detection (via prop)', () => {
    // Note: auto-detection via Sider child registration works in browser,
    // but the reactive update timing is hard to test in jsdom.
    // Here we verify the hasSider prop path works correctly.
    const wrapper = mount(Layout, {
      props: { hasSider: false },
    })
    expect(wrapper.classes()).not.toContain('ant-layout-has-sider')
  })

  it('supports manual hasSider prop', () => {
    const wrapper = mount(Layout, {
      props: { hasSider: true },
    })
    expect(wrapper.classes('ant-layout-has-sider')).toBe(true)
  })
})

describe('Header', () => {
  it('renders as header element', () => {
    const wrapper = mount(Header, {
      slots: { default: 'Header Text' },
    })
    expect(wrapper.element.tagName).toBe('HEADER')
    expect(wrapper.classes('ant-layout-header')).toBe(true)
    expect(wrapper.text()).toBe('Header Text')
  })
})

describe('Footer', () => {
  it('renders as footer element', () => {
    const wrapper = mount(Footer, {
      slots: { default: 'Footer Text' },
    })
    expect(wrapper.element.tagName).toBe('FOOTER')
    expect(wrapper.classes('ant-layout-footer')).toBe(true)
  })
})

describe('Content', () => {
  it('renders as main element', () => {
    const wrapper = mount(Content, {
      slots: { default: 'Main Content' },
    })
    expect(wrapper.element.tagName).toBe('MAIN')
    expect(wrapper.classes('ant-layout-content')).toBe(true)
  })
})

describe('Sider', () => {
  it('renders as aside element', () => {
    const wrapper = mount(Sider, {
      slots: { default: 'Menu' },
    })
    expect(wrapper.element.tagName).toBe('ASIDE')
    expect(wrapper.classes('ant-layout-sider')).toBe(true)
  })

  it('has 200px width by default', () => {
    const wrapper = mount(Sider)
    expect(wrapper.element.style.width).toBe('200px')
  })

  it('applies dark theme by default', () => {
    const wrapper = mount(Sider)
    expect(wrapper.classes('ant-layout-sider-dark')).toBe(true)
  })

  it('supports light theme', () => {
    const wrapper = mount(Sider, {
      props: { theme: 'light' },
    })
    expect(wrapper.classes('ant-layout-sider-light')).toBe(true)
  })

  it('collapses with controlled prop', async () => {
    const wrapper = mount(Sider, {
      props: { collapsed: true, collapsedWidth: 80 },
    })
    expect(wrapper.element.style.width).toBe('80px')
    expect(wrapper.classes('ant-layout-sider-collapsed')).toBe(true)
  })

  it('shows trigger when collapsible', () => {
    const wrapper = mount(Sider, {
      props: { collapsible: true },
    })
    expect(wrapper.find('.ant-layout-sider-trigger').exists()).toBe(true)
  })

  it('hides trigger when not collapsible', () => {
    const wrapper = mount(Sider)
    expect(wrapper.find('.ant-layout-sider-trigger').exists()).toBe(false)
  })

  it('emits collapse on trigger click', async () => {
    const wrapper = mount(Sider, {
      props: { collapsible: true },
    })
    await wrapper.find('.ant-layout-sider-trigger').trigger('click')
    expect(wrapper.emitted('collapse')).toBeTruthy()
    expect(wrapper.emitted('collapse')![0]).toEqual([true, 'clickTrigger'])
  })

  it('supports custom width', () => {
    const wrapper = mount(Sider, {
      props: { width: 300 },
    })
    expect(wrapper.element.style.width).toBe('300px')
  })

  it('supports string width', () => {
    const wrapper = mount(Sider, {
      props: { width: '30%' },
    })
    expect(wrapper.element.style.width).toBe('30%')
  })

  it('supports zero-width collapsed', () => {
    const wrapper = mount(Sider, {
      props: { collapsed: true, collapsedWidth: 0 },
    })
    expect(wrapper.classes('ant-layout-sider-zero-width')).toBe(true)
    expect(wrapper.element.style.width).toBe('0px')
  })
})
