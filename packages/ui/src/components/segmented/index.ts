import { App, Plugin } from 'vue'
import Segmented from './Segmented.vue'
import './style/index.css'

export { default as Segmented } from './Segmented.vue'
export * from './types'

Segmented.install = function (app: App) {
  app.component('ASegmented', Segmented)
  return app
}

export default Segmented as typeof Segmented & Plugin
