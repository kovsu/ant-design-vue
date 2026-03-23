import type { App, Plugin } from 'vue'
import Tabs from './Tabs.vue'
import TabPane from './TabPane.vue'
import './style/index.css'

export { default as Tabs } from './Tabs.vue'
export { default as TabPane } from './TabPane.vue'
export * from './types'

type TabsWithSub = typeof Tabs &
  Plugin & {
    TabPane: typeof TabPane
  }

Tabs.install = function (app: App) {
  app.component('ATabs', Tabs)
  app.component('ATabPane', TabPane)
  return app
}

const _Tabs = Tabs as TabsWithSub
_Tabs.TabPane = TabPane

export default _Tabs
