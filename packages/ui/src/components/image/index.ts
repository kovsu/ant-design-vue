import { App, Plugin } from 'vue'
import Image from './Image.vue'
import ImagePreviewGroup from './ImagePreviewGroup.vue'
import './style/index.css'

export { default as Image } from './Image.vue'
export { default as ImagePreviewGroup } from './ImagePreviewGroup.vue'
export * from './types'

Image.install = function (app: App) {
  app.component('AImage', Image)
  app.component('AImagePreviewGroup', ImagePreviewGroup)
  return app
}

export default Image as typeof Image & Plugin
