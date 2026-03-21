import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Group from '../demo/group.vue'
import BackTopDemo from '../demo/back-top.vue'
import Shape from '../demo/shape.vue'
import Tooltip from '../demo/tooltip.vue'

const demos = { Basic, Group, BackTopDemo, Shape, Tooltip }

describe('FloatButton demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Transition: false } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
