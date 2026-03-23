import type { App, Plugin } from 'vue'
import Descriptions from './Descriptions.vue'
import DescriptionsItem from './DescriptionsItem.vue'
import './style/index.css'

export { default as Descriptions } from './Descriptions.vue'
export { default as DescriptionsItem } from './DescriptionsItem.vue'
export * from './types'

const install = (app: App) => {
  app.component('ADescriptions', Descriptions)
  app.component('ADescriptionsItem', DescriptionsItem)
  return app
}

Descriptions.install = install

export default Descriptions as typeof Descriptions & Plugin
