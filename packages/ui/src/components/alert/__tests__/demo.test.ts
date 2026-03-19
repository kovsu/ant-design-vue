import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Closable from '../demo/closable.vue'
import Icon from '../demo/icon.vue'
import Banner from '../demo/banner.vue'
import Action from '../demo/action.vue'
import CloseText from '../demo/close-text.vue'
import CustomIcon from '../demo/custom-icon.vue'
import Description from '../demo/description.vue'
import SmoothClosed from '../demo/smooth-closed.vue'
import Style from '../demo/style.vue'

const demos = { Basic, Closable, Icon, Banner, Action, CloseText, CustomIcon, Description, SmoothClosed, Style }

describe('Alert demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
