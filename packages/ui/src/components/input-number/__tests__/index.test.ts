import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import InputNumber from '../InputNumber.vue'

describe('InputNumber', () => {
  describe('rendering', () => {
    it('renders an input with role=spinbutton', () => {
      const wrapper = mount(InputNumber)
      expect(wrapper.find('input[role="spinbutton"]').exists()).toBe(true)
    })

    it('has correct component name', () => {
      expect(InputNumber.name).toBe('AInputNumber')
    })

    it('renders with placeholder', () => {
      const wrapper = mount(InputNumber, { props: { placeholder: 'Enter number' } })
      expect(wrapper.find('input').attributes('placeholder')).toBe('Enter number')
    })

    it('renders with id and name', () => {
      const wrapper = mount(InputNumber, { props: { id: 'num', name: 'count' } })
      expect(wrapper.find('input').attributes('id')).toBe('num')
      expect(wrapper.find('input').attributes('name')).toBe('count')
    })

    it('renders with inputmode=decimal', () => {
      const wrapper = mount(InputNumber)
      expect(wrapper.find('input').attributes('inputmode')).toBe('decimal')
    })
  })

  describe('v-model:value', () => {
    it('displays the value prop', () => {
      const wrapper = mount(InputNumber, { props: { value: 5 } })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('5')
    })

    it('displays defaultValue when value is not provided', () => {
      const wrapper = mount(InputNumber, { props: { defaultValue: 3 } })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('3')
    })

    it('emits update:value on step up', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5, step: 1 } })
      await wrapper.find('.ant-input-number-handler-up').trigger('click')
      expect(wrapper.emitted('update:value')).toBeTruthy()
      expect(wrapper.emitted('update:value')![0]).toEqual([6])
    })

    it('emits change on step', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5 } })
      await wrapper.find('.ant-input-number-handler-up').trigger('click')
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')![0]).toEqual([6])
    })
  })

  describe('step controls', () => {
    it('renders up and down handlers', () => {
      const wrapper = mount(InputNumber)
      expect(wrapper.find('.ant-input-number-handler-up').exists()).toBe(true)
      expect(wrapper.find('.ant-input-number-handler-down').exists()).toBe(true)
    })

    it('hides handlers when controls=false', () => {
      const wrapper = mount(InputNumber, { props: { controls: false } })
      expect(wrapper.find('.ant-input-number-handler-wrap').exists()).toBe(false)
    })

    it('steps up by step value', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5, step: 2 } })
      await wrapper.find('.ant-input-number-handler-up').trigger('click')
      expect(wrapper.emitted('update:value')![0]).toEqual([7])
    })

    it('steps down by step value', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5, step: 2 } })
      await wrapper.find('.ant-input-number-handler-down').trigger('click')
      expect(wrapper.emitted('update:value')![0]).toEqual([3])
    })

    it('emits step event on step up', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5, step: 1 } })
      await wrapper.find('.ant-input-number-handler-up').trigger('click')
      expect(wrapper.emitted('step')).toBeTruthy()
      expect(wrapper.emitted('step')![0]).toEqual([6, { offset: 1, type: 'up' }])
    })

    it('emits step event on step down', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5, step: 1 } })
      await wrapper.find('.ant-input-number-handler-down').trigger('click')
      expect(wrapper.emitted('step')).toBeTruthy()
      expect(wrapper.emitted('step')![0]).toEqual([4, { offset: 1, type: 'down' }])
    })
  })

  describe('min and max', () => {
    it('disables up handler at max', () => {
      const wrapper = mount(InputNumber, { props: { value: 10, max: 10 } })
      expect(wrapper.find('.ant-input-number-handler-up').classes()).toContain(
        'ant-input-number-handler-disabled',
      )
    })

    it('disables down handler at min', () => {
      const wrapper = mount(InputNumber, { props: { value: 0, min: 0 } })
      expect(wrapper.find('.ant-input-number-handler-down').classes()).toContain(
        'ant-input-number-handler-disabled',
      )
    })

    it('does not step above max', async () => {
      const wrapper = mount(InputNumber, { props: { value: 10, max: 10 } })
      await wrapper.find('.ant-input-number-handler-up').trigger('click')
      expect(wrapper.emitted('update:value')).toBeUndefined()
    })

    it('does not step below min', async () => {
      const wrapper = mount(InputNumber, { props: { value: 0, min: 0 } })
      await wrapper.find('.ant-input-number-handler-down').trigger('click')
      expect(wrapper.emitted('update:value')).toBeUndefined()
    })

    it('sets aria-valuemin and aria-valuemax', () => {
      const wrapper = mount(InputNumber, { props: { min: 0, max: 100 } })
      expect(wrapper.find('input').attributes('aria-valuemin')).toBe('0')
      expect(wrapper.find('input').attributes('aria-valuemax')).toBe('100')
    })

    it('sets aria-valuenow', () => {
      const wrapper = mount(InputNumber, { props: { value: 42 } })
      expect(wrapper.find('input').attributes('aria-valuenow')).toBe('42')
    })
  })

  describe('precision', () => {
    it('displays value with specified precision', () => {
      const wrapper = mount(InputNumber, { props: { value: 3.14159, precision: 2 } })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('3.14')
    })

    it('steps with precision', async () => {
      const wrapper = mount(InputNumber, { props: { value: 1, step: 0.1, precision: 1 } })
      await wrapper.find('.ant-input-number-handler-up').trigger('click')
      expect(wrapper.emitted('update:value')![0]).toEqual([1.1])
    })
  })

  describe('disabled', () => {
    it('sets disabled attribute', () => {
      const wrapper = mount(InputNumber, { props: { disabled: true } })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('applies disabled class', () => {
      const wrapper = mount(InputNumber, { props: { disabled: true } })
      expect(wrapper.find('.ant-input-number-disabled').exists()).toBe(true)
    })

    it('does not step when disabled', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5, disabled: true } })
      await wrapper.find('.ant-input-number-handler-up').trigger('click')
      expect(wrapper.emitted('update:value')).toBeUndefined()
    })
  })

  describe('readonly', () => {
    it('sets readonly attribute', () => {
      const wrapper = mount(InputNumber, { props: { readonly: true } })
      expect(wrapper.find('input').attributes('readonly')).toBeDefined()
    })

    it('does not step when readonly', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5, readonly: true } })
      await wrapper.find('.ant-input-number-handler-up').trigger('click')
      expect(wrapper.emitted('update:value')).toBeUndefined()
    })
  })

  describe('sizes', () => {
    it('applies small size class', () => {
      const wrapper = mount(InputNumber, { props: { size: 'small' } })
      expect(wrapper.find('.ant-input-number-sm').exists()).toBe(true)
    })

    it('applies large size class', () => {
      const wrapper = mount(InputNumber, { props: { size: 'large' } })
      expect(wrapper.find('.ant-input-number-lg').exists()).toBe(true)
    })
  })

  describe('borderless', () => {
    it('applies borderless class', () => {
      const wrapper = mount(InputNumber, { props: { bordered: false } })
      expect(wrapper.find('.ant-input-number-borderless').exists()).toBe(true)
    })
  })

  describe('status', () => {
    it('applies error status class', () => {
      const wrapper = mount(InputNumber, { props: { status: 'error' } })
      expect(wrapper.find('.ant-input-number-status-error').exists()).toBe(true)
    })

    it('applies warning status class', () => {
      const wrapper = mount(InputNumber, { props: { status: 'warning' } })
      expect(wrapper.find('.ant-input-number-status-warning').exists()).toBe(true)
    })
  })

  describe('keyboard', () => {
    it('steps up on ArrowUp key', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5, keyboard: true } })
      await wrapper.find('input').trigger('keydown', { key: 'ArrowUp' })
      expect(wrapper.emitted('update:value')![0]).toEqual([6])
    })

    it('steps down on ArrowDown key', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5, keyboard: true } })
      await wrapper.find('input').trigger('keydown', { key: 'ArrowDown' })
      expect(wrapper.emitted('update:value')![0]).toEqual([4])
    })

    it('does not step on arrow keys when keyboard=false', async () => {
      const wrapper = mount(InputNumber, { props: { value: 5, keyboard: false } })
      await wrapper.find('input').trigger('keydown', { key: 'ArrowUp' })
      expect(wrapper.emitted('update:value')).toBeUndefined()
    })

    it('emits pressEnter on enter key', async () => {
      const wrapper = mount(InputNumber)
      await wrapper.find('input').trigger('keydown', { key: 'Enter' })
      expect(wrapper.emitted('pressEnter')).toBeTruthy()
    })
  })

  describe('formatter/parser', () => {
    it('displays formatted value', () => {
      const formatter = (val: number | string | undefined) => `$ ${val}`
      const wrapper = mount(InputNumber, { props: { value: 100, formatter } })
      expect((wrapper.find('input').element as HTMLInputElement).value).toBe('$ 100')
    })
  })

  describe('events', () => {
    it('emits focus event', async () => {
      const wrapper = mount(InputNumber)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.emitted('focus')).toBeTruthy()
    })

    it('emits blur event', async () => {
      const wrapper = mount(InputNumber)
      await wrapper.find('input').trigger('blur')
      expect(wrapper.emitted('blur')).toBeTruthy()
    })

    it('applies focused class on focus', async () => {
      const wrapper = mount(InputNumber)
      await wrapper.find('input').trigger('focus')
      expect(wrapper.find('.ant-input-number-focused').exists()).toBe(true)
    })

    it('removes focused class on blur', async () => {
      const wrapper = mount(InputNumber)
      await wrapper.find('input').trigger('focus')
      await wrapper.find('input').trigger('blur')
      expect(wrapper.find('.ant-input-number-focused').exists()).toBe(false)
    })
  })

  describe('addon', () => {
    it('renders addonBefore slot', () => {
      const wrapper = mount(InputNumber, {
        slots: { addonBefore: '$' },
      })
      expect(wrapper.find('.ant-input-number-group-wrapper').exists()).toBe(true)
      expect(wrapper.find('.ant-input-number-group-addon').text()).toBe('$')
    })

    it('renders addonAfter slot', () => {
      const wrapper = mount(InputNumber, {
        slots: { addonAfter: 'kg' },
      })
      expect(wrapper.find('.ant-input-number-group-wrapper').exists()).toBe(true)
      expect(wrapper.findAll('.ant-input-number-group-addon').at(-1)!.text()).toBe('kg')
    })
  })

  describe('prefix', () => {
    it('renders prefix slot', () => {
      const wrapper = mount(InputNumber, {
        slots: { prefix: '<span class="test-prefix">$</span>' },
      })
      expect(wrapper.find('.ant-input-number-prefix').exists()).toBe(true)
      expect(wrapper.find('.test-prefix').text()).toBe('$')
    })
  })

  describe('exposed methods', () => {
    it('exposes focus method', () => {
      const wrapper = mount(InputNumber)
      expect(typeof wrapper.vm.focus).toBe('function')
    })

    it('exposes blur method', () => {
      const wrapper = mount(InputNumber)
      expect(typeof wrapper.vm.blur).toBe('function')
    })

    it('exposes input ref', () => {
      const wrapper = mount(InputNumber)
      expect(wrapper.vm.input).toBeDefined()
    })
  })

  describe('custom icon slots', () => {
    it('renders custom upIcon', () => {
      const wrapper = mount(InputNumber, {
        slots: { upIcon: '<span class="custom-up">+</span>' },
      })
      expect(wrapper.find('.custom-up').exists()).toBe(true)
    })

    it('renders custom downIcon', () => {
      const wrapper = mount(InputNumber, {
        slots: { downIcon: '<span class="custom-down">-</span>' },
      })
      expect(wrapper.find('.custom-down').exists()).toBe(true)
    })
  })
})
