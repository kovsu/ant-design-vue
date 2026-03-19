import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Simple from '../demo/simple.vue'
import Customize from '../demo/customize.vue'
import Description from '../demo/description.vue'

const demos = { Basic, Simple, Customize, Description }

describe('Empty demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Wave: true } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
