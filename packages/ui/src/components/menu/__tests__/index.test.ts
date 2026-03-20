import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import Menu from '../Menu.vue'
import MenuItem from '../MenuItem.vue'
import SubMenu from '../SubMenu.vue'
import ItemGroup from '../ItemGroup.vue'
import Divider from '../Divider.vue'

describe('Menu', () => {
  it('renders basic menu with items', () => {
    const wrapper = mount(Menu, {
      props: { mode: 'vertical' },
      slots: {
        default: () => [
          h(MenuItem, { itemKey: '1' }, () => 'Item 1'),
          h(MenuItem, { itemKey: '2' }, () => 'Item 2'),
          h(MenuItem, { itemKey: '3' }, () => 'Item 3'),
        ],
      },
    })

    expect(wrapper.findAll('.ant-menu-item')).toHaveLength(3)
    expect(wrapper.find('.ant-menu-root').exists()).toBe(true)
    expect(wrapper.find('.ant-menu-vertical').exists()).toBe(true)
  })

  it('renders horizontal mode', () => {
    const wrapper = mount(Menu, {
      props: { mode: 'horizontal' },
      slots: {
        default: () => [
          h(MenuItem, { itemKey: '1' }, () => 'Item 1'),
        ],
      },
    })

    expect(wrapper.find('.ant-menu-horizontal').exists()).toBe(true)
  })

  it('renders inline mode', () => {
    const wrapper = mount(Menu, {
      props: { mode: 'inline' },
      slots: {
        default: () => [
          h(MenuItem, { itemKey: '1' }, () => 'Item 1'),
        ],
      },
    })

    expect(wrapper.find('.ant-menu-inline').exists()).toBe(true)
  })

  it('supports dark theme', () => {
    const wrapper = mount(Menu, {
      props: { theme: 'dark' },
      slots: {
        default: () => h(MenuItem, { itemKey: '1' }, () => 'Item 1'),
      },
    })

    expect(wrapper.find('.ant-menu-dark').exists()).toBe(true)
  })

  it('selects item on click', async () => {
    const onSelect = vi.fn()
    const onClick = vi.fn()

    const wrapper = mount(Menu, {
      props: {
        mode: 'vertical',
        onSelect,
        onClick,
      },
      slots: {
        default: () => [
          h(MenuItem, { itemKey: '1' }, () => 'Item 1'),
          h(MenuItem, { itemKey: '2' }, () => 'Item 2'),
        ],
      },
    })

    await wrapper.findAll('.ant-menu-item')[1].trigger('click')

    expect(onClick).toHaveBeenCalledWith(expect.objectContaining({ key: '2' }))
    expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ key: '2' }))
  })

  it('applies selected class based on selectedKeys', () => {
    const wrapper = mount(Menu, {
      props: { selectedKeys: ['2'] },
      slots: {
        default: () => [
          h(MenuItem, { itemKey: '1' }, () => 'Item 1'),
          h(MenuItem, { itemKey: '2' }, () => 'Item 2'),
        ],
      },
    })

    const items = wrapper.findAll('.ant-menu-item')
    expect(items[0].classes()).not.toContain('ant-menu-item-selected')
    expect(items[1].classes()).toContain('ant-menu-item-selected')
  })

  it('renders disabled item', () => {
    const onClick = vi.fn()

    const wrapper = mount(Menu, {
      props: { onClick },
      slots: {
        default: () => [
          h(MenuItem, { itemKey: '1', disabled: true }, () => 'Item 1'),
        ],
      },
    })

    wrapper.find('.ant-menu-item').trigger('click')
    expect(onClick).not.toHaveBeenCalled()
    expect(wrapper.find('.ant-menu-item-disabled').exists()).toBe(true)
  })

  it('renders danger item', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: () => h(MenuItem, { itemKey: '1', danger: true }, () => 'Danger'),
      },
    })

    expect(wrapper.find('.ant-menu-item-danger').exists()).toBe(true)
  })

  it('supports multiple selection', async () => {
    const onSelect = vi.fn()

    const wrapper = mount(Menu, {
      props: {
        multiple: true,
        defaultSelectedKeys: ['1'],
        onSelect,
      },
      slots: {
        default: () => [
          h(MenuItem, { itemKey: '1' }, () => 'Item 1'),
          h(MenuItem, { itemKey: '2' }, () => 'Item 2'),
        ],
      },
    })

    // Click second item — should add to selection
    await wrapper.findAll('.ant-menu-item')[1].trigger('click')
    expect(wrapper.findAll('.ant-menu-item-selected')).toHaveLength(2)
  })

  it('renders items via data prop', () => {
    const wrapper = mount(Menu, {
      props: {
        items: [
          { key: '1', label: 'Item 1' },
          { key: '2', label: 'Item 2' },
          { type: 'divider' },
          { key: '3', label: 'Item 3' },
        ],
      },
    })

    expect(wrapper.findAll('.ant-menu-item')).toHaveLength(3)
    expect(wrapper.find('.ant-menu-item-divider').exists()).toBe(true)
  })
})

describe('MenuItem', () => {
  it('has correct ARIA attributes', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: () => h(MenuItem, { itemKey: '1' }, () => 'Item'),
      },
    })

    const item = wrapper.find('.ant-menu-item')
    expect(item.attributes('role')).toBe('menuitem')
    expect(item.attributes('tabindex')).toBe('0')
  })

  it('disabled item has tabindex -1', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: () => h(MenuItem, { itemKey: '1', disabled: true }, () => 'Item'),
      },
    })

    expect(wrapper.find('.ant-menu-item').attributes('tabindex')).toBe('-1')
  })
})

describe('SubMenu', () => {
  it('renders with title', () => {
    const wrapper = mount(Menu, {
      props: { mode: 'inline' },
      slots: {
        default: () => h(SubMenu, { menuKey: 'sub1', title: 'SubMenu Title' }, () =>
          h(MenuItem, { itemKey: '1' }, () => 'Item'),
        ),
      },
    })

    expect(wrapper.find('.ant-menu-submenu').exists()).toBe(true)
    expect(wrapper.find('.ant-menu-submenu-title').text()).toContain('SubMenu Title')
  })

  it('toggles open on title click (inline mode)', async () => {
    const wrapper = mount(Menu, {
      props: { mode: 'inline' },
      slots: {
        default: () => h(SubMenu, { menuKey: 'sub1', title: 'SubMenu' }, () =>
          h(MenuItem, { itemKey: '1' }, () => 'Item'),
        ),
      },
    })

    expect(wrapper.find('.ant-menu-submenu-open').exists()).toBe(false)
    await wrapper.find('.ant-menu-submenu-title').trigger('click')
    expect(wrapper.find('.ant-menu-submenu-open').exists()).toBe(true)
  })

  it('respects openKeys prop', () => {
    const wrapper = mount(Menu, {
      props: { mode: 'inline', openKeys: ['sub1'] },
      slots: {
        default: () => h(SubMenu, { menuKey: 'sub1', title: 'SubMenu' }, () =>
          h(MenuItem, { itemKey: '1' }, () => 'Item'),
        ),
      },
    })

    expect(wrapper.find('.ant-menu-submenu-open').exists()).toBe(true)
  })

  it('disabled submenu does not toggle', async () => {
    const wrapper = mount(Menu, {
      props: { mode: 'inline' },
      slots: {
        default: () => h(SubMenu, { menuKey: 'sub1', title: 'SubMenu', disabled: true }, () =>
          h(MenuItem, { itemKey: '1' }, () => 'Item'),
        ),
      },
    })

    await wrapper.find('.ant-menu-submenu-title').trigger('click')
    expect(wrapper.find('.ant-menu-submenu-open').exists()).toBe(false)
  })
})

describe('ItemGroup', () => {
  it('renders with title and children', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: () => h(ItemGroup, { title: 'Group' }, () => [
          h(MenuItem, { itemKey: '1' }, () => 'Item 1'),
          h(MenuItem, { itemKey: '2' }, () => 'Item 2'),
        ]),
      },
    })

    expect(wrapper.find('.ant-menu-item-group').exists()).toBe(true)
    expect(wrapper.find('.ant-menu-item-group-title').text()).toBe('Group')
    expect(wrapper.findAll('.ant-menu-item')).toHaveLength(2)
  })
})

describe('Divider', () => {
  it('renders divider', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: () => [
          h(MenuItem, { itemKey: '1' }, () => 'Item 1'),
          h(Divider),
          h(MenuItem, { itemKey: '2' }, () => 'Item 2'),
        ],
      },
    })

    expect(wrapper.find('.ant-menu-item-divider').exists()).toBe(true)
  })

  it('renders dashed divider', () => {
    const wrapper = mount(Menu, {
      slots: {
        default: () => h(Divider, { dashed: true }),
      },
    })

    expect(wrapper.find('.ant-menu-item-divider-dashed').exists()).toBe(true)
  })
})
