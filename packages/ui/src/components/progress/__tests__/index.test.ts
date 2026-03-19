import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Progress from '../Progress.vue'

describe('Progress', () => {
  it('renders line progress by default', () => {
    const wrapper = mount(Progress)
    expect(wrapper.classes('ant-progress')).toBe(true)
    expect(wrapper.classes('ant-progress-line')).toBe(true)
    expect(wrapper.find('.ant-progress-outer').exists()).toBe(true)
  })

  it('renders correct percent width', () => {
    const wrapper = mount(Progress, { props: { percent: 50 } })
    const bg = wrapper.find('.ant-progress-bg')
    expect(bg.attributes('style')).toContain('width: 50%')
  })

  it('clamps percent between 0 and 100', () => {
    const over = mount(Progress, { props: { percent: 150 } })
    expect(over.find('.ant-progress-bg').attributes('style')).toContain('width: 100%')
    expect(over.attributes('aria-valuenow')).toBe('100')

    const under = mount(Progress, { props: { percent: -10 } })
    expect(under.find('.ant-progress-bg').attributes('style')).toContain('width: 0%')
    expect(under.attributes('aria-valuenow')).toBe('0')
  })

  it('applies status-normal class by default', () => {
    const wrapper = mount(Progress, { props: { percent: 30 } })
    expect(wrapper.classes('ant-progress-status-normal')).toBe(true)
  })

  it('applies status-active class', () => {
    const wrapper = mount(Progress, { props: { percent: 50, status: 'active' } })
    expect(wrapper.classes('ant-progress-status-active')).toBe(true)
  })

  it('applies status-exception class', () => {
    const wrapper = mount(Progress, { props: { percent: 70, status: 'exception' } })
    expect(wrapper.classes('ant-progress-status-exception')).toBe(true)
  })

  it('applies status-success class', () => {
    const wrapper = mount(Progress, { props: { percent: 80, status: 'success' } })
    expect(wrapper.classes('ant-progress-status-success')).toBe(true)
  })

  it('auto-detects success status at 100%', () => {
    const wrapper = mount(Progress, { props: { percent: 100 } })
    expect(wrapper.classes('ant-progress-status-success')).toBe(true)
  })

  it('shows info text by default', () => {
    const wrapper = mount(Progress, { props: { percent: 50 } })
    expect(wrapper.find('.ant-progress-text').exists()).toBe(true)
    expect(wrapper.find('.ant-progress-text').text()).toBe('50%')
  })

  it('shows check mark for success', () => {
    const wrapper = mount(Progress, { props: { percent: 100 } })
    expect(wrapper.find('.ant-progress-text').text()).toBe('\u2713')
  })

  it('shows cross mark for exception', () => {
    const wrapper = mount(Progress, { props: { percent: 70, status: 'exception' } })
    expect(wrapper.find('.ant-progress-text').text()).toBe('\u2715')
  })

  it('hides info text when showInfo is false', () => {
    const wrapper = mount(Progress, { props: { percent: 50, showInfo: false } })
    expect(wrapper.find('.ant-progress-text').exists()).toBe(false)
    expect(wrapper.classes('ant-progress-show-info')).toBe(false)
  })

  it('supports custom format function', () => {
    const wrapper = mount(Progress, {
      props: {
        percent: 75,
        format: (percent: number) => `${percent} Days`,
      },
    })
    expect(wrapper.find('.ant-progress-text').text()).toBe('75 Days')
  })

  it('supports format slot', () => {
    const wrapper = mount(Progress, {
      props: { percent: 75 },
      slots: {
        format: ({ percent }: { percent: number }) => `Custom: ${percent}%`,
      },
    })
    expect(wrapper.find('.ant-progress-text').text()).toBe('Custom: 75%')
  })

  it('renders circle type with SVG', () => {
    const wrapper = mount(Progress, { props: { type: 'circle', percent: 75 } })
    expect(wrapper.classes('ant-progress-circle')).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('.ant-progress-circle-trail').exists()).toBe(true)
    expect(wrapper.find('.ant-progress-circle-path').exists()).toBe(true)
  })

  it('renders dashboard type with SVG', () => {
    const wrapper = mount(Progress, { props: { type: 'dashboard', percent: 75 } })
    expect(wrapper.classes('ant-progress-dashboard')).toBe(true)
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('renders steps mode with correct items', () => {
    const wrapper = mount(Progress, { props: { percent: 50, steps: 4 } })
    expect(wrapper.classes('ant-progress-steps')).toBe(true)
    const items = wrapper.findAll('.ant-progress-steps-item')
    expect(items).toHaveLength(4)
    // 50% of 4 steps = 2 filled
    const active = wrapper.findAll('.ant-progress-steps-item-active')
    expect(active).toHaveLength(2)
  })

  it('applies string strokeColor', () => {
    const wrapper = mount(Progress, {
      props: { percent: 50, strokeColor: '#ff0000' },
    })
    const style = wrapper.find('.ant-progress-bg').attributes('style') || ''
    expect(style).toContain('background:')
    // jsdom normalizes hex to rgb
    expect(style).toMatch(/background:\s*(#ff0000|rgb\(255,\s*0,\s*0\))/)
  })

  it('applies array strokeColor as gradient', () => {
    const wrapper = mount(Progress, {
      props: { percent: 50, strokeColor: ['#108ee9', '#87d068'] },
    })
    expect(wrapper.find('.ant-progress-bg').attributes('style')).toContain('linear-gradient')
  })

  it('applies gradient object strokeColor', () => {
    const wrapper = mount(Progress, {
      props: {
        percent: 50,
        strokeColor: { from: '#108ee9', to: '#87d068' },
      },
    })
    expect(wrapper.find('.ant-progress-bg').attributes('style')).toContain('linear-gradient')
  })

  it('applies trailColor', () => {
    const wrapper = mount(Progress, {
      props: { percent: 50, trailColor: '#e8e8e8' },
    })
    const style = wrapper.find('.ant-progress-inner').attributes('style') || ''
    expect(style).toContain('background-color:')
    // jsdom normalizes hex to rgb
    expect(style).toMatch(/background-color:\s*(#e8e8e8|rgb\(232,\s*232,\s*232\))/)
  })

  it('renders small size with ant-progress-small class', () => {
    const wrapper = mount(Progress, { props: { percent: 50, size: 'small' } })
    expect(wrapper.classes('ant-progress-small')).toBe(true)
  })

  it('uses numeric size for line height', () => {
    const wrapper = mount(Progress, { props: { percent: 50, size: 20 } })
    expect(wrapper.find('.ant-progress-bg').attributes('style')).toContain('height: 20px')
  })

  it('uses tuple size for line width and height', () => {
    const wrapper = mount(Progress, {
      props: { percent: 50, size: [300, 12] as [number, number] },
    })
    const bgStyle = wrapper.find('.ant-progress-bg').attributes('style')
    expect(bgStyle).toContain('height: 12px')
    const innerStyle = wrapper.find('.ant-progress-inner').attributes('style')
    expect(innerStyle).toContain('width: 300px')
  })

  it('renders success segment', () => {
    const wrapper = mount(Progress, {
      props: { percent: 60, success: { percent: 30 } },
    })
    expect(wrapper.find('.ant-progress-success-bg').exists()).toBe(true)
    expect(wrapper.find('.ant-progress-success-bg').attributes('style')).toContain('width: 30%')
  })

  it('has correct ARIA attributes', () => {
    const wrapper = mount(Progress, { props: { percent: 42 } })
    expect(wrapper.attributes('role')).toBe('progressbar')
    expect(wrapper.attributes('aria-valuenow')).toBe('42')
    expect(wrapper.attributes('aria-valuemin')).toBe('0')
    expect(wrapper.attributes('aria-valuemax')).toBe('100')
  })

  it('renders circle with custom size', () => {
    const wrapper = mount(Progress, {
      props: { type: 'circle', percent: 75, size: 200 },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('200')
    expect(svg.attributes('height')).toBe('200')
  })

  it('renders small circle with default 80px size', () => {
    const wrapper = mount(Progress, {
      props: { type: 'circle', percent: 75, size: 'small' },
    })
    const svg = wrapper.find('svg')
    expect(svg.attributes('width')).toBe('80')
    expect(svg.attributes('height')).toBe('80')
  })

  it('circle renders success path when success prop is provided', () => {
    const wrapper = mount(Progress, {
      props: { type: 'circle', percent: 60, success: { percent: 30 } },
    })
    const paths = wrapper.findAll('.ant-progress-circle-path')
    expect(paths.length).toBe(2) // main + success
  })

  it('renders dashboard with bottom gap position', () => {
    const wrapper = mount(Progress, {
      props: { type: 'dashboard', percent: 75, gapPosition: 'bottom' },
    })
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('should render snapshot correctly', () => {
    const wrapper = mount(Progress, { props: { percent: 50 } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
