import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'
import App from '../App.vue'
import { useApp, appContextKey } from '../useApp'

describe('App', () => {
  describe('rendering', () => {
    it('renders with ant-app class', () => {
      const wrapper = mount(App)
      expect(wrapper.find('.ant-app').exists()).toBe(true)
    })

    it('renders slot content', () => {
      const wrapper = mount(App, {
        slots: { default: '<span class="child">Hello</span>' },
      })
      expect(wrapper.find('.child').exists()).toBe(true)
      expect(wrapper.find('.child').text()).toBe('Hello')
    })

    it('applies rootClassName', () => {
      const wrapper = mount(App, {
        props: { rootClassName: 'my-custom-app' },
      })
      expect(wrapper.find('.ant-app').classes()).toContain('my-custom-app')
    })
  })

  describe('component name', () => {
    it('has correct name', () => {
      expect(App.name).toBe('AApp')
    })
  })

  describe('useApp inside App', () => {
    it('returns context with message, notification, modal', () => {
      let appConfig: ReturnType<typeof useApp> | undefined

      const Inner = defineComponent({
        setup() {
          appConfig = useApp()
          return () => h('div', 'inner')
        },
      })

      mount(App, {
        slots: { default: () => h(Inner) },
      })

      expect(appConfig).toBeDefined()
      expect(appConfig!.message).toBeDefined()
      expect(appConfig!.notification).toBeDefined()
      expect(appConfig!.modal).toBeDefined()
    })

    it('message has expected methods', () => {
      let appConfig: ReturnType<typeof useApp> | undefined

      const Inner = defineComponent({
        setup() {
          appConfig = useApp()
          return () => h('div')
        },
      })

      mount(App, {
        slots: { default: () => h(Inner) },
      })

      expect(typeof appConfig!.message.success).toBe('function')
      expect(typeof appConfig!.message.error).toBe('function')
      expect(typeof appConfig!.message.info).toBe('function')
      expect(typeof appConfig!.message.warning).toBe('function')
      expect(typeof appConfig!.message.loading).toBe('function')
      expect(typeof appConfig!.message.open).toBe('function')
      expect(typeof appConfig!.message.destroy).toBe('function')
    })

    it('notification has expected methods', () => {
      let appConfig: ReturnType<typeof useApp> | undefined

      const Inner = defineComponent({
        setup() {
          appConfig = useApp()
          return () => h('div')
        },
      })

      mount(App, {
        slots: { default: () => h(Inner) },
      })

      expect(typeof appConfig!.notification.success).toBe('function')
      expect(typeof appConfig!.notification.error).toBe('function')
      expect(typeof appConfig!.notification.info).toBe('function')
      expect(typeof appConfig!.notification.warning).toBe('function')
      expect(typeof appConfig!.notification.open).toBe('function')
      expect(typeof appConfig!.notification.close).toBe('function')
      expect(typeof appConfig!.notification.destroy).toBe('function')
    })

    it('modal has expected methods', () => {
      let appConfig: ReturnType<typeof useApp> | undefined

      const Inner = defineComponent({
        setup() {
          appConfig = useApp()
          return () => h('div')
        },
      })

      mount(App, {
        slots: { default: () => h(Inner) },
      })

      expect(typeof appConfig!.modal.confirm).toBe('function')
      expect(typeof appConfig!.modal.info).toBe('function')
      expect(typeof appConfig!.modal.success).toBe('function')
      expect(typeof appConfig!.modal.error).toBe('function')
      expect(typeof appConfig!.modal.warning).toBe('function')
    })
  })

  describe('useApp outside App', () => {
    it('returns no-op stubs without throwing', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      let appConfig: ReturnType<typeof useApp> | undefined

      const Standalone = defineComponent({
        setup() {
          appConfig = useApp()
          return () => h('div')
        },
      })

      mount(Standalone)

      expect(appConfig).toBeDefined()
      expect(typeof appConfig!.message.success).toBe('function')
      expect(typeof appConfig!.notification.success).toBe('function')
      expect(typeof appConfig!.modal.confirm).toBe('function')

      // No-op stubs should not throw when called
      appConfig!.message.success('test')
      appConfig!.notification.success({ message: 'test' })
      const result = appConfig!.modal.confirm({ title: 'test' })
      expect(typeof result.destroy).toBe('function')

      warnSpy.mockRestore()
    })

    it('logs a warning in dev mode when used outside App', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      const Standalone = defineComponent({
        setup() {
          useApp()
          return () => h('div')
        },
      })

      mount(Standalone)

      expect(warnSpy).toHaveBeenCalledWith(
        expect.stringContaining('useApp() was called outside of <a-app>'),
      )

      warnSpy.mockRestore()
    })
  })

  describe('provides correct injection key', () => {
    it('provides appContextKey to descendants', () => {
      let injected: any

      const Inner = defineComponent({
        setup() {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const { inject } = require('vue')
          injected = inject(appContextKey)
          return () => h('div')
        },
      })

      mount(App, {
        slots: { default: () => h(Inner) },
      })

      expect(injected).toBeDefined()
      expect(injected.message).toBeDefined()
      expect(injected.notification).toBeDefined()
      expect(injected.modal).toBeDefined()
    })
  })
})
