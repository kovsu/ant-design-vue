import type { App, Plugin } from 'vue'
import Result from './Result.vue'
import './style/index.css'

export { default as Result } from './Result.vue'
export * from './types'

Result.install = function (app: App) {
  app.component('AResult', Result)
  return app
}

export default Result as typeof Result & Plugin
