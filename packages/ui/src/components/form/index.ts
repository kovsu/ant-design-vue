import { App, Plugin } from 'vue'
import Form from './Form.vue'
import FormItem from './FormItem.vue'
import './style/index.css'

export { default as Form } from './Form.vue'
export { default as FormItem } from './FormItem.vue'
export { useForm } from './useForm'
export * from './types'

Form.install = function (app: App) {
  app.component('AForm', Form)
  app.component('AFormItem', FormItem)
  return app
}

export default Form as typeof Form & Plugin
