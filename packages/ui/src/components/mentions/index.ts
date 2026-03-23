import type { App, Plugin } from 'vue'
import Mentions from './Mentions.vue'
import './style/index.css'

export { default as Mentions } from './Mentions.vue'
export * from './types'

const install = (app: App) => {
  app.component('AMentions', Mentions)
  return app
}

Mentions.install = install

export default Mentions as typeof Mentions & Plugin
