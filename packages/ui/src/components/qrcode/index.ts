import type { App, Plugin } from 'vue'
import QRCode from './QRCode.vue'
import './style/index.css'

export { default as QRCode } from './QRCode.vue'
export * from './types'

QRCode.install = function (app: App) {
  app.component('AQRCode', QRCode)
  return app
}

export default QRCode as typeof QRCode & Plugin
