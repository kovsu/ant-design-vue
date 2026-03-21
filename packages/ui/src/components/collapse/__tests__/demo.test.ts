import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from '../Collapse.vue'
import CollapsePanel from '../CollapsePanel.vue'
import Basic from '../demo/basic.vue'
import Borderless from '../demo/borderless.vue'
import Ghost from '../demo/ghost.vue'
import Accordion from '../demo/accordion.vue'
import Collapsible from '../demo/collapsible.vue'
import Custom from '../demo/custom.vue'
import Mix from '../demo/mix.vue'
import Noarrow from '../demo/noarrow.vue'
import Extra from '../demo/extra.vue'

const globalComponents = {
  ACollapse: Collapse,
  ACollapsePanel: CollapsePanel,
}

const demos = { Basic, Borderless, Ghost, Accordion, Collapsible, Custom, Mix, Noarrow, Extra }

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
