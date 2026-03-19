import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Dot from '../demo/dot.vue'
import Overflow from '../demo/overflow.vue'
import Status from '../demo/status.vue'
import RibbonDemo from '../demo/ribbon.vue'

const demos = { Basic, Dot, Overflow, Status, RibbonDemo }

describe('Badge demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Wave: true } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
