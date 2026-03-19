import { App, Plugin } from 'vue'
import Popover from './Popover.vue'
import './style/index.css'

export { default as Popover } from './Popover.vue'
export * from './types'

Popover.install = function (app: App) {
  app.component('APopover', Popover)
  return app
}

export default Popover as typeof Popover & Plugin
