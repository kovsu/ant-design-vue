import { describe, expect, it, vi } from 'vitest'
import { Breadcrumb, BreadcrumbItem } from '../index'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

function mountBreadcrumb(options: {
  props?: Record<string, any>
  items?: Array<{ text: string; props?: Record<string, any> }>
} = {}) {
  const {
    props = {},
    items = [
      { text: 'Home', props: { href: '/' } },
      { text: 'List', props: { href: '/list' } },
      { text: 'Detail' },
    ],
  } = options

  return mount(Breadcrumb, {
    props,
    slots: {
      default: () =>
        items.map((item) =>
          h(
            BreadcrumbItem,
            { ...item.props },
            { default: () => item.text },
          ),
        ),
    },
  })
}

describe('Breadcrumb', () => {
  it('should render correctly', () => {
    const wrapper = mountBreadcrumb()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with correct base element and class', () => {
    const wrapper = mountBreadcrumb()
    expect(wrapper.find('nav.ant-breadcrumb').exists()).toBe(true)
  })

  it('renders aria-label for accessibility', () => {
    const wrapper = mountBreadcrumb()
    expect(wrapper.find('nav').attributes('aria-label')).toBe('Breadcrumb')
  })

  it('renders an ordered list', () => {
    const wrapper = mountBreadcrumb()
    expect(wrapper.find('ol').exists()).toBe(true)
  })

  it('renders all breadcrumb items', () => {
    const wrapper = mountBreadcrumb()
    expect(wrapper.findAll('.ant-breadcrumb-item')).toHaveLength(3)
  })

  it('renders item text', () => {
    const wrapper = mountBreadcrumb()
    const links = wrapper.findAll('.ant-breadcrumb-link')
    expect(links[0].text()).toBe('Home')
    expect(links[1].text()).toBe('List')
    expect(links[2].text()).toBe('Detail')
  })

  it('renders href items as links', () => {
    const wrapper = mountBreadcrumb()
    const firstItem = wrapper.findAll('.ant-breadcrumb-item')[0]
    const anchor = firstItem.find('a')
    expect(anchor.exists()).toBe(true)
    expect(anchor.attributes('href')).toBe('/')
  })

  it('renders non-href items as spans', () => {
    const wrapper = mountBreadcrumb()
    const lastItem = wrapper.findAll('.ant-breadcrumb-item')[2]
    expect(lastItem.find('a').exists()).toBe(false)
    expect(lastItem.find('.ant-breadcrumb-link span').exists()).toBe(true)
  })

  it('renders separator between items', () => {
    const wrapper = mountBreadcrumb()
    const separators = wrapper.findAll('.ant-breadcrumb-separator')
    expect(separators).toHaveLength(3) // All have separators, last hidden via CSS
    expect(separators[0].text()).toBe('/')
  })

  it('separator has aria-hidden', () => {
    const wrapper = mountBreadcrumb()
    const separator = wrapper.find('.ant-breadcrumb-separator')
    expect(separator.attributes('aria-hidden')).toBe('true')
  })

  it('supports custom separator', () => {
    const wrapper = mountBreadcrumb({ props: { separator: '>' } })
    const separators = wrapper.findAll('.ant-breadcrumb-separator')
    expect(separators[0].text()).toBe('>')
  })

  it('emits click event on item with href', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Breadcrumb, {
      slots: {
        default: () =>
          h(
            BreadcrumbItem,
            { href: '/', onClick },
            { default: () => 'Home' },
          ),
      },
    })

    await wrapper.find('a').trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders with default separator when none provided', () => {
    const wrapper = mountBreadcrumb()
    expect(wrapper.find('.ant-breadcrumb-separator').text()).toBe('/')
  })

  it('renders item separator slot override', () => {
    const wrapper = mount(Breadcrumb, {
      slots: {
        default: () => [
          h(
            BreadcrumbItem,
            { href: '/' },
            {
              default: () => 'Home',
              separator: () => h('span', { class: 'custom-sep' }, '>>'),
            },
          ),
          h(BreadcrumbItem, {}, { default: () => 'Detail' }),
        ],
      },
    })

    expect(wrapper.find('.custom-sep').exists()).toBe(true)
    expect(wrapper.find('.custom-sep').text()).toBe('>>')
  })

  it('renders li elements for each item', () => {
    const wrapper = mountBreadcrumb()
    expect(wrapper.findAll('li')).toHaveLength(3)
  })
})
