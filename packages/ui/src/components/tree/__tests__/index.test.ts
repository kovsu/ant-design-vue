import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import Tree from '../Tree.vue'
import DirectoryTree from '../DirectoryTree.vue'
import type { TreeDataNode, Key } from '../types'

const basicTreeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          { title: 'leaf 0', key: '0-0-0-0' },
          { title: 'leaf 1', key: '0-0-0-1' },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          { title: 'leaf 2', key: '0-0-1-0' },
        ],
      },
    ],
  },
]

describe('Tree', () => {
  it('renders tree structure', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true },
    })
    expect(wrapper.find('.ant-tree').exists()).toBe(true)
    const nodes = wrapper.findAll('.ant-tree-treenode')
    // All 6 nodes visible when expanded
    expect(nodes.length).toBe(6)
  })

  it('renders collapsed by default (only root visible)', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData },
    })
    const nodes = wrapper.findAll('.ant-tree-treenode')
    expect(nodes.length).toBe(1)
  })

  it('renders with defaultExpandedKeys', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandedKeys: ['0-0'] },
    })
    const nodes = wrapper.findAll('.ant-tree-treenode')
    // Root + 2 children (0-0-0, 0-0-1)
    expect(nodes.length).toBe(3)
  })

  it('expands/collapses on switcher click', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData },
    })
    expect(wrapper.findAll('.ant-tree-treenode').length).toBe(1)

    // Click switcher to expand root
    await wrapper.find('.ant-tree-switcher').trigger('click')
    await nextTick()
    expect(wrapper.findAll('.ant-tree-treenode').length).toBe(3)
  })

  it('emits expand event', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData },
    })
    await wrapper.find('.ant-tree-switcher').trigger('click')
    expect(wrapper.emitted('expand')).toBeTruthy()
    expect(wrapper.emitted('update:expandedKeys')).toBeTruthy()
    const expandedKeys = wrapper.emitted('update:expandedKeys')![0][0] as Key[]
    expect(expandedKeys).toContain('0-0')
  })

  it('selects node on click', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true },
    })
    const contentWrappers = wrapper.findAll('.ant-tree-node-content-wrapper')
    await contentWrappers[0].trigger('click')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('update:selectedKeys')).toBeTruthy()
    const selectedKeys = wrapper.emitted('update:selectedKeys')![0][0] as Key[]
    expect(selectedKeys).toEqual(['0-0'])
  })

  it('deselects on second click (single mode)', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true },
    })
    const contentWrapper = wrapper.findAll('.ant-tree-node-content-wrapper')[0]
    await contentWrapper.trigger('click')
    await contentWrapper.trigger('click')

    const events = wrapper.emitted('update:selectedKeys')!
    expect(events[1][0]).toEqual([])
  })

  it('supports multiple selection', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true, multiple: true },
    })
    const nodes = wrapper.findAll('.ant-tree-node-content-wrapper')
    await nodes[0].trigger('click')
    await nodes[1].trigger('click')

    const events = wrapper.emitted('update:selectedKeys')!
    expect(events[1][0]).toEqual(['0-0', '0-0-0'])
  })

  it('shows checkboxes when checkable', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, checkable: true, defaultExpandAll: true },
    })
    expect(wrapper.findAll('.ant-tree-checkbox').length).toBe(6)
  })

  it('checks node and propagates to children', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, checkable: true, defaultExpandAll: true },
    })
    const checkboxes = wrapper.findAll('.ant-tree-checkbox')
    await checkboxes[0].trigger('click')

    const events = wrapper.emitted('update:checkedKeys')!
    const checkedKeys = events[0][0] as Key[]
    // Parent + all descendants
    expect(checkedKeys).toContain('0-0')
    expect(checkedKeys).toContain('0-0-0')
    expect(checkedKeys).toContain('0-0-1')
    expect(checkedKeys).toContain('0-0-0-0')
    expect(checkedKeys).toContain('0-0-0-1')
    expect(checkedKeys).toContain('0-0-1-0')
  })

  it('unchecks parent when child unchecked', async () => {
    const wrapper = mount(Tree, {
      props: {
        treeData: basicTreeData,
        checkable: true,
        defaultExpandAll: true,
        checkedKeys: ['0-0', '0-0-0', '0-0-1', '0-0-0-0', '0-0-0-1', '0-0-1-0'],
      },
    })
    // Uncheck leaf 0-0-0-0
    const checkboxes = wrapper.findAll('.ant-tree-checkbox')
    // Find the checkbox for leaf 0 (index 2 in flattened tree)
    await checkboxes[2].trigger('click')

    const events = wrapper.emitted('update:checkedKeys')!
    const checkedKeys = events[0][0] as Key[]
    expect(checkedKeys).not.toContain('0-0-0-0')
    // Parent should no longer be fully checked
    expect(checkedKeys).not.toContain('0-0')
    expect(checkedKeys).not.toContain('0-0-0')
  })

  it('supports checkStrictly mode', async () => {
    const wrapper = mount(Tree, {
      props: {
        treeData: basicTreeData,
        checkable: true,
        checkStrictly: true,
        defaultExpandAll: true,
      },
    })
    const checkboxes = wrapper.findAll('.ant-tree-checkbox')
    await checkboxes[0].trigger('click')

    const events = wrapper.emitted('update:checkedKeys')!
    const result = events[0][0] as { checked: Key[]; halfChecked: Key[] }
    // Only the clicked node, no propagation
    expect(result.checked).toEqual(['0-0'])
    expect(result.halfChecked).toEqual([])
  })

  it('shows half-checked (indeterminate) state', async () => {
    const wrapper = mount(Tree, {
      props: {
        treeData: basicTreeData,
        checkable: true,
        defaultExpandAll: true,
        checkedKeys: ['0-0-0-0'],
      },
    })
    // Parent 0-0 and 0-0-0 should be indeterminate
    const indeterminate = wrapper.findAll('.ant-tree-checkbox-indeterminate')
    expect(indeterminate.length).toBeGreaterThan(0)
  })

  it('disables node', () => {
    const data: TreeDataNode[] = [
      { title: 'disabled', key: '0', disabled: true },
      { title: 'normal', key: '1' },
    ]
    const wrapper = mount(Tree, { props: { treeData: data } })
    expect(wrapper.find('.ant-tree-treenode-disabled').exists()).toBe(true)
  })

  it('disables checkbox independently', async () => {
    const data: TreeDataNode[] = [
      { title: 'a', key: '0', disableCheckbox: true },
      { title: 'b', key: '1' },
    ]
    const wrapper = mount(Tree, {
      props: { treeData: data, checkable: true },
    })
    const checkboxes = wrapper.findAll('.ant-tree-checkbox')
    expect(checkboxes[0].classes()).toContain('ant-tree-checkbox-disabled')

    // Click should not emit
    await checkboxes[0].trigger('click')
    expect(wrapper.emitted('update:checkedKeys')).toBeFalsy()
  })

  it('disabled node cannot be selected', async () => {
    const data: TreeDataNode[] = [
      { title: 'disabled', key: '0', disabled: true },
    ]
    const wrapper = mount(Tree, { props: { treeData: data } })
    await wrapper.find('.ant-tree-node-content-wrapper').trigger('click')
    expect(wrapper.emitted('update:selectedKeys')).toBeFalsy()
  })

  it('renders show-line mode', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, showLine: true, defaultExpandAll: true },
    })
    expect(wrapper.find('.ant-tree-show-line').exists()).toBe(true)
  })

  it('renders block-node mode', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, blockNode: true },
    })
    expect(wrapper.find('.ant-tree-block-node').exists()).toBe(true)
  })

  it('renders with showIcon', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, showIcon: true, defaultExpandAll: true },
    })
    expect(wrapper.findAll('.ant-tree-iconEle').length).toBeGreaterThan(0)
  })

  it('applies ARIA attributes', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true },
    })
    expect(wrapper.find('[role="tree"]').exists()).toBe(true)
    expect(wrapper.findAll('[role="treeitem"]').length).toBe(6)
    // Root node should have aria-expanded
    const root = wrapper.findAll('[role="treeitem"]')[0]
    expect(root.attributes('aria-expanded')).toBe('true')
  })

  it('applies aria-checked for checkable tree', () => {
    const wrapper = mount(Tree, {
      props: {
        treeData: basicTreeData,
        checkable: true,
        defaultExpandAll: true,
        checkedKeys: ['0-0-0-0'],
      },
    })
    const items = wrapper.findAll('[role="treeitem"]')
    // leaf 0 (index 2) should be checked
    expect(items[2].attributes('aria-checked')).toBe('true')
  })

  it('keyboard ArrowDown moves active node', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true },
    })
    const tree = wrapper.find('[role="tree"]')
    await tree.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()

    expect(wrapper.find('.ant-tree-treenode-active').exists()).toBe(true)
  })

  it('keyboard Enter selects active node', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true },
    })
    const tree = wrapper.find('[role="tree"]')
    // Move to first node
    await tree.trigger('keydown', { key: 'ArrowDown' })
    // Select it
    await tree.trigger('keydown', { key: 'Enter' })

    expect(wrapper.emitted('update:selectedKeys')).toBeTruthy()
  })

  it('keyboard ArrowRight expands, ArrowLeft collapses', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData },
    })
    const tree = wrapper.find('[role="tree"]')

    // Navigate to root
    await tree.trigger('keydown', { key: 'ArrowDown' })
    // Expand
    await tree.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:expandedKeys')).toBeTruthy()
    const expanded = wrapper.emitted('update:expandedKeys')![0][0] as Key[]
    expect(expanded).toContain('0-0')

    // Collapse
    await tree.trigger('keydown', { key: 'ArrowLeft' })
    const collapsed = wrapper.emitted('update:expandedKeys')![1][0] as Key[]
    expect(collapsed).not.toContain('0-0')
  })

  it('filters tree nodes', () => {
    const filter = (node: TreeDataNode) => String(node.title).includes('leaf')
    const wrapper = mount(Tree, {
      props: {
        treeData: basicTreeData,
        filterTreeNode: filter,
        defaultExpandAll: true,
      },
    })
    const titles = wrapper.findAll('.ant-tree-title')
    // Should show parents that contain matching children + the matching leaves
    for (const t of titles) {
      const text = t.text()
      if (!text.includes('leaf') && !text.includes('parent')) {
        throw new Error(`Unexpected node: ${text}`)
      }
    }
  })

  it('renders title slot', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true },
      slots: {
        title: ({ title }: { title: string }) => `[${title}]`,
      },
    })
    const firstTitle = wrapper.findAll('.ant-tree-title')[0]
    expect(firstTitle.text()).toBe('[parent 1]')
  })

  it('renders switcherIcon slot', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true },
      slots: {
        switcherIcon: ({ expanded }: { expanded: boolean }) => expanded ? '[-]' : '[+]',
      },
    })
    const switchers = wrapper.findAll('.ant-tree-switcher')
    expect(switchers[0].text()).toContain('[-]')
  })

  it('supports draggable', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, draggable: true, defaultExpandAll: true },
    })
    const nodes = wrapper.findAll('[role="treeitem"]')
    expect(nodes[0].attributes('draggable')).toBe('true')
  })

  it('emits drag events', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, draggable: true, defaultExpandAll: true },
    })
    const nodes = wrapper.findAll('[role="treeitem"]')
    await nodes[0].trigger('dragstart')
    expect(wrapper.emitted('dragstart')).toBeTruthy()
  })

  it('emits rightClick', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true },
    })
    const nodes = wrapper.findAll('[role="treeitem"]')
    await nodes[0].trigger('contextmenu')
    expect(wrapper.emitted('rightClick')).toBeTruthy()
  })

  it('supports fieldNames mapping', () => {
    const data = [
      { id: '1', name: 'Node 1', items: [{ id: '1-1', name: 'Node 1-1' }] },
    ]
    const wrapper = mount(Tree, {
      props: {
        treeData: data as any,
        fieldNames: { key: 'id', title: 'name', children: 'items' },
        defaultExpandAll: true,
      },
    })
    const titles = wrapper.findAll('.ant-tree-title')
    expect(titles[0].text()).toBe('Node 1')
    expect(titles[1].text()).toBe('Node 1-1')
  })

  it('controlled expandedKeys', async () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, expandedKeys: ['0-0'] },
    })
    expect(wrapper.findAll('.ant-tree-treenode').length).toBe(3)

    // Update controlled keys
    await wrapper.setProps({ expandedKeys: [] })
    await nextTick()
    expect(wrapper.findAll('.ant-tree-treenode').length).toBe(1)
  })

  it('renders leaf nodes without switcher arrow', () => {
    const wrapper = mount(Tree, {
      props: { treeData: basicTreeData, defaultExpandAll: true },
    })
    const leafSwitchers = wrapper.findAll('.ant-tree-switcher-noop')
    expect(leafSwitchers.length).toBe(3) // 3 leaf nodes
  })
})

describe('DirectoryTree', () => {
  const dirData: TreeDataNode[] = [
    {
      title: 'parent 0',
      key: '0-0',
      children: [
        { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
        { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
      ],
    },
    {
      title: 'parent 1',
      key: '0-1',
      children: [
        { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      ],
    },
  ]

  it('renders directory tree with class', () => {
    const wrapper = mount(DirectoryTree, {
      props: { treeData: dirData },
    })
    expect(wrapper.find('.ant-tree-directory').exists()).toBe(true)
  })

  it('shows icon by default', () => {
    const wrapper = mount(DirectoryTree, {
      props: { treeData: dirData, defaultExpandAll: true },
    })
    expect(wrapper.findAll('.ant-tree-iconEle').length).toBeGreaterThan(0)
  })

  it('blockNode is true by default', () => {
    const wrapper = mount(DirectoryTree, {
      props: { treeData: dirData },
    })
    expect(wrapper.find('.ant-tree-block-node').exists()).toBe(true)
  })

  it('expands on click by default (expandAction=click)', async () => {
    const onExpand = vi.fn()
    const wrapper = mount(DirectoryTree, {
      props: { treeData: dirData, onExpand },
    })
    // Only root nodes visible
    expect(wrapper.findAll('.ant-tree-treenode').length).toBe(2)

    // Click first node title to expand
    const content = wrapper.findAll('.ant-tree-node-content-wrapper')[0]
    await content.trigger('click')
    await nextTick()
    await nextTick()

    expect(onExpand).toHaveBeenCalled()
    // After expand, children should be visible
    expect(wrapper.findAll('.ant-tree-treenode').length).toBeGreaterThan(2)
  })

  it('selects on click', async () => {
    const wrapper = mount(DirectoryTree, {
      props: { treeData: dirData },
    })
    const content = wrapper.findAll('.ant-tree-node-content-wrapper')[0]
    await content.trigger('click')

    expect(wrapper.emitted('update:selectedKeys')).toBeTruthy()
  })
})
