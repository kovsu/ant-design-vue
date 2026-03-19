import { App, Plugin } from 'vue'
import Radio from './Radio.vue'
import RadioButton from './RadioButton.vue'
import RadioGroup from './RadioGroup.vue'
import './style/index.css'

export { default as Radio } from './Radio.vue'
export { default as RadioButton } from './RadioButton.vue'
export { default as RadioGroup } from './RadioGroup.vue'
export * from './types'

Radio.install = function (app: App) {
  app.component('ARadio', Radio)
  app.component('ARadioButton', RadioButton)
  app.component('ARadioGroup', RadioGroup)
  return app
}

export default Radio as typeof Radio & Plugin
