import type { App, Plugin } from 'vue'
import Popconfirm from './Popconfirm.vue'
import './style/index.css'

export { default as Popconfirm } from './Popconfirm.vue'
export * from './types'

Popconfirm.install = function (app: App) {
  app.component('APopconfirm', Popconfirm)
  return app
}

export default Popconfirm as typeof Popconfirm & Plugin
