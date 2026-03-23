import type { App, Plugin } from 'vue'
import Tour from './Tour.vue'
import './style/index.css'

export { default as Tour } from './Tour.vue'
export * from './types'

Tour.install = function (app: App) {
  app.component('ATour', Tour)
  return app
}

export default Tour as typeof Tour & Plugin
