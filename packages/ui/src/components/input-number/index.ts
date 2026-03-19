import { App, Plugin } from 'vue'
import InputNumber from './InputNumber.vue'
import './style/index.css'

export { default as InputNumber } from './InputNumber.vue'
export * from './types'

InputNumber.install = function (app: App) {
  app.component('AInputNumber', InputNumber)
  return app
}

export default InputNumber as typeof InputNumber & Plugin
