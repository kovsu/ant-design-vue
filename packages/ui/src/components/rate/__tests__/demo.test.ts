import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Half from '../demo/half.vue'
import Disabled from '../demo/disabled.vue'
import Clear from '../demo/clear.vue'
import Character from '../demo/character.vue'

const demos = {
  Basic,
  Half,
  Disabled,
  Clear,
  Character,
}

describe('Rate demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
