import type { App, Plugin } from 'vue'
import AutoComplete from './AutoComplete.vue'
import './style/index.css'

export { default as AutoComplete } from './AutoComplete.vue'
export * from './types'

const install = (app: App) => {
  app.component('AAutoComplete', AutoComplete)
  return app
}

AutoComplete.install = install

export default AutoComplete as typeof AutoComplete & Plugin
