import { App, Plugin } from 'vue'
import Alert from './Alert.vue'
import './style/index.css'

export { default as Alert } from './Alert.vue'
export * from './types'

Alert.install = function (app: App) {
  app.component('AAlert', Alert)
  return app
}

export default Alert as typeof Alert & Plugin
