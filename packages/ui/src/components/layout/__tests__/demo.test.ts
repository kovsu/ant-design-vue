import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import SiderDemo from '../demo/sider.vue'
import SiderLight from '../demo/sider-light.vue'

const demos = { Basic, SiderDemo, SiderLight }

describe('Layout demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
