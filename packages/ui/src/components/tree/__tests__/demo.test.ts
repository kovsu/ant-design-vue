import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Checkable from '../demo/checkable.vue'
import Directory from '../demo/directory.vue'
import ShowLine from '../demo/show-line.vue'
import CustomIcon from '../demo/custom-icon.vue'

const demos = { Basic, Checkable, Directory, ShowLine, CustomIcon }

describe('Tree demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
