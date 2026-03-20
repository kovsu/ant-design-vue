import { describe, expect, it, vi } from 'vitest'
import { Drawer } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'

const globalStubs = {
  global: {
    stubs: {
      teleport: true,
    },
  },
}

describe('Drawer', () => {
  it('should render correctly when open', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, title: 'Test Drawer' },
      slots: { default: 'Drawer content' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer').exists()).toBe(true)
    expect(wrapper.find('.ant-drawer-title').text()).toBe('Test Drawer')
    expect(wrapper.find('.ant-drawer-body').text()).toBe('Drawer content')
  })

  it('should not render when not open', () => {
    const wrapper = mount(Drawer, {
      props: { open: false, title: 'Hidden' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer').exists()).toBe(false)
  })

  it('defaults to right placement', () => {
    const wrapper = mount(Drawer, {
      props: { open: true },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer').classes()).toContain('ant-drawer-right')
  })

  it('applies left placement', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, placement: 'left' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer').classes()).toContain('ant-drawer-left')
  })

  it('applies top placement', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, placement: 'top' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer').classes()).toContain('ant-drawer-top')
  })

  it('applies bottom placement', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, placement: 'bottom' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer').classes()).toContain('ant-drawer-bottom')
  })

  it('renders close button when closable', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, closable: true },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer-close').exists()).toBe(true)
  })

  it('hides close button when closable is false', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, closable: false },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer-close').exists()).toBe(false)
  })

  it('emits close when close button clicked', async () => {
    const wrapper = mount(Drawer, {
      props: { open: true, closable: true },
      ...globalStubs,
    })
    await wrapper.find('.ant-drawer-close').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
  })

  it('renders mask', () => {
    const wrapper = mount(Drawer, {
      props: { open: true },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer-mask').exists()).toBe(true)
  })

  it('hides mask when mask is false', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, mask: false },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer-mask').exists()).toBe(false)
  })

  it('applies custom width', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, width: 500 },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer').attributes('style')).toContain('width: 500px')
  })

  it('applies custom height for top placement', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, placement: 'top', height: 300 },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer').attributes('style')).toContain('height: 300px')
  })

  it('renders title slot', () => {
    const wrapper = mount(Drawer, {
      props: { open: true },
      slots: { title: '<span class="custom-title">Custom Title</span>' },
      ...globalStubs,
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  it('renders extra slot', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, title: 'Test' },
      slots: { extra: '<button class="extra-btn">Extra</button>' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer-extra').exists()).toBe(true)
    expect(wrapper.find('.extra-btn').exists()).toBe(true)
  })

  it('renders footer slot', () => {
    const wrapper = mount(Drawer, {
      props: { open: true },
      slots: { footer: '<button class="footer-btn">Footer</button>' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer-footer').exists()).toBe(true)
    expect(wrapper.find('.footer-btn').exists()).toBe(true)
  })

  it('hides footer when no slot provided', () => {
    const wrapper = mount(Drawer, {
      props: { open: true },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer-footer').exists()).toBe(false)
  })

  it('has proper aria attributes', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, title: 'Accessible Drawer' },
      ...globalStubs,
    })
    const dialog = wrapper.find('[role="dialog"]')
    expect(dialog.exists()).toBe(true)
    expect(dialog.attributes('aria-modal')).toBe('true')
  })

  it('applies rootClassName', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, rootClassName: 'my-drawer' },
      ...globalStubs,
    })
    expect(wrapper.find('.my-drawer').exists()).toBe(true)
  })

  it('applies bodyStyle', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, bodyStyle: { padding: '48px' } },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer-body').attributes('style')).toContain('padding: 48px')
  })

  it('uses default size (378px)', () => {
    const wrapper = mount(Drawer, {
      props: { open: true },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer').attributes('style')).toContain('width: 378px')
  })

  it('uses large size (736px)', () => {
    const wrapper = mount(Drawer, {
      props: { open: true, size: 'large' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-drawer').attributes('style')).toContain('width: 736px')
  })
})
