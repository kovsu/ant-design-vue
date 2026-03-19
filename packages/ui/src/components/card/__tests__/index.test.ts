import { describe, expect, it } from 'vitest'
import Card from '../Card.vue'
import CardMeta from '../CardMeta.vue'
import CardGrid from '../CardGrid.vue'
import { mount } from '@vue/test-utils'

describe('Card', () => {
  it('should render correctly', () => {
    const wrapper = mount(Card, {
      slots: { default: 'Card content' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with default classes', () => {
    const wrapper = mount(Card)
    expect(wrapper.find('.ant-card').exists()).toBe(true)
    expect(wrapper.find('.ant-card').classes()).toContain('ant-card-bordered')
  })

  it('renders title from prop', () => {
    const wrapper = mount(Card, {
      props: { title: 'My Card' },
    })
    expect(wrapper.find('.ant-card-head').exists()).toBe(true)
    expect(wrapper.find('.ant-card-head-title').text()).toBe('My Card')
  })

  it('renders title from slot', () => {
    const wrapper = mount(Card, {
      slots: { title: '<strong>Custom Title</strong>' },
    })
    expect(wrapper.find('.ant-card-head').exists()).toBe(true)
    expect(wrapper.find('.ant-card-head-title strong').text()).toBe('Custom Title')
  })

  it('renders extra slot', () => {
    const wrapper = mount(Card, {
      props: { title: 'Title' },
      slots: { extra: '<a href="#">More</a>' },
    })
    expect(wrapper.find('.ant-card-extra').exists()).toBe(true)
    expect(wrapper.find('.ant-card-extra a').text()).toBe('More')
  })

  it('does not render head when no title or extra', () => {
    const wrapper = mount(Card, {
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.ant-card-head').exists()).toBe(false)
  })

  it('renders head when only extra slot is present', () => {
    const wrapper = mount(Card, {
      slots: {
        default: 'Content',
        extra: '<span>Extra</span>',
      },
    })
    expect(wrapper.find('.ant-card-head').exists()).toBe(true)
    expect(wrapper.find('.ant-card-extra').exists()).toBe(true)
  })

  it('renders bordered by default', () => {
    const wrapper = mount(Card)
    expect(wrapper.find('.ant-card').classes()).toContain('ant-card-bordered')
  })

  it('does not render bordered when set to false', () => {
    const wrapper = mount(Card, {
      props: { bordered: false },
    })
    expect(wrapper.find('.ant-card').classes()).not.toContain('ant-card-bordered')
  })

  it('applies hoverable class', () => {
    const wrapper = mount(Card, {
      props: { hoverable: true },
    })
    expect(wrapper.find('.ant-card').classes()).toContain('ant-card-hoverable')
  })

  it('does not apply hoverable by default', () => {
    const wrapper = mount(Card)
    expect(wrapper.find('.ant-card').classes()).not.toContain('ant-card-hoverable')
  })

  it('applies loading class and shows skeleton', () => {
    const wrapper = mount(Card, {
      props: { loading: true },
      slots: { default: 'Hidden content' },
    })
    expect(wrapper.find('.ant-card').classes()).toContain('ant-card-loading')
    expect(wrapper.find('.ant-card-loading-content').exists()).toBe(true)
    expect(wrapper.find('.ant-card-loading-block').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('Hidden content')
  })

  it('shows content when not loading', () => {
    const wrapper = mount(Card, {
      props: { loading: false },
      slots: { default: 'Visible content' },
    })
    expect(wrapper.find('.ant-card-loading-content').exists()).toBe(false)
    expect(wrapper.text()).toContain('Visible content')
  })

  it('renders small size', () => {
    const wrapper = mount(Card, {
      props: { size: 'small' },
    })
    expect(wrapper.find('.ant-card').classes()).toContain('ant-card-small')
  })

  it('renders inner type', () => {
    const wrapper = mount(Card, {
      props: { type: 'inner', title: 'Inner Card' },
    })
    expect(wrapper.find('.ant-card').classes()).toContain('ant-card-type-inner')
  })

  it('renders cover slot', () => {
    const wrapper = mount(Card, {
      slots: {
        cover: '<img src="test.png" alt="cover" />',
      },
    })
    expect(wrapper.find('.ant-card-cover').exists()).toBe(true)
    expect(wrapper.find('.ant-card-cover img').attributes('src')).toBe('test.png')
  })

  it('does not render cover when slot is not provided', () => {
    const wrapper = mount(Card, {
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.ant-card-cover').exists()).toBe(false)
  })

  it('renders actions slot', () => {
    const wrapper = mount(Card, {
      slots: {
        actions: '<li><span>Action 1</span></li><li><span>Action 2</span></li>',
      },
    })
    expect(wrapper.find('.ant-card-actions').exists()).toBe(true)
    expect(wrapper.findAll('.ant-card-actions li')).toHaveLength(2)
  })

  it('does not render actions when slot is not provided', () => {
    const wrapper = mount(Card, {
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.ant-card-actions').exists()).toBe(false)
  })

  it('applies bodyStyle', () => {
    const wrapper = mount(Card, {
      props: { bodyStyle: { padding: '48px' } },
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.ant-card-body').attributes('style')).toContain('padding: 48px')
  })

  it('applies headStyle', () => {
    const wrapper = mount(Card, {
      props: { title: 'Title', headStyle: { background: 'red' } },
    })
    expect(wrapper.find('.ant-card-head').attributes('style')).toContain('background: red')
  })
})

describe('CardMeta', () => {
  it('should render correctly', () => {
    const wrapper = mount(CardMeta, {
      props: { title: 'Meta Title', description: 'Meta Description' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders title from prop', () => {
    const wrapper = mount(CardMeta, {
      props: { title: 'Meta Title' },
    })
    expect(wrapper.find('.ant-card-meta-title').text()).toBe('Meta Title')
  })

  it('renders description from prop', () => {
    const wrapper = mount(CardMeta, {
      props: { description: 'Meta Description' },
    })
    expect(wrapper.find('.ant-card-meta-description').text()).toBe('Meta Description')
  })

  it('renders title from slot', () => {
    const wrapper = mount(CardMeta, {
      slots: { title: '<strong>Slot Title</strong>' },
    })
    expect(wrapper.find('.ant-card-meta-title strong').text()).toBe('Slot Title')
  })

  it('renders description from slot', () => {
    const wrapper = mount(CardMeta, {
      slots: { description: '<em>Slot Description</em>' },
    })
    expect(wrapper.find('.ant-card-meta-description em').text()).toBe('Slot Description')
  })

  it('renders avatar slot', () => {
    const wrapper = mount(CardMeta, {
      props: { title: 'Title' },
      slots: {
        avatar: '<div class="test-avatar">A</div>',
      },
    })
    expect(wrapper.find('.ant-card-meta-avatar').exists()).toBe(true)
    expect(wrapper.find('.test-avatar').text()).toBe('A')
  })

  it('does not render avatar when slot is not provided', () => {
    const wrapper = mount(CardMeta, {
      props: { title: 'Title' },
    })
    expect(wrapper.find('.ant-card-meta-avatar').exists()).toBe(false)
  })

  it('does not render title when neither prop nor slot provided', () => {
    const wrapper = mount(CardMeta, {
      props: { description: 'Desc' },
    })
    expect(wrapper.find('.ant-card-meta-title').exists()).toBe(false)
  })

  it('does not render description when neither prop nor slot provided', () => {
    const wrapper = mount(CardMeta, {
      props: { title: 'Title' },
    })
    expect(wrapper.find('.ant-card-meta-description').exists()).toBe(false)
  })
})

describe('CardGrid', () => {
  it('should render correctly', () => {
    const wrapper = mount(CardGrid, {
      slots: { default: 'Grid content' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with grid class', () => {
    const wrapper = mount(CardGrid, {
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.ant-card-grid').exists()).toBe(true)
  })

  it('renders hoverable by default', () => {
    const wrapper = mount(CardGrid, {
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.ant-card-grid').classes()).toContain('ant-card-grid-hoverable')
  })

  it('does not render hoverable when set to false', () => {
    const wrapper = mount(CardGrid, {
      props: { hoverable: false },
      slots: { default: 'Content' },
    })
    expect(wrapper.find('.ant-card-grid').classes()).not.toContain('ant-card-grid-hoverable')
  })

  it('renders slot content', () => {
    const wrapper = mount(CardGrid, {
      slots: { default: '<span>Grid Item</span>' },
    })
    expect(wrapper.find('.ant-card-grid span').text()).toBe('Grid Item')
  })
})
