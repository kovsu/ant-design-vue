import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Horizontal from '../demo/horizontal.vue'
import SlotDemo from '../demo/slot.vue'

const demos = { Basic, Horizontal, SlotDemo }

describe('Anchor demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
