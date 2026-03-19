import { App, Plugin } from 'vue'
import Input from './Input.vue'
import TextArea from './TextArea.vue'
import Password from './Password.vue'
import Search from './Search.vue'
import './style/index.css'

export { default as Input } from './Input.vue'
export { default as InputTextArea } from './TextArea.vue'
export { default as InputPassword } from './Password.vue'
export { default as InputSearch } from './Search.vue'
export * from './types'

Input.install = function (app: App) {
  app.component('AInput', Input)
  app.component('ATextarea', TextArea)
  app.component('AInputTextArea', TextArea)
  app.component('AInputPassword', Password)
  app.component('AInputSearch', Search)
  return app
}

export default Input as typeof Input & Plugin
