import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Info from '../demo/info.vue'
import Warning from '../demo/warning.vue'
import Error from '../demo/error.vue'
import NotFound from '../demo/404.vue'

const demos = { Basic, Info, Warning, Error, NotFound }

describe('Result demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
