import { App, Plugin } from 'vue'
import Checkbox from './Checkbox.vue'
import CheckboxGroup from './CheckboxGroup.vue'
import './style/index.css'

export { default as Checkbox } from './Checkbox.vue'
export { default as CheckboxGroup } from './CheckboxGroup.vue'
export * from './types'

Checkbox.install = function (app: App) {
  app.component('ACheckbox', Checkbox)
  app.component('ACheckboxGroup', CheckboxGroup)
  return app
}

export default Checkbox as typeof Checkbox & Plugin
