import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { Empty, SimpleEmpty } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'

describe('Empty', () => {
  it('should render default empty state with DefaultEmpty SVG', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.ant-empty').exists()).toBe(true)
    expect(wrapper.find('.ant-empty-image').exists()).toBe(true)
    expect(wrapper.find('.ant-empty-image svg').exists()).toBe(true)
    expect(wrapper.find('.ant-empty-description').text()).toBe('No Data')
  })

  it('should show custom description', () => {
    const wrapper = mount(Empty, {
      props: { description: 'Nothing here' },
    })
    expect(wrapper.find('.ant-empty-description').text()).toBe('Nothing here')
  })

  it('should hide description when description is false', () => {
    const wrapper = mount(Empty, {
      props: { description: false },
    })
    expect(wrapper.find('.ant-empty-description').exists()).toBe(false)
  })

  it('should render image from URL', () => {
    const wrapper = mount(Empty, {
      props: { image: 'https://example.com/empty.svg' },
    })
    const img = wrapper.find('.ant-empty-image img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/empty.svg')
    expect(img.attributes('alt')).toBe('')
  })

  it('should render custom image slot', () => {
    const wrapper = mount(Empty, {
      slots: {
        image: () => h(SimpleEmpty),
      },
    })
    expect(wrapper.find('.ant-empty-image svg').exists()).toBe(true)
  })

  it('should render footer slot', () => {
    const wrapper = mount(Empty, {
      slots: {
        default: '<button>Create Now</button>',
      },
    })
    expect(wrapper.find('.ant-empty-footer').exists()).toBe(true)
    expect(wrapper.find('.ant-empty-footer button').text()).toBe('Create Now')
  })

  it('should not render footer when no default slot', () => {
    const wrapper = mount(Empty)
    expect(wrapper.find('.ant-empty-footer').exists()).toBe(false)
  })

  it('should apply imageStyle', () => {
    const wrapper = mount(Empty, {
      props: { imageStyle: { height: '100px' } },
    })
    expect(wrapper.find('.ant-empty-image').attributes('style')).toContain('height: 100px')
  })

  it('should render description slot', () => {
    const wrapper = mount(Empty, {
      slots: {
        description: '<span>Custom <a href="#">link</a></span>',
      },
    })
    const desc = wrapper.find('.ant-empty-description')
    expect(desc.find('a').exists()).toBe(true)
    expect(desc.text()).toContain('Custom')
  })

  it('should match snapshot', () => {
    const wrapper = mount(Empty)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
