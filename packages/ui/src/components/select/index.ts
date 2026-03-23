import type { App, Plugin } from 'vue'
import Select from './Select.vue'
import SelectOption from './SelectOption.vue'
import SelectOptGroup from './SelectOptGroup.vue'
import './style/index.css'

export { default as Select } from './Select.vue'
export { default as SelectOption } from './SelectOption.vue'
export { default as SelectOptGroup } from './SelectOptGroup.vue'
export * from './types'

const install = (app: App) => {
  app.component('ASelect', Select)
  app.component('ASelectOption', SelectOption)
  app.component('ASelectOptGroup', SelectOptGroup)
  return app
}

Select.install = install

export default Select as typeof Select & Plugin
