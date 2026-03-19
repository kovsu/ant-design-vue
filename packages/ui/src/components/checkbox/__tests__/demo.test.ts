import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Group from '../demo/group.vue'
import CheckAll from '../demo/check-all.vue'
import Disabled from '../demo/disabled.vue'

const demos = {
  Basic,
  Group,
  CheckAll,
  Disabled,
}

describe('Checkbox demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
