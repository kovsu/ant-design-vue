import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import OnChange from '../demo/on-change.vue'

const demos = { Basic, OnChange }

describe('Affix demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Wave: true } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
