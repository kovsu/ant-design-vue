import { describe, expect, it } from 'vitest'
import { Segmented } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'

describe('Segmented', () => {
  it('should render correctly', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B', 'C'] },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders all options', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['Daily', 'Weekly', 'Monthly'] },
    })
    expect(wrapper.classes('ant-segmented')).toBe(true)
    const items = wrapper.findAll('.ant-segmented-item')
    expect(items).toHaveLength(3)
    expect(items[0].find('.ant-segmented-item-label').text()).toBe('Daily')
    expect(items[1].find('.ant-segmented-item-label').text()).toBe('Weekly')
    expect(items[2].find('.ant-segmented-item-label').text()).toBe('Monthly')
  })

  it('renders numeric options', () => {
    const wrapper = mount(Segmented, {
      props: { options: [1, 2, 3] },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    expect(items).toHaveLength(3)
    expect(items[0].find('.ant-segmented-item-label').text()).toBe('1')
  })

  it('renders object options', () => {
    const wrapper = mount(Segmented, {
      props: {
        options: [
          { value: 'a', label: 'Alpha' },
          { value: 'b', label: 'Beta' },
        ],
      },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    expect(items).toHaveLength(2)
    expect(items[0].find('.ant-segmented-item-label').text()).toBe('Alpha')
    expect(items[1].find('.ant-segmented-item-label').text()).toBe('Beta')
  })

  it('marks selected item', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B', 'C'], value: 'B' },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    expect(items[0].classes('ant-segmented-item-selected')).toBe(false)
    expect(items[1].classes('ant-segmented-item-selected')).toBe(true)
    expect(items[2].classes('ant-segmented-item-selected')).toBe(false)
  })

  it('emits update:value and change on option click', async () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B', 'C'], value: 'A' },
    })
    await wrapper.findAll('.ant-segmented-item')[2].trigger('click')
    expect(wrapper.emitted('update:value')).toEqual([['C']])
    expect(wrapper.emitted('change')).toEqual([['C']])
  })

  it('works in uncontrolled mode', async () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B', 'C'] },
    })
    await wrapper.findAll('.ant-segmented-item')[1].trigger('click')
    expect(wrapper.emitted('update:value')).toEqual([['B']])
    // Internal state should update
    const items = wrapper.findAll('.ant-segmented-item')
    expect(items[1].classes('ant-segmented-item-selected')).toBe(true)
  })

  it('applies disabled class when disabled', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B'], disabled: true },
    })
    expect(wrapper.classes('ant-segmented-disabled')).toBe(true)
  })

  it('does not emit on click when disabled', async () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B'], disabled: true, value: 'A' },
    })
    await wrapper.findAll('.ant-segmented-item')[1].trigger('click')
    expect(wrapper.emitted('update:value')).toBeUndefined()
  })

  it('does not emit on click when option is disabled', async () => {
    const wrapper = mount(Segmented, {
      props: {
        options: [
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B', disabled: true },
        ],
        value: 'A',
      },
    })
    await wrapper.findAll('.ant-segmented-item')[1].trigger('click')
    expect(wrapper.emitted('update:value')).toBeUndefined()
  })

  it('applies per-option disabled class', () => {
    const wrapper = mount(Segmented, {
      props: {
        options: [
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B', disabled: true },
        ],
      },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    expect(items[0].classes('ant-segmented-item-disabled')).toBe(false)
    expect(items[1].classes('ant-segmented-item-disabled')).toBe(true)
  })

  it('applies block class', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B'], block: true },
    })
    expect(wrapper.classes('ant-segmented-block')).toBe(true)
  })

  it('applies size sm class', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B'], size: 'sm' },
    })
    expect(wrapper.classes('ant-segmented-sm')).toBe(true)
  })

  it('applies size lg class', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B'], size: 'lg' },
    })
    expect(wrapper.classes('ant-segmented-lg')).toBe(true)
  })

  it('has role="radiogroup" on container', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B'] },
    })
    expect(wrapper.attributes('role')).toBe('radiogroup')
  })

  it('has role="radio" on each option', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B'] },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    expect(items[0].attributes('role')).toBe('radio')
    expect(items[1].attributes('role')).toBe('radio')
  })

  it('sets aria-checked on selected option', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B'], value: 'B' },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    expect(items[0].attributes('aria-checked')).toBe('false')
    expect(items[1].attributes('aria-checked')).toBe('true')
  })

  it('navigates with ArrowRight key', async () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B', 'C'], value: 'A' },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    await items[0].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')).toEqual([['B']])
  })

  it('navigates with ArrowLeft key', async () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B', 'C'], value: 'C' },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    await items[2].trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:value')).toEqual([['B']])
  })

  it('wraps around with ArrowRight on last item', async () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B', 'C'], value: 'C' },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    await items[2].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')).toEqual([['A']])
  })

  it('skips disabled options during keyboard navigation', async () => {
    const wrapper = mount(Segmented, {
      props: {
        options: [
          { value: 'A', label: 'A' },
          { value: 'B', label: 'B', disabled: true },
          { value: 'C', label: 'C' },
        ],
        value: 'A',
      },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    await items[0].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:value')).toEqual([['C']])
  })

  it('renders custom label slot', () => {
    const wrapper = mount(Segmented, {
      props: { options: ['A', 'B'] },
      slots: {
        label: `<template #label="{ label }"><em>{{ label }}</em></template>`,
      },
    })
    expect(wrapper.findAll('em')).toHaveLength(2)
  })

  it('applies custom className to options', () => {
    const wrapper = mount(Segmented, {
      props: {
        options: [
          { value: 'A', label: 'A', className: 'custom-class' },
          { value: 'B', label: 'B' },
        ],
      },
    })
    const items = wrapper.findAll('.ant-segmented-item')
    expect(items[0].classes('custom-class')).toBe(true)
    expect(items[1].classes('custom-class')).toBe(false)
  })
})
