import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'
import DatePicker from '../DatePicker.vue'
import RangePicker from '../RangePicker.vue'

describe('DatePicker', () => {
  it('renders basic date picker', () => {
    const wrapper = mount(DatePicker)
    expect(wrapper.find('.ant-picker').exists()).toBe(true)
    expect(wrapper.find('input').attributes('placeholder')).toBe('Select date')
  })

  it('renders with custom placeholder', () => {
    const wrapper = mount(DatePicker, { props: { placeholder: 'Choose a date' } })
    expect(wrapper.find('input').attributes('placeholder')).toBe('Choose a date')
  })

  it('renders disabled state', () => {
    const wrapper = mount(DatePicker, { props: { disabled: true } })
    expect(wrapper.find('.ant-picker-disabled').exists()).toBe(true)
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('renders different sizes', () => {
    const sm = mount(DatePicker, { props: { size: 'sm' } })
    expect(sm.find('.ant-picker-sm').exists()).toBe(true)

    const lg = mount(DatePicker, { props: { size: 'lg' } })
    expect(lg.find('.ant-picker-lg').exists()).toBe(true)
  })

  it('renders with status', () => {
    const error = mount(DatePicker, { props: { status: 'error' } })
    expect(error.find('.ant-picker-status-error').exists()).toBe(true)

    const warning = mount(DatePicker, { props: { status: 'warning' } })
    expect(warning.find('.ant-picker-status-warning').exists()).toBe(true)
  })

  it('renders borderless', () => {
    const wrapper = mount(DatePicker, { props: { bordered: false } })
    expect(wrapper.find('.ant-picker-borderless').exists()).toBe(true)
  })

  it('displays value in input', () => {
    const date = dayjs('2024-06-15')
    const wrapper = mount(DatePicker, { props: { value: date } })
    expect(wrapper.find('input').element.value).toBe('2024-06-15')
  })

  it('displays formatted value', () => {
    const date = dayjs('2024-06-15')
    const wrapper = mount(DatePicker, { props: { value: date, format: 'DD/MM/YYYY' } })
    expect(wrapper.find('input').element.value).toBe('15/06/2024')
  })

  it('shows clear button when value is set', () => {
    const date = dayjs('2024-06-15')
    const wrapper = mount(DatePicker, { props: { value: date } })
    expect(wrapper.find('.ant-picker-clear').exists()).toBe(true)
  })

  it('does not show clear button when allowClear is false', () => {
    const date = dayjs('2024-06-15')
    const wrapper = mount(DatePicker, { props: { value: date, allowClear: false } })
    expect(wrapper.find('.ant-picker-clear').exists()).toBe(false)
  })

  it('emits clear events', async () => {
    const date = dayjs('2024-06-15')
    const wrapper = mount(DatePicker, { props: { value: date } })
    await wrapper.find('.ant-picker-clear').trigger('click')
    expect(wrapper.emitted('update:value')?.[0]).toEqual([null])
    expect(wrapper.emitted('change')?.[0]).toEqual([null, ''])
  })

  it('renders calendar suffix icon', () => {
    const wrapper = mount(DatePicker)
    expect(wrapper.find('.ant-picker-suffix').exists()).toBe(true)
  })

  it('supports valueFormat for string values', () => {
    const wrapper = mount(DatePicker, {
      props: { value: '2024/06/15', valueFormat: 'YYYY/MM/DD' },
    })
    expect(wrapper.find('input').element.value).toBe('2024-06-15')
  })
})

describe('RangePicker', () => {
  it('renders range picker', () => {
    const wrapper = mount(RangePicker)
    expect(wrapper.find('.ant-picker-range').exists()).toBe(true)
  })

  it('renders two inputs', () => {
    const wrapper = mount(RangePicker)
    const inputs = wrapper.findAll('input')
    expect(inputs.length).toBe(2)
  })

  it('renders with separator', () => {
    const wrapper = mount(RangePicker)
    expect(wrapper.find('.ant-picker-separator').text()).toBe('~')
  })

  it('renders custom separator', () => {
    const wrapper = mount(RangePicker, { props: { separator: '-' } })
    expect(wrapper.find('.ant-picker-separator').text()).toBe('-')
  })

  it('renders disabled state', () => {
    const wrapper = mount(RangePicker, { props: { disabled: true } })
    expect(wrapper.find('.ant-picker-disabled').exists()).toBe(true)
  })

  it('displays range values', () => {
    const start = dayjs('2024-06-01')
    const end = dayjs('2024-06-30')
    const wrapper = mount(RangePicker, { props: { value: [start, end] } })
    const inputs = wrapper.findAll('input')
    expect(inputs[0].element.value).toBe('2024-06-01')
    expect(inputs[1].element.value).toBe('2024-06-30')
  })
})
