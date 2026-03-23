import type { App, Plugin } from 'vue'
import Space from './Space.vue'
import SpaceCompact from './SpaceCompact.vue'
import './style/index.css'

export { default as Space } from './Space.vue'
export { default as SpaceCompact } from './SpaceCompact.vue'
export * from './types'

Space.install = function (app: App) {
  app.component('ASpace', Space)
  app.component('ASpaceCompact', SpaceCompact)
  return app
}

export default Space as typeof Space & Plugin
