import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Spin from '../Spin.vue'

describe('Spin', () => {
  it('should render correctly', () => {
    const wrapper = mount(Spin)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders spinner with 4 dot items by default', () => {
    const wrapper = mount(Spin)
    expect(wrapper.classes('ant-spin')).toBe(true)
    expect(wrapper.classes('ant-spin-spinning')).toBe(true)
    expect(wrapper.findAll('.ant-spin-dot-item')).toHaveLength(4)
  })

  it('applies ant-spin-sm class for small size', () => {
    const wrapper = mount(Spin, {
      props: { size: 'small' },
    })
    expect(wrapper.classes('ant-spin-sm')).toBe(true)
  })

  it('applies ant-spin-lg class for large size', () => {
    const wrapper = mount(Spin, {
      props: { size: 'large' },
    })
    expect(wrapper.classes('ant-spin-lg')).toBe(true)
  })

  it('does not apply size class for default size', () => {
    const wrapper = mount(Spin, {
      props: { size: 'default' },
    })
    expect(wrapper.classes('ant-spin-sm')).toBe(false)
    expect(wrapper.classes('ant-spin-lg')).toBe(false)
  })

  it('hides spinner when spinning is false', () => {
    const wrapper = mount(Spin, {
      props: { spinning: false },
    })
    expect(wrapper.classes('ant-spin-spinning')).toBe(false)
  })

  it('renders tip text', () => {
    const wrapper = mount(Spin, {
      props: { tip: 'Loading...' },
    })
    expect(wrapper.find('.ant-spin-text').exists()).toBe(true)
    expect(wrapper.find('.ant-spin-text').text()).toBe('Loading...')
    expect(wrapper.classes('ant-spin-show-text')).toBe(true)
  })

  it('renders tip via slot', () => {
    const wrapper = mount(Spin, {
      slots: { tip: 'Custom tip' },
    })
    expect(wrapper.find('.ant-spin-text').text()).toBe('Custom tip')
  })

  it('does not render tip text when no tip prop or slot', () => {
    const wrapper = mount(Spin)
    expect(wrapper.find('.ant-spin-text').exists()).toBe(false)
    expect(wrapper.classes('ant-spin-show-text')).toBe(false)
  })

  describe('nested mode', () => {
    it('wraps children with nested-loading container', () => {
      const wrapper = mount(Spin, {
        slots: { default: '<div class="content">Hello</div>' },
      })
      expect(wrapper.classes('ant-spin-nested-loading')).toBe(true)
      expect(wrapper.find('.ant-spin-container').exists()).toBe(true)
      expect(wrapper.find('.content').text()).toBe('Hello')
    })

    it('applies blur when spinning in nested mode', () => {
      const wrapper = mount(Spin, {
        props: { spinning: true },
        slots: { default: '<div>Content</div>' },
      })
      expect(wrapper.find('.ant-spin-container').classes('ant-spin-blur')).toBe(true)
      expect(wrapper.find('.ant-spin-nested-loading-blur').exists()).toBe(true)
    })

    it('does not apply blur when not spinning in nested mode', async () => {
      const wrapper = mount(Spin, {
        props: { spinning: false },
        slots: { default: '<div>Content</div>' },
      })
      expect(wrapper.find('.ant-spin-container').classes('ant-spin-blur')).toBe(false)
      expect(wrapper.find('.ant-spin-nested-loading-blur').exists()).toBe(false)
    })
  })

  describe('delay', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('does not show spinner immediately when delay is set', () => {
      const wrapper = mount(Spin, {
        props: { spinning: true, delay: 500 },
      })
      expect(wrapper.classes('ant-spin-spinning')).toBe(false)
    })

    it('shows spinner after delay', async () => {
      const wrapper = mount(Spin, {
        props: { spinning: true, delay: 500 },
      })
      expect(wrapper.classes('ant-spin-spinning')).toBe(false)

      vi.advanceTimersByTime(500)
      await nextTick()

      expect(wrapper.classes('ant-spin-spinning')).toBe(true)
    })

    it('hides immediately when spinning becomes false', async () => {
      const wrapper = mount(Spin, {
        props: { spinning: true, delay: 500 },
      })

      vi.advanceTimersByTime(500)
      await nextTick()
      expect(wrapper.classes('ant-spin-spinning')).toBe(true)

      await wrapper.setProps({ spinning: false })
      expect(wrapper.classes('ant-spin-spinning')).toBe(false)
    })

    it('cancels pending delay when spinning becomes false before delay', async () => {
      const wrapper = mount(Spin, {
        props: { spinning: true, delay: 500 },
      })

      // Spinning becomes false before the 500ms delay
      await wrapper.setProps({ spinning: false })
      vi.advanceTimersByTime(500)
      await nextTick()

      expect(wrapper.classes('ant-spin-spinning')).toBe(false)
    })
  })

  describe('custom indicator', () => {
    it('renders custom indicator via slot', () => {
      const wrapper = mount(Spin, {
        slots: {
          indicator: '<span class="custom-indicator">Loading</span>',
        },
      })
      expect(wrapper.find('.custom-indicator').exists()).toBe(true)
      expect(wrapper.find('.ant-spin-dot').exists()).toBe(false)
    })
  })
})
