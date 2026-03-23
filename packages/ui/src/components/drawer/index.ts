import type { App, Plugin } from 'vue'
import Drawer from './Drawer.vue'
import './style/index.css'

export { default as Drawer } from './Drawer.vue'
export * from './types'

Drawer.install = function (app: App) {
  app.component('ADrawer', Drawer)
  return app
}

export default Drawer as typeof Drawer & Plugin
