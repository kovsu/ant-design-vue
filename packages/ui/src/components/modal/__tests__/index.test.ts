import { describe, expect, it, vi, afterEach } from 'vitest'
import { Modal } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// Stub teleport to render content inline for testing
const globalStubs = {
  global: {
    stubs: {
      teleport: true,
    },
  },
}

describe('Modal', () => {
  it('should render correctly when open', () => {
    const wrapper = mount(Modal, {
      props: { open: true, title: 'Test Modal' },
      slots: { default: 'Modal content' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-modal').exists()).toBe(true)
    expect(wrapper.find('.ant-modal-title').text()).toBe('Test Modal')
    expect(wrapper.find('.ant-modal-body').text()).toBe('Modal content')
  })

  it('should not render when not open', () => {
    const wrapper = mount(Modal, {
      props: { open: false, title: 'Hidden' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-modal').exists()).toBe(false)
  })

  it('renders close button when closable', () => {
    const wrapper = mount(Modal, {
      props: { open: true, closable: true },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-modal-close').exists()).toBe(true)
  })

  it('hides close button when closable is false', () => {
    const wrapper = mount(Modal, {
      props: { open: true, closable: false },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-modal-close').exists()).toBe(false)
  })

  it('renders default footer with OK and Cancel buttons', () => {
    const wrapper = mount(Modal, {
      props: { open: true },
      ...globalStubs,
    })
    const footer = wrapper.find('.ant-modal-footer')
    expect(footer.exists()).toBe(true)
    const buttons = footer.findAll('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0].text()).toBe('Cancel')
    expect(buttons[1].text()).toBe('OK')
  })

  it('hides footer when footer is false', () => {
    const wrapper = mount(Modal, {
      props: { open: true, footer: false },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-modal-footer').exists()).toBe(false)
  })

  it('renders custom footer slot', () => {
    const wrapper = mount(Modal, {
      props: { open: true },
      slots: { footer: '<button class="custom-btn">Custom</button>' },
      ...globalStubs,
    })
    expect(wrapper.find('.custom-btn').exists()).toBe(true)
  })

  it('emits cancel when close button clicked', async () => {
    const wrapper = mount(Modal, {
      props: { open: true, closable: true },
      ...globalStubs,
    })
    await wrapper.find('.ant-modal-close').trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
  })

  it('emits ok when OK button clicked', async () => {
    const wrapper = mount(Modal, {
      props: { open: true },
      ...globalStubs,
    })
    const buttons = wrapper.findAll('.ant-modal-footer button')
    await buttons[1].trigger('click')
    expect(wrapper.emitted('ok')).toHaveLength(1)
  })

  it('emits cancel when Cancel button clicked', async () => {
    const wrapper = mount(Modal, {
      props: { open: true },
      ...globalStubs,
    })
    const buttons = wrapper.findAll('.ant-modal-footer button')
    await buttons[0].trigger('click')
    expect(wrapper.emitted('cancel')).toHaveLength(1)
  })

  it('applies centered class', () => {
    const wrapper = mount(Modal, {
      props: { open: true, centered: true },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-modal-centered').exists()).toBe(true)
  })

  it('applies custom width', () => {
    const wrapper = mount(Modal, {
      props: { open: true, width: 800 },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-modal').attributes('style')).toContain('width: 800px')
  })

  it('applies string width', () => {
    const wrapper = mount(Modal, {
      props: { open: true, width: '50%' },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-modal').attributes('style')).toContain('width: 50%')
  })

  it('renders mask', () => {
    const wrapper = mount(Modal, {
      props: { open: true },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-modal-mask').exists()).toBe(true)
  })

  it('shows loading state on OK button', () => {
    const wrapper = mount(Modal, {
      props: { open: true, confirmLoading: true },
      ...globalStubs,
    })
    const buttons = wrapper.findAll('.ant-modal-footer button')
    expect(buttons[1].attributes('disabled')).toBeDefined()
    expect(wrapper.find('.ant-btn-loading-icon').exists()).toBe(true)
  })

  it('renders custom okText and cancelText', () => {
    const wrapper = mount(Modal, {
      props: { open: true, okText: 'Submit', cancelText: 'Abort' },
      ...globalStubs,
    })
    const buttons = wrapper.findAll('.ant-modal-footer button')
    expect(buttons[0].text()).toBe('Abort')
    expect(buttons[1].text()).toBe('Submit')
  })

  it('renders title slot', () => {
    const wrapper = mount(Modal, {
      props: { open: true },
      slots: { title: '<span class="custom-title">Custom Title</span>' },
      ...globalStubs,
    })
    expect(wrapper.find('.custom-title').exists()).toBe(true)
  })

  it('has proper aria attributes', () => {
    const wrapper = mount(Modal, {
      props: { open: true, title: 'Accessible Modal' },
      ...globalStubs,
    })
    const dialog = wrapper.find('[role="dialog"]')
    expect(dialog.exists()).toBe(true)
    expect(dialog.attributes('aria-modal')).toBe('true')
  })

  it('applies wrapClassName', () => {
    const wrapper = mount(Modal, {
      props: { open: true, wrapClassName: 'my-custom-wrap' },
      ...globalStubs,
    })
    expect(wrapper.find('.my-custom-wrap').exists()).toBe(true)
  })

  it('applies bodyStyle', () => {
    const wrapper = mount(Modal, {
      props: { open: true, bodyStyle: { padding: '48px' } },
      ...globalStubs,
    })
    expect(wrapper.find('.ant-modal-body').attributes('style')).toContain('padding: 48px')
  })
})

describe('Modal static methods', () => {
  it('has confirm method', () => {
    expect(typeof Modal.confirm).toBe('function')
  })

  it('has info method', () => {
    expect(typeof Modal.info).toBe('function')
  })

  it('has success method', () => {
    expect(typeof Modal.success).toBe('function')
  })

  it('has error method', () => {
    expect(typeof Modal.error).toBe('function')
  })

  it('has warning method', () => {
    expect(typeof Modal.warning).toBe('function')
  })

  it('has destroyAll method', () => {
    expect(typeof Modal.destroyAll).toBe('function')
  })
})
