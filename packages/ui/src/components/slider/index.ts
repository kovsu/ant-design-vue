import type { App, Plugin } from 'vue'
import Slider from './Slider.vue'
import './style/index.css'

export { default as Slider } from './Slider.vue'
export * from './types'

Slider.install = function (app: App) {
  app.component('ASlider', Slider)
  return app
}

export default Slider as typeof Slider & Plugin
