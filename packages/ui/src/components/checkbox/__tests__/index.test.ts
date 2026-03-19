import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h, nextTick, ref } from 'vue'
import Checkbox from '../Checkbox.vue'
import CheckboxGroup from '../CheckboxGroup.vue'

describe('Checkbox', () => {
  describe('rendering', () => {
    it('renders a label with checkbox', () => {
      const wrapper = mount(Checkbox, { slots: { default: 'Option A' } })
      expect(wrapper.element.tagName).toBe('LABEL')
      expect(wrapper.find('.ant-checkbox').exists()).toBe(true)
      expect(wrapper.find('.ant-checkbox-input').exists()).toBe(true)
      expect(wrapper.find('.ant-checkbox-inner').exists()).toBe(true)
      expect(wrapper.find('.ant-checkbox-label').text()).toBe('Option A')
    })

    it('has ant-checkbox-wrapper class', () => {
      const wrapper = mount(Checkbox)
      expect(wrapper.classes()).toContain('ant-checkbox-wrapper')
    })

    it('does not render label span when no slot content', () => {
      const wrapper = mount(Checkbox)
      expect(wrapper.find('.ant-checkbox-label').exists()).toBe(false)
    })

    it('renders hidden native checkbox input', () => {
      const wrapper = mount(Checkbox)
      const input = wrapper.find('input[type="checkbox"]')
      expect(input.exists()).toBe(true)
      expect(input.classes()).toContain('ant-checkbox-input')
    })
  })

  describe('checked prop', () => {
    it('applies checked class when checked=true', () => {
      const wrapper = mount(Checkbox, { props: { checked: true } })
      expect(wrapper.find('.ant-checkbox').classes()).toContain('ant-checkbox-checked')
      expect(wrapper.classes()).toContain('ant-checkbox-wrapper-checked')
    })

    it('does not apply checked class when checked=false', () => {
      const wrapper = mount(Checkbox, { props: { checked: false } })
      expect(wrapper.find('.ant-checkbox').classes()).not.toContain('ant-checkbox-checked')
    })

    it('sets native input checked state', () => {
      const wrapper = mount(Checkbox, { props: { checked: true } })
      const input = wrapper.find('input').element as HTMLInputElement
      expect(input.checked).toBe(true)
    })
  })

  describe('defaultChecked', () => {
    it('uses defaultChecked for initial uncontrolled state', () => {
      const wrapper = mount(Checkbox, { props: { defaultChecked: true } })
      expect(wrapper.find('.ant-checkbox').classes()).toContain('ant-checkbox-checked')
    })
  })

  describe('indeterminate prop', () => {
    it('applies indeterminate class when indeterminate=true and not checked', () => {
      const wrapper = mount(Checkbox, { props: { indeterminate: true } })
      expect(wrapper.find('.ant-checkbox').classes()).toContain('ant-checkbox-indeterminate')
    })

    it('does not apply indeterminate class when checked', () => {
      const wrapper = mount(Checkbox, { props: { indeterminate: true, checked: true } })
      expect(wrapper.find('.ant-checkbox').classes()).not.toContain('ant-checkbox-indeterminate')
    })

    it('sets aria-checked to mixed when indeterminate', () => {
      const wrapper = mount(Checkbox, { props: { indeterminate: true } })
      const input = wrapper.find('input')
      expect(input.attributes('aria-checked')).toBe('mixed')
    })
  })

  describe('disabled prop', () => {
    it('applies disabled classes', () => {
      const wrapper = mount(Checkbox, { props: { disabled: true } })
      expect(wrapper.find('.ant-checkbox').classes()).toContain('ant-checkbox-disabled')
      expect(wrapper.classes()).toContain('ant-checkbox-wrapper-disabled')
    })

    it('sets native input disabled', () => {
      const wrapper = mount(Checkbox, { props: { disabled: true } })
      const input = wrapper.find('input').element as HTMLInputElement
      expect(input.disabled).toBe(true)
    })

    it('does not emit change when disabled', async () => {
      const wrapper = mount(Checkbox, { props: { disabled: true } })
      await wrapper.find('input').trigger('change')
      expect(wrapper.emitted('change')).toBeUndefined()
    })
  })

  describe('events', () => {
    it('emits update:checked on change', async () => {
      const wrapper = mount(Checkbox, { props: { checked: false } })
      const input = wrapper.find('input')
      // Simulate user checking the checkbox
      Object.defineProperty(input.element, 'checked', { value: true, writable: true })
      await input.trigger('change')
      expect(wrapper.emitted('update:checked')).toBeTruthy()
      expect(wrapper.emitted('update:checked')![0]).toEqual([true])
    })

    it('emits change event', async () => {
      const wrapper = mount(Checkbox, { props: { checked: false } })
      const input = wrapper.find('input')
      Object.defineProperty(input.element, 'checked', { value: true, writable: true })
      await input.trigger('change')
      expect(wrapper.emitted('change')).toBeTruthy()
    })
  })

  describe('name and id props', () => {
    it('passes name to native input', () => {
      const wrapper = mount(Checkbox, { props: { name: 'myCheckbox' } })
      expect(wrapper.find('input').attributes('name')).toBe('myCheckbox')
    })

    it('passes id to native input', () => {
      const wrapper = mount(Checkbox, { props: { id: 'cb1' } })
      expect(wrapper.find('input').attributes('id')).toBe('cb1')
    })
  })

  describe('accessibility', () => {
    it('has role="checkbox" on input', () => {
      const wrapper = mount(Checkbox)
      expect(wrapper.find('input').attributes('role')).toBe('checkbox')
    })

    it('has aria-checked reflecting checked state', () => {
      const wrapper = mount(Checkbox, { props: { checked: true } })
      expect(wrapper.find('input').attributes('aria-checked')).toBe('true')
    })

    it('has aria-checked=false when unchecked', () => {
      const wrapper = mount(Checkbox, { props: { checked: false } })
      expect(wrapper.find('input').attributes('aria-checked')).toBe('false')
    })
  })

  describe('exposed methods', () => {
    it('exposes focus method', () => {
      const wrapper = mount(Checkbox)
      expect(typeof wrapper.vm.focus).toBe('function')
    })

    it('exposes blur method', () => {
      const wrapper = mount(Checkbox)
      expect(typeof wrapper.vm.blur).toBe('function')
    })
  })

  describe('component name', () => {
    it('has correct name', () => {
      expect(Checkbox.name).toBe('ACheckbox')
    })
  })
})

describe('CheckboxGroup', () => {
  it('renders with ant-checkbox-group class', () => {
    const wrapper = mount(CheckboxGroup)
    expect(wrapper.classes()).toContain('ant-checkbox-group')
  })

  it('has role="group"', () => {
    const wrapper = mount(CheckboxGroup)
    expect(wrapper.attributes('role')).toBe('group')
  })

  it('renders slot children', () => {
    const wrapper = mount(CheckboxGroup, {
      slots: {
        default: () => [
          h(Checkbox, { value: 'a' }, { default: () => 'A' }),
          h(Checkbox, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    expect(wrapper.findAllComponents(Checkbox)).toHaveLength(2)
  })

  it('checks checkboxes matching group value', () => {
    const wrapper = mount(CheckboxGroup, {
      props: { value: ['a'] },
      slots: {
        default: () => [
          h(Checkbox, { value: 'a' }, { default: () => 'A' }),
          h(Checkbox, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    const checkboxes = wrapper.findAllComponents(Checkbox)
    expect(checkboxes[0].find('.ant-checkbox').classes()).toContain('ant-checkbox-checked')
    expect(checkboxes[1].find('.ant-checkbox').classes()).not.toContain('ant-checkbox-checked')
  })

  it('emits update:value when a checkbox is toggled', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { value: [] },
      slots: {
        default: () => [
          h(Checkbox, { value: 'a' }, { default: () => 'A' }),
          h(Checkbox, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    const input = wrapper.findAllComponents(Checkbox)[0].find('input')
    Object.defineProperty(input.element, 'checked', { value: true, writable: true })
    await input.trigger('change')
    expect(wrapper.emitted('update:value')).toBeTruthy()
    expect(wrapper.emitted('update:value')![0]).toEqual([['a']])
  })

  it('emits change event', async () => {
    const wrapper = mount(CheckboxGroup, {
      props: { value: ['a'] },
      slots: {
        default: () => [
          h(Checkbox, { value: 'a' }, { default: () => 'A' }),
        ],
      },
    })
    const input = wrapper.findComponent(Checkbox).find('input')
    Object.defineProperty(input.element, 'checked', { value: false, writable: true })
    await input.trigger('change')
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')![0]).toEqual([[]])
  })

  it('disables all checkboxes when group disabled', () => {
    const wrapper = mount(CheckboxGroup, {
      props: { disabled: true },
      slots: {
        default: () => [
          h(Checkbox, { value: 'a' }, { default: () => 'A' }),
          h(Checkbox, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    const checkboxes = wrapper.findAllComponents(Checkbox)
    checkboxes.forEach((cb) => {
      expect(cb.find('.ant-checkbox').classes()).toContain('ant-checkbox-disabled')
    })
  })

  it('passes name to all children', () => {
    const wrapper = mount(CheckboxGroup, {
      props: { name: 'fruits' },
      slots: {
        default: () => [
          h(Checkbox, { value: 'a' }, { default: () => 'A' }),
          h(Checkbox, { value: 'b' }, { default: () => 'B' }),
        ],
      },
    })
    const inputs = wrapper.findAll('input')
    inputs.forEach((input) => {
      expect(input.attributes('name')).toBe('fruits')
    })
  })

  it('has correct component name', () => {
    expect(CheckboxGroup.name).toBe('ACheckboxGroup')
  })
})
