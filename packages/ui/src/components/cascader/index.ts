import type { App, Plugin } from 'vue'
import Cascader from './Cascader.vue'
import './style/index.css'

export { default as Cascader } from './Cascader.vue'
export * from './types'

const install = (app: App) => {
  app.component('ACascader', Cascader)
  return app
}

Cascader.install = install

// Strategy constants
;(Cascader as any).SHOW_PARENT = 'SHOW_PARENT'
;(Cascader as any).SHOW_CHILD = 'SHOW_CHILD'

export default Cascader as typeof Cascader & Plugin & {
  readonly SHOW_PARENT: 'SHOW_PARENT'
  readonly SHOW_CHILD: 'SHOW_CHILD'
}
