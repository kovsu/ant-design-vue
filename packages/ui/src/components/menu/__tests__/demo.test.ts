import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Horizontal from '../demo/horizontal.vue'
import Vertical from '../demo/vertical.vue'
import Theme from '../demo/theme.vue'
import InlineCollapsed from '../demo/inline-collapsed.vue'
import Items from '../demo/items.vue'

const demos = { Basic, Horizontal, Vertical, Theme, InlineCollapsed, Items }

describe('Menu demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
