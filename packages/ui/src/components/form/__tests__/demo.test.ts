import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Validation from '../demo/validation.vue'
import Layout from '../demo/layout.vue'
import Dynamic from '../demo/dynamic.vue'

const demos = {
  Basic,
  Validation,
  Layout,
  Dynamic,
}

describe('Form demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
