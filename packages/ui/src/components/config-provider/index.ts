import type { App, Plugin } from 'vue'
import ConfigProvider from './ConfigProvider.vue'

export { default as ConfigProvider } from './ConfigProvider.vue'
export { default as enUS } from './locale/en_US'
export * from './types'

ConfigProvider.install = function (app: App) {
  app.component('AConfigProvider', ConfigProvider)
  return app
}

export default ConfigProvider as typeof ConfigProvider & Plugin
