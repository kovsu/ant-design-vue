import type { App, Plugin } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownButton from './DropdownButton.vue'
import './style/index.css'

export { default as Dropdown } from './Dropdown.vue'
export { default as DropdownButton } from './DropdownButton.vue'
export * from './types'

const install = (app: App) => {
  app.component('ADropdown', Dropdown)
  app.component('ADropdownButton', DropdownButton)
  return app
}

Dropdown.install = install

export default Dropdown as typeof Dropdown & Plugin
