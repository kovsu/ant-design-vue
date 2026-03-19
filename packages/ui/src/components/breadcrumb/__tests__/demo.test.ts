import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Breadcrumb from '../Breadcrumb.vue'
import BreadcrumbItem from '../BreadcrumbItem.vue'
import Basic from '../demo/basic.vue'
import Separator from '../demo/separator.vue'
import WithIcon from '../demo/withIcon.vue'

const globalComponents = {
  ABreadcrumb: Breadcrumb,
  ABreadcrumbItem: BreadcrumbItem,
}

const demos = { Basic, Separator, WithIcon }

describe('Breadcrumb demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, {
        global: { components: globalComponents },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
