import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Bordered from '../demo/bordered.vue'
import Size from '../demo/size.vue'
import Vertical from '../demo/vertical.vue'

const demos = { Basic, Bordered, Size, Vertical }

describe('Descriptions demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
