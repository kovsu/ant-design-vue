# Demo Completion Tracker

Missing demos compared to old ant-design-vue. Categorized by blocking dependency.

## Can Add Now (no missing dependencies)

These demos only use components already refactored. Should be added ASAP.

| Component | Demo | Feature |
|-----------|------|---------|
| Alert | close-text | Custom close text |
| Alert | custom-icon | Custom icon slot |
| Alert | description | Alert with description |
| Alert | smooth-closed | afterClose callback animation |
| Alert | style | All 4 type variations |
| Avatar | badge | Avatar with Badge (Badge is available) |
| Avatar | dynamic | Dynamic text scaling with gap |
| Avatar | type | Image/icon/text types with custom colors |
| Badge | colors | All preset + custom colors |
| Badge | link | Badge wrapping a link |
| Badge | no-wrapper | Standalone badge without children |
| Badge | title | Custom title attribute |
| Breadcrumb | withIcon | Breadcrumb with icons |
| Card | border-less | Borderless card |
| Card | flexible-content | Card.Meta flexible layout |
| Card | grid-card | Card.Grid layout |
| Card | in-column | Card in Row/Col grid |
| Card | inner | Nested inner card |
| Card | simple | Simple card no title |
| Collapse | accordion | Accordion mode |
| Collapse | collapsible | Collapsible trigger area |
| Collapse | custom | Custom expand icon |
| Collapse | mix | Nested collapse |
| Collapse | noarrow | Hide arrow |
| Descriptions | responsive | Responsive column count |
| Divider | customize-style | Custom divider styles |
| Divider | horizontal | Basic horizontal |
| Empty | description | Empty with no description |
| Flex | combination | Complex nested flex |
| Flex | vertical | Vertical flex |
| Grid | flex-align | Row/Col alignment |
| Grid | flex-order | Col ordering |
| Grid | flex-stretch | Col flex values |
| Grid | responsive | Responsive grid |
| Grid | responsive-more | Complex responsive props |
| Grid | sort | Col push/pull |
| Grid | use-breakpoint | useBreakpoint hook |
| Progress | circle | Basic circular |
| Progress | circle-dynamic | Dynamic circular with buttons |
| Progress | circle-mini | Mini circular |
| Progress | circle-micro | Micro circular |
| Progress | dynamic | Dynamic linear with buttons |
| Progress | format | Custom format function |
| Progress | gradient-line | Gradient colors |
| Progress | line | Basic linear |
| Progress | line-mini | Mini linear |
| Progress | linecap | Square/round linecaps |
| Progress | size | Size variations |
| Result | 403 | 403 error page |
| Result | 500 | 500 error page |
| Result | customIcon | Custom icon |
| Result | success | Success status |
| Skeleton | children | Loading state toggle |
| Spin | custom-indicator | Custom loading icon |
| Spin | inside | Spin in container |
| Spin | tip | Spin with tip + Alert |
| Statistic | card | Statistic in Card with Row/Col |
| Statistic | unit | Prefix/suffix units |
| Steps | clickable | Clickable steps v-model |
| Steps | icon | Custom step icons |
| Steps | label-placement | Vertical label placement |
| Steps | nav | Navigation type |
| Steps | progress-dot | Dot style steps |
| Steps | progress | Steps with progress percent |
| Steps | simple | Basic usage |
| Steps | small-size | Small size |
| Steps | step-next | Step switching with content |
| Steps | vertical-small | Vertical small |
| Tag | border-less | Borderless tags |
| Tag | colorful | Full color presets |
| Tag | hot-tags | CheckableTag examples |
| Tag | icon | Tags with icons |
| Timeline | custom | Custom dot icon |
| Timeline | pending | Pending state |
| Timeline | right | Right mode |
| Typography | title | Typography title levels |
| Affix | target | Affix with target container |

## Blocked by Batch 6 (Form Controls)

Needs: Switch, InputNumber, Slider, Radio, Checkbox

| Component | Demo | Blocking Dep |
|-----------|------|-------------|
| Avatar | responsive | Responsive sizes (can use native, not strictly blocked) |
| Badge | change | Switch to toggle count |
| Collapse | extra | Select in panel extra |
| Grid | playground | Slider for column config |
| Skeleton | list | Switch to toggle loading, List component |
| Space | customize | Slider for gap size |
| Typography | interactive | Radio, Input for editable/copyable mode |
| Typography | suffix | Slider for row count |
| Timeline | label | RadioGroup for mode switching |
| Steps | clickable | (could use native button instead) |

## Blocked by Batch 7+ (Trigger/Tooltip/Popup)

Needs: Tooltip, Popover, Popconfirm, Dropdown, Menu

| Component | Demo | Blocking Dep |
|-----------|------|-------------|
| Button | icon | Tooltip on icon buttons |
| Button | multiple | Dropdown + Menu |
| Breadcrumb | overlay | Dropdown + Menu |
| Card | tabs | Tabs component (Batch 10) |
| Empty | config-provider | Select, TreeSelect, Cascader, Transfer, Table |
| Layout | ALL (8 demos) | Menu, SubMenu (Batch 8) |
| Progress | segment | Tooltip on segments |
| Space | base | Popconfirm, Upload |
| Space | compact-buttons | Tooltip, Dropdown |
| Statistic | countdown-slot | Tooltip on countdown |
| Steps | customized-progress-dot | Popover |
| Steps | inline | List component (Batch 14) |
| Tag | control | Input + Tooltip for dynamic tags |

## Blocked by Batch 8+ (Specific Components)

| Component | Demo | Blocking Dep |
|-----------|------|-------------|
| Breadcrumb | router | Vue Router integration |
| Descriptions | vertical-border | Badge in descriptions |
| Space | split | Typography.Link (available!) — actually can add now |
