import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Card from '../demo/card.vue'
import Notice from '../demo/notice.vue'
import Select from '../demo/select.vue'

const demos = { Basic, Card, Notice, Select }

describe('Calendar demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
