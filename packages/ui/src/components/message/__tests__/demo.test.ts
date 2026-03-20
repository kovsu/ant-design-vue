import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Types from '../demo/types.vue'
import Duration from '../demo/duration.vue'
import Loading from '../demo/loading.vue'

const demos = { Basic, Types, Duration, Loading }

describe('Message demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
