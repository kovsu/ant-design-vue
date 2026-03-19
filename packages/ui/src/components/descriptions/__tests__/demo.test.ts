import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Bordered from '../demo/bordered.vue'
import Size from '../demo/size.vue'
import Vertical from '../demo/vertical.vue'
import Responsive from '../demo/responsive.vue'

const demos = { Basic, Bordered, Size, Vertical, Responsive }

describe('Descriptions demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
