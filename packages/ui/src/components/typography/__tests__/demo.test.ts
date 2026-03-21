import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import TextDemo from '../demo/text.vue'
import Ellipsis from '../demo/ellipsis.vue'
import Copyable from '../demo/copyable.vue'
import LinkDemo from '../demo/link.vue'
import Title from '../demo/title.vue'
import Interactive from '../demo/interactive.vue'
import Suffix from '../demo/suffix.vue'

const demos = { Basic, TextDemo, Ellipsis, Copyable, LinkDemo, Title, Interactive, Suffix }

describe('Typography demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
