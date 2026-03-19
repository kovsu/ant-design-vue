import { App, Plugin } from 'vue'
import Collapse from './Collapse.vue'
import CollapsePanel from './CollapsePanel.vue'
import './style/index.css'

export { default as Collapse } from './Collapse.vue'
export { default as CollapsePanel } from './CollapsePanel.vue'
export * from './types'

Collapse.install = function (app: App) {
  app.component('ACollapse', Collapse)
  app.component('ACollapsePanel', CollapsePanel)
  return app
}

CollapsePanel.install = function (app: App) {
  app.component('ACollapsePanel', CollapsePanel)
  return app
}

export default Collapse as typeof Collapse & Plugin
