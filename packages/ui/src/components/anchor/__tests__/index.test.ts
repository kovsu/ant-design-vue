import { describe, expect, it, vi } from 'vitest'
import { Anchor, AnchorLink } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

const items = [
  { key: '1', href: '#section-1', title: 'Section 1' },
  { key: '2', href: '#section-2', title: 'Section 2' },
  { key: '3', href: '#section-3', title: 'Section 3' },
]

describe('Anchor', () => {
  it('renders with items prop', () => {
    const wrapper = mount(Anchor, {
      props: { items },
    })
    expect(wrapper.find('.ant-anchor').exists()).toBe(true)
    const links = wrapper.findAll('.ant-anchor-link')
    expect(links).toHaveLength(3)
  })

  it('renders link titles', () => {
    const wrapper = mount(Anchor, {
      props: { items },
    })
    const titles = wrapper.findAll('.ant-anchor-link-title')
    expect(titles[0].text()).toBe('Section 1')
    expect(titles[1].text()).toBe('Section 2')
    expect(titles[2].text()).toBe('Section 3')
  })

  it('renders href attributes', () => {
    const wrapper = mount(Anchor, {
      props: { items },
    })
    const links = wrapper.findAll('.ant-anchor-link-title')
    expect(links[0].attributes('href')).toBe('#section-1')
    expect(links[1].attributes('href')).toBe('#section-2')
  })

  it('applies vertical direction by default', () => {
    const wrapper = mount(Anchor, {
      props: { items },
    })
    expect(wrapper.find('.ant-anchor-vertical').exists()).toBe(true)
  })

  it('applies horizontal direction', () => {
    const wrapper = mount(Anchor, {
      props: { items, direction: 'horizontal' },
    })
    expect(wrapper.find('.ant-anchor-horizontal').exists()).toBe(true)
  })

  it('renders ink indicator in vertical mode', () => {
    const wrapper = mount(Anchor, {
      props: { items },
    })
    expect(wrapper.find('.ant-anchor-ink').exists()).toBe(true)
  })

  it('does not render ink indicator in horizontal mode', () => {
    const wrapper = mount(Anchor, {
      props: { items, direction: 'horizontal' },
    })
    expect(wrapper.find('.ant-anchor-ink').exists()).toBe(false)
  })

  it('renders nested children', () => {
    const nestedItems = [
      {
        key: '1',
        href: '#section-1',
        title: 'Section 1',
        children: [
          { key: '1-1', href: '#section-1-1', title: 'Section 1.1' },
          { key: '1-2', href: '#section-1-2', title: 'Section 1.2' },
        ],
      },
    ]
    const wrapper = mount(Anchor, {
      props: { items: nestedItems },
    })
    const nested = wrapper.findAll('.ant-anchor-link-nested')
    expect(nested).toHaveLength(2)
  })

  it('emits click on link click', async () => {
    const wrapper = mount(Anchor, {
      props: { items },
    })
    await wrapper.find('.ant-anchor-link-title').trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('click')![0][1]).toEqual({
      title: 'Section 1',
      href: '#section-1',
    })
  })
})

describe('AnchorLink', () => {
  it('renders with title prop', () => {
    const wrapper = mount(AnchorLink, {
      props: { href: '#test', title: 'Test Link' },
    })
    expect(wrapper.find('.ant-anchor-link').exists()).toBe(true)
    expect(wrapper.find('.ant-anchor-link-title').text()).toBe('Test Link')
  })

  it('renders href', () => {
    const wrapper = mount(AnchorLink, {
      props: { href: '#test', title: 'Test' },
    })
    expect(wrapper.find('a').attributes('href')).toBe('#test')
  })

  it('renders title slot', () => {
    const wrapper = mount(AnchorLink, {
      props: { href: '#test' },
      slots: { title: 'Custom Title' },
    })
    expect(wrapper.find('.ant-anchor-link-title').text()).toBe('Custom Title')
  })

  it('renders nested children via slot', () => {
    const wrapper = mount(AnchorLink, {
      props: { href: '#parent', title: 'Parent' },
      slots: {
        default: h(AnchorLink, { href: '#child', title: 'Child' }),
      },
    })
    const links = wrapper.findAll('.ant-anchor-link')
    expect(links).toHaveLength(2)
  })
})
