import { App, Plugin } from 'vue'
import Switch from './Switch.vue'
import './style/index.css'

export { default as Switch } from './Switch.vue'
export * from './types'

Switch.install = function (app: App) {
  app.component('ASwitch', Switch)
  return app
}

export default Switch as typeof Switch & Plugin
