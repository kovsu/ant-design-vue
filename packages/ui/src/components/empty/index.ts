import type { App, Plugin } from 'vue'
import Empty from './Empty.vue'
import DefaultEmpty from './DefaultEmpty.vue'
import SimpleEmpty from './SimpleEmpty.vue'
import './style/index.css'

export { default as Empty } from './Empty.vue'
export { default as DefaultEmpty } from './DefaultEmpty.vue'
export { default as SimpleEmpty } from './SimpleEmpty.vue'
export * from './types'

// Static properties for convenience
export const PRESENTED_IMAGE_DEFAULT = DefaultEmpty
export const PRESENTED_IMAGE_SIMPLE = SimpleEmpty

Empty.install = function (app: App) {
  app.component('AEmpty', Empty)
  return app
}

export default Empty as typeof Empty & Plugin
