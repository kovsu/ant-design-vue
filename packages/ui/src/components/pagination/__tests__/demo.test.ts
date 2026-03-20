import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import More from '../demo/more.vue'
import Changer from '../demo/changer.vue'
import Jumper from '../demo/jumper.vue'
import Simple from '../demo/simple.vue'
import Small from '../demo/small.vue'

const demos = { Basic, More, Changer, Jumper, Simple, Small }

describe('Pagination demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
