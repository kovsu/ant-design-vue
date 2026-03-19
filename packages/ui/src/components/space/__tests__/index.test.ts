import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Space, SpaceCompact } from '@ant-design-vue/ui'

describe('Space', () => {
  it('renders with ant-space class', () => {
    const wrapper = mount(Space, {
      slots: { default: '<span>a</span><span>b</span>' },
    })
    expect(wrapper.classes('ant-space')).toBe(true)
    expect(wrapper.classes('ant-space-horizontal')).toBe(true)
  })

  it('renders vertical direction', () => {
    const wrapper = mount(Space, {
      props: { direction: 'vertical' },
      slots: { default: '<span>a</span>' },
    })
    expect(wrapper.classes('ant-space-vertical')).toBe(true)
  })

  it('applies default gap (small = 8px)', () => {
    const wrapper = mount(Space, {
      slots: { default: '<span>a</span><span>b</span>' },
    })
    expect(wrapper.element.style.columnGap).toBe('8px')
    expect(wrapper.element.style.rowGap).toBe('8px')
  })

  it('supports middle size', () => {
    const wrapper = mount(Space, {
      props: { size: 'middle' },
      slots: { default: '<span>a</span>' },
    })
    expect(wrapper.element.style.columnGap).toBe('16px')
  })

  it('supports large size', () => {
    const wrapper = mount(Space, {
      props: { size: 'large' },
      slots: { default: '<span>a</span>' },
    })
    expect(wrapper.element.style.columnGap).toBe('24px')
  })

  it('supports custom number size', () => {
    const wrapper = mount(Space, {
      props: { size: 20 },
      slots: { default: '<span>a</span>' },
    })
    expect(wrapper.element.style.columnGap).toBe('20px')
  })

  it('supports array size [h, v]', () => {
    const wrapper = mount(Space, {
      props: { size: [8, 16] },
      slots: { default: '<span>a</span>' },
    })
    expect(wrapper.element.style.columnGap).toBe('8px')
    expect(wrapper.element.style.rowGap).toBe('16px')
  })

  it('supports wrap prop', () => {
    const wrapper = mount(Space, {
      props: { wrap: true },
      slots: { default: '<span>a</span>' },
    })
    expect(wrapper.element.style.flexWrap).toBe('wrap')
  })

  it('supports align prop', () => {
    const wrapper = mount(Space, {
      props: { align: 'end' },
      slots: { default: '<span>a</span>' },
    })
    expect(wrapper.classes('ant-space-align-end')).toBe(true)
  })

  it('defaults to align-center for horizontal', () => {
    const wrapper = mount(Space, {
      slots: { default: '<span>a</span>' },
    })
    expect(wrapper.classes('ant-space-align-center')).toBe(true)
  })
})

describe('SpaceCompact', () => {
  it('renders with ant-space-compact class', () => {
    const wrapper = mount(SpaceCompact, {
      slots: { default: '<button>a</button><button>b</button>' },
    })
    expect(wrapper.classes('ant-space-compact')).toBe(true)
  })

  it('supports block prop', () => {
    const wrapper = mount(SpaceCompact, {
      props: { block: true },
      slots: { default: '<button>a</button>' },
    })
    expect(wrapper.classes('ant-space-compact-block')).toBe(true)
  })

  it('supports vertical direction', () => {
    const wrapper = mount(SpaceCompact, {
      props: { direction: 'vertical' },
      slots: { default: '<button>a</button>' },
    })
    expect(wrapper.classes('ant-space-compact-vertical')).toBe(true)
  })
})
