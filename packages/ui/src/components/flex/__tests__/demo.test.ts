import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Align from '../demo/align.vue'
import Gap from '../demo/gap.vue'
import Vertical from '../demo/vertical.vue'
import Wrap from '../demo/wrap.vue'

const demos = { Basic, Align, Gap, Vertical, Wrap }

describe('Flex demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Wave: true } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
