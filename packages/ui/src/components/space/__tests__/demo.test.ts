import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Size from '../demo/size.vue'
import Vertical from '../demo/vertical.vue'
import Compact from '../demo/compact.vue'
import Wrap from '../demo/wrap.vue'
import Customize from '../demo/customize.vue'
import Split from '../demo/split.vue'
import CompactButtons from '../demo/compact-buttons.vue'

const demos = { Basic, Size, Vertical, Compact, Wrap, Customize, Split, CompactButtons }

describe('Space demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Wave: true } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
