import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Closable from '../demo/closable.vue'
import Icon from '../demo/icon.vue'
import Banner from '../demo/banner.vue'
import Action from '../demo/action.vue'

const demos = { Basic, Closable, Icon, Banner, Action }

describe('Alert demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
