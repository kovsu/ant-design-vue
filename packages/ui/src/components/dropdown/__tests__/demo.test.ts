import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Placement from '../demo/placement.vue'
import Trigger from '../demo/trigger.vue'
import DropdownButton from '../demo/dropdown-button.vue'
import ContextMenu from '../demo/context-menu.vue'
import Arrow from '../demo/arrow.vue'

const demos = { Basic, Placement, Trigger, DropdownButton, ContextMenu, Arrow }

describe('Dropdown demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
