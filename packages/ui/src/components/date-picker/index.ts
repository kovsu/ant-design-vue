import type { App, Plugin } from 'vue'
import DatePicker from './DatePicker.vue'
import RangePicker from './RangePicker.vue'
import './style/index.css'

export { default as DatePicker } from './DatePicker.vue'
export { default as RangePicker } from './RangePicker.vue'
export * from './types'

DatePicker.install = function (app: App) {
  app.component('ADatePicker', DatePicker)
  app.component('ARangePicker', RangePicker)
  return app
}

export default DatePicker as typeof DatePicker & Plugin
