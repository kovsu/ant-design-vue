import type { App, Plugin } from 'vue'
import Spin from './Spin.vue'
import './style/index.css'

export { default as Spin } from './Spin.vue'
export * from './types'

Spin.install = function (app: App) {
  app.component('ASpin', Spin)
  return app
}

export default Spin as typeof Spin & Plugin
