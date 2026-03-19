import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import WithText from '../demo/with-text.vue'
import Vertical from '../demo/vertical.vue'
import OrientationMargin from '../demo/orientation-margin.vue'

const demos = { Basic, WithText, Vertical, OrientationMargin }

describe('Divider demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
