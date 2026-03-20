import { App, Plugin } from 'vue'
import TimePicker from './TimePicker.vue'
import './style/index.css'

export { default as TimePicker } from './TimePicker.vue'
export * from './types'

TimePicker.install = function (app: App) {
  app.component('ATimePicker', TimePicker)
  return app
}

export default TimePicker as typeof TimePicker & Plugin
