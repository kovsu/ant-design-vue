import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Active from '../demo/active.vue'
import Complex from '../demo/complex.vue'
import Element from '../demo/element.vue'
import Children from '../demo/children.vue'

const demos = { Basic, Active, Complex, Element, Children }

describe('Skeleton demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
