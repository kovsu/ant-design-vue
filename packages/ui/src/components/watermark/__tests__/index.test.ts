import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Watermark from '../Watermark.vue'

describe('Watermark', () => {
  it('should render correctly', () => {
    const wrapper = mount(Watermark, {
      props: { content: 'Test Watermark' },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with ant-watermark class', () => {
    const wrapper = mount(Watermark, {
      props: { content: 'Test' },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.find('.ant-watermark').exists()).toBe(true)
  })

  it('has relative positioning for watermark overlay', () => {
    const wrapper = mount(Watermark, {
      props: { content: 'Test' },
      slots: { default: '<div>Content</div>' },
    })
    const container = wrapper.find('.ant-watermark')
    expect(container.attributes('style')).toContain('position: relative')
  })

  it('renders slot content', () => {
    const wrapper = mount(Watermark, {
      props: { content: 'Test' },
      slots: { default: '<div class="inner">Hello</div>' },
    })
    expect(wrapper.find('.inner').exists()).toBe(true)
    expect(wrapper.find('.inner').text()).toBe('Hello')
  })

  it('accepts string content', () => {
    const wrapper = mount(Watermark, {
      props: { content: 'Single Line' },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.vm).toBeDefined()
  })

  it('accepts array content for multi-line', () => {
    const wrapper = mount(Watermark, {
      props: { content: ['Line 1', 'Line 2'] },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.vm).toBeDefined()
  })

  it('accepts font configuration', () => {
    const wrapper = mount(Watermark, {
      props: {
        content: 'Test',
        font: { color: 'red', fontSize: 20, fontWeight: 'bold' },
      },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.vm).toBeDefined()
  })

  it('accepts custom rotation', () => {
    const wrapper = mount(Watermark, {
      props: { content: 'Test', rotate: -45 },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.vm).toBeDefined()
  })

  it('accepts custom gap', () => {
    const wrapper = mount(Watermark, {
      props: { content: 'Test', gap: [200, 200] as [number, number] },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.vm).toBeDefined()
  })

  it('accepts custom offset', () => {
    const wrapper = mount(Watermark, {
      props: { content: 'Test', offset: [50, 50] as [number, number] },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.vm).toBeDefined()
  })

  it('accepts zIndex prop', () => {
    const wrapper = mount(Watermark, {
      props: { content: 'Test', zIndex: 100 },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.vm).toBeDefined()
  })

  it('accepts image prop', () => {
    const wrapper = mount(Watermark, {
      props: { image: 'https://example.com/logo.png' },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.vm).toBeDefined()
  })

  it('accepts width and height props', () => {
    const wrapper = mount(Watermark, {
      props: { content: 'Test', width: 200, height: 100 },
      slots: { default: '<div>Content</div>' },
    })
    expect(wrapper.vm).toBeDefined()
  })
})
