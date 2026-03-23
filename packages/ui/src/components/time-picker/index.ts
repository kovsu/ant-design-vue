import type { App, Plugin } from 'vue'
import TimePicker from './TimePicker.vue'
import TimeRangePicker from './TimeRangePicker.vue'
import './style/index.css'

export { default as TimePicker } from './TimePicker.vue'
export { default as TimeRangePicker } from './TimeRangePicker.vue'
export * from './types'

TimePicker.install = function (app: App) {
  app.component('ATimePicker', TimePicker)
  app.component('ATimeRangePicker', TimeRangePicker)
  return app
}

export default TimePicker as typeof TimePicker & Plugin
