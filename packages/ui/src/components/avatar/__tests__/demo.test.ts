import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Size from '../demo/size.vue'
import Group from '../demo/group.vue'

const demos = { Basic, Size, Group }

describe('Avatar demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
