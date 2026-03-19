import { App, Plugin } from 'vue'
import Steps from './Steps.vue'
import Step from './Step.vue'
import './style/index.css'

export { default as Steps } from './Steps.vue'
export { default as Step } from './Step.vue'
export * from './types'

const install = (app: App) => {
  app.component('ASteps', Steps)
  app.component('AStep', Step)
  return app
}

Steps.install = install

export default Steps as typeof Steps & Plugin
