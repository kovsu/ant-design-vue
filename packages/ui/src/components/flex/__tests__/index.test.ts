import { describe, expect, it } from 'vitest'
import { Flex } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'

describe('Flex', () => {
  it('should render correctly', () => {
    const wrapper = mount(Flex, {
      slots: { default: '<div>test</div>' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders as div by default', () => {
    const wrapper = mount(Flex, {
      slots: { default: '<span>child</span>' },
    })
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes('ant-flex')).toBe(true)
  })

  it('supports component prop to change tag', () => {
    const wrapper = mount(Flex, {
      props: { component: 'section' },
      slots: { default: '<div>test</div>' },
    })
    expect(wrapper.element.tagName).toBe('SECTION')
  })

  it('supports vertical prop', () => {
    const wrapper = mount(Flex, {
      props: { vertical: true },
      slots: { default: '<div>test</div>' },
    })
    expect(wrapper.classes('ant-flex-vertical')).toBe(true)
  })

  it('supports justify prop via inline style', () => {
    const wrapper = mount(Flex, {
      props: { justify: 'center' },
      slots: { default: '<div>test</div>' },
    })
    expect(wrapper.element.style.justifyContent).toBe('center')
  })

  it('supports align prop via inline style', () => {
    const wrapper = mount(Flex, {
      props: { align: 'flex-end' },
      slots: { default: '<div>test</div>' },
    })
    expect(wrapper.element.style.alignItems).toBe('flex-end')
  })

  it('supports flex prop via inline style', () => {
    const wrapper = mount(Flex, {
      props: { flex: '0 1 auto' },
      slots: { default: '<div>test</div>' },
    })
    expect(wrapper.element.style.flex).toBe('0 1 auto')
  })

  describe('wrap prop', () => {
    it('supports boolean true', () => {
      const wrapper = mount(Flex, {
        props: { wrap: true },
        slots: { default: '<div>test</div>' },
      })
      expect(wrapper.element.style.flexWrap).toBe('wrap')
    })

    it('supports string value', () => {
      const wrapper = mount(Flex, {
        props: { wrap: 'wrap-reverse' },
        slots: { default: '<div>test</div>' },
      })
      expect(wrapper.element.style.flexWrap).toBe('wrap-reverse')
    })
  })

  describe('gap prop', () => {
    it('supports preset "small"', () => {
      const wrapper = mount(Flex, {
        props: { gap: 'small' },
        slots: { default: '<div>test</div>' },
      })
      expect(wrapper.element.style.gap).toBe('8px')
    })

    it('supports preset "middle"', () => {
      const wrapper = mount(Flex, {
        props: { gap: 'middle' },
        slots: { default: '<div>test</div>' },
      })
      expect(wrapper.element.style.gap).toBe('16px')
    })

    it('supports preset "large"', () => {
      const wrapper = mount(Flex, {
        props: { gap: 'large' },
        slots: { default: '<div>test</div>' },
      })
      expect(wrapper.element.style.gap).toBe('32px')
    })

    it('supports numeric string as px', () => {
      const wrapper = mount(Flex, {
        props: { gap: '100' },
        slots: { default: '<div>test</div>' },
      })
      expect(wrapper.element.style.gap).toBe('100px')
    })

    it('supports CSS value string', () => {
      const wrapper = mount(Flex, {
        props: { gap: '2rem' },
        slots: { default: '<div>test</div>' },
      })
      expect(wrapper.element.style.gap).toBe('2rem')
    })
  })

  it('renders slot content', () => {
    const wrapper = mount(Flex, {
      slots: { default: '<span class="child">hello</span>' },
    })
    expect(wrapper.find('.child').text()).toBe('hello')
  })
})
