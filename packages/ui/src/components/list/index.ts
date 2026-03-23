import type { App, Plugin } from 'vue'
import List from './List.vue'
import ListItem from './ListItem.vue'
import ListItemMeta from './ListItemMeta.vue'
import './style/index.css'

export { default as List } from './List.vue'
export { default as ListItem } from './ListItem.vue'
export { default as ListItemMeta } from './ListItemMeta.vue'
export * from './types'

List.install = function (app: App) {
  app.component('AList', List)
  app.component('AListItem', ListItem)
  app.component('AListItemMeta', ListItemMeta)
  return app
}

export default List as typeof List & Plugin
