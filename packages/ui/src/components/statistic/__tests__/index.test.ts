import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Statistic from '../Statistic.vue'
import StatisticCountdown from '../Countdown.vue'
import { formatNumber, formatCountdown, getTime } from '../utils'

describe('Statistic', () => {
  it('renders title and value', () => {
    const wrapper = mount(Statistic, {
      props: { title: 'Active Users', value: 1000 },
    })
    expect(wrapper.find('.ant-statistic-title').text()).toBe('Active Users')
    expect(wrapper.find('.ant-statistic-content-value-int').text()).toBe('1,000')
  })

  it('formats number with group separators', () => {
    const wrapper = mount(Statistic, {
      props: { value: 112893 },
    })
    expect(wrapper.find('.ant-statistic-content-value-int').text()).toBe('112,893')
  })

  it('formats number with custom decimal separator and precision', () => {
    const wrapper = mount(Statistic, {
      props: { value: 112893, precision: 2, decimalSeparator: '-' },
    })
    expect(wrapper.find('.ant-statistic-content-value-int').text()).toBe('112,893')
    expect(wrapper.find('.ant-statistic-content-value-decimal').text()).toBe('-00')
  })

  it('formats number with custom group separator', () => {
    const wrapper = mount(Statistic, {
      props: { value: 112893, groupSeparator: '.' },
    })
    expect(wrapper.find('.ant-statistic-content-value-int').text()).toBe('112.893')
  })

  it('renders prefix prop', () => {
    const wrapper = mount(Statistic, {
      props: { value: 100, prefix: '$' },
    })
    expect(wrapper.find('.ant-statistic-content-prefix').text()).toBe('$')
  })

  it('renders suffix prop', () => {
    const wrapper = mount(Statistic, {
      props: { value: 100, suffix: '%' },
    })
    expect(wrapper.find('.ant-statistic-content-suffix').text()).toBe('%')
  })

  it('renders prefix slot', () => {
    const wrapper = mount(Statistic, {
      props: { value: 100 },
      slots: { prefix: '<span class="custom-prefix">icon</span>' },
    })
    expect(wrapper.find('.ant-statistic-content-prefix .custom-prefix').text()).toBe('icon')
  })

  it('renders suffix slot', () => {
    const wrapper = mount(Statistic, {
      props: { value: 100 },
      slots: { suffix: '<span class="custom-suffix">unit</span>' },
    })
    expect(wrapper.find('.ant-statistic-content-suffix .custom-suffix').text()).toBe('unit')
  })

  it('renders title slot', () => {
    const wrapper = mount(Statistic, {
      props: { value: 100 },
      slots: { title: '<span class="custom-title">Custom Title</span>' },
    })
    expect(wrapper.find('.ant-statistic-title .custom-title').text()).toBe('Custom Title')
  })

  it('renders formatter slot', () => {
    const wrapper = mount(Statistic, {
      props: { value: 100 },
      slots: { formatter: ({ value }: { value: number | string }) => `formatted: ${value}` },
    })
    expect(wrapper.find('.ant-statistic-content-value').text()).toBe('formatted: 100')
  })

  it('applies value style', () => {
    const wrapper = mount(Statistic, {
      props: { value: 100, valueStyle: { color: 'red' } },
    })
    expect(wrapper.find('.ant-statistic-content').attributes('style')).toContain('color: red')
  })

  it('renders custom value content via default slot', () => {
    const wrapper = mount(Statistic, {
      slots: { default: '<span class="custom-value">Hello</span>' },
    })
    expect(wrapper.find('.ant-statistic-content-value .custom-value').text()).toBe('Hello')
  })

  it('does not render title when no title prop or slot', () => {
    const wrapper = mount(Statistic, {
      props: { value: 100 },
    })
    expect(wrapper.find('.ant-statistic-title').exists()).toBe(false)
  })

  it('does not render prefix when no prefix prop or slot', () => {
    const wrapper = mount(Statistic, {
      props: { value: 100 },
    })
    expect(wrapper.find('.ant-statistic-content-prefix').exists()).toBe(false)
  })

  it('does not render suffix when no suffix prop or slot', () => {
    const wrapper = mount(Statistic, {
      props: { value: 100 },
    })
    expect(wrapper.find('.ant-statistic-content-suffix').exists()).toBe(false)
  })

  it('handles string value', () => {
    const wrapper = mount(Statistic, {
      props: { value: '999' },
    })
    expect(wrapper.find('.ant-statistic-content-value-int').text()).toBe('999')
  })

  it('has correct accessibility attributes', () => {
    const wrapper = mount(Statistic, {
      props: { title: 'Users', value: 100 },
    })
    expect(wrapper.find('.ant-statistic').attributes('role')).toBe('group')
    expect(wrapper.find('.ant-statistic-content').attributes('aria-live')).toBe('polite')
  })
})

describe('Countdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders countdown title', async () => {
    const deadline = Date.now() + 60000
    const wrapper = mount(StatisticCountdown, {
      props: { title: 'Countdown', value: deadline },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.ant-statistic-title').text()).toBe('Countdown')
  })

  it('formats countdown time with default format', async () => {
    const now = Date.now()
    vi.setSystemTime(now)
    const deadline = now + 2 * 60 * 60 * 1000 + 30 * 60 * 1000 + 15 * 1000 // 2h 30m 15s
    const wrapper = mount(StatisticCountdown, {
      props: { value: deadline },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.ant-statistic-content-value').text()).toBe('02:30:15')
  })

  it('emits finish when countdown reaches 0', async () => {
    const now = Date.now()
    vi.setSystemTime(now)
    const deadline = now + 1000 // 1 second in the future
    const wrapper = mount(StatisticCountdown, {
      props: { value: deadline },
    })
    await wrapper.vm.$nextTick()

    // Advance time past the deadline
    vi.advanceTimersByTime(1500)
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('finish')).toBeTruthy()
  })

  it('emits change on tick', async () => {
    const now = Date.now()
    vi.setSystemTime(now)
    const deadline = now + 60000
    const wrapper = mount(StatisticCountdown, {
      props: { value: deadline },
    })
    await wrapper.vm.$nextTick()

    // The initial update emits change
    expect(wrapper.emitted('change')).toBeTruthy()
    const changeEvents = wrapper.emitted('change')!
    expect(changeEvents.length).toBeGreaterThanOrEqual(1)
    // The first change event value should be close to 60000
    expect((changeEvents[0] as number[])[0]).toBeGreaterThan(0)
  })

  it('supports custom format string', async () => {
    const now = Date.now()
    vi.setSystemTime(now)
    const deadline = now + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000 // 2 days 3 hours
    const wrapper = mount(StatisticCountdown, {
      props: { value: deadline, format: 'D 天 HH 时 mm 分 ss 秒' },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.ant-statistic-content-value').text()).toBe('2 天 03 时 00 分 00 秒')
  })

  it('cleans up timer on unmount', () => {
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')
    const deadline = Date.now() + 60000
    const wrapper = mount(StatisticCountdown, {
      props: { value: deadline },
    })
    wrapper.unmount()
    expect(clearIntervalSpy).toHaveBeenCalled()
    clearIntervalSpy.mockRestore()
  })

  it('has correct accessibility attributes', async () => {
    const deadline = Date.now() + 60000
    const wrapper = mount(StatisticCountdown, {
      props: { title: 'Timer', value: deadline },
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.ant-statistic-countdown').attributes('role')).toBe('timer')
  })

  it('has ant-statistic-countdown class', () => {
    const deadline = Date.now() + 60000
    const wrapper = mount(StatisticCountdown, {
      props: { value: deadline },
    })
    expect(wrapper.find('.ant-statistic-countdown').exists()).toBe(true)
  })
})

describe('formatNumber', () => {
  it('formats integer with default separators', () => {
    expect(formatNumber(112893)).toEqual({ int: '112,893', decimal: '' })
  })

  it('formats with precision', () => {
    expect(formatNumber(112893, { precision: 2 })).toEqual({ int: '112,893', decimal: '.00' })
  })

  it('formats with custom separators', () => {
    expect(formatNumber(112893, { groupSeparator: '.', decimalSeparator: '-', precision: 2 }))
      .toEqual({ int: '112.893', decimal: '-00' })
  })

  it('handles small numbers without group separator', () => {
    expect(formatNumber(999)).toEqual({ int: '999', decimal: '' })
  })

  it('handles string input', () => {
    expect(formatNumber('12345.67')).toEqual({ int: '12,345', decimal: '.67' })
  })
})

describe('formatCountdown', () => {
  it('formats basic HH:mm:ss', () => {
    const diff = 2 * 60 * 60 * 1000 + 30 * 60 * 1000 + 15 * 1000
    expect(formatCountdown(diff, 'HH:mm:ss')).toBe('02:30:15')
  })

  it('formats with days', () => {
    const diff = 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
    expect(formatCountdown(diff, 'D 天 HH 时 mm 分 ss 秒')).toBe('2 天 03 时 00 分 00 秒')
  })

  it('handles zero diff', () => {
    expect(formatCountdown(0, 'HH:mm:ss')).toBe('00:00:00')
  })

  it('handles negative diff', () => {
    expect(formatCountdown(-1000, 'HH:mm:ss')).toBe('00:00:00')
  })

  it('rolls days into hours when format has no D', () => {
    const diff = 2 * 24 * 60 * 60 * 1000
    expect(formatCountdown(diff, 'HH:mm:ss')).toBe('48:00:00')
  })
})

describe('getTime', () => {
  it('handles number', () => {
    expect(getTime(1000)).toBe(1000)
  })

  it('handles Date', () => {
    const date = new Date(2025, 0, 1)
    expect(getTime(date)).toBe(date.getTime())
  })

  it('handles undefined', () => {
    expect(getTime(undefined)).toBe(0)
  })
})
