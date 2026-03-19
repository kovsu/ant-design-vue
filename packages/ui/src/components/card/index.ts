import { App, Plugin } from 'vue'
import Card from './Card.vue'
import CardMeta from './CardMeta.vue'
import CardGrid from './CardGrid.vue'
import './style/index.css'

export { default as Card } from './Card.vue'
export { default as CardMeta } from './CardMeta.vue'
export { default as CardGrid } from './CardGrid.vue'
export * from './types'

const install = (app: App) => {
  app.component('ACard', Card)
  app.component('ACardMeta', CardMeta)
  app.component('ACardGrid', CardGrid)
  return app
}

Card.install = install

export default Card as typeof Card & Plugin
