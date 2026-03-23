import type { App, Plugin } from 'vue'
import TreeSelect from './TreeSelect.vue'
import './style/index.css'

export { default as TreeSelect } from './TreeSelect.vue'
export * from './types'

const install = (app: App) => {
  app.component('ATreeSelect', TreeSelect)
  return app
}

TreeSelect.install = install

// Strategy constants
;(TreeSelect as any).SHOW_ALL = 'SHOW_ALL'
;(TreeSelect as any).SHOW_PARENT = 'SHOW_PARENT'
;(TreeSelect as any).SHOW_CHILD = 'SHOW_CHILD'

export default TreeSelect as typeof TreeSelect & Plugin & {
  readonly SHOW_ALL: 'SHOW_ALL'
  readonly SHOW_PARENT: 'SHOW_PARENT'
  readonly SHOW_CHILD: 'SHOW_CHILD'
}
