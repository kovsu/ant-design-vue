import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Card from '../demo/card.vue'
import Items from '../demo/items.vue'
import Position from '../demo/position.vue'
import Disabled from '../demo/disabled.vue'
import Centered from '../demo/centered.vue'

const demos = { Basic, Card, Items, Position, Disabled, Centered }

describe('Tabs demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
