import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Search from '../demo/search.vue'
import OneWay from '../demo/one-way.vue'
import Disabled from '../demo/disabled.vue'
import CustomRender from '../demo/custom-render.vue'

const demos = { Basic, Search, OneWay, Disabled, CustomRender }

describe('Transfer demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
