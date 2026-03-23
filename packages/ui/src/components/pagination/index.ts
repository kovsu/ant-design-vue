import type { App, Plugin } from 'vue'
import Pagination from './Pagination.vue'
import './style/index.css'

export { default as Pagination } from './Pagination.vue'
export * from './types'

Pagination.install = function (app: App) {
  app.component('APagination', Pagination)
  return app
}

export default Pagination as typeof Pagination & Plugin
