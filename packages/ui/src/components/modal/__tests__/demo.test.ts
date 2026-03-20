import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Footer from '../demo/footer.vue'
import Async from '../demo/async.vue'
import Centered from '../demo/centered.vue'
import NoFooter from '../demo/no-footer.vue'

const demos = { Basic, Footer, Async, Centered, NoFooter }

describe('Modal demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
