import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Size from '../demo/size.vue'
import Group from '../demo/group.vue'
import BadgeDemo from '../demo/badge.vue'
import Dynamic from '../demo/dynamic.vue'
import Type from '../demo/type.vue'
import Responsive from '../demo/responsive.vue'

const demos = { Basic, Size, Group, BadgeDemo, Dynamic, Type, Responsive }

describe('Avatar demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
