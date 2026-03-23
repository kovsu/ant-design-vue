import type { App, Plugin } from 'vue'
import Progress from './Progress.vue'
import './style/index.css'

export { default as Progress } from './Progress.vue'
export * from './types'

Progress.install = function (app: App) {
  app.component('AProgress', Progress)
  return app
}

export default Progress as typeof Progress & Plugin
