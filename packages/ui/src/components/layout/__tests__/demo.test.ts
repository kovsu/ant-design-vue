import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import SiderDemo from '../demo/sider.vue'
import SiderLight from '../demo/sider-light.vue'
import Top from '../demo/top.vue'
import TopSide from '../demo/top-side.vue'
import Responsive from '../demo/responsive.vue'
import Fixed from '../demo/fixed.vue'
import FixedSider from '../demo/fixed-sider.vue'

const demos = { Basic, SiderDemo, SiderLight, Top, TopSide, Responsive, Fixed, FixedSider }

describe('Layout demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
