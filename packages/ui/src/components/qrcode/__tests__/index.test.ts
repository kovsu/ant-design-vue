import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import QRCode from '../QRCode.vue'

// Mock canvas context since jsdom doesn't support canvas
function createMockContext() {
  return {
    scale: vi.fn(),
    fillRect: vi.fn(),
    fillStyle: '',
    drawImage: vi.fn(),
    toDataURL: vi.fn(() => 'data:image/png;base64,mock'),
  }
}

describe('QRCode', () => {
  it('should render correctly', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'https://ant-design-vue.com' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with ant-qrcode class', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test' },
    })
    expect(wrapper.classes('ant-qrcode')).toBe(true)
  })

  it('renders a canvas element', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test' },
    })
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('applies bordered class by default', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test' },
    })
    expect(wrapper.classes('ant-qrcode')).toBe(true)
    expect(wrapper.classes('ant-qrcode-borderless')).toBe(false)
  })

  it('applies borderless class when bordered is false', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test', bordered: false },
    })
    expect(wrapper.classes('ant-qrcode-borderless')).toBe(true)
  })

  it('does not show mask overlay when status is active', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test', status: 'active' },
    })
    expect(wrapper.find('.ant-qrcode-mask').exists()).toBe(false)
  })

  it('shows loading state', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test', status: 'loading' },
    })
    expect(wrapper.find('.ant-qrcode-mask').exists()).toBe(true)
    expect(wrapper.find('.ant-qrcode-loading-icon').exists()).toBe(true)
  })

  it('shows expired state with refresh button', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test', status: 'expired' },
    })
    expect(wrapper.find('.ant-qrcode-mask').exists()).toBe(true)
    expect(wrapper.find('.ant-qrcode-expired-text').text()).toBe('QR code expired')
    expect(wrapper.find('.ant-qrcode-expired-btn').exists()).toBe(true)
  })

  it('emits refresh event when refresh button is clicked', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test', status: 'expired' },
    })
    await wrapper.find('.ant-qrcode-expired-btn').trigger('click')
    expect(wrapper.emitted('refresh')).toHaveLength(1)
  })

  it('shows scanned state', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test', status: 'scanned' },
    })
    expect(wrapper.find('.ant-qrcode-mask').exists()).toBe(true)
    expect(wrapper.find('.ant-qrcode-scanned-text').text()).toBe('Scanned')
  })

  it('exposes toDataURL method', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test' },
    })
    expect(typeof wrapper.vm.toDataURL).toBe('function')
  })

  it('uses default size of 160', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test' },
    })
    const canvas = wrapper.find('canvas')
    expect(canvas.element.style.width).toBe('160px')
    expect(canvas.element.style.height).toBe('160px')
  })

  it('applies custom size', () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test', size: 200 },
    })
    const canvas = wrapper.find('canvas')
    expect(canvas.element.style.width).toBe('200px')
    expect(canvas.element.style.height).toBe('200px')
  })

  it('updates canvas when value changes', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test1' },
    })
    await wrapper.setProps({ value: 'test2' })
    await nextTick()
    // Canvas should still exist after prop change
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('does not show mask when status changes to active', async () => {
    const wrapper = mount(QRCode, {
      props: { value: 'test', status: 'expired' },
    })
    expect(wrapper.find('.ant-qrcode-mask').exists()).toBe(true)

    await wrapper.setProps({ status: 'active' })
    expect(wrapper.find('.ant-qrcode-mask').exists()).toBe(false)
  })
})
