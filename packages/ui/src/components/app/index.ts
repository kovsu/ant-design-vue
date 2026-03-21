import { App, Plugin } from 'vue'
import AppComponent from './App.vue'
import './style/index.css'

export { default as App } from './App.vue'
export { useApp } from './useApp'
export * from './types'

AppComponent.install = function (app: App) {
  app.component('AApp', AppComponent)
  return app
}

export default AppComponent as typeof AppComponent & Plugin
