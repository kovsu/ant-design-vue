import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Autoplay from '../demo/autoplay.vue'
import Fade from '../demo/fade.vue'
import Position from '../demo/position.vue'

const demos = { Basic, Autoplay, Fade, Position }

describe('Carousel demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
