import { describe, expect, it } from 'vitest'
import { Timeline, TimelineItem } from '../index'
import { mount } from '@vue/test-utils'
import { h } from 'vue'

function mountTimeline(options: {
  props?: Record<string, any>
  slots?: Record<string, any>
  items?: Array<{ content: string; props?: Record<string, any>; slots?: Record<string, any> }>
} = {}) {
  const {
    props = {},
    slots = {},
    items = [
      { content: 'Event 1' },
      { content: 'Event 2' },
      { content: 'Event 3' },
    ],
  } = options

  return mount(Timeline, {
    props,
    slots: {
      default: () =>
        items.map((item) =>
          h(
            TimelineItem,
            { ...item.props },
            {
              default: () => item.content,
              ...item.slots,
            },
          ),
        ),
      ...slots,
    },
  })
}

describe('Timeline', () => {
  it('should render correctly', () => {
    const wrapper = mountTimeline()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with correct base class', () => {
    const wrapper = mountTimeline()
    expect(wrapper.find('.ant-timeline').exists()).toBe(true)
  })

  it('renders all timeline items', () => {
    const wrapper = mountTimeline()
    expect(wrapper.findAll('.ant-timeline-item')).toHaveLength(3)
  })

  it('renders item content', () => {
    const wrapper = mountTimeline()
    const contents = wrapper.findAll('.ant-timeline-item-content')
    expect(contents[0].text()).toBe('Event 1')
    expect(contents[1].text()).toBe('Event 2')
  })

  it('renders tail on non-last items', () => {
    const wrapper = mountTimeline()
    const tails = wrapper.findAll('.ant-timeline-item-tail')
    expect(tails.length).toBe(3) // All have tails in DOM (last hidden via CSS)
  })

  it('renders head dot on each item', () => {
    const wrapper = mountTimeline()
    const heads = wrapper.findAll('.ant-timeline-item-head')
    expect(heads).toHaveLength(3)
  })

  it('applies preset color classes', () => {
    const wrapper = mountTimeline({
      items: [
        { content: 'Blue', props: { color: 'blue' } },
        { content: 'Green', props: { color: 'green' } },
        { content: 'Red', props: { color: 'red' } },
        { content: 'Gray', props: { color: 'gray' } },
      ],
    })

    const heads = wrapper.findAll('.ant-timeline-item-head')
    expect(heads[0].classes()).toContain('ant-timeline-item-head-blue')
    expect(heads[1].classes()).toContain('ant-timeline-item-head-green')
    expect(heads[2].classes()).toContain('ant-timeline-item-head-red')
    expect(heads[3].classes()).toContain('ant-timeline-item-head-gray')
  })

  it('applies custom color as inline style', () => {
    const wrapper = mountTimeline({
      items: [{ content: 'Custom', props: { color: '#00CCFF' } }],
    })

    const head = wrapper.find('.ant-timeline-item-head')
    // jsdom normalizes hex colors to rgb
    expect(head.attributes('style')).toContain('border-color')
    expect(head.attributes('style')).toContain('color')
  })

  it('defaults to blue color', () => {
    const wrapper = mountTimeline({
      items: [{ content: 'Default' }],
    })

    expect(wrapper.find('.ant-timeline-item-head').classes()).toContain('ant-timeline-item-head-blue')
  })

  it('renders pending item when pending is true', () => {
    const wrapper = mountTimeline({ props: { pending: true } })
    expect(wrapper.find('.ant-timeline-item-pending').exists()).toBe(true)
    expect(wrapper.find('.ant-timeline').classes()).toContain('ant-timeline-pending')
  })

  it('renders pending text when pending is a string', () => {
    const wrapper = mountTimeline({ props: { pending: 'Loading...' } })
    const pendingItem = wrapper.find('.ant-timeline-item-pending')
    expect(pendingItem.exists()).toBe(true)
    expect(pendingItem.find('.ant-timeline-item-content').text()).toBe('Loading...')
  })

  it('does not render pending item by default', () => {
    const wrapper = mountTimeline()
    expect(wrapper.find('.ant-timeline-item-pending').exists()).toBe(false)
  })

  it('renders reverse mode', () => {
    const wrapper = mountTimeline({ props: { reverse: true } })
    expect(wrapper.find('.ant-timeline').classes()).toContain('ant-timeline-reverse')
  })

  it('renders right mode', () => {
    const wrapper = mountTimeline({ props: { mode: 'right' } })
    expect(wrapper.find('.ant-timeline').classes()).toContain('ant-timeline-right')
  })

  it('renders alternate mode', () => {
    const wrapper = mountTimeline({ props: { mode: 'alternate' } })
    expect(wrapper.find('.ant-timeline').classes()).toContain('ant-timeline-alternate')
  })

  it('renders custom dot via slot', () => {
    const wrapper = mountTimeline({
      items: [
        {
          content: 'Custom dot',
          slots: {
            dot: () => h('span', { class: 'custom-dot' }, '★'),
          },
        },
      ],
    })
    expect(wrapper.find('.custom-dot').exists()).toBe(true)
    expect(wrapper.find('.ant-timeline-item-head').classes()).toContain('ant-timeline-item-head-custom')
  })

  it('renders label', () => {
    const wrapper = mountTimeline({
      items: [
        { content: 'Event', props: { label: '2024-01-01' } },
      ],
    })
    expect(wrapper.find('.ant-timeline-item-label').exists()).toBe(true)
    expect(wrapper.find('.ant-timeline-item-label').text()).toBe('2024-01-01')
  })

  it('renders pendingDot slot', () => {
    const wrapper = mountTimeline({
      props: { pending: true },
      slots: {
        pendingDot: () => h('span', { class: 'custom-pending-dot' }, '...'),
      },
    })
    expect(wrapper.find('.custom-pending-dot').exists()).toBe(true)
  })

  it('renders pending slot content', () => {
    const wrapper = mountTimeline({
      props: { pending: true },
      slots: {
        pending: () => h('span', { class: 'custom-pending' }, 'Custom loading'),
      },
    })
    expect(wrapper.find('.custom-pending').exists()).toBe(true)
    expect(wrapper.find('.custom-pending').text()).toBe('Custom loading')
  })

  it('supports position override on item', () => {
    const wrapper = mountTimeline({
      props: { mode: 'alternate' },
      items: [
        { content: 'Left', props: { position: 'left' } },
        { content: 'Right', props: { position: 'right' } },
      ],
    })

    const items = wrapper.findAll('.ant-timeline-item')
    expect(items[0].classes()).toContain('ant-timeline-item-left')
    expect(items[1].classes()).toContain('ant-timeline-item-right')
  })
})
