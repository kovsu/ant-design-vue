import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Rate from '../Rate.vue'

describe('Rate', () => {
  it('renders default stars', () => {
    const wrapper = mount(Rate)
    expect(wrapper.classes('ant-rate')).toBe(true)
    expect(wrapper.findAll('.ant-rate-star')).toHaveLength(5)
  })

  it('renders custom count', () => {
    const wrapper = mount(Rate, { props: { count: 3 } })
    expect(wrapper.findAll('.ant-rate-star')).toHaveLength(3)
  })

  it('displays controlled value', () => {
    const wrapper = mount(Rate, { props: { value: 3 } })
    const stars = wrapper.findAll('.ant-rate-star')
    expect(stars[0].classes('ant-rate-star-full')).toBe(true)
    expect(stars[1].classes('ant-rate-star-full')).toBe(true)
    expect(stars[2].classes('ant-rate-star-full')).toBe(true)
    expect(stars[3].classes('ant-rate-star-zero')).toBe(true)
    expect(stars[4].classes('ant-rate-star-zero')).toBe(true)
  })

  it('displays default value when uncontrolled', () => {
    const wrapper = mount(Rate, { props: { defaultValue: 2 } })
    const stars = wrapper.findAll('.ant-rate-star')
    expect(stars[0].classes('ant-rate-star-full')).toBe(true)
    expect(stars[1].classes('ant-rate-star-full')).toBe(true)
    expect(stars[2].classes('ant-rate-star-zero')).toBe(true)
  })

  it('emits update:value and change on click', async () => {
    const wrapper = mount(Rate)
    const stars = wrapper.findAll('.ant-rate-star')
    await stars[2].find('.ant-rate-star-second').trigger('click')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([3])
    expect(wrapper.emitted('change')?.[0]).toEqual([3])
  })

  it('allows clearing by clicking the same value', async () => {
    const wrapper = mount(Rate, { props: { value: 3 } })
    const stars = wrapper.findAll('.ant-rate-star')
    await stars[2].find('.ant-rate-star-second').trigger('click')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([0])
    expect(wrapper.emitted('change')?.[0]).toEqual([0])
  })

  it('does not clear when allowClear is false', async () => {
    const wrapper = mount(Rate, { props: { value: 3, allowClear: false } })
    const stars = wrapper.findAll('.ant-rate-star')
    await stars[2].find('.ant-rate-star-second').trigger('click')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([3])
  })

  it('supports half star display', () => {
    const wrapper = mount(Rate, { props: { value: 2.5, allowHalf: true } })
    const stars = wrapper.findAll('.ant-rate-star')
    expect(stars[0].classes('ant-rate-star-full')).toBe(true)
    expect(stars[1].classes('ant-rate-star-full')).toBe(true)
    expect(stars[2].classes('ant-rate-star-half')).toBe(true)
    expect(stars[3].classes('ant-rate-star-zero')).toBe(true)
  })

  it('emits half value on first-half click', async () => {
    const wrapper = mount(Rate, { props: { allowHalf: true } })
    const stars = wrapper.findAll('.ant-rate-star')
    await stars[1].find('.ant-rate-star-first').trigger('click')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([1.5])
  })

  it('shows hover preview on mousemove', async () => {
    const wrapper = mount(Rate)
    const stars = wrapper.findAll('.ant-rate-star')
    await stars[3].find('.ant-rate-star-second').trigger('mousemove')
    expect(wrapper.emitted('hoverChange')?.[0]).toEqual([4])
    // During hover, stars should reflect hover value
    expect(stars[0].classes('ant-rate-star-full')).toBe(true)
    expect(stars[3].classes('ant-rate-star-full')).toBe(true)
    expect(stars[4].classes('ant-rate-star-zero')).toBe(true)
  })

  it('clears hover on mouseleave', async () => {
    const wrapper = mount(Rate)
    const stars = wrapper.findAll('.ant-rate-star')
    await stars[3].find('.ant-rate-star-second').trigger('mousemove')
    await wrapper.trigger('mouseleave')
    expect(wrapper.emitted('hoverChange')?.[1]).toEqual([0])
  })

  it('does not emit events when disabled', async () => {
    const wrapper = mount(Rate, { props: { disabled: true, value: 2 } })
    const stars = wrapper.findAll('.ant-rate-star')
    await stars[3].find('.ant-rate-star-second').trigger('click')
    expect(wrapper.emitted('update:value')).toBeUndefined()
    expect(wrapper.emitted('change')).toBeUndefined()
  })

  it('applies disabled class', () => {
    const wrapper = mount(Rate, { props: { disabled: true } })
    expect(wrapper.classes('ant-rate-disabled')).toBe(true)
  })

  it('sets tabindex to -1 when disabled', () => {
    const wrapper = mount(Rate, { props: { disabled: true } })
    expect(wrapper.attributes('tabindex')).toBe('-1')
  })

  it('supports keyboard ArrowRight to increase value', async () => {
    const wrapper = mount(Rate, { props: { value: 2 } })
    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')?.[0]).toEqual([3])
  })

  it('supports keyboard ArrowLeft to decrease value', async () => {
    const wrapper = mount(Rate, { props: { value: 3 } })
    await wrapper.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:value')?.[0]).toEqual([2])
  })

  it('supports half step with keyboard when allowHalf', async () => {
    const wrapper = mount(Rate, { props: { value: 2, allowHalf: true } })
    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')?.[0]).toEqual([2.5])
  })

  it('clamps keyboard value at max', async () => {
    const wrapper = mount(Rate, { props: { value: 5 } })
    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')).toBeUndefined()
  })

  it('clamps keyboard value at 0', async () => {
    const wrapper = mount(Rate, { props: { value: 0 } })
    await wrapper.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:value')).toBeUndefined()
  })

  it('does not respond to keyboard when disabled', async () => {
    const wrapper = mount(Rate, { props: { disabled: true, value: 2 } })
    await wrapper.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')).toBeUndefined()
  })

  it('renders custom character prop', () => {
    const wrapper = mount(Rate, { props: { character: '♥' } })
    const second = wrapper.find('.ant-rate-star-second')
    expect(second.text()).toBe('♥')
  })

  it('renders character slot', () => {
    const wrapper = mount(Rate, {
      slots: { character: () => 'ABC' },
    })
    const second = wrapper.find('.ant-rate-star-second')
    expect(second.text()).toBe('ABC')
  })

  it('has correct ARIA attributes', () => {
    const wrapper = mount(Rate, { props: { value: 3 } })
    expect(wrapper.attributes('role')).toBe('radiogroup')
    const stars = wrapper.findAll('.ant-rate-star')
    expect(stars[0].attributes('role')).toBe('radio')
    expect(stars[0].attributes('aria-checked')).toBe('true')
    expect(stars[4].attributes('aria-checked')).toBe('false')
  })

  it('emits focus and blur events', async () => {
    const wrapper = mount(Rate)
    await wrapper.trigger('focus')
    expect(wrapper.emitted('focus')).toHaveLength(1)
    await wrapper.trigger('blur')
    expect(wrapper.emitted('blur')).toHaveLength(1)
  })

  it('updates display when value prop changes', async () => {
    const wrapper = mount(Rate, { props: { value: 1 } })
    expect(wrapper.findAll('.ant-rate-star')[0].classes('ant-rate-star-full')).toBe(true)
    expect(wrapper.findAll('.ant-rate-star')[1].classes('ant-rate-star-zero')).toBe(true)

    await wrapper.setProps({ value: 4 })
    expect(wrapper.findAll('.ant-rate-star')[3].classes('ant-rate-star-full')).toBe(true)
    expect(wrapper.findAll('.ant-rate-star')[4].classes('ant-rate-star-zero')).toBe(true)
  })

  it('should render snapshot correctly', () => {
    const wrapper = mount(Rate, { props: { value: 3 } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
