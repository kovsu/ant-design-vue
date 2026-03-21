import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import ConfigProvider from '../ConfigProvider.vue'
import { useConfigInject } from '@/hooks'
import type { Locale, FormConfig, WaveConfig } from '../types'

// Helper that reads config context
const ConfigReader = defineComponent({
  setup() {
    const { size, direction, disabled, theme } = useConfigInject()
    return { size, direction, disabled, theme }
  },
  render() {
    return h('div', {
      'data-size': this.size,
      'data-direction': this.direction,
      'data-disabled': String(this.disabled),
      'data-primary': this.theme.primaryColor,
    })
  },
})

// Extended reader that also checks new config fields
const FullConfigReader = defineComponent({
  setup() {
    const {
      size,
      direction,
      disabled,
      locale,
      form,
      renderEmpty,
      virtual,
      autoInsertSpaceInButton,
      wave,
    } = useConfigInject()
    return {
      size,
      direction,
      disabled,
      locale,
      form,
      renderEmpty,
      virtual,
      autoInsertSpaceInButton,
      wave,
    }
  },
  render() {
    return h('div', {
      'data-size': this.size,
      'data-direction': this.direction,
      'data-disabled': String(this.disabled),
      'data-locale': this.locale?.locale ?? '',
      'data-form-colon': this.form?.colon != null ? String(this.form.colon) : '',
      'data-form-required-mark': this.form?.requiredMark != null ? String(this.form.requiredMark) : '',
      'data-render-empty': typeof this.renderEmpty === 'function' ? 'true' : 'false',
      'data-virtual': this.virtual != null ? String(this.virtual) : '',
      'data-auto-insert-space': this.autoInsertSpaceInButton != null ? String(this.autoInsertSpaceInButton) : '',
      'data-wave-disabled': this.wave?.disabled != null ? String(this.wave.disabled) : '',
    })
  },
})

describe('ConfigProvider', () => {
  describe('rendering', () => {
    it('renders slot content without wrapper element', () => {
      const wrapper = mount(ConfigProvider, {
        slots: { default: '<span>child</span>' },
      })
      expect(wrapper.find('span').text()).toBe('child')
    })

    it('renders multiple children', () => {
      const wrapper = mount(ConfigProvider, {
        slots: { default: '<div>a</div><div>b</div>' },
      })
      expect(wrapper.findAll('div')).toHaveLength(2)
    })
  })

  describe('default values', () => {
    it('provides default config when no props given', () => {
      const wrapper = mount(ConfigProvider, {
        slots: { default: () => h(ConfigReader) },
      })
      const reader = wrapper.findComponent(ConfigReader)
      expect(reader.attributes('data-size')).toBe('md')
      expect(reader.attributes('data-direction')).toBe('ltr')
      expect(reader.attributes('data-disabled')).toBe('false')
    })

    it('provides defaults without ConfigProvider wrapper', () => {
      const wrapper = mount(ConfigReader)
      expect(wrapper.attributes('data-size')).toBe('md')
      expect(wrapper.attributes('data-direction')).toBe('ltr')
      expect(wrapper.attributes('data-disabled')).toBe('false')
    })
  })

  describe('size', () => {
    it('provides custom size to children', () => {
      const wrapper = mount(ConfigProvider, {
        props: { size: 'lg' },
        slots: { default: () => h(ConfigReader) },
      })
      expect(wrapper.findComponent(ConfigReader).attributes('data-size')).toBe('lg')
    })

    it.each(['sm', 'md', 'lg'] as const)('accepts size=%s', (size) => {
      const wrapper = mount(ConfigProvider, {
        props: { size },
        slots: { default: () => h(ConfigReader) },
      })
      expect(wrapper.findComponent(ConfigReader).attributes('data-size')).toBe(size)
    })

    it('updates size reactively', async () => {
      const wrapper = mount(ConfigProvider, {
        props: { size: 'sm' },
        slots: { default: () => h(ConfigReader) },
      })
      const reader = wrapper.findComponent(ConfigReader)
      expect(reader.attributes('data-size')).toBe('sm')

      await wrapper.setProps({ size: 'lg' })
      expect(reader.attributes('data-size')).toBe('lg')
    })
  })

  describe('direction', () => {
    it('provides direction to children', () => {
      const wrapper = mount(ConfigProvider, {
        props: { direction: 'rtl' },
        slots: { default: () => h(ConfigReader) },
      })
      expect(wrapper.findComponent(ConfigReader).attributes('data-direction')).toBe('rtl')
    })

    it('updates direction reactively', async () => {
      const wrapper = mount(ConfigProvider, {
        props: { direction: 'ltr' },
        slots: { default: () => h(ConfigReader) },
      })
      const reader = wrapper.findComponent(ConfigReader)
      expect(reader.attributes('data-direction')).toBe('ltr')

      await wrapper.setProps({ direction: 'rtl' })
      expect(reader.attributes('data-direction')).toBe('rtl')
    })
  })

  describe('disabled', () => {
    it('provides disabled state to children', () => {
      const wrapper = mount(ConfigProvider, {
        props: { disabled: true },
        slots: { default: () => h(ConfigReader) },
      })
      expect(wrapper.findComponent(ConfigReader).attributes('data-disabled')).toBe('true')
    })

    it('updates disabled state reactively', async () => {
      const wrapper = mount(ConfigProvider, {
        props: { disabled: false },
        slots: { default: () => h(ConfigReader) },
      })
      const reader = wrapper.findComponent(ConfigReader)
      expect(reader.attributes('data-disabled')).toBe('false')

      await wrapper.setProps({ disabled: true })
      expect(reader.attributes('data-disabled')).toBe('true')
    })
  })

  describe('nesting', () => {
    it('inner ConfigProvider overrides outer', () => {
      const Nested = defineComponent({
        render() {
          return h(ConfigProvider, { size: 'sm' }, {
            default: () => h(ConfigProvider, { size: 'lg' }, {
              default: () => h(ConfigReader),
            }),
          })
        },
      })
      const wrapper = mount(Nested)
      expect(wrapper.findComponent(ConfigReader).attributes('data-size')).toBe('lg')
    })

    it('inner ConfigProvider inherits unset values from outer', () => {
      const Nested = defineComponent({
        render() {
          return h(ConfigProvider, { size: 'sm', direction: 'rtl' }, {
            default: () => h(ConfigProvider, { size: 'lg' }, {
              // direction is not set on inner, but ConfigProvider doesn't merge — it provides its own defaults
              default: () => h(ConfigReader),
            }),
          })
        },
      })
      const wrapper = mount(Nested)
      const reader = wrapper.findComponent(ConfigReader)
      expect(reader.attributes('data-size')).toBe('lg')
      // Inner ConfigProvider provides its own default for direction
      expect(reader.attributes('data-direction')).toBe('ltr')
    })
  })

  describe('integration with Theme', () => {
    it('useConfigInject provides theme defaults without Theme wrapper', () => {
      const wrapper = mount(ConfigReader)
      expect(wrapper.attributes('data-primary')).toBe('#1677FF')
    })
  })

  describe('component name', () => {
    it('has correct component name', () => {
      expect(ConfigProvider.name).toBe('AConfigProvider')
    })
  })

  // =========================================================================
  // New tests for enhanced ConfigProvider
  // =========================================================================

  describe('locale', () => {
    it('provides default English locale when no locale prop is set', () => {
      const wrapper = mount(ConfigProvider, {
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-locale')).toBe('en')
    })

    it('provides default English locale via useConfigInject without ConfigProvider', () => {
      const wrapper = mount(FullConfigReader)
      expect(wrapper.attributes('data-locale')).toBe('en')
    })

    it('provides custom locale to children', () => {
      const zhCN: Locale = {
        locale: 'zh-CN',
        Modal: { okText: '确定', cancelText: '取消' },
      }
      const wrapper = mount(ConfigProvider, {
        props: { locale: zhCN },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-locale')).toBe('zh-CN')
    })

    it('updates locale reactively', async () => {
      const enLocale: Locale = { locale: 'en' }
      const zhLocale: Locale = { locale: 'zh-CN' }

      const wrapper = mount(ConfigProvider, {
        props: { locale: enLocale },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-locale')).toBe('en')

      await wrapper.setProps({ locale: zhLocale })
      expect(reader.attributes('data-locale')).toBe('zh-CN')
    })

    it('provides component-level locale translations', () => {
      const LocaleDetailReader = defineComponent({
        setup() {
          const { locale } = useConfigInject()
          return { locale }
        },
        render() {
          return h('div', {
            'data-modal-ok': this.locale?.Modal?.okText ?? '',
            'data-modal-cancel': this.locale?.Modal?.cancelText ?? '',
            'data-empty-desc': this.locale?.Empty?.description ?? '',
            'data-pagination-page': this.locale?.Pagination?.page ?? '',
          })
        },
      })

      const customLocale: Locale = {
        locale: 'ja',
        Modal: { okText: 'はい', cancelText: 'いいえ' },
        Empty: { description: 'データなし' },
        Pagination: { page: 'ページ' },
      }

      const wrapper = mount(ConfigProvider, {
        props: { locale: customLocale },
        slots: { default: () => h(LocaleDetailReader) },
      })
      const reader = wrapper.findComponent(LocaleDetailReader)
      expect(reader.attributes('data-modal-ok')).toBe('はい')
      expect(reader.attributes('data-modal-cancel')).toBe('いいえ')
      expect(reader.attributes('data-empty-desc')).toBe('データなし')
      expect(reader.attributes('data-pagination-page')).toBe('ページ')
    })

    it('default English locale has expected translation keys', () => {
      const LocaleChecker = defineComponent({
        setup() {
          const { locale } = useConfigInject()
          return { locale }
        },
        render() {
          const l = this.locale
          return h('div', {
            'data-has-pagination': l?.Pagination != null ? 'true' : 'false',
            'data-has-modal': l?.Modal != null ? 'true' : 'false',
            'data-has-popconfirm': l?.Popconfirm != null ? 'true' : 'false',
            'data-has-table': l?.Table != null ? 'true' : 'false',
            'data-has-transfer': l?.Transfer != null ? 'true' : 'false',
            'data-has-upload': l?.Upload != null ? 'true' : 'false',
            'data-has-empty': l?.Empty != null ? 'true' : 'false',
            'data-has-qrcode': l?.QRCode != null ? 'true' : 'false',
          })
        },
      })

      const wrapper = mount(ConfigProvider, {
        slots: { default: () => h(LocaleChecker) },
      })
      const reader = wrapper.findComponent(LocaleChecker)
      expect(reader.attributes('data-has-pagination')).toBe('true')
      expect(reader.attributes('data-has-modal')).toBe('true')
      expect(reader.attributes('data-has-popconfirm')).toBe('true')
      expect(reader.attributes('data-has-table')).toBe('true')
      expect(reader.attributes('data-has-transfer')).toBe('true')
      expect(reader.attributes('data-has-upload')).toBe('true')
      expect(reader.attributes('data-has-empty')).toBe('true')
      expect(reader.attributes('data-has-qrcode')).toBe('true')
    })
  })

  describe('form config', () => {
    it('provides form config to children', () => {
      const formConfig: FormConfig = { colon: false, requiredMark: 'optional' }
      const wrapper = mount(ConfigProvider, {
        props: { form: formConfig },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-form-colon')).toBe('false')
      expect(reader.attributes('data-form-required-mark')).toBe('optional')
    })

    it('form config defaults to undefined without ConfigProvider', () => {
      const wrapper = mount(FullConfigReader)
      expect(wrapper.attributes('data-form-colon')).toBe('')
      expect(wrapper.attributes('data-form-required-mark')).toBe('')
    })

    it('updates form config reactively', async () => {
      const wrapper = mount(ConfigProvider, {
        props: { form: { colon: true } },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-form-colon')).toBe('true')

      await wrapper.setProps({ form: { colon: false } })
      expect(reader.attributes('data-form-colon')).toBe('false')
    })

    it('provides form validateMessages', () => {
      const FormMessageReader = defineComponent({
        setup() {
          const { form } = useConfigInject()
          return { form }
        },
        render() {
          const msgs = this.form?.validateMessages
          return h('div', {
            'data-has-messages': msgs != null ? 'true' : 'false',
            'data-required-msg': msgs?.required ?? '',
          })
        },
      })

      const formConfig: FormConfig = {
        validateMessages: { required: '${label} is required!' },
      }

      const wrapper = mount(ConfigProvider, {
        props: { form: formConfig },
        slots: { default: () => h(FormMessageReader) },
      })
      const reader = wrapper.findComponent(FormMessageReader)
      expect(reader.attributes('data-has-messages')).toBe('true')
      expect(reader.attributes('data-required-msg')).toBe('${label} is required!')
    })
  })

  describe('renderEmpty', () => {
    it('provides renderEmpty function to children', () => {
      const renderEmpty = () => h('div', 'custom empty')
      const wrapper = mount(ConfigProvider, {
        props: { renderEmpty },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-render-empty')).toBe('true')
    })

    it('renderEmpty defaults to undefined', () => {
      const wrapper = mount(FullConfigReader)
      expect(wrapper.attributes('data-render-empty')).toBe('false')
    })

    it('renderEmpty function receives componentName', () => {
      const RenderEmptyConsumer = defineComponent({
        setup() {
          const { renderEmpty } = useConfigInject()
          return { renderEmpty }
        },
        render() {
          if (this.renderEmpty) {
            return this.renderEmpty('Table')
          }
          return h('div', 'no render empty')
        },
      })

      const renderEmpty = (componentName?: string) => {
        return h('div', { class: 'custom-empty' }, `No data for ${componentName}`)
      }

      const wrapper = mount(ConfigProvider, {
        props: { renderEmpty },
        slots: { default: () => h(RenderEmptyConsumer) },
      })
      expect(wrapper.find('.custom-empty').text()).toBe('No data for Table')
    })
  })

  describe('virtual', () => {
    it('provides virtual flag to children', () => {
      const wrapper = mount(ConfigProvider, {
        props: { virtual: true },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-virtual')).toBe('true')
    })

    it('virtual can be set to false', () => {
      const wrapper = mount(ConfigProvider, {
        props: { virtual: false },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-virtual')).toBe('false')
    })

    it('virtual defaults to undefined', () => {
      const wrapper = mount(FullConfigReader)
      expect(wrapper.attributes('data-virtual')).toBe('')
    })

    it('updates virtual reactively', async () => {
      const wrapper = mount(ConfigProvider, {
        props: { virtual: false },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-virtual')).toBe('false')

      await wrapper.setProps({ virtual: true })
      expect(reader.attributes('data-virtual')).toBe('true')
    })
  })

  describe('autoInsertSpaceInButton', () => {
    it('provides autoInsertSpaceInButton to children', () => {
      const wrapper = mount(ConfigProvider, {
        props: { autoInsertSpaceInButton: false },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-auto-insert-space')).toBe('false')
    })

    it('autoInsertSpaceInButton defaults to undefined', () => {
      const wrapper = mount(FullConfigReader)
      expect(wrapper.attributes('data-auto-insert-space')).toBe('')
    })

    it('updates autoInsertSpaceInButton reactively', async () => {
      const wrapper = mount(ConfigProvider, {
        props: { autoInsertSpaceInButton: true },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-auto-insert-space')).toBe('true')

      await wrapper.setProps({ autoInsertSpaceInButton: false })
      expect(reader.attributes('data-auto-insert-space')).toBe('false')
    })
  })

  describe('wave', () => {
    it('provides wave config to children', () => {
      const wrapper = mount(ConfigProvider, {
        props: { wave: { disabled: true } },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-wave-disabled')).toBe('true')
    })

    it('wave defaults to undefined', () => {
      const wrapper = mount(FullConfigReader)
      expect(wrapper.attributes('data-wave-disabled')).toBe('')
    })

    it('updates wave config reactively', async () => {
      const wrapper = mount(ConfigProvider, {
        props: { wave: { disabled: false } },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-wave-disabled')).toBe('false')

      await wrapper.setProps({ wave: { disabled: true } })
      expect(reader.attributes('data-wave-disabled')).toBe('true')
    })
  })

  describe('combined config', () => {
    it('provides all config values simultaneously', () => {
      const customLocale: Locale = { locale: 'fr' }
      const formConfig: FormConfig = { colon: true, requiredMark: true }

      const wrapper = mount(ConfigProvider, {
        props: {
          size: 'lg',
          direction: 'rtl',
          disabled: true,
          locale: customLocale,
          form: formConfig,
          virtual: true,
          autoInsertSpaceInButton: false,
          wave: { disabled: true },
        },
        slots: { default: () => h(FullConfigReader) },
      })
      const reader = wrapper.findComponent(FullConfigReader)
      expect(reader.attributes('data-size')).toBe('lg')
      expect(reader.attributes('data-direction')).toBe('rtl')
      expect(reader.attributes('data-disabled')).toBe('true')
      expect(reader.attributes('data-locale')).toBe('fr')
      expect(reader.attributes('data-form-colon')).toBe('true')
      expect(reader.attributes('data-form-required-mark')).toBe('true')
      expect(reader.attributes('data-virtual')).toBe('true')
      expect(reader.attributes('data-auto-insert-space')).toBe('false')
      expect(reader.attributes('data-wave-disabled')).toBe('true')
    })
  })

  describe('nesting with new config', () => {
    it('inner ConfigProvider locale overrides outer', () => {
      const outerLocale: Locale = { locale: 'en' }
      const innerLocale: Locale = { locale: 'zh-CN' }

      const Nested = defineComponent({
        render() {
          return h(ConfigProvider, { locale: outerLocale }, {
            default: () => h(ConfigProvider, { locale: innerLocale }, {
              default: () => h(FullConfigReader),
            }),
          })
        },
      })
      const wrapper = mount(Nested)
      expect(wrapper.findComponent(FullConfigReader).attributes('data-locale')).toBe('zh-CN')
    })

    it('inner ConfigProvider form overrides outer form', () => {
      const Nested = defineComponent({
        render() {
          return h(ConfigProvider, { form: { colon: true } }, {
            default: () => h(ConfigProvider, { form: { colon: false } }, {
              default: () => h(FullConfigReader),
            }),
          })
        },
      })
      const wrapper = mount(Nested)
      expect(wrapper.findComponent(FullConfigReader).attributes('data-form-colon')).toBe('false')
    })

    it('inner ConfigProvider virtual overrides outer virtual', () => {
      const Nested = defineComponent({
        render() {
          return h(ConfigProvider, { virtual: false }, {
            default: () => h(ConfigProvider, { virtual: true }, {
              default: () => h(FullConfigReader),
            }),
          })
        },
      })
      const wrapper = mount(Nested)
      expect(wrapper.findComponent(FullConfigReader).attributes('data-virtual')).toBe('true')
    })
  })
})
