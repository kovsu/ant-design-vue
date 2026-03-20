import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Multiple from '../demo/multiple.vue'
import Size from '../demo/size.vue'
import Search from '../demo/search.vue'

const demos = { Basic, Multiple, Size, Search }

describe('Select demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
