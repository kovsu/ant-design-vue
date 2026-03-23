import type { App, Plugin } from 'vue'
import Watermark from './Watermark.vue'
import './style/index.css'

export { default as Watermark } from './Watermark.vue'
export * from './types'

Watermark.install = function (app: App) {
  app.component('AWatermark', Watermark)
  return app
}

export default Watermark as typeof Watermark & Plugin
