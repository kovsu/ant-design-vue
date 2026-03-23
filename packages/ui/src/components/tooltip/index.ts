import type { App, Plugin } from 'vue'
import Tooltip from './Tooltip.vue'
import './style/index.css'

export { default as Tooltip } from './Tooltip.vue'
export * from './types'

Tooltip.install = function (app: App) {
  app.component('ATooltip', Tooltip)
  return app
}

export default Tooltip as typeof Tooltip & Plugin
