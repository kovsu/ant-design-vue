import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import dayjs from 'dayjs'
import Calendar from '../Calendar.vue'

describe('Calendar', () => {
  it('renders full calendar', () => {
    const wrapper = mount(Calendar)
    expect(wrapper.find('.ant-picker-calendar').exists()).toBe(true)
    expect(wrapper.find('.ant-picker-calendar-full').exists()).toBe(true)
  })

  it('renders mini calendar', () => {
    const wrapper = mount(Calendar, { props: { fullscreen: false } })
    expect(wrapper.find('.ant-picker-calendar-mini').exists()).toBe(true)
  })

  it('renders calendar header with year and month selects', () => {
    const wrapper = mount(Calendar)
    expect(wrapper.find('.ant-picker-calendar-year-select').exists()).toBe(true)
    expect(wrapper.find('.ant-picker-calendar-month-select').exists()).toBe(true)
  })

  it('renders mode switch', () => {
    const wrapper = mount(Calendar)
    const buttons = wrapper.findAll('.ant-picker-calendar-mode-btn')
    expect(buttons.length).toBe(2)
    expect(buttons[0].text()).toBe('Month')
    expect(buttons[1].text()).toBe('Year')
  })

  it('renders date grid in month mode', () => {
    const wrapper = mount(Calendar)
    expect(wrapper.find('.ant-picker-calendar-table').exists()).toBe(true)
    // Should have 7 day headers
    expect(wrapper.findAll('th').length).toBe(7)
    // Should have 42 date cells (6 rows × 7 days)
    expect(wrapper.findAll('.ant-picker-calendar-date').length).toBe(42)
  })

  it('switches to year mode', async () => {
    const wrapper = mount(Calendar)
    const yearBtn = wrapper.findAll('.ant-picker-calendar-mode-btn')[1]
    await yearBtn.trigger('click')
    // Should show 12 month cells
    expect(wrapper.findAll('.ant-picker-calendar-month').length).toBe(12)
  })

  it('selects a date', async () => {
    const wrapper = mount(Calendar, { props: { value: dayjs('2024-06-15') } })
    expect(wrapper.find('.ant-picker-calendar-date-selected').exists()).toBe(true)
  })

  it('emits change events on date click', async () => {
    const wrapper = mount(Calendar)
    const dates = wrapper.findAll('.ant-picker-calendar-date')
    await dates[10].trigger('click')
    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('select')).toBeTruthy()
  })

  it('renders disabled dates', () => {
    const disabledDate = (date: any) => date.day() === 0
    const wrapper = mount(Calendar, { props: { disabledDate } })
    expect(wrapper.findAll('.ant-picker-calendar-date-disabled').length).toBeGreaterThan(0)
  })

  it('supports dateCellRender slot', () => {
    const wrapper = mount(Calendar, {
      slots: {
        dateCellRender: ({ current }: any) => `Day ${current.date()}`,
      },
    })
    expect(wrapper.findAll('.ant-picker-calendar-date-content').length).toBeGreaterThan(0)
  })
})
