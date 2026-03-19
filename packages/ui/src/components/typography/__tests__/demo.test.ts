import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import TextDemo from '../demo/text.vue'
import Ellipsis from '../demo/ellipsis.vue'
import Copyable from '../demo/copyable.vue'
import LinkDemo from '../demo/link.vue'

const demos = { Basic, TextDemo, Ellipsis, Copyable, LinkDemo }

describe('Typography demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
