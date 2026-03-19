import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Small from '../demo/small.vue'
import Vertical from '../demo/vertical.vue'
import Error from '../demo/error.vue'

const demos = { Basic, Small, Vertical, Error }

describe('Steps demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
