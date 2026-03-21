import { describe, expect, it } from 'vitest'
import { List, ListItem, ListItemMeta } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

describe('List', () => {
  it('should render correctly', () => {
    const wrapper = mount(List, {
      props: { dataSource: ['a', 'b', 'c'] },
      slots: {
        renderItem: ({ item }: { item: string }) => h(ListItem, null, { default: () => item }),
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with ant-list class', () => {
    const wrapper = mount(List)
    expect(wrapper.classes('ant-list')).toBe(true)
  })

  it('renders data source items', () => {
    const wrapper = mount(List, {
      props: { dataSource: ['Item 1', 'Item 2', 'Item 3'] },
      slots: {
        renderItem: ({ item }: { item: string }) => h(ListItem, null, { default: () => item }),
      },
    })
    const items = wrapper.findAll('.ant-list-item')
    expect(items).toHaveLength(3)
    expect(items[0].text()).toBe('Item 1')
    expect(items[1].text()).toBe('Item 2')
    expect(items[2].text()).toBe('Item 3')
  })

  it('renders header slot', () => {
    const wrapper = mount(List, {
      slots: {
        header: 'My Header',
      },
    })
    expect(wrapper.find('.ant-list-header').exists()).toBe(true)
    expect(wrapper.find('.ant-list-header').text()).toBe('My Header')
  })

  it('renders footer slot', () => {
    const wrapper = mount(List, {
      slots: {
        footer: 'My Footer',
      },
    })
    expect(wrapper.find('.ant-list-footer').exists()).toBe(true)
    expect(wrapper.find('.ant-list-footer').text()).toBe('My Footer')
  })

  it('does not render header when slot not provided', () => {
    const wrapper = mount(List)
    expect(wrapper.find('.ant-list-header').exists()).toBe(false)
  })

  it('applies bordered class', () => {
    const wrapper = mount(List, {
      props: { bordered: true },
    })
    expect(wrapper.classes('ant-list-bordered')).toBe(true)
  })

  it('applies split class by default', () => {
    const wrapper = mount(List)
    expect(wrapper.classes('ant-list-split')).toBe(true)
  })

  it('does not apply split class when split=false', () => {
    const wrapper = mount(List, {
      props: { split: false },
    })
    expect(wrapper.classes('ant-list-split')).toBe(false)
  })

  it('applies sm size class', () => {
    const wrapper = mount(List, {
      props: { size: 'sm' },
    })
    expect(wrapper.classes('ant-list-sm')).toBe(true)
  })

  it('applies lg size class', () => {
    const wrapper = mount(List, {
      props: { size: 'lg' },
    })
    expect(wrapper.classes('ant-list-lg')).toBe(true)
  })

  it('applies vertical layout class', () => {
    const wrapper = mount(List, {
      props: { itemLayout: 'vertical' },
    })
    expect(wrapper.classes('ant-list-vertical')).toBe(true)
  })

  it('applies grid class when grid is provided', () => {
    const wrapper = mount(List, {
      props: { grid: { column: 3 }, dataSource: ['a', 'b', 'c'] },
      slots: {
        renderItem: ({ item }: { item: string }) => h(ListItem, null, { default: () => item }),
      },
    })
    expect(wrapper.classes('ant-list-grid')).toBe(true)
    const cols = wrapper.findAll('.ant-list-item-col')
    expect(cols).toHaveLength(3)
  })

  it('shows loading state', () => {
    const wrapper = mount(List, {
      props: { loading: true, dataSource: ['a'] },
      slots: {
        renderItem: ({ item }: { item: string }) => h(ListItem, null, { default: () => item }),
      },
    })
    expect(wrapper.classes('ant-list-loading')).toBe(true)
    expect(wrapper.find('.ant-list-spin').exists()).toBe(true)
  })

  it('shows empty state when no data', () => {
    const wrapper = mount(List, {
      props: { dataSource: [] },
    })
    expect(wrapper.find('.ant-list-empty-text').exists()).toBe(true)
  })

  it('renders loadMore slot', () => {
    const wrapper = mount(List, {
      props: { dataSource: ['a'] },
      slots: {
        renderItem: ({ item }: { item: string }) => h(ListItem, null, { default: () => item }),
        loadMore: 'Load More',
      },
    })
    expect(wrapper.find('.ant-list-load-more').exists()).toBe(true)
    expect(wrapper.find('.ant-list-load-more').text()).toBe('Load More')
  })

  it('uses rowKey function', () => {
    const data = [
      { id: 'x', name: 'A' },
      { id: 'y', name: 'B' },
    ]
    const wrapper = mount(List, {
      props: { dataSource: data, rowKey: (item: any) => item.id },
      slots: {
        renderItem: ({ item }: { item: any }) => h(ListItem, null, { default: () => item.name }),
      },
    })
    const items = wrapper.findAll('.ant-list-item')
    expect(items).toHaveLength(2)
  })

  it('uses rowKey string', () => {
    const data = [
      { id: 'x', name: 'A' },
      { id: 'y', name: 'B' },
    ]
    const wrapper = mount(List, {
      props: { dataSource: data, rowKey: 'id' },
      slots: {
        renderItem: ({ item }: { item: any }) => h(ListItem, null, { default: () => item.name }),
      },
    })
    const items = wrapper.findAll('.ant-list-item')
    expect(items).toHaveLength(2)
  })
})

describe('ListItem', () => {
  it('should render correctly', () => {
    const wrapper = mount(ListItem, {
      slots: { default: 'Item content' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with ant-list-item class', () => {
    const wrapper = mount(ListItem, {
      slots: { default: 'Content' },
    })
    expect(wrapper.classes('ant-list-item')).toBe(true)
  })

  it('renders default slot', () => {
    const wrapper = mount(ListItem, {
      slots: { default: 'My content' },
    })
    expect(wrapper.find('.ant-list-item-content').text()).toBe('My content')
  })

  it('renders actions slot', () => {
    const wrapper = mount(ListItem, {
      slots: {
        default: 'Content',
        actions: '<a>edit</a><a>delete</a>',
      },
    })
    expect(wrapper.find('.ant-list-item-action').exists()).toBe(true)
    expect(wrapper.findAll('a')).toHaveLength(2)
  })

  it('does not render actions when not provided', () => {
    const wrapper = mount(ListItem, {
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.ant-list-item-action').exists()).toBe(false)
  })

  it('renders extra slot', () => {
    const wrapper = mount(ListItem, {
      slots: {
        default: 'Content',
        extra: '<img src="test.png" />',
      },
    })
    expect(wrapper.find('.ant-list-item-extra').exists()).toBe(true)
  })
})

describe('ListItemMeta', () => {
  it('should render correctly', () => {
    const wrapper = mount(ListItemMeta, {
      props: { title: 'Title', description: 'Description' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with ant-list-item-meta class', () => {
    const wrapper = mount(ListItemMeta)
    expect(wrapper.classes('ant-list-item-meta')).toBe(true)
  })

  it('renders title', () => {
    const wrapper = mount(ListItemMeta, {
      props: { title: 'My Title' },
    })
    expect(wrapper.find('.ant-list-item-meta-title').text()).toBe('My Title')
  })

  it('renders description', () => {
    const wrapper = mount(ListItemMeta, {
      props: { description: 'My Description' },
    })
    expect(wrapper.find('.ant-list-item-meta-description').text()).toBe('My Description')
  })

  it('renders avatar when src provided', () => {
    const wrapper = mount(ListItemMeta, {
      props: { avatar: 'https://example.com/avatar.png' },
    })
    expect(wrapper.find('.ant-list-item-meta-avatar').exists()).toBe(true)
  })

  it('does not render avatar when not provided', () => {
    const wrapper = mount(ListItemMeta, {
      props: { title: 'Title' },
    })
    expect(wrapper.find('.ant-list-item-meta-avatar').exists()).toBe(false)
  })

  it('renders title slot over prop', () => {
    const wrapper = mount(ListItemMeta, {
      props: { title: 'Prop Title' },
      slots: { title: '<a>Slot Title</a>' },
    })
    expect(wrapper.find('.ant-list-item-meta-title a').text()).toBe('Slot Title')
  })

  it('renders description slot over prop', () => {
    const wrapper = mount(ListItemMeta, {
      props: { description: 'Prop Desc' },
      slots: { description: '<em>Slot Desc</em>' },
    })
    expect(wrapper.find('.ant-list-item-meta-description em').text()).toBe('Slot Desc')
  })

  it('renders avatar slot over prop', () => {
    const wrapper = mount(ListItemMeta, {
      props: { avatar: 'https://example.com/avatar.png' },
      slots: { avatar: '<div class="custom-avatar">A</div>' },
    })
    expect(wrapper.find('.custom-avatar').exists()).toBe(true)
  })

  it('does not render content section when no title or description', () => {
    const wrapper = mount(ListItemMeta)
    expect(wrapper.find('.ant-list-item-meta-content').exists()).toBe(false)
  })
})
