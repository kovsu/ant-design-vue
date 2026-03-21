import { describe, expect, it, vi } from 'vitest'
import { Carousel } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'
import { nextTick, h } from 'vue'

const slideTemplate = {
  template: `
    <a-carousel v-bind="$attrs">
      <div class="slide">Slide 1</div>
      <div class="slide">Slide 2</div>
      <div class="slide">Slide 3</div>
    </a-carousel>
  `,
}

describe('Carousel', () => {
  it('should render correctly', () => {
    const wrapper = mount(slideTemplate)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders slides', () => {
    const wrapper = mount(slideTemplate)
    expect(wrapper.find('.ant-carousel').exists()).toBe(true)
    expect(wrapper.findAll('.ant-carousel-slide').length).toBeGreaterThanOrEqual(3)
  })

  it('renders dot indicators by default', () => {
    const wrapper = mount(slideTemplate)
    expect(wrapper.find('.ant-carousel-dots').exists()).toBe(true)
    expect(wrapper.findAll('.ant-carousel-dot').length).toBe(3)
  })

  it('hides dot indicators when dots=false', () => {
    const wrapper = mount({
      template: `
        <a-carousel :dots="false">
          <div>Slide 1</div>
          <div>Slide 2</div>
        </a-carousel>
      `,
    })
    expect(wrapper.find('.ant-carousel-dots').exists()).toBe(false)
  })

  it('marks first slide as active by default', () => {
    const wrapper = mount(slideTemplate)
    const dots = wrapper.findAll('.ant-carousel-dot')
    expect(dots[0].classes()).toContain('ant-carousel-dot-active')
  })

  it('starts at initialSlide', () => {
    const wrapper = mount({
      template: `
        <a-carousel :initial-slide="1">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </a-carousel>
      `,
    })
    const dots = wrapper.findAll('.ant-carousel-dot')
    expect(dots[1].classes()).toContain('ant-carousel-dot-active')
  })

  it('changes slide on dot click', async () => {
    vi.useFakeTimers()
    const wrapper = mount(slideTemplate)
    const dots = wrapper.findAll('.ant-carousel-dot')
    await dots[2].find('button').trigger('click')
    vi.advanceTimersByTime(600)
    await nextTick()
    // Re-query after state change and transition
    const updatedDots = wrapper.findAll('.ant-carousel-dot')
    expect(updatedDots[2].classes()).toContain('ant-carousel-dot-active')
    vi.useRealTimers()
  })

  it('applies fade class for fade effect', () => {
    const wrapper = mount({
      template: `
        <a-carousel effect="fade">
          <div>Slide 1</div>
          <div>Slide 2</div>
        </a-carousel>
      `,
    })
    expect(wrapper.find('.ant-carousel-track-fade').exists()).toBe(true)
  })

  it('applies dot position class', () => {
    const wrapper = mount({
      template: `
        <a-carousel dot-position="top">
          <div>Slide 1</div>
          <div>Slide 2</div>
        </a-carousel>
      `,
    })
    expect(wrapper.find('.ant-carousel').classes()).toContain('ant-carousel-dots-top')
  })

  it('applies vertical class for left/right dot position', () => {
    const wrapper = mount({
      template: `
        <a-carousel dot-position="left">
          <div>Slide 1</div>
          <div>Slide 2</div>
        </a-carousel>
      `,
    })
    expect(wrapper.find('.ant-carousel').classes()).toContain('ant-carousel-vertical')
  })

  it('has correct aria attributes', () => {
    const wrapper = mount(slideTemplate)
    const carousel = wrapper.find('.ant-carousel')
    expect(carousel.attributes('role')).toBe('region')
    expect(carousel.attributes('aria-roledescription')).toBe('carousel')
  })

  it('navigates with keyboard ArrowRight', async () => {
    const wrapper = mount(slideTemplate)
    await wrapper.find('.ant-carousel').trigger('keydown', { key: 'ArrowRight' })
    const dots = wrapper.findAll('.ant-carousel-dot')
    expect(dots[1].classes()).toContain('ant-carousel-dot-active')
  })

  it('navigates with keyboard ArrowLeft', async () => {
    const wrapper = mount({
      template: `
        <a-carousel :initial-slide="1">
          <div>Slide 1</div>
          <div>Slide 2</div>
          <div>Slide 3</div>
        </a-carousel>
      `,
    })
    await wrapper.find('.ant-carousel').trigger('keydown', { key: 'ArrowLeft' })
    const dots = wrapper.findAll('.ant-carousel-dot')
    expect(dots[0].classes()).toContain('ant-carousel-dot-active')
  })

  it('emits beforeChange and afterChange events on dot click', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Carousel, {
      slots: {
        default: [
          h('div', 'Slide 1'),
          h('div', 'Slide 2'),
          h('div', 'Slide 3'),
        ],
      },
    })
    const dots = wrapper.findAll('.ant-carousel-dot')
    await dots[1].find('button').trigger('click')
    expect(wrapper.emitted('beforeChange')?.[0]).toEqual([0, 1])
    vi.advanceTimersByTime(600)
    expect(wrapper.emitted('afterChange')?.[0]).toEqual([1])
    vi.useRealTimers()
  })

  it('exposes next/prev/goTo methods', () => {
    const wrapper = mount(Carousel, {
      slots: {
        default: [
          h('div', 'Slide 1'),
          h('div', 'Slide 2'),
        ],
      },
    })
    const vm = wrapper.vm as any
    expect(typeof vm.next).toBe('function')
    expect(typeof vm.prev).toBe('function')
    expect(typeof vm.goTo).toBe('function')
  })
})
