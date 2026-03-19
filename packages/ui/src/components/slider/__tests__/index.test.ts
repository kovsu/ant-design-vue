import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Slider from '../Slider.vue'

describe('Slider', () => {
  it('renders with default props', () => {
    const wrapper = mount(Slider)
    expect(wrapper.classes('ant-slider')).toBe(true)
    expect(wrapper.find('.ant-slider-rail').exists()).toBe(true)
    expect(wrapper.find('.ant-slider-track').exists()).toBe(true)
    expect(wrapper.find('.ant-slider-handle').exists()).toBe(true)
  })

  it('renders single handle by default', () => {
    const wrapper = mount(Slider)
    expect(wrapper.findAll('.ant-slider-handle')).toHaveLength(1)
  })

  it('renders two handles in range mode', () => {
    const wrapper = mount(Slider, {
      props: { range: true, value: [20, 50] as [number, number] },
    })
    expect(wrapper.findAll('.ant-slider-handle')).toHaveLength(2)
  })

  it('displays correct track width for single value', () => {
    const wrapper = mount(Slider, { props: { value: 50 } })
    const track = wrapper.find('.ant-slider-track')
    expect(track.attributes('style')).toContain('left: 0%')
    expect(track.attributes('style')).toContain('width: 50%')
  })

  it('displays correct track for range value', () => {
    const wrapper = mount(Slider, {
      props: { range: true, value: [20, 60] as [number, number] },
    })
    const track = wrapper.find('.ant-slider-track')
    expect(track.attributes('style')).toContain('left: 20%')
    expect(track.attributes('style')).toContain('width: 40%')
  })

  it('positions handle at correct percentage', () => {
    const wrapper = mount(Slider, { props: { value: 30 } })
    const handle = wrapper.find('.ant-slider-handle')
    expect(handle.attributes('style')).toContain('left: 30%')
  })

  it('positions range handles correctly', () => {
    const wrapper = mount(Slider, {
      props: { range: true, value: [25, 75] as [number, number] },
    })
    const handles = wrapper.findAll('.ant-slider-handle')
    expect(handles[0].attributes('style')).toContain('left: 25%')
    expect(handles[1].attributes('style')).toContain('left: 75%')
  })

  it('respects custom min and max', () => {
    const wrapper = mount(Slider, { props: { value: 50, min: 0, max: 200 } })
    const handle = wrapper.find('.ant-slider-handle')
    expect(handle.attributes('style')).toContain('left: 25%')
  })

  it('has correct ARIA attributes for single handle', () => {
    const wrapper = mount(Slider, { props: { value: 30, min: 0, max: 100 } })
    const handle = wrapper.find('.ant-slider-handle')
    expect(handle.attributes('role')).toBe('slider')
    expect(handle.attributes('aria-valuemin')).toBe('0')
    expect(handle.attributes('aria-valuemax')).toBe('100')
    expect(handle.attributes('aria-valuenow')).toBe('30')
  })

  it('has correct ARIA attributes for range handles', () => {
    const wrapper = mount(Slider, {
      props: { range: true, value: [20, 80] as [number, number] },
    })
    const handles = wrapper.findAll('.ant-slider-handle')
    expect(handles[0].attributes('aria-valuenow')).toBe('20')
    expect(handles[1].attributes('aria-valuenow')).toBe('80')
  })

  it('applies disabled class and aria-disabled', () => {
    const wrapper = mount(Slider, { props: { disabled: true } })
    expect(wrapper.classes('ant-slider-disabled')).toBe(true)
    const handle = wrapper.find('.ant-slider-handle')
    expect(handle.attributes('aria-disabled')).toBe('true')
    expect(handle.attributes('tabindex')).toBe('-1')
  })

  it('applies vertical class', () => {
    const wrapper = mount(Slider, { props: { vertical: true } })
    expect(wrapper.classes('ant-slider-vertical')).toBe(true)
  })

  it('positions handle and track using bottom in vertical mode', () => {
    const wrapper = mount(Slider, { props: { vertical: true, value: 40 } })
    const handle = wrapper.find('.ant-slider-handle')
    expect(handle.attributes('style')).toContain('bottom: 40%')
    const track = wrapper.find('.ant-slider-track')
    expect(track.attributes('style')).toContain('bottom: 0%')
    expect(track.attributes('style')).toContain('height: 40%')
  })

  it('renders marks', () => {
    const marks = { 0: '0', 50: '50', 100: '100' }
    const wrapper = mount(Slider, { props: { marks, value: 50 } })
    expect(wrapper.find('.ant-slider-mark').exists()).toBe(true)
    const markTexts = wrapper.findAll('.ant-slider-mark-text')
    expect(markTexts).toHaveLength(3)
    expect(markTexts[0].text()).toBe('0')
    expect(markTexts[1].text()).toBe('50')
    expect(markTexts[2].text()).toBe('100')
  })

  it('applies active class to marks within range', () => {
    const marks = { 0: '0', 25: '25', 50: '50', 75: '75', 100: '100' }
    const wrapper = mount(Slider, { props: { marks, value: 50 } })
    const markTexts = wrapper.findAll('.ant-slider-mark-text')
    expect(markTexts[0].classes('ant-slider-mark-text-active')).toBe(true)
    expect(markTexts[1].classes('ant-slider-mark-text-active')).toBe(true)
    expect(markTexts[2].classes('ant-slider-mark-text-active')).toBe(true)
    expect(markTexts[3].classes('ant-slider-mark-text-active')).toBe(false)
    expect(markTexts[4].classes('ant-slider-mark-text-active')).toBe(false)
  })

  it('renders dots when marks are present', () => {
    const marks = { 0: '0', 50: '50', 100: '100' }
    const wrapper = mount(Slider, { props: { marks, value: 50 } })
    const dots = wrapper.findAll('.ant-slider-dot')
    expect(dots).toHaveLength(3)
  })

  it('renders step dots', () => {
    const wrapper = mount(Slider, { props: { dots: true, step: 20, value: 40 } })
    const dots = wrapper.findAll('.ant-slider-dot')
    // 0, 20, 40, 60, 80, 100 = 6 dots
    expect(dots).toHaveLength(6)
  })

  it('applies active class to dots within value range', () => {
    const wrapper = mount(Slider, { props: { dots: true, step: 25, value: 50 } })
    const dots = wrapper.findAll('.ant-slider-dot')
    // 0, 25, 50 should be active; 75, 100 should not
    expect(dots[0].classes('ant-slider-dot-active')).toBe(true)
    expect(dots[1].classes('ant-slider-dot-active')).toBe(true)
    expect(dots[2].classes('ant-slider-dot-active')).toBe(true)
    expect(dots[3].classes('ant-slider-dot-active')).toBe(false)
    expect(dots[4].classes('ant-slider-dot-active')).toBe(false)
  })

  it('hides track when included is false', () => {
    const wrapper = mount(Slider, { props: { included: false, value: 50 } })
    const track = wrapper.find('.ant-slider-track')
    expect(track.attributes('style')).toContain('display: none')
  })

  it('handles keyboard ArrowRight to increase value', async () => {
    const wrapper = mount(Slider, { props: { value: 50, step: 1 } })
    const handle = wrapper.find('.ant-slider-handle')
    await handle.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')?.[0]).toEqual([51])
    expect(wrapper.emitted('change')?.[0]).toEqual([51])
    expect(wrapper.emitted('afterChange')?.[0]).toEqual([51])
  })

  it('handles keyboard ArrowLeft to decrease value', async () => {
    const wrapper = mount(Slider, { props: { value: 50, step: 1 } })
    const handle = wrapper.find('.ant-slider-handle')
    await handle.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:value')?.[0]).toEqual([49])
  })

  it('handles keyboard with custom step', async () => {
    const wrapper = mount(Slider, { props: { value: 50, step: 10 } })
    const handle = wrapper.find('.ant-slider-handle')
    await handle.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')?.[0]).toEqual([60])
  })

  it('clamps keyboard value at max', async () => {
    const wrapper = mount(Slider, { props: { value: 100, step: 1 } })
    const handle = wrapper.find('.ant-slider-handle')
    await handle.trigger('keydown', { key: 'ArrowRight' })
    // value should stay at 100
    expect(wrapper.emitted('update:value')?.[0]).toEqual([100])
  })

  it('clamps keyboard value at min', async () => {
    const wrapper = mount(Slider, { props: { value: 0, step: 1 } })
    const handle = wrapper.find('.ant-slider-handle')
    await handle.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:value')?.[0]).toEqual([0])
  })

  it('does not respond to keyboard when disabled', async () => {
    const wrapper = mount(Slider, { props: { value: 50, disabled: true } })
    const handle = wrapper.find('.ant-slider-handle')
    await handle.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')).toBeUndefined()
  })

  it('handles keyboard in range mode', async () => {
    const wrapper = mount(Slider, {
      props: { range: true, value: [20, 80] as [number, number], step: 1 },
    })
    const handles = wrapper.findAll('.ant-slider-handle')
    await handles[0].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')?.[0]).toEqual([[21, 80]])
    expect(wrapper.emitted('afterChange')?.[0]).toEqual([[21, 80]])
  })

  it('supports Home key to go to min', async () => {
    const wrapper = mount(Slider, { props: { value: 50, step: 1 } })
    const handle = wrapper.find('.ant-slider-handle')
    await handle.trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('update:value')?.[0]).toEqual([0])
  })

  it('supports End key to go to max', async () => {
    const wrapper = mount(Slider, { props: { value: 50, step: 1 } })
    const handle = wrapper.find('.ant-slider-handle')
    await handle.trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:value')?.[0]).toEqual([100])
  })

  it('updates when value prop changes', async () => {
    const wrapper = mount(Slider, { props: { value: 30 } })
    expect(wrapper.find('.ant-slider-handle').attributes('style')).toContain('left: 30%')
    await wrapper.setProps({ value: 70 })
    expect(wrapper.find('.ant-slider-handle').attributes('style')).toContain('left: 70%')
  })

  it('renders marks with custom style', () => {
    const marks = {
      100: { style: { color: '#f50' }, label: 'Hot' },
    }
    const wrapper = mount(Slider, { props: { marks, value: 0 } })
    const markText = wrapper.find('.ant-slider-mark-text')
    expect(markText.text()).toBe('Hot')
    // jsdom normalizes hex to rgb
    expect(markText.attributes('style')).toMatch(/color:\s*(#f50|rgb\(255,\s*85,\s*0\))/)
  })

  it('applies ant-slider-with-marks class when marks present', () => {
    const marks = { 0: '0', 100: '100' }
    const wrapper = mount(Slider, { props: { marks } })
    expect(wrapper.classes('ant-slider-with-marks')).toBe(true)
  })

  it('reverses handle position', () => {
    const wrapper = mount(Slider, { props: { value: 30, reverse: true } })
    const handle = wrapper.find('.ant-slider-handle')
    expect(handle.attributes('style')).toContain('left: 70%')
  })

  it('should render snapshot correctly', () => {
    const wrapper = mount(Slider, { props: { value: 50 } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
