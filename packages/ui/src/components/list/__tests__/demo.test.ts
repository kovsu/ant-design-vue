import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Size from '../demo/size.vue'
import Actions from '../demo/actions.vue'
import Vertical from '../demo/vertical.vue'
import Loading from '../demo/loading.vue'
import Grid from '../demo/grid.vue'

const demos = { Basic, Size, Actions, Vertical, Loading, Grid }

describe('List demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
