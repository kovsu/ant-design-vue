import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Placement from '../demo/placement.vue'
import Extra from '../demo/extra.vue'
import Size from '../demo/size.vue'
import Footer from '../demo/footer.vue'

const demos = { Basic, Placement, Extra, Size, Footer }

describe('Drawer demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
