import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from '../Collapse.vue'
import CollapsePanel from '../CollapsePanel.vue'
import Basic from '../demo/basic.vue'
import Borderless from '../demo/borderless.vue'
import Ghost from '../demo/ghost.vue'

const globalComponents = {
  ACollapse: Collapse,
  ACollapsePanel: CollapsePanel,
}

const demos = { Basic, Borderless, Ghost }

describe('Collapse demos', () => {
  Object.entries(demos).forEach(([name, component]) => {
    it(`demo: ${name}`, () => {
      const wrapper = mount(component, {
        global: { components: globalComponents },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
