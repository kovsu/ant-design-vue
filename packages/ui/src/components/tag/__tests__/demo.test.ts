import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Color from '../demo/color.vue'
import Status from '../demo/status.vue'
import Checkable from '../demo/checkable.vue'
import BorderLess from '../demo/border-less.vue'
import Colorful from '../demo/colorful.vue'
import HotTags from '../demo/hot-tags.vue'
import Icon from '../demo/icon.vue'

const demos = { Basic, Color, Status, Checkable, BorderLess, Colorful, HotTags, Icon }

describe('Tag demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
