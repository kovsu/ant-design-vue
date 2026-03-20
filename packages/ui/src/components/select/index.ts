import { App, Plugin } from 'vue'
import Select from './Select.vue'
import './style/index.css'

export { default as Select } from './Select.vue'
export * from './types'

const install = (app: App) => {
  app.component('ASelect', Select)
  return app
}

Select.install = install

export default Select as typeof Select & Plugin
