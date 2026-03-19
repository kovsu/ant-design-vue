import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Group from '../demo/group.vue'
import Button from '../demo/button.vue'
import Size from '../demo/size.vue'
import Disabled from '../demo/disabled.vue'

const demos = {
  Basic,
  Group,
  Button,
  Size,
  Disabled,
}

describe('Radio demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
