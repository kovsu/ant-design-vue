import { describe, expect, it, vi } from 'vitest'
import { Tabs } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'

const items = [
  { key: '1', label: 'Tab 1', children: 'Content 1' },
  { key: '2', label: 'Tab 2', children: 'Content 2' },
  { key: '3', label: 'Tab 3', children: 'Content 3' },
]

describe('Tabs', () => {
  it('renders tabs from items prop', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1' },
    })
    expect(wrapper.find('.ant-tabs').exists()).toBe(true)
    const tabs = wrapper.findAll('.ant-tabs-tab')
    expect(tabs).toHaveLength(3)
    expect(tabs[0].text()).toContain('Tab 1')
    expect(tabs[1].text()).toContain('Tab 2')
    expect(tabs[2].text()).toContain('Tab 3')
  })

  it('shows active tab', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '2' },
    })
    const tabs = wrapper.findAll('.ant-tabs-tab')
    expect(tabs[1].classes()).toContain('ant-tabs-tab-active')
    expect(tabs[0].classes()).not.toContain('ant-tabs-tab-active')
  })

  it('emits change when tab clicked', async () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1' },
    })
    await wrapper.findAll('.ant-tabs-tab')[1].trigger('click')
    expect(wrapper.emitted('change')?.[0]).toEqual(['2'])
    expect(wrapper.emitted('update:activeKey')?.[0]).toEqual(['2'])
  })

  it('emits tabClick on click', async () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1' },
    })
    await wrapper.findAll('.ant-tabs-tab')[0].trigger('click')
    expect(wrapper.emitted('tabClick')?.[0]?.[0]).toBe('1')
  })

  it('does not emit change when clicking disabled tab', async () => {
    const disabledItems = [
      { key: '1', label: 'Tab 1', children: 'C1' },
      { key: '2', label: 'Tab 2', children: 'C2', disabled: true },
    ]
    const wrapper = mount(Tabs, {
      props: { items: disabledItems, activeKey: '1' },
    })
    await wrapper.findAll('.ant-tabs-tab')[1].trigger('click')
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('renders disabled tab with correct class', () => {
    const disabledItems = [
      { key: '1', label: 'T1', children: 'C1' },
      { key: '2', label: 'T2', children: 'C2', disabled: true },
    ]
    const wrapper = mount(Tabs, {
      props: { items: disabledItems, activeKey: '1' },
    })
    expect(wrapper.findAll('.ant-tabs-tab')[1].classes()).toContain('ant-tabs-tab-disabled')
  })

  it('applies tab position class', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1', tabPosition: 'left' },
    })
    expect(wrapper.find('.ant-tabs').classes()).toContain('ant-tabs-left')
  })

  it('applies type class', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1', type: 'card' },
    })
    expect(wrapper.find('.ant-tabs').classes()).toContain('ant-tabs-card')
  })

  it('applies centered class', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1', centered: true },
    })
    expect(wrapper.find('.ant-tabs').classes()).toContain('ant-tabs-centered')
  })

  it('applies size class', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1', size: 'lg' },
    })
    expect(wrapper.find('.ant-tabs').classes()).toContain('ant-tabs-lg')
  })

  it('renders ink bar for line type', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1', type: 'line' },
    })
    expect(wrapper.find('.ant-tabs-ink-bar').exists()).toBe(true)
  })

  it('does not render ink bar for card type', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1', type: 'card' },
    })
    expect(wrapper.find('.ant-tabs-ink-bar').exists()).toBe(false)
  })

  it('renders add button for editable-card', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1', type: 'editable-card' },
    })
    expect(wrapper.find('.ant-tabs-nav-add').exists()).toBe(true)
  })

  it('hides add button when hideAdd is true', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1', type: 'editable-card', hideAdd: true },
    })
    expect(wrapper.find('.ant-tabs-nav-add').exists()).toBe(false)
  })

  it('emits edit with add action on add click', async () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1', type: 'editable-card' },
    })
    await wrapper.find('.ant-tabs-nav-add').trigger('click')
    expect(wrapper.emitted('edit')?.[0]).toEqual(['', 'add'])
  })

  it('emits edit with remove action on remove click', async () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1', type: 'editable-card' },
    })
    await wrapper.find('.ant-tabs-tab-remove').trigger('click')
    expect(wrapper.emitted('edit')?.[0]).toEqual(['1', 'remove'])
  })

  it('renders tab content', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1' },
    })
    const panes = wrapper.findAll('.ant-tabs-tabpane')
    expect(panes).toHaveLength(3)
    expect(panes[0].text()).toBe('Content 1')
  })

  it('shows only active pane', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '2' },
    })
    const panes = wrapper.findAll('.ant-tabs-tabpane')
    // Active pane is visible
    expect(panes[1].isVisible()).toBe(true)
    // Other panes are hidden
    expect(panes[0].isVisible()).toBe(false)
  })

  it('has correct ARIA attributes', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1' },
    })
    const tablist = wrapper.find('[role="tablist"]')
    expect(tablist.exists()).toBe(true)

    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs[0].attributes('aria-selected')).toBe('true')
    expect(tabs[1].attributes('aria-selected')).toBe('false')

    const panels = wrapper.findAll('[role="tabpanel"]')
    expect(panels).toHaveLength(3)
  })

  it('renders leftExtra and rightExtra slots', () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1' },
      slots: {
        leftExtra: '<span class="left-extra">Left</span>',
        rightExtra: '<span class="right-extra">Right</span>',
      },
    })
    expect(wrapper.find('.left-extra').exists()).toBe(true)
    expect(wrapper.find('.right-extra').exists()).toBe(true)
  })

  it('keyboard navigation: Enter activates tab', async () => {
    const wrapper = mount(Tabs, {
      props: { items, activeKey: '1' },
    })
    await wrapper.findAll('.ant-tabs-tab')[1].trigger('keydown.enter')
    expect(wrapper.emitted('change')?.[0]).toEqual(['2'])
  })
})
