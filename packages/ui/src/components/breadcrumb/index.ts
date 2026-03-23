import type { App, Plugin } from 'vue'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'
import './style/index.css'

export { default as Breadcrumb } from './Breadcrumb.vue'
export { default as BreadcrumbItem } from './BreadcrumbItem.vue'
export * from './types'

const install = (app: App) => {
  app.component('ABreadcrumb', Breadcrumb)
  app.component('ABreadcrumbItem', BreadcrumbItem)
  return app
}

Breadcrumb.install = install

export default Breadcrumb as typeof Breadcrumb & Plugin
