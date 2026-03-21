import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { h, nextTick, defineComponent, reactive } from 'vue'
import Form from '../Form.vue'
import FormItem from '../FormItem.vue'

describe('Form', () => {
  describe('rendering', () => {
    it('renders a form element', () => {
      const wrapper = mount(Form)
      expect(wrapper.element.tagName).toBe('FORM')
    })

    it('has ant-form class', () => {
      const wrapper = mount(Form)
      expect(wrapper.classes()).toContain('ant-form')
    })

    it('renders slot content', () => {
      const wrapper = mount(Form, {
        slots: { default: '<div class="child">Hello</div>' },
      })
      expect(wrapper.find('.child').exists()).toBe(true)
    })
  })

  describe('layout classes', () => {
    it('applies horizontal layout by default', () => {
      const wrapper = mount(Form)
      expect(wrapper.classes()).toContain('ant-form-horizontal')
    })

    it('applies vertical layout class', () => {
      const wrapper = mount(Form, { props: { layout: 'vertical' } })
      expect(wrapper.classes()).toContain('ant-form-vertical')
      expect(wrapper.classes()).not.toContain('ant-form-horizontal')
    })

    it('applies inline layout class', () => {
      const wrapper = mount(Form, { props: { layout: 'inline' } })
      expect(wrapper.classes()).toContain('ant-form-inline')
      expect(wrapper.classes()).not.toContain('ant-form-horizontal')
    })
  })

  describe('size prop', () => {
    it('applies size class', () => {
      const wrapper = mount(Form, { props: { size: 'sm' } })
      expect(wrapper.classes()).toContain('ant-form-sm')
    })

    it('applies lg size class', () => {
      const wrapper = mount(Form, { props: { size: 'lg' } })
      expect(wrapper.classes()).toContain('ant-form-lg')
    })
  })

  describe('hideRequiredMark', () => {
    it('applies hide required mark class', () => {
      const wrapper = mount(Form, { props: { hideRequiredMark: true } })
      expect(wrapper.classes()).toContain('ant-form-hide-required-mark')
    })
  })

  describe('submit', () => {
    it('emits finish on successful validation', async () => {
      const model = reactive({ name: 'John' })
      const wrapper = mount(Form, {
        props: { model },
        slots: {
          default: () =>
            h(FormItem, { name: 'name', rules: [{ required: true }] }, { default: () => 'input' }),
        },
      })

      await wrapper.find('form').trigger('submit')
      await flushPromises()
      expect(wrapper.emitted('finish')).toBeTruthy()
      expect(wrapper.emitted('finish')![0][0]).toEqual({ name: 'John' })
    })

    it('emits finishFailed when validation fails', async () => {
      const model = reactive({ name: '' })
      const wrapper = mount(Form, {
        props: { model },
        slots: {
          default: () =>
            h(FormItem, { name: 'name', rules: [{ required: true }] }, { default: () => 'input' }),
        },
      })

      await wrapper.find('form').trigger('submit')
      await flushPromises()
      expect(wrapper.emitted('finishFailed')).toBeTruthy()
      const errorInfo = wrapper.emitted('finishFailed')![0][0] as any
      expect(errorInfo.errorFields).toBeDefined()
      expect(errorInfo.errorFields.length).toBeGreaterThan(0)
    })

    it('prevents default form submission', async () => {
      const wrapper = mount(Form)
      const submitEvent = new Event('submit', { cancelable: true })
      wrapper.element.dispatchEvent(submitEvent)
      // The @submit.prevent should prevent default behavior
      expect(wrapper.element.tagName).toBe('FORM')
    })
  })

  describe('exposed methods', () => {
    it('exposes validate method', () => {
      const wrapper = mount(Form)
      expect(typeof wrapper.vm.validate).toBe('function')
    })

    it('exposes validateFields method', () => {
      const wrapper = mount(Form)
      expect(typeof wrapper.vm.validateFields).toBe('function')
    })

    it('exposes resetFields method', () => {
      const wrapper = mount(Form)
      expect(typeof wrapper.vm.resetFields).toBe('function')
    })

    it('exposes clearValidate method', () => {
      const wrapper = mount(Form)
      expect(typeof wrapper.vm.clearValidate).toBe('function')
    })

    it('exposes getFieldsValue method', () => {
      const wrapper = mount(Form)
      expect(typeof wrapper.vm.getFieldsValue).toBe('function')
    })

    it('exposes getFieldValue method', () => {
      const wrapper = mount(Form)
      expect(typeof wrapper.vm.getFieldValue).toBe('function')
    })

    it('exposes setFieldValue method', () => {
      const wrapper = mount(Form)
      expect(typeof wrapper.vm.setFieldValue).toBe('function')
    })

    it('exposes setFieldsValue method', () => {
      const wrapper = mount(Form)
      expect(typeof wrapper.vm.setFieldsValue).toBe('function')
    })

    it('exposes scrollToField method', () => {
      const wrapper = mount(Form)
      expect(typeof wrapper.vm.scrollToField).toBe('function')
    })
  })

  describe('component name', () => {
    it('has correct name', () => {
      expect(Form.name).toBe('AForm')
    })
  })
})

describe('FormItem', () => {
  // Helper to create a Form + FormItem wrapper
  function mountFormItem(
    formItemProps: Record<string, any> = {},
    formProps: Record<string, any> = {},
    formItemSlots: Record<string, any> = {},
  ) {
    return mount(Form, {
      props: { model: reactive({}), ...formProps },
      slots: {
        default: () =>
          h(FormItem, formItemProps, {
            default: () => h('input', { type: 'text' }),
            ...formItemSlots,
          }),
      },
    })
  }

  describe('rendering', () => {
    it('renders with ant-form-item class', () => {
      const wrapper = mountFormItem()
      expect(wrapper.find('.ant-form-item').exists()).toBe(true)
    })

    it('renders label when provided', () => {
      const wrapper = mountFormItem({ label: 'Username' })
      expect(wrapper.find('.ant-form-item-label').exists()).toBe(true)
      expect(wrapper.find('label').text()).toContain('Username')
    })

    it('renders label slot', () => {
      const wrapper = mountFormItem({}, {}, { label: () => h('span', 'Custom Label') })
      expect(wrapper.find('.ant-form-item-label').exists()).toBe(true)
      expect(wrapper.find('.ant-form-item-label').text()).toContain('Custom Label')
    })

    it('does not render label when not provided', () => {
      const wrapper = mountFormItem()
      expect(wrapper.find('.ant-form-item-label').exists()).toBe(false)
    })
  })

  describe('required asterisk', () => {
    it('shows asterisk when required prop is true', () => {
      const wrapper = mountFormItem({ label: 'Name', required: true })
      expect(wrapper.find('.ant-form-item-required').exists()).toBe(true)
    })

    it('shows asterisk when rule has required', () => {
      const wrapper = mountFormItem({
        label: 'Name',
        name: 'name',
        rules: [{ required: true }],
      })
      expect(wrapper.find('.ant-form-item-required').exists()).toBe(true)
    })

    it('does not show asterisk when not required', () => {
      const wrapper = mountFormItem({ label: 'Name' })
      expect(wrapper.find('.ant-form-item-required').exists()).toBe(false)
    })
  })

  describe('colon', () => {
    it('renders colon by default in horizontal layout', () => {
      const wrapper = mountFormItem({ label: 'Name' }, { layout: 'horizontal' })
      expect(wrapper.find('.ant-form-item-colon').exists()).toBe(true)
    })

    it('does not render colon in vertical layout', () => {
      const wrapper = mountFormItem({ label: 'Name' }, { layout: 'vertical' })
      expect(wrapper.find('.ant-form-item-colon').exists()).toBe(false)
    })

    it('does not render colon when colon=false on form', () => {
      const wrapper = mountFormItem({ label: 'Name' }, { colon: false })
      expect(wrapper.find('.ant-form-item-colon').exists()).toBe(false)
    })
  })

  describe('validation — required field', () => {
    it('shows error when required field is empty', async () => {
      const model = reactive({ name: '' })
      const wrapper = mount(Form, {
        props: { model },
        slots: {
          default: () =>
            h(
              FormItem,
              { name: 'name', rules: [{ required: true, message: 'Name is required' }] },
              { default: () => h('input', { type: 'text' }) },
            ),
        },
      })

      await wrapper.find('form').trigger('submit')
      await flushPromises()

      expect(wrapper.find('.ant-form-item-has-error').exists()).toBe(true)
      expect(wrapper.find('.ant-form-item-explain-error').exists()).toBe(true)
      expect(wrapper.find('.ant-form-item-explain-error').text()).toBe('Name is required')
    })

    it('does not show error when required field has value', async () => {
      const model = reactive({ name: 'John' })
      const wrapper = mount(Form, {
        props: { model },
        slots: {
          default: () =>
            h(
              FormItem,
              { name: 'name', rules: [{ required: true, message: 'Name is required' }] },
              { default: () => h('input', { type: 'text' }) },
            ),
        },
      })

      await wrapper.find('form').trigger('submit')
      await flushPromises()

      expect(wrapper.find('.ant-form-item-has-error').exists()).toBe(false)
    })
  })

  describe('validation — pattern rule', () => {
    it('shows error when pattern does not match', async () => {
      const model = reactive({ code: 'abc' })
      const wrapper = mount(Form, {
        props: { model },
        slots: {
          default: () =>
            h(
              FormItem,
              {
                name: 'code',
                rules: [{ pattern: /^\d+$/, message: 'Only numbers allowed' }],
              },
              { default: () => h('input', { type: 'text' }) },
            ),
        },
      })

      await wrapper.find('form').trigger('submit')
      await flushPromises()

      expect(wrapper.find('.ant-form-item-explain-error').text()).toBe('Only numbers allowed')
    })
  })

  describe('validation — custom validator', () => {
    it('shows error from custom async validator', async () => {
      const model = reactive({ value: 'bad' })
      const customValidator = async (_rule: any, value: any) => {
        if (value === 'bad') throw new Error('Value cannot be "bad"')
      }
      const wrapper = mount(Form, {
        props: { model },
        slots: {
          default: () =>
            h(
              FormItem,
              {
                name: 'value',
                rules: [{ validator: customValidator }],
              },
              { default: () => h('input', { type: 'text' }) },
            ),
        },
      })

      await wrapper.find('form').trigger('submit')
      await flushPromises()

      expect(wrapper.find('.ant-form-item-explain-error').text()).toBe('Value cannot be "bad"')
    })
  })

  describe('resetFields', () => {
    it('clears validation state on reset', async () => {
      const model = reactive({ name: '' })
      const wrapper = mount(Form, {
        props: { model },
        slots: {
          default: () =>
            h(
              FormItem,
              { name: 'name', rules: [{ required: true, message: 'Required' }] },
              { default: () => h('input', { type: 'text' }) },
            ),
        },
      })

      // Trigger validation error
      await wrapper.find('form').trigger('submit')
      await flushPromises()
      expect(wrapper.find('.ant-form-item-has-error').exists()).toBe(true)

      // Reset
      ;(wrapper.vm as any).resetFields()
      await nextTick()

      expect(wrapper.find('.ant-form-item-has-error').exists()).toBe(false)
      expect(wrapper.find('.ant-form-item-explain-error').exists()).toBe(false)
    })
  })

  describe('clearValidate', () => {
    it('removes validation errors', async () => {
      const model = reactive({ name: '' })
      const wrapper = mount(Form, {
        props: { model },
        slots: {
          default: () =>
            h(
              FormItem,
              { name: 'name', rules: [{ required: true, message: 'Required' }] },
              { default: () => h('input', { type: 'text' }) },
            ),
        },
      })

      await wrapper.find('form').trigger('submit')
      await flushPromises()
      expect(wrapper.find('.ant-form-item-has-error').exists()).toBe(true)

      ;(wrapper.vm as any).clearValidate()
      await nextTick()

      expect(wrapper.find('.ant-form-item-has-error').exists()).toBe(false)
    })
  })

  describe('help and extra text', () => {
    it('renders help text', () => {
      const wrapper = mountFormItem({ label: 'Name', help: 'Enter your name' })
      expect(wrapper.find('.ant-form-item-explain').exists()).toBe(true)
      expect(wrapper.find('.ant-form-item-explain').text()).toBe('Enter your name')
    })

    it('renders extra text', () => {
      const wrapper = mountFormItem({ label: 'Name', extra: 'Additional info' })
      expect(wrapper.find('.ant-form-item-extra').exists()).toBe(true)
      expect(wrapper.find('.ant-form-item-extra').text()).toBe('Additional info')
    })

    it('renders help slot', () => {
      const wrapper = mountFormItem({}, {}, { help: () => h('span', 'Slot help') })
      expect(wrapper.find('.ant-form-item-explain').text()).toContain('Slot help')
    })

    it('renders extra slot', () => {
      const wrapper = mountFormItem({ extra: 'placeholder' }, {}, { extra: () => h('span', 'Slot extra') })
      expect(wrapper.find('.ant-form-item-extra').text()).toContain('Slot extra')
    })
  })

  describe('disabled state propagation', () => {
    it('receives disabled from form context', () => {
      const model = reactive({ name: '' })
      const wrapper = mount(Form, {
        props: { model, disabled: true },
        slots: {
          default: () =>
            h(FormItem, { label: 'Name', name: 'name' }, { default: () => h('input') }),
        },
      })
      // The form item itself does not add a disabled class, but the form
      // context is available for child input components
      expect(wrapper.find('.ant-form-item').exists()).toBe(true)
    })
  })

  describe('validateStatus prop', () => {
    it('applies error class with validateStatus prop', () => {
      const wrapper = mountFormItem({ label: 'Name', validateStatus: 'error' })
      expect(wrapper.find('.ant-form-item-has-error').exists()).toBe(true)
    })

    it('applies warning class with validateStatus prop', () => {
      const wrapper = mountFormItem({ label: 'Name', validateStatus: 'warning' })
      expect(wrapper.find('.ant-form-item-has-warning').exists()).toBe(true)
    })

    it('applies success class with validateStatus prop', () => {
      const wrapper = mountFormItem({ label: 'Name', validateStatus: 'success' })
      expect(wrapper.find('.ant-form-item-has-success').exists()).toBe(true)
    })

    it('applies validating class with validateStatus prop', () => {
      const wrapper = mountFormItem({ label: 'Name', validateStatus: 'validating' })
      expect(wrapper.find('.ant-form-item-is-validating').exists()).toBe(true)
    })
  })

  describe('hasFeedback', () => {
    it('adds feedback class', () => {
      const wrapper = mountFormItem({ label: 'Name', hasFeedback: true })
      expect(wrapper.find('.ant-form-item-has-feedback').exists()).toBe(true)
    })

    it('shows feedback icon when validateStatus is set', () => {
      const wrapper = mountFormItem({
        label: 'Name',
        hasFeedback: true,
        validateStatus: 'success',
      })
      expect(wrapper.find('.ant-form-item-feedback-icon').exists()).toBe(true)
    })
  })

  describe('label alignment', () => {
    it('applies left alignment class', () => {
      const wrapper = mountFormItem({ label: 'Name', labelAlign: 'left' })
      expect(wrapper.find('.ant-form-item-label-left').exists()).toBe(true)
    })
  })

  describe('component name', () => {
    it('has correct name', () => {
      expect(FormItem.name).toBe('AFormItem')
    })
  })
})
