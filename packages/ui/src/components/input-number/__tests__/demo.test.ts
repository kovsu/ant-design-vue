import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Size from '../demo/size.vue'
import Disabled from '../demo/disabled.vue'
import Formatter from '../demo/formatter.vue'

const demos = {
  Basic,
  Size,
  Disabled,
  Formatter,
}

describe('InputNumber demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
