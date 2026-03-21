import { App, Plugin } from 'vue'
import Upload from './Upload.vue'
import UploadDragger from './UploadDragger.vue'
import './style/index.css'

export { default as Upload } from './Upload.vue'
export { default as UploadDragger } from './UploadDragger.vue'
export * from './types'

Upload.install = function (app: App) {
  app.component('AUpload', Upload)
  app.component('AUploadDragger', UploadDragger)
  return app
}

export default Upload as typeof Upload & Plugin
