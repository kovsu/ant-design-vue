import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Text from '../Text.vue'
import Title from '../Title.vue'
import Paragraph from '../Paragraph.vue'
import Link from '../Link.vue'

describe('TypographyText', () => {
  it('renders as span', () => {
    const wrapper = mount(Text, { slots: { default: 'Hello' } })
    expect(wrapper.element.tagName).toBe('SPAN')
    expect(wrapper.classes('ant-typography')).toBe(true)
    expect(wrapper.text()).toBe('Hello')
  })

  it('supports type variants', () => {
    const types = ['secondary', 'success', 'warning', 'danger'] as const
    types.forEach(type => {
      const wrapper = mount(Text, { props: { type }, slots: { default: 'text' } })
      expect(wrapper.classes(`ant-typography-${type}`)).toBe(true)
    })
  })

  it('supports disabled state', () => {
    const wrapper = mount(Text, { props: { disabled: true }, slots: { default: 'text' } })
    expect(wrapper.classes('ant-typography-disabled')).toBe(true)
  })

  it('supports strong decoration', () => {
    const wrapper = mount(Text, { props: { strong: true }, slots: { default: 'Bold' } })
    expect(wrapper.classes('ant-typography-strong')).toBe(true)
  })

  it('supports underline decoration', () => {
    const wrapper = mount(Text, { props: { underline: true }, slots: { default: 'Underlined' } })
    expect(wrapper.classes('ant-typography-underline')).toBe(true)
  })

  it('supports delete decoration', () => {
    const wrapper = mount(Text, { props: { delete: true }, slots: { default: 'Deleted' } })
    expect(wrapper.classes('ant-typography-delete')).toBe(true)
  })

  it('renders code tag', () => {
    const wrapper = mount(Text, { props: { code: true }, slots: { default: 'code' } })
    expect(wrapper.find('code').exists()).toBe(true)
  })

  it('renders kbd tag', () => {
    const wrapper = mount(Text, { props: { keyboard: true }, slots: { default: 'Ctrl' } })
    expect(wrapper.find('kbd').exists()).toBe(true)
  })

  it('applies single-line ellipsis style', () => {
    const wrapper = mount(Text, { props: { ellipsis: true }, slots: { default: 'Long text' } })
    expect(wrapper.element.style.overflow).toBe('hidden')
    expect(wrapper.element.style.textOverflow).toBe('ellipsis')
    expect(wrapper.element.style.whiteSpace).toBe('nowrap')
  })

  it('applies multi-line ellipsis style', () => {
    const wrapper = mount(Text, {
      props: { ellipsis: { rows: 3 } },
      slots: { default: 'Long text' },
    })
    expect(wrapper.element.style.overflow).toBe('hidden')
    expect(wrapper.element.style.webkitLineClamp).toBe('3')
  })

  it('shows copy button when copyable', () => {
    const wrapper = mount(Text, { props: { copyable: true }, slots: { default: 'Copy me' } })
    expect(wrapper.find('.ant-typography-copy').exists()).toBe(true)
  })
})

describe('TypographyTitle', () => {
  it('renders h1 by default', () => {
    const wrapper = mount(Title, { slots: { default: 'Heading' } })
    expect(wrapper.element.tagName).toBe('H1')
    expect(wrapper.classes('ant-typography')).toBe(true)
  })

  it('supports levels 1-5', () => {
    for (let level = 1; level <= 5; level++) {
      const wrapper = mount(Title, {
        props: { level: level as 1 | 2 | 3 | 4 | 5 },
        slots: { default: `H${level}` },
      })
      expect(wrapper.element.tagName).toBe(`H${level}`)
    }
  })

  it('supports type variants', () => {
    const wrapper = mount(Title, {
      props: { type: 'danger' },
      slots: { default: 'Danger' },
    })
    expect(wrapper.classes('ant-typography-danger')).toBe(true)
  })
})

describe('TypographyParagraph', () => {
  it('renders as div', () => {
    const wrapper = mount(Paragraph, { slots: { default: 'Paragraph text' } })
    expect(wrapper.element.tagName).toBe('DIV')
    expect(wrapper.classes('ant-typography')).toBe(true)
  })

  it('supports decorations', () => {
    const wrapper = mount(Paragraph, {
      props: { strong: true, italic: true },
      slots: { default: 'text' },
    })
    expect(wrapper.classes('ant-typography-strong')).toBe(true)
    expect(wrapper.classes('ant-typography-italic')).toBe(true)
  })
})

describe('TypographyLink', () => {
  it('renders as anchor', () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com' },
      slots: { default: 'Link' },
    })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('adds rel for target _blank', () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com', target: '_blank' },
      slots: { default: 'Link' },
    })
    expect(wrapper.attributes('rel')).toBe('noopener noreferrer')
  })

  it('does not add rel without target _blank', () => {
    const wrapper = mount(Link, {
      props: { href: 'https://example.com' },
      slots: { default: 'Link' },
    })
    expect(wrapper.attributes('rel')).toBeUndefined()
  })
})
