import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'
import TimePicker from '../TimePicker.vue'

describe('TimePicker', () => {
  it('renders basic time picker', () => {
    const wrapper = mount(TimePicker)
    expect(wrapper.find('.ant-picker').exists()).toBe(true)
    expect(wrapper.find('.ant-picker-time').exists()).toBe(true)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Select time')
  })

  it('renders with custom placeholder', () => {
    const wrapper = mount(TimePicker, { props: { placeholder: 'Pick time' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Pick time')
  })

  it('renders disabled state', () => {
    const wrapper = mount(TimePicker, { props: { disabled: true } })
    expect(wrapper.find('.ant-picker-disabled').exists()).toBe(true)
  })

  it('renders different sizes', () => {
    const sm = mount(TimePicker, { props: { size: 'sm' } })
    expect(sm.find('.ant-picker-sm').exists()).toBe(true)

    const lg = mount(TimePicker, { props: { size: 'lg' } })
    expect(lg.find('.ant-picker-lg').exists()).toBe(true)
  })

  it('displays value in input', () => {
    const time = dayjs().hour(14).minute(30).second(0)
    const wrapper = mount(TimePicker, { props: { value: time } })
    expect(wrapper.find('input').element.value).toBe('14:30:00')
  })

  it('displays formatted value', () => {
    const time = dayjs().hour(14).minute(30).second(0)
    const wrapper = mount(TimePicker, { props: { value: time, format: 'HH:mm' } })
    expect(wrapper.find('input').element.value).toBe('14:30')
  })

  it('shows clear button when value is set', () => {
    const time = dayjs().hour(14).minute(30)
    const wrapper = mount(TimePicker, { props: { value: time } })
    expect(wrapper.find('.ant-picker-clear').exists()).toBe(true)
  })

  it('emits clear events', async () => {
    const time = dayjs().hour(14).minute(30)
    const wrapper = mount(TimePicker, { props: { value: time } })
    await wrapper.find('.ant-picker-clear').trigger('click')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([null])
    expect(wrapper.emitted('change')?.[0]).toEqual([null, ''])
  })

  it('renders clock icon', () => {
    const wrapper = mount(TimePicker)
    expect(wrapper.find('.ant-picker-suffix').exists()).toBe(true)
  })
})
