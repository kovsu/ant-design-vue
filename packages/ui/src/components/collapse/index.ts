import { App, Plugin } from 'vue'
import Collapse from './Collapse.vue'
import CollapsePanel from './CollapsePanel.vue'
import './style/index.css'

export { default as Collapse } from './Collapse.vue'
export { default as CollapsePanel } from './CollapsePanel.vue'
export * from './types'

const install = (app: App) => {
  app.component('ACollapse', Collapse)
  app.component('ACollapsePanel', CollapsePanel)
  return app
}

Collapse.install = install

export default Collapse as typeof Collapse & Plugin
