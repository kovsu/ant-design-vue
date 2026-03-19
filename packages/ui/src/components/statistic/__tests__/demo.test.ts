import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Prefix from '../demo/prefix.vue'
import Countdown from '../demo/countdown.vue'

const demos = { Basic, Prefix }

describe('Statistic demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Wave: true } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})

describe('Countdown demo', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('demo: Countdown', () => {
    const wrapper = mount(Countdown, { global: { stubs: { Wave: true } } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
