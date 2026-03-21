import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Basic from '../demo/basic.vue'
import Border from '../demo/border.vue'
import Meta from '../demo/meta.vue'
import Grid from '../demo/grid.vue'
import Loading from '../demo/loading.vue'
import Simple from '../demo/simple.vue'
import BorderLess from '../demo/border-less.vue'
import Inner from '../demo/inner.vue'
import InColumn from '../demo/in-column.vue'
import FlexibleContent from '../demo/flexible-content.vue'
import TabsDemo from '../demo/tabs.vue'

const demos = { Basic, Border, Meta, Grid, Loading, Simple, BorderLess, Inner, InColumn, FlexibleContent, TabsDemo }

describe('Card demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
