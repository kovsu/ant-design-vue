import type { App, Plugin } from 'vue'
import Carousel from './Carousel.vue'
import './style/index.css'

export { default as Carousel } from './Carousel.vue'
export * from './types'

Carousel.install = function (app: App) {
  app.component('ACarousel', Carousel)
  return app
}

export default Carousel as typeof Carousel & Plugin
