import { App, Plugin } from 'vue'
import Calendar from './Calendar.vue'
import './style/index.css'

export { default as Calendar } from './Calendar.vue'
export * from './types'

Calendar.install = function (app: App) {
  app.component('ACalendar', Calendar)
  return app
}

export default Calendar as typeof Calendar & Plugin
