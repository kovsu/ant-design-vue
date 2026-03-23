import type { App, Plugin } from 'vue'
import FloatButton from './FloatButton.vue'
import FloatButtonGroup from './FloatButtonGroup.vue'
import BackTop from './BackTop.vue'
import './style/index.css'

export { default as FloatButton } from './FloatButton.vue'
export { default as FloatButtonGroup } from './FloatButtonGroup.vue'
export { default as BackTop } from './BackTop.vue'
export * from './types'

FloatButton.install = function (app: App) {
  app.component('AFloatButton', FloatButton)
  app.component('AFloatButtonGroup', FloatButtonGroup)
  app.component('ABackTop', BackTop)
  return app
}

export default FloatButton as typeof FloatButton & Plugin
