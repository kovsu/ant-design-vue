import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Color from '../demo/color.vue'
import Status from '../demo/status.vue'
import Checkable from '../demo/checkable.vue'

const demos = { Basic, Color, Status, Checkable }

describe('Tag demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
