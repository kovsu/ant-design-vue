import type { App, Plugin } from 'vue'
import Badge from './Badge.vue'
import Ribbon from './Ribbon.vue'
import './style/index.css'

export { default as Badge } from './Badge.vue'
export { default as BadgeRibbon } from './Ribbon.vue'
export * from './types'

Badge.install = function (app: App) {
  app.component('ABadge', Badge)
  app.component('ABadgeRibbon', Ribbon)
  return app
}

export default Badge as typeof Badge & Plugin
