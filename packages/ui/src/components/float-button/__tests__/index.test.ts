import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import FloatButton from '../FloatButton.vue'
import FloatButtonGroup from '../FloatButtonGroup.vue'
import BackTop from '../BackTop.vue'

describe('FloatButton', () => {
  it('should render correctly', () => {
    const wrapper = mount(FloatButton)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders as a button by default', () => {
    const wrapper = mount(FloatButton)
    expect(wrapper.find('.ant-float-btn').exists()).toBe(true)
    expect(wrapper.element.tagName).toBe('BUTTON')
  })

  it('renders as an anchor when href is provided', () => {
    const wrapper = mount(FloatButton, {
      props: { href: 'https://example.com', target: '_blank' },
    })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://example.com')
    expect(wrapper.attributes('target')).toBe('_blank')
  })

  it('applies circle shape by default', () => {
    const wrapper = mount(FloatButton)
    expect(wrapper.classes('ant-float-btn-circle')).toBe(true)
  })

  it('applies square shape', () => {
    const wrapper = mount(FloatButton, { props: { shape: 'square' } })
    expect(wrapper.classes('ant-float-btn-square')).toBe(true)
    expect(wrapper.classes('ant-float-btn-circle')).toBe(false)
  })

  it('applies default type by default', () => {
    const wrapper = mount(FloatButton)
    expect(wrapper.classes('ant-float-btn-default')).toBe(true)
    expect(wrapper.classes('ant-float-btn-primary')).toBe(false)
  })

  it('applies primary type', () => {
    const wrapper = mount(FloatButton, { props: { type: 'primary' } })
    expect(wrapper.classes('ant-float-btn-primary')).toBe(true)
    expect(wrapper.classes('ant-float-btn-default')).toBe(false)
  })

  it('emits click event', async () => {
    const wrapper = mount(FloatButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
    expect(wrapper.emitted('click')![0][0]).toBeInstanceOf(MouseEvent)
  })

  it('renders tooltip as title attribute', () => {
    const wrapper = mount(FloatButton, { props: { tooltip: 'Help me' } })
    expect(wrapper.attributes('title')).toBe('Help me')
  })

  it('renders description', () => {
    const wrapper = mount(FloatButton, { props: { description: 'Help' } })
    expect(wrapper.find('.ant-float-btn-description').exists()).toBe(true)
    expect(wrapper.find('.ant-float-btn-description').text()).toBe('Help')
    expect(wrapper.classes('ant-float-btn-with-description')).toBe(true)
  })

  it('renders description slot', () => {
    const wrapper = mount(FloatButton, {
      slots: { description: '<span class="custom-desc">Custom</span>' },
    })
    expect(wrapper.find('.custom-desc').exists()).toBe(true)
    expect(wrapper.classes('ant-float-btn-with-description')).toBe(true)
  })

  it('renders icon slot', () => {
    const wrapper = mount(FloatButton, {
      slots: { default: '<span class="my-icon">+</span>' },
    })
    expect(wrapper.find('.my-icon').exists()).toBe(true)
  })

  it('renders badge with count', () => {
    const wrapper = mount(FloatButton, {
      props: { badge: { count: 5 } },
    })
    expect(wrapper.find('.ant-float-btn-badge').exists()).toBe(true)
    expect(wrapper.find('.ant-float-btn-badge').text()).toBe('5')
  })

  it('renders badge as dot', () => {
    const wrapper = mount(FloatButton, {
      props: { badge: { dot: true } },
    })
    expect(wrapper.find('.ant-float-btn-badge-dot').exists()).toBe(true)
  })

  it('does not render badge when count is 0', () => {
    const wrapper = mount(FloatButton, {
      props: { badge: { count: 0 } },
    })
    expect(wrapper.find('.ant-float-btn-badge').exists()).toBe(false)
  })

  it('renders badge overflow count', () => {
    const wrapper = mount(FloatButton, {
      props: { badge: { count: 150 } },
    })
    expect(wrapper.find('.ant-float-btn-badge').text()).toBe('99+')
  })
})

describe('FloatButtonGroup', () => {
  it('should render correctly', () => {
    const wrapper = mount(FloatButtonGroup, {
      slots: {
        default: '<button class="ant-float-btn child-btn">A</button>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders as always-open when no trigger is set', () => {
    const wrapper = mount(FloatButtonGroup, {
      slots: {
        default: '<button class="ant-float-btn">A</button>',
      },
    })
    expect(wrapper.classes('ant-float-btn-group-open')).toBe(true)
    // No trigger button rendered
    expect(wrapper.find('.ant-float-btn-group-trigger').exists()).toBe(false)
    // Children are visible
    expect(wrapper.find('.ant-float-btn-group-items').isVisible()).toBe(true)
  })

  it('renders trigger button when trigger is set', () => {
    const wrapper = mount(FloatButtonGroup, {
      props: { trigger: 'click' },
      slots: {
        default: '<button class="ant-float-btn">A</button>',
      },
    })
    expect(wrapper.find('.ant-float-btn-group-trigger').exists()).toBe(true)
  })

  it('toggles open on click trigger', async () => {
    const wrapper = mount(FloatButtonGroup, {
      props: { trigger: 'click' },
      slots: {
        default: '<button class="ant-float-btn">A</button>',
      },
      attachTo: document.body,
    })
    expect(wrapper.classes('ant-float-btn-group-open')).toBe(false)

    await wrapper.find('.ant-float-btn-group-trigger').trigger('click')
    expect(wrapper.emitted('update:open')![0]).toEqual([true])
    expect(wrapper.emitted('openChange')![0]).toEqual([true])
    expect(wrapper.classes('ant-float-btn-group-open')).toBe(true)

    await wrapper.find('.ant-float-btn-group-trigger').trigger('click')
    expect(wrapper.emitted('update:open')![1]).toEqual([false])
    expect(wrapper.classes('ant-float-btn-group-open')).toBe(false)

    wrapper.unmount()
  })

  it('toggles open on hover trigger', async () => {
    const wrapper = mount(FloatButtonGroup, {
      props: { trigger: 'hover' },
      slots: {
        default: '<button class="ant-float-btn">A</button>',
      },
      attachTo: document.body,
    })
    expect(wrapper.classes('ant-float-btn-group-open')).toBe(false)

    await wrapper.trigger('mouseenter')
    expect(wrapper.classes('ant-float-btn-group-open')).toBe(true)

    await wrapper.trigger('mouseleave')
    expect(wrapper.classes('ant-float-btn-group-open')).toBe(false)

    wrapper.unmount()
  })

  it('respects controlled open prop', async () => {
    const wrapper = mount(FloatButtonGroup, {
      props: { trigger: 'click', open: false },
      slots: {
        default: '<button class="ant-float-btn">A</button>',
      },
    })
    expect(wrapper.classes('ant-float-btn-group-open')).toBe(false)

    // Clicking emits but doesn't change internal state since controlled
    await wrapper.find('.ant-float-btn-group-trigger').trigger('click')
    expect(wrapper.emitted('update:open')![0]).toEqual([true])
    // Still closed because controlled by parent
    expect(wrapper.classes('ant-float-btn-group-open')).toBe(false)

    // Parent updates the prop
    await wrapper.setProps({ open: true })
    expect(wrapper.classes('ant-float-btn-group-open')).toBe(true)
  })

  it('applies shape to group', () => {
    const wrapper = mount(FloatButtonGroup, {
      props: { shape: 'square' },
      slots: {
        default: '<button class="ant-float-btn">A</button>',
      },
    })
    expect(wrapper.classes('ant-float-btn-group-square')).toBe(true)
  })

  it('rotates icon when open', async () => {
    const wrapper = mount(FloatButtonGroup, {
      props: { trigger: 'click' },
      slots: {
        default: '<button class="ant-float-btn">A</button>',
      },
      attachTo: document.body,
    })
    expect(wrapper.find('.ant-float-btn-group-icon-open').exists()).toBe(false)

    await wrapper.find('.ant-float-btn-group-trigger').trigger('click')
    expect(wrapper.find('.ant-float-btn-group-icon-open').exists()).toBe(true)

    wrapper.unmount()
  })

  it('renders custom icon slot', () => {
    const wrapper = mount(FloatButtonGroup, {
      props: { trigger: 'click' },
      slots: {
        default: '<button class="ant-float-btn">A</button>',
        icon: '<span class="custom-trigger-icon">X</span>',
      },
    })
    expect(wrapper.find('.custom-trigger-icon').exists()).toBe(true)
  })
})

describe('BackTop', () => {
  it('should render correctly', () => {
    const wrapper = mount(BackTop)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('is hidden by default (no scroll)', () => {
    const wrapper = mount(BackTop)
    // v-show sets display:none, so the element exists but is hidden
    expect(wrapper.find('.ant-float-btn-back-top').exists()).toBe(true)
    expect(wrapper.find('.ant-float-btn-back-top').isVisible()).toBe(false)
  })

  it('applies type and shape props', () => {
    const wrapper = mount(BackTop, {
      props: { type: 'primary', shape: 'square' },
    })
    expect(wrapper.find('.ant-float-btn-primary').exists()).toBe(true)
    expect(wrapper.find('.ant-float-btn-square').exists()).toBe(true)
  })

  it('emits click event', async () => {
    const wrapper = mount(BackTop)
    const btn = wrapper.find('.ant-float-btn-back-top')
    await btn.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('renders custom icon slot', () => {
    const wrapper = mount(BackTop, {
      slots: { default: '<span class="custom-icon">UP</span>' },
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
  })

  it('renders description', () => {
    const wrapper = mount(BackTop, {
      props: { description: 'Top' },
    })
    expect(wrapper.find('.ant-float-btn-description').exists()).toBe(true)
    expect(wrapper.find('.ant-float-btn-description').text()).toBe('Top')
  })

  it('renders tooltip as title', () => {
    const wrapper = mount(BackTop, {
      props: { tooltip: 'Scroll to top' },
    })
    expect(wrapper.find('.ant-float-btn-back-top').attributes('title')).toBe('Scroll to top')
  })

  it('becomes visible when scroll exceeds visibilityHeight', async () => {
    const scrollContainer = document.createElement('div')
    Object.defineProperty(scrollContainer, 'scrollTop', {
      value: 500,
      writable: true,
    })

    const wrapper = mount(BackTop, {
      props: {
        visibilityHeight: 400,
        target: () => scrollContainer,
      },
    })

    // Simulate scroll event
    scrollContainer.dispatchEvent(new Event('scroll'))
    await nextTick()

    expect(wrapper.find('.ant-float-btn-back-top').isVisible()).toBe(true)
  })

  it('stays hidden when scroll is below visibilityHeight', async () => {
    const scrollContainer = document.createElement('div')
    Object.defineProperty(scrollContainer, 'scrollTop', {
      value: 100,
      writable: true,
    })

    const wrapper = mount(BackTop, {
      props: {
        visibilityHeight: 400,
        target: () => scrollContainer,
      },
    })

    // Simulate scroll event
    scrollContainer.dispatchEvent(new Event('scroll'))
    await nextTick()

    expect(wrapper.find('.ant-float-btn-back-top').isVisible()).toBe(false)
  })
})
