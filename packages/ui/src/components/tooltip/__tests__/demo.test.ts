import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Placement from '../demo/placement.vue'
import Arrow from '../demo/arrow.vue'
import Color from '../demo/color.vue'

const demos = { Basic, Placement, Arrow, Color }

describe('Tooltip demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
