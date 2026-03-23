import type { App, Plugin } from 'vue'
import Divider from './Divider.vue'
import './style/index.css'

export { default as Divider } from './Divider.vue'
export * from './types'

Divider.install = function (app: App) {
  app.component('ADivider', Divider)
  return app
}

export default Divider as typeof Divider & Plugin
