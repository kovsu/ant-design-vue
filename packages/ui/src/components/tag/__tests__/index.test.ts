import { describe, expect, it } from 'vitest'
import { Tag, CheckableTag } from '@ant-design-vue/ui'
import { mount } from '@vue/test-utils'

describe('Tag', () => {
  it('should render correctly', () => {
    const wrapper = mount(Tag, {
      slots: { default: 'Tag 1' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders basic tag with text', () => {
    const wrapper = mount(Tag, {
      slots: { default: 'Hello' },
    })
    expect(wrapper.classes('ant-tag')).toBe(true)
    expect(wrapper.find('.ant-tag-text').text()).toBe('Hello')
  })

  it('applies preset color class for blue', () => {
    const wrapper = mount(Tag, {
      props: { color: 'blue' },
      slots: { default: 'Blue' },
    })
    expect(wrapper.classes('ant-tag-blue')).toBe(true)
    expect(wrapper.classes('ant-tag-has-color')).toBe(false)
  })

  it('applies preset color class for red', () => {
    const wrapper = mount(Tag, {
      props: { color: 'red' },
      slots: { default: 'Red' },
    })
    expect(wrapper.classes('ant-tag-red')).toBe(true)
  })

  it('applies preset color class for green', () => {
    const wrapper = mount(Tag, {
      props: { color: 'green' },
      slots: { default: 'Green' },
    })
    expect(wrapper.classes('ant-tag-green')).toBe(true)
  })

  it('applies status color class for success', () => {
    const wrapper = mount(Tag, {
      props: { color: 'success' },
      slots: { default: 'Success' },
    })
    expect(wrapper.classes('ant-tag-success')).toBe(true)
    expect(wrapper.classes('ant-tag-has-color')).toBe(false)
  })

  it('applies status color class for processing', () => {
    const wrapper = mount(Tag, {
      props: { color: 'processing' },
      slots: { default: 'Processing' },
    })
    expect(wrapper.classes('ant-tag-processing')).toBe(true)
  })

  it('applies status color class for error', () => {
    const wrapper = mount(Tag, {
      props: { color: 'error' },
      slots: { default: 'Error' },
    })
    expect(wrapper.classes('ant-tag-error')).toBe(true)
  })

  it('applies status color class for warning', () => {
    const wrapper = mount(Tag, {
      props: { color: 'warning' },
      slots: { default: 'Warning' },
    })
    expect(wrapper.classes('ant-tag-warning')).toBe(true)
  })

  it('applies custom color as inline style', () => {
    const wrapper = mount(Tag, {
      props: { color: '#f50' },
      slots: { default: 'Custom' },
    })
    expect(wrapper.classes('ant-tag-has-color')).toBe(true)
    expect(wrapper.element.style.backgroundColor).toBeTruthy()
    expect(wrapper.element.style.borderColor).toBeTruthy()
    expect(wrapper.element.style.color).toBeTruthy()
  })

  it('renders close button when closable', () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      slots: { default: 'Closable' },
    })
    expect(wrapper.find('.ant-tag-close-icon').exists()).toBe(true)
    expect(wrapper.find('.ant-tag-close-icon').attributes('aria-label')).toBe('Remove tag')
  })

  it('does not render close button by default', () => {
    const wrapper = mount(Tag, {
      slots: { default: 'Not closable' },
    })
    expect(wrapper.find('.ant-tag-close-icon').exists()).toBe(false)
  })

  it('hides tag on close button click', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      slots: { default: 'Close me' },
    })
    await wrapper.find('.ant-tag-close-icon').trigger('click')
    expect(wrapper.find('.ant-tag').exists()).toBe(false)
  })

  it('emits close event on close button click', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      slots: { default: 'Close me' },
    })
    await wrapper.find('.ant-tag-close-icon').trigger('click')
    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('keeps tag visible when close event is prevented', async () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      attrs: {
        onClose: (e: MouseEvent) => e.preventDefault(),
      },
      slots: { default: 'Keep me' },
    })
    await wrapper.find('.ant-tag-close-icon').trigger('click')
    expect(wrapper.find('.ant-tag').exists()).toBe(true)
  })

  it('adds borderless class when bordered=false', () => {
    const wrapper = mount(Tag, {
      props: { bordered: false },
      slots: { default: 'No border' },
    })
    expect(wrapper.classes('ant-tag-borderless')).toBe(true)
  })

  it('does not have borderless class by default', () => {
    const wrapper = mount(Tag, {
      slots: { default: 'Default' },
    })
    expect(wrapper.classes('ant-tag-borderless')).toBe(false)
  })

  it('renders icon slot', () => {
    const wrapper = mount(Tag, {
      slots: {
        default: 'With icon',
        icon: '<span class="custom-icon">I</span>',
      },
    })
    expect(wrapper.find('.custom-icon').exists()).toBe(true)
    expect(wrapper.find('.custom-icon').text()).toBe('I')
  })

  it('renders custom closeIcon slot', () => {
    const wrapper = mount(Tag, {
      props: { closable: true },
      slots: {
        default: 'Custom close',
        closeIcon: '<span class="my-close">X</span>',
      },
    })
    expect(wrapper.find('.my-close').exists()).toBe(true)
    expect(wrapper.find('.ant-tag-close-x').exists()).toBe(false)
  })

  it('emits click event', async () => {
    const wrapper = mount(Tag, {
      slots: { default: 'Click me' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })
})

describe('CheckableTag', () => {
  it('should render correctly', () => {
    const wrapper = mount(CheckableTag, {
      slots: { default: 'Checkable' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders with checkable class', () => {
    const wrapper = mount(CheckableTag, {
      slots: { default: 'Tag' },
    })
    expect(wrapper.classes('ant-tag')).toBe(true)
    expect(wrapper.classes('ant-tag-checkable')).toBe(true)
  })

  it('applies checked class when checked', () => {
    const wrapper = mount(CheckableTag, {
      props: { checked: true },
      slots: { default: 'Checked' },
    })
    expect(wrapper.classes('ant-tag-checkable-checked')).toBe(true)
  })

  it('does not have checked class when unchecked', () => {
    const wrapper = mount(CheckableTag, {
      props: { checked: false },
      slots: { default: 'Unchecked' },
    })
    expect(wrapper.classes('ant-tag-checkable-checked')).toBe(false)
  })

  it('emits update:checked and change on click', async () => {
    const wrapper = mount(CheckableTag, {
      props: { checked: false },
      slots: { default: 'Toggle' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:checked')).toEqual([[true]])
    expect(wrapper.emitted('change')).toEqual([[true]])
  })

  it('emits false when clicking a checked tag', async () => {
    const wrapper = mount(CheckableTag, {
      props: { checked: true },
      slots: { default: 'Toggle' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:checked')).toEqual([[false]])
    expect(wrapper.emitted('change')).toEqual([[false]])
  })

  it('emits click event', async () => {
    const wrapper = mount(CheckableTag, {
      slots: { default: 'Click' },
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('has correct aria-checked when checked', () => {
    const wrapper = mount(CheckableTag, {
      props: { checked: true },
      slots: { default: 'Checked' },
    })
    expect(wrapper.attributes('aria-checked')).toBe('true')
    expect(wrapper.attributes('role')).toBe('checkbox')
  })

  it('has correct aria-checked when unchecked', () => {
    const wrapper = mount(CheckableTag, {
      props: { checked: false },
      slots: { default: 'Unchecked' },
    })
    expect(wrapper.attributes('aria-checked')).toBe('false')
  })

  it('has tabindex for keyboard accessibility', () => {
    const wrapper = mount(CheckableTag, {
      slots: { default: 'Focusable' },
    })
    expect(wrapper.attributes('tabindex')).toBe('0')
  })

  it('responds to Enter key', async () => {
    const wrapper = mount(CheckableTag, {
      props: { checked: false },
      slots: { default: 'Enter' },
    })
    await wrapper.trigger('keydown.enter')
    expect(wrapper.emitted('update:checked')).toEqual([[true]])
    expect(wrapper.emitted('change')).toEqual([[true]])
  })

  it('responds to Space key', async () => {
    const wrapper = mount(CheckableTag, {
      props: { checked: false },
      slots: { default: 'Space' },
    })
    await wrapper.trigger('keydown.space')
    expect(wrapper.emitted('update:checked')).toEqual([[true]])
    expect(wrapper.emitted('change')).toEqual([[true]])
  })
})
