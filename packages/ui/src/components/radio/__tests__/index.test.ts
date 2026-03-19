import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import Radio from '../Radio.vue'
import RadioButton from '../RadioButton.vue'
import RadioGroup from '../RadioGroup.vue'

describe('Radio', () => {
  describe('rendering', () => {
    it('renders a label with radio', () => {
      const wrapper = mount(Radio, { slots: { default: 'Option A' } })
      expect(wrapper.element.tagName).toBe('LABEL')
      expect(wrapper.find('.ant-radio').exists()).toBe(true)
      expect(wrapper.find('.ant-radio-input').exists()).toBe(true)
      expect(wrapper.find('.ant-radio-inner').exists()).toBe(true)
      expect(wrapper.find('.ant-radio-label').text()).toBe('Option A')
    })

    it('has ant-radio-wrapper class', () => {
      const wrapper = mount(Radio)
      expect(wrapper.classes()).toContain('ant-radio-wrapper')
    })

    it('does not render label span when no slot content', () => {
      const wrapper = mount(Radio)
      expect(wrapper.find('.ant-radio-label').exists()).toBe(false)
    })

    it('renders hidden native radio input', () => {
      const wrapper = mount(Radio)
      const input = wrapper.find('input[type="radio"]')
      expect(input.exists()).toBe(true)
    })
  })

  describe('checked prop', () => {
    it('applies checked class when checked=true', () => {
      const wrapper = mount(Radio, { props: { checked: true } })
      expect(wrapper.find('.ant-radio').classes()).toContain('ant-radio-checked')
      expect(wrapper.classes()).toContain('ant-radio-wrapper-checked')
    })

    it('does not apply checked class when checked=false', () => {
      const wrapper = mount(Radio, { props: { checked: false } })
      expect(wrapper.find('.ant-radio').classes()).not.toContain('ant-radio-checked')
    })
  })

  describe('disabled prop', () => {
    it('applies disabled classes', () => {
      const wrapper = mount(Radio, { props: { disabled: true } })
      expect(wrapper.find('.ant-radio').classes()).toContain('ant-radio-disabled')
      expect(wrapper.classes()).toContain('ant-radio-wrapper-disabled')
    })

    it('sets native input disabled', () => {
      const wrapper = mount(Radio, { props: { disabled: true } })
      const input = wrapper.find('input').element as HTMLInputElement
      expect(input.disabled).toBe(true)
    })

    it('does not emit change when disabled', async () => {
      const wrapper = mount(Radio, { props: { disabled: true } })
      await wrapper.find('input').trigger('change')
      expect(wrapper.emitted('change')).toBeUndefined()
    })
  })

  describe('events', () => {
    it('emits update:checked on change', async () => {
      const wrapper = mount(Radio, { props: { checked: false } })
      const input = wrapper.find('input')
      Object.defineProperty(input.element, 'checked', { value: true, writable: true })
      await input.trigger('change')
      expect(wrapper.emitted('update:checked')).toBeTruthy()
      expect(wrapper.emitted('update:checked')![0]).toEqual([true])
    })

    it('emits change event', async () => {
      const wrapper = mount(Radio, { props: { checked: false } })
      const input = wrapper.find('input')
      Object.defineProperty(input.element, 'checked', { value: true, writable: true })
      await input.trigger('change')
      expect(wrapper.emitted('change')).toBeTruthy()
    })
  })

  describe('accessibility', () => {
    it('has role="radio" on input', () => {
      const wrapper = mount(Radio)
      expect(wrapper.find('input').attributes('role')).toBe('radio')
    })

    it('has aria-checked reflecting checked state', () => {
      const wrapperChecked = mount(Radio, { props: { checked: true } })
      expect(wrapperChecked.find('input').attributes('aria-checked')).toBe('true')

      const wrapperUnchecked = mount(Radio, { props: { checked: false } })
      expect(wrapperUnchecked.find('input').attributes('aria-checked')).toBe('false')
    })
  })

  describe('name and id props', () => {
    it('passes name to native input', () => {
      const wrapper = mount(Radio, { props: { name: 'myRadio' } })
      expect(wrapper.find('input').attributes('name')).toBe('myRadio')
    })

    it('passes id to native input', () => {
      const wrapper = mount(Radio, { props: { id: 'r1' } })
      expect(wrapper.find('input').attributes('id')).toBe('r1')
    })
  })

  describe('exposed methods', () => {
    it('exposes focus method', () => {
      const wrapper = mount(Radio)
      expect(typeof wrapper.vm.focus).toBe('function')
    })

    it('exposes blur method', () => {
      const wrapper = mount(Radio)
      expect(typeof wrapper.vm.blur).toBe('function')
    })
  })

  describe('component name', () => {
    it('has correct name', () => {
      expect(Radio.name).toBe('ARadio')
    })
  })
})

describe('RadioButton', () => {
  it('renders with ant-radio-button-wrapper class', () => {
    const wrapper = mount(RadioButton, { slots: { default: 'Option' } })
    expect(wrapper.classes()).toContain('ant-radio-button-wrapper')
  })

  it('applies checked class when checked', () => {
    const wrapper = mount(RadioButton, { props: { checked: true } })
    expect(wrapper.classes()).toContain('ant-radio-button-wrapper-checked')
  })

  it('applies disabled class when disabled', () => {
    const wrapper = mount(RadioButton, { props: { disabled: true } })
    expect(wrapper.classes()).toContain('ant-radio-button-wrapper-disabled')
  })

  it('renders slot content in inner span', () => {
    const wrapper = mount(RadioButton, { slots: { default: 'Click me' } })
    expect(wrapper.find('.ant-radio-button-inner').text()).toBe('Click me')
  })

  it('has correct component name', () => {
    expect(RadioButton.name).toBe('ARadioButton')
  })
})

describe('RadioGroup', () => {
  it('renders with ant-radio-group class', () => {
    const wrapper = mount(RadioGroup)
    expect(wrapper.classes()).toContain('ant-radio-group')
  })

  it('has role="radiogroup"', () => {
    const wrapper = mount(RadioGroup)
    expect(wrapper.attributes('role')).toBe('radiogroup')
  })

  it('renders slot children', () => {
    const wrapper = mount(RadioGroup, {
      slots: {
        default: () => [
          h(Radio, { value: 'a' }, { default: () => 'A' }),
          h(Radio, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    expect(wrapper.findAllComponents(Radio)).toHaveLength(2)
  })

  it('checks radio matching group value', () => {
    const wrapper = mount(RadioGroup, {
      props: { value: 'a' },
      slots: {
        default: () => [
          h(Radio, { value: 'a' }, { default: () => 'A' }),
          h(Radio, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    const radios = wrapper.findAllComponents(Radio)
    expect(radios[0].find('.ant-radio').classes()).toContain('ant-radio-checked')
    expect(radios[1].find('.ant-radio').classes()).not.toContain('ant-radio-checked')
  })

  it('emits update:value when a radio is selected', async () => {
    const wrapper = mount(RadioGroup, {
      props: { value: 'a' },
      slots: {
        default: () => [
          h(Radio, { value: 'a' }, { default: () => 'A' }),
          h(Radio, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    const input = wrapper.findAllComponents(Radio)[1].find('input')
    Object.defineProperty(input.element, 'checked', { value: true, writable: true })
    await input.trigger('change')
    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('update:value')![0]).toEqual(['b'])
  })

  it('disables all radios when group disabled', () => {
    const wrapper = mount(RadioGroup, {
      props: { disabled: true },
      slots: {
        default: () => [
          h(Radio, { value: 'a' }, { default: () => 'A' }),
          h(Radio, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    const radios = wrapper.findAllComponents(Radio)
    radios.forEach((r) => {
      expect(r.find('.ant-radio').classes()).toContain('ant-radio-disabled')
    })
  })

  it('passes name to all children', () => {
    const wrapper = mount(RadioGroup, {
      props: { name: 'gender' },
      slots: {
        default: () => [
          h(Radio, { value: 'a' }, { default: () => 'A' }),
          h(Radio, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    const inputs = wrapper.findAll('input')
    inputs.forEach((input) => {
      expect(input.attributes('name')).toBe('gender')
    })
  })

  describe('button style', () => {
    it('applies solid class', () => {
      const wrapper = mount(RadioGroup, {
        props: { buttonStyle: 'solid' },
      })
      expect(wrapper.classes()).toContain('ant-radio-group-solid')
    })

    it('applies outline class by default', () => {
      const wrapper = mount(RadioGroup)
      expect(wrapper.classes()).toContain('ant-radio-group-outline')
    })
  })

  describe('size prop', () => {
    it.each(['large', 'default', 'small'] as const)(
      'applies size class for size=%s',
      (size) => {
        const wrapper = mount(RadioGroup, { props: { size } })
        expect(wrapper.classes()).toContain(`ant-radio-group-${size}`)
      },
    )
  })

  it('has correct component name', () => {
    expect(RadioGroup.name).toBe('ARadioGroup')
  })
})
