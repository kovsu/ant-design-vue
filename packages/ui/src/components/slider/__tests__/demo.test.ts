import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Range from '../demo/range.vue'
import Marks from '../demo/marks.vue'
import Vertical from '../demo/vertical.vue'
import Disabled from '../demo/disabled.vue'

const demos = {
  Basic,
  Range,
  Marks,
  Vertical,
  Disabled,
}

describe('Slider demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
