import { describe, expect, it, vi } from 'vitest'
import { Collapse, CollapsePanel } from '../index'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'

function mountCollapse(options: {
  props?: Record<string, any>
  panels?: Array<{ key: string | number; header: string; content: string; props?: Record<string, any> }>
} = {}) {
  const {
    props = {},
    panels = [
      { key: '1', header: 'Panel 1', content: 'Content 1' },
      { key: '2', header: 'Panel 2', content: 'Content 2' },
      { key: '3', header: 'Panel 3', content: 'Content 3' },
    ],
  } = options

  return mount(Collapse, {
    props,
    slots: {
      default: () =>
        panels.map((panel) =>
          h(
            CollapsePanel,
            { panelKey: panel.key, header: panel.header, ...panel.props },
            { default: () => panel.content },
          ),
        ),
    },
  })
}

describe('Collapse', () => {
  it('should render correctly', () => {
    const wrapper = mountCollapse()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with correct base classes', () => {
    const wrapper = mountCollapse()
    expect(wrapper.find('.ant-collapse').exists()).toBe(true)
    expect(wrapper.find('.ant-collapse').attributes('role')).toBe('tablist')
  })

  it('renders all panels', () => {
    const wrapper = mountCollapse()
    expect(wrapper.findAll('.ant-collapse-item')).toHaveLength(3)
  })

  it('toggles a panel on click', async () => {
    const wrapper = mountCollapse()
    const headers = wrapper.findAll('.ant-collapse-header')

    // Panel 1 should be collapsed initially
    expect(wrapper.findAll('.ant-collapse-item-active')).toHaveLength(0)

    // Click panel 1
    await headers[0].trigger('click')
    expect(wrapper.findAll('.ant-collapse-item')[0].classes()).toContain('ant-collapse-item-active')

    // Click panel 1 again to collapse
    await headers[0].trigger('click')
    expect(wrapper.findAll('.ant-collapse-item')[0].classes()).not.toContain('ant-collapse-item-active')
  })

  it('supports defaultActiveKey', () => {
    const wrapper = mountCollapse({ props: { defaultActiveKey: '1' } })
    expect(wrapper.findAll('.ant-collapse-item')[0].classes()).toContain('ant-collapse-item-active')
  })

  it('supports defaultActiveKey as array', () => {
    const wrapper = mountCollapse({ props: { defaultActiveKey: ['1', '2'] } })
    expect(wrapper.findAll('.ant-collapse-item')[0].classes()).toContain('ant-collapse-item-active')
    expect(wrapper.findAll('.ant-collapse-item')[1].classes()).toContain('ant-collapse-item-active')
    expect(wrapper.findAll('.ant-collapse-item')[2].classes()).not.toContain('ant-collapse-item-active')
  })

  it('supports accordion mode', async () => {
    const wrapper = mountCollapse({ props: { accordion: true, defaultActiveKey: '1' } })
    const headers = wrapper.findAll('.ant-collapse-header')

    // Panel 1 is active
    expect(wrapper.findAll('.ant-collapse-item')[0].classes()).toContain('ant-collapse-item-active')

    // Click panel 2 — panel 1 should close
    await headers[1].trigger('click')
    expect(wrapper.findAll('.ant-collapse-item')[0].classes()).not.toContain('ant-collapse-item-active')
    expect(wrapper.findAll('.ant-collapse-item')[1].classes()).toContain('ant-collapse-item-active')
  })

  it('emits change event', async () => {
    const onChange = vi.fn()
    const wrapper = mountCollapse({ props: { onChange } })
    const headers = wrapper.findAll('.ant-collapse-header')

    await headers[0].trigger('click')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('change')![0][0]).toEqual(['1'])
  })

  it('emits update:activeKey event', async () => {
    const wrapper = mountCollapse()
    const headers = wrapper.findAll('.ant-collapse-header')

    await headers[0].trigger('click')
    expect(wrapper.emitted('update:activeKey')).toHaveLength(1)
    expect(wrapper.emitted('update:activeKey')![0][0]).toEqual(['1'])
  })

  it('renders borderless variant', () => {
    const wrapper = mountCollapse({ props: { bordered: false } })
    expect(wrapper.find('.ant-collapse').classes()).toContain('ant-collapse-borderless')
  })

  it('renders ghost variant', () => {
    const wrapper = mountCollapse({ props: { ghost: true } })
    expect(wrapper.find('.ant-collapse').classes()).toContain('ant-collapse-ghost')
  })

  it('renders expand icon position end', () => {
    const wrapper = mountCollapse({ props: { expandIconPosition: 'end' } })
    expect(wrapper.find('.ant-collapse').classes()).toContain('ant-collapse-icon-position-end')
  })

  it('supports disabled collapsible on panel', async () => {
    const wrapper = mountCollapse({
      panels: [
        { key: '1', header: 'Panel 1', content: 'Content 1', props: { collapsible: 'disabled' } },
      ],
    })

    const header = wrapper.find('.ant-collapse-header')
    expect(wrapper.find('.ant-collapse-item').classes()).toContain('ant-collapse-item-disabled')
    expect(header.attributes('tabindex')).toBe('-1')

    // Click should not toggle
    await header.trigger('click')
    expect(wrapper.find('.ant-collapse-item').classes()).not.toContain('ant-collapse-item-active')
  })

  it('supports disabled collapsible on parent collapse', async () => {
    const wrapper = mountCollapse({
      props: { collapsible: 'disabled' },
    })

    const header = wrapper.findAll('.ant-collapse-header')[0]
    await header.trigger('click')
    expect(wrapper.findAll('.ant-collapse-item')[0].classes()).not.toContain('ant-collapse-item-active')
  })

  it('hides arrow when showArrow is false', () => {
    const wrapper = mountCollapse({
      panels: [
        { key: '1', header: 'Panel 1', content: 'Content 1', props: { showArrow: false } },
      ],
    })
    expect(wrapper.find('.ant-collapse-arrow').exists()).toBe(false)
    expect(wrapper.find('.ant-collapse-item').classes()).toContain('ant-collapse-no-arrow')
  })

  it('supports keyboard interaction (Enter)', async () => {
    const wrapper = mountCollapse()
    const header = wrapper.findAll('.ant-collapse-header')[0]

    await header.trigger('keydown', { key: 'Enter' })
    expect(wrapper.findAll('.ant-collapse-item')[0].classes()).toContain('ant-collapse-item-active')
  })

  it('supports keyboard interaction (Space)', async () => {
    const wrapper = mountCollapse()
    const header = wrapper.findAll('.ant-collapse-header')[0]

    await header.trigger('keydown', { key: ' ' })
    expect(wrapper.findAll('.ant-collapse-item')[0].classes()).toContain('ant-collapse-item-active')
  })

  it('renders panel header text', () => {
    const wrapper = mountCollapse()
    expect(wrapper.findAll('.ant-collapse-header-text')[0].text()).toBe('Panel 1')
  })

  it('renders panel content when active', async () => {
    const wrapper = mountCollapse({ props: { defaultActiveKey: '1' } })
    const content = wrapper.find('.ant-collapse-content')
    expect(content.exists()).toBe(true)
    expect(content.find('.ant-collapse-content-box').text()).toBe('Content 1')
  })

  it('sets correct ARIA attributes on header', () => {
    const wrapper = mountCollapse({ props: { defaultActiveKey: '1' } })
    const activeHeader = wrapper.findAll('.ant-collapse-header')[0]
    const inactiveHeader = wrapper.findAll('.ant-collapse-header')[1]

    expect(activeHeader.attributes('role')).toBe('tab')
    expect(activeHeader.attributes('aria-expanded')).toBe('true')
    expect(inactiveHeader.attributes('aria-expanded')).toBe('false')
  })

  it('sets correct ARIA attributes on content', () => {
    const wrapper = mountCollapse({ props: { defaultActiveKey: '1' } })
    const content = wrapper.find('.ant-collapse-content')
    expect(content.attributes('role')).toBe('tabpanel')
  })

  it('destroys inactive panel content when destroyInactivePanel is true', async () => {
    const wrapper = mountCollapse({
      props: { destroyInactivePanel: true, accordion: true, defaultActiveKey: '1' },
    })

    // Panel 1 content should exist (only active panel rendered)
    expect(wrapper.findAll('.ant-collapse-content')).toHaveLength(1)

    // Click panel 2 to open it (accordion closes panel 1)
    await wrapper.findAll('.ant-collapse-header')[1].trigger('click')

    // Panel 1 content no longer rendered, panel 2 content now rendered
    const items = wrapper.findAll('.ant-collapse-item')
    expect(items[0].find('.ant-collapse-content').exists()).toBe(false)
    expect(items[1].find('.ant-collapse-content').exists()).toBe(true)
  })

  it('renders extra slot in panel', () => {
    const wrapper = mount(Collapse, {
      slots: {
        default: () =>
          h(
            CollapsePanel,
            { panelKey: '1', header: 'Panel 1' },
            {
              default: () => 'Content',
              extra: () => h('span', { class: 'my-extra' }, 'Extra'),
            },
          ),
      },
    })
    expect(wrapper.find('.ant-collapse-extra').exists()).toBe(true)
    expect(wrapper.find('.my-extra').text()).toBe('Extra')
  })
})
