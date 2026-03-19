import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Dot from '../demo/dot.vue'
import Overflow from '../demo/overflow.vue'
import Status from '../demo/status.vue'
import RibbonDemo from '../demo/ribbon.vue'
import Colors from '../demo/colors.vue'
import Link from '../demo/link.vue'
import NoWrapper from '../demo/no-wrapper.vue'
import Title from '../demo/title.vue'

const demos = { Basic, Dot, Overflow, Status, RibbonDemo, Colors, Link, NoWrapper, Title }

describe('Badge demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Wave: true } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
