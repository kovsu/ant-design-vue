import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Size from '../demo/size.vue'
import Nested from '../demo/nested.vue'
import Delay from '../demo/delay.vue'
import CustomIndicator from '../demo/custom-indicator.vue'
import Inside from '../demo/inside.vue'
import Tip from '../demo/tip.vue'

const demos = { Basic, Size, Nested, Delay, CustomIndicator, Inside, Tip }

describe('Spin demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, { global: { stubs: { Wave: true } } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
