import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Gutter from '../demo/gutter.vue'
import Flex from '../demo/flex.vue'
import Offset from '../demo/offset.vue'

const demos = { Basic, Gutter, Flex, Offset }

describe('Grid demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
