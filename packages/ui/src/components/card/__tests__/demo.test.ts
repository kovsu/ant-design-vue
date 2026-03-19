import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Border from '../demo/border.vue'
import Meta from '../demo/meta.vue'
import Grid from '../demo/grid.vue'
import Loading from '../demo/loading.vue'

const demos = { Basic, Border, Meta, Grid, Loading }

describe('Card demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
