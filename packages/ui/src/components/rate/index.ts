import { App, Plugin } from 'vue'
import Rate from './Rate.vue'
import './style/index.css'

export { default as Rate } from './Rate.vue'
export * from './types'

Rate.install = function (app: App) {
  app.component('ARate', Rate)
  return app
}

export default Rate as typeof Rate & Plugin
