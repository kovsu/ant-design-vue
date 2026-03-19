import { App, Plugin } from 'vue'
import Row from './Row.vue'
import Col from './Col.vue'
import './style/index.css'

export { default as Row } from './Row.vue'
export { default as Col } from './Col.vue'
export * from './types'

Row.install = function (app: App) {
  app.component('ARow', Row)
  return app
}

Col.install = function (app: App) {
  app.component('ACol', Col)
  return app
}

export default { Row, Col } as { Row: typeof Row & Plugin; Col: typeof Col & Plugin }
