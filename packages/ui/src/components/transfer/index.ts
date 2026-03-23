import type { App, Plugin } from 'vue'
import Transfer from './Transfer.vue'
import './style/index.css'

export { default as Transfer } from './Transfer.vue'
export * from './types'

Transfer.install = function (app: App) {
  app.component('ATransfer', Transfer)
  return app
}

export default Transfer as typeof Transfer & Plugin
