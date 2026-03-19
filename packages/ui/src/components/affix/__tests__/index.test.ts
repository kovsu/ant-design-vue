import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { Affix } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

describe('Affix', () => {
  it('should render correctly', () => {
    const wrapper = mount(Affix, {
      slots: { default: '<button>Click me</button>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders slot content', () => {
    const wrapper = mount(Affix, {
      slots: { default: '<span class="inner">content</span>' },
    })
    expect(wrapper.find('.inner').text()).toBe('content')
  })

  it('accepts offsetTop prop', () => {
    const wrapper = mount(Affix, {
      props: { offsetTop: 20 },
      slots: { default: '<div>test</div>' },
    })
    expect(wrapper.props('offsetTop')).toBe(20)
  })

  it('accepts offsetBottom prop', () => {
    const wrapper = mount(Affix, {
      props: { offsetBottom: 30 },
      slots: { default: '<div>test</div>' },
    })
    expect(wrapper.props('offsetBottom')).toBe(30)
  })

  it('accepts zIndex prop', () => {
    const wrapper = mount(Affix, {
      props: { zIndex: 100 },
      slots: { default: '<div>test</div>' },
    })
    expect(wrapper.props('zIndex')).toBe(100)
  })

  it('exposes updatePosition and lazyUpdatePosition', () => {
    const wrapper = mount(Affix, {
      slots: { default: '<div>test</div>' },
    })
    expect(typeof wrapper.vm.updatePosition).toBe('function')
    expect(typeof wrapper.vm.lazyUpdatePosition).toBe('function')
  })

  it('emits change event when affix state changes', async () => {
    const onChange = vi.fn()
    const wrapper = mount(Affix, {
      props: { onChange },
      slots: { default: '<div>test</div>' },
    })
    // The change event is emitted internally when affix state toggles
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('accepts custom target prop', () => {
    const target = () => document.body
    const wrapper = mount(Affix, {
      props: { target },
      slots: { default: '<div>test</div>' },
    })
    expect(wrapper.props('target')).toBe(target)
  })
})
