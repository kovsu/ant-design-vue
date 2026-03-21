import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Size from '../demo/size.vue'
import Disabled from '../demo/disabled.vue'
import Block from '../demo/block.vue'
import CustomLabel from '../demo/custom-label.vue'

const demos = { Basic, Size, Disabled, Block, CustomLabel }

describe('Segmented demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
