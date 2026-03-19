import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Circle from '../demo/circle.vue'
import Dashboard from '../demo/dashboard.vue'
import Gradient from '../demo/gradient.vue'
import Steps from '../demo/steps.vue'
import Small from '../demo/small.vue'

const demos = { Basic, Circle, Dashboard, Gradient, Steps, Small }

describe('Progress demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
