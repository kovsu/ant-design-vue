import { describe, expect, it, vi } from 'vitest'
import { Tour } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'
import { nextTick, ref, h } from 'vue'
import type { TourStepInfo } from '../types'

// Stub teleport to render content inline for testing
const globalStubs = {
  global: {
    stubs: {
      teleport: true,
    },
  },
}

const basicSteps: TourStepInfo[] = [
  { title: 'Step 1', description: 'First step' },
  { title: 'Step 2', description: 'Second step' },
  { title: 'Step 3', description: 'Third step' },
]

describe('Tour', () => {
  it('should render when open', () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour').exists()).toBe(true)
    expect(wrapper.find('.ant-tour-title').text()).toBe('Step 1')
    expect(wrapper.find('.ant-tour-description').text()).toBe('First step')
  })

  it('should not render when not open', () => {
    const wrapper = mount(Tour, {
      props: { open: false, steps: basicSteps },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour').exists()).toBe(false)
  })

  it('renders the correct number of indicators', () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps },
      ...globalStubs,
    })
    const indicators = wrapper.findAll('.ant-tour-indicator')
    expect(indicators).toHaveLength(3)
    expect(indicators[0].classes()).toContain('ant-tour-indicator-active')
  })

  it('renders mask by default', () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour-mask').exists()).toBe(true)
  })

  it('hides mask when mask is false', () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps, mask: false },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour-mask').exists()).toBe(false)
  })

  it('emits update:current and change on Next click', async () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps, current: 0 },
      ...globalStubs,
    })
    await wrapper.find('.ant-tour-next-btn').trigger('click')
    expect(wrapper.emitted('update:current')?.[0]).toEqual([1])
    expect(wrapper.emitted('change')?.[0]).toEqual([1])
  })

  it('navigates backward on Previous click', async () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps, current: 1 },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour-title').text()).toBe('Step 2')
    await wrapper.find('.ant-tour-prev-btn').trigger('click')
    expect(wrapper.emitted('update:current')?.[0]).toEqual([0])
  })

  it('does not show Previous button on first step', () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps, current: 0 },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour-prev-btn').exists()).toBe(false)
  })

  it('shows Finish text on last step', () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps, current: 2 },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour-next-btn').text()).toBe('Finish')
  })

  it('emits finish and closes on Finish click', async () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps, current: 2 },
      ...globalStubs,
    })
    await wrapper.find('.ant-tour-next-btn').trigger('click')
    expect(wrapper.emitted('finish')).toHaveLength(1)
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
  })

  it('emits close when mask is clicked', async () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps, current: 1 },
      ...globalStubs,
    })
    await wrapper.find('.ant-tour-mask').trigger('click')
    expect(wrapper.emitted('close')?.[0]).toEqual([1])
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
  })

  it('applies primary type', () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps, type: 'primary' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour-primary').exists()).toBe(true)
  })

  it('applies step-level type override', () => {
    const steps: TourStepInfo[] = [
      { title: 'Primary Step', type: 'primary' },
      { title: 'Default Step' },
    ]
    const wrapper = mount(Tour, {
      props: { open: true, steps, current: 0 },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour-primary').exists()).toBe(true)
  })

  it('renders cover image when provided', () => {
    const steps: TourStepInfo[] = [
      { title: 'With Cover', cover: 'https://example.com/image.png' },
    ]
    const wrapper = mount(Tour, {
      props: { open: true, steps },
      ...globalStubs,
    })
    const img = wrapper.find('.ant-tour-cover img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('https://example.com/image.png')
  })

  it('supports custom button text via nextButtonProps and prevButtonProps', () => {
    const steps: TourStepInfo[] = [
      { title: 'Step 1' },
      {
        title: 'Step 2',
        prevButtonProps: { children: 'Go Back' },
        nextButtonProps: { children: 'Continue' },
      },
    ]
    const wrapper = mount(Tour, {
      props: { open: true, steps, current: 1 },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour-prev-btn').text()).toBe('Go Back')
    expect(wrapper.find('.ant-tour-next-btn').text()).toBe('Continue')
  })

  it('renders indicatorsRender slot', () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps },
      slots: {
        indicatorsRender: ({ current, total }: { current: number; total: number }) =>
          h('span', { class: 'custom-indicator' }, `${current + 1} / ${total}`),
      },
      ...globalStubs,
    })
    expect(wrapper.find('.custom-indicator').exists()).toBe(true)
    expect(wrapper.find('.custom-indicator').text()).toBe('1 / 3')
  })

  it('hides arrow when arrow is false', () => {
    const wrapper = mount(Tour, {
      props: { open: true, steps: basicSteps, arrow: false },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-tour-arrow').exists()).toBe(false)
  })
})
