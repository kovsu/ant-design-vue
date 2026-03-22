# UI Comparison Report: New (Refactored) vs Old (ant-design-vue@4)

Generated: 2026-03-22

## How to Use

### Start both servers
```bash
# Terminal 1: New components (port 5173)
cd apps/playground && npx vite --port 5173

# Terminal 2: Old components (port 5174)
cd apps/playground-old && npx vite --port 5174
```

### Compare in browser
- New playground: http://localhost:5173
- Old playground: http://localhost:5174
- Side-by-side compare view: http://localhost:5173/compare/:component

### Compare mode
In the new playground sidebar, click "Compare" to switch to comparison mode.
This renders old demo code with new components side-by-side with new demo code.

---

## Component-by-Component Comparison

### Legend
- **Intentional** = Expected change from the refactoring (new API, improved design)
- **Bug** = Unintentional difference that needs fixing
- **Demo Difference** = Different demo code, not a component issue

---

### Button
| Aspect | Old | New | Verdict |
|--------|-----|-----|---------|
| Variants | `type="primary/default/dashed/text/link"` | `variant="solid/outlined/dashed/text/link/filled"` | **Intentional** - new API with `filled` variant added |
| Default button | White background, bordered | Blue outlined | **Intentional** - default variant is now `outlined` with accent color |
| Block buttons | Shows Primary/Default/Dashed/Danger/Link | Shows Solid/Outlined/Dashed Block | **Demo Difference** |
| Button Group | Has ButtonGroup demo | No ButtonGroup demo in new | **Demo Difference** - new has separate ButtonGroup component |
| Visual style | Rounded corners, standard antd4 look | Similar rounded corners, slightly refined | **Intentional** - minor style improvements |
| Ghost buttons | White text on dark background | Similar rendering | OK |

**Notes:** The main visual difference is that new buttons use `variant` naming. The old `type="default"` mapped to a white button; new `variant="outlined"` is a blue-outlined button. This is an intentional API redesign.

---

### Alert
| Aspect | Old | New | Verdict |
|--------|-----|-----|---------|
| Basic alerts | Success/Info/Warning/Error with colored backgrounds | Same colored backgrounds | OK |
| Icons | Filled circular icons | Same style icons | OK |
| Closable | X button on right | X button on right | OK |
| Banner mode | Full-width, no border | Full-width, no border | OK |
| Action area | Shows UNDO button and Detail link | Same | OK |

**Notes:** Alert looks visually consistent. No bugs found.

---

### Badge
| Aspect | Old | New | Verdict |
|--------|-----|-----|---------|
| Count badge | Red circle with number | Red circle with number | OK |
| Dot badge | Small red dot | Small red dot | OK |
| Colors demo | Shows colored dot list (Presets + Custom) | Shows "Presets" and "Custom" text only (no colored dots visible) | **Bug** - color badge dots not rendering |
| Overflow | Shows 99+, 10+, 999+ | Not visible in screenshot | Need to verify |
| Ribbon | Blue/red ribbon banners | Not visible in screenshot | Need to verify |

**Notes:** The colors demo appears to not render colored badges in the new version - just shows text labels. Needs investigation.

---

### Checkbox
| Aspect | Old | New | Verdict |
|--------|-----|-----|---------|
| Basic | Unchecked checkbox with label | Unchecked checkbox with label + "Checked: false" state display | **Demo Difference** |
| Check all | Indeterminate state + group | Same indeterminate + group | OK |
| Disabled | Disabled unchecked/checked | Disabled unchecked/checked with labels | OK |
| Group | Multiple groups with options | Single group | **Demo Difference** |
| Visual style | Blue checkbox, rounded corners | Blue checkbox, rounded corners | OK |

**Notes:** Checkbox renders consistently. Visual style matches well.

---

### Radio
| Aspect | Old | New | Verdict |
|--------|-----|-----|---------|
| Basic radio | Circle radio with label | Circle radio with "Checked: false" state | **Demo Difference** |
| Radio button | Outlined button group | Outlined button group, same style | OK |
| Solid radio button | Solid filled selected state | Solid filled selected state | OK |
| Disabled | Greyed out states | Greyed out states | OK |
| Size variants | Large/Default/Small | Same | OK |

**Notes:** Radio buttons look visually consistent between old and new.

---

### Switch
| Aspect | Old | New | Verdict |
|--------|-----|-----|---------|
| Basic | Blue toggle (checked by default in old demo) | Grey toggle (unchecked by default in new demo) | **Demo Difference** |
| Disabled | Shows checked disabled switch | Shows unchecked + checked disabled + toggle button | **Demo Difference** |
| Loading | Spinner in switch | Spinner in switch | OK |
| Size | Default + small | Similar | OK |
| Text/icon in switch | Chinese text "开启", "0", checkmark | Not in new demos | **Demo Difference** |
| Visual style | Pill-shaped toggle, blue when on | Pill-shaped toggle, blue when on | OK |

**Notes:** Switch looks visually identical. Only differences are in demo content, not component rendering.

---

### Tag
| Aspect | Old | New | Verdict |
|--------|-----|-----|---------|
| Basic tags | Tag 1, Link, closable tags | Tag 1, Link icon, closable tags | OK |
| Borderless | Same borderless + colored tags | Same layout | OK |
| Colored preset tags | Colored background tags in row | Colored bordered tags in row | **Intentional** - slightly different color presentation |
| Checkable | "Categories:" label + tag selection | Tag selection without label | **Demo Difference** |
| Icon tags | Twitter/Youtube/Facebook with brand icons | Not in new demos | **Demo Difference** |

**Notes:** Tag rendering is largely consistent. The preset color display differs slightly (old uses more saturated background fills, new uses bordered style with lighter fills).

---

### Divider
| Aspect | Old | New | Verdict |
|--------|-----|-----|---------|
| Basic horizontal | Solid line divider | Solid line divider | OK |
| Dashed | Dashed line | Dashed line | OK |
| With text | "Text", "Left", "Right" positioned text | Not visible in first viewport | Need to verify |
| Vertical | Vertical dividers between text | Not visible in first viewport | Need to verify |
| Custom style | Dashed + custom color dividers | Dashed + custom color dividers | OK |

**Notes:** Divider looks consistent.

---

### Input
| Aspect | Old | New | Verdict |
|--------|-----|-----|---------|
| Basic | Input with placeholder | Input with placeholder | OK |
| Addon | https:// prefix, .com suffix | https:// prefix, .com suffix | OK |
| Allow clear | Input with clear icon | Input with clear icon | OK |
| Password | Eye toggle icon | Similar | OK |
| Size | Large/Default/Small | Not in first viewport | Need to verify |
| Search input | Search with button | Not in new demos | **Demo Difference** |
| Status | Error/Warning colored borders | Not in new demos | **Demo Difference** |
| Textarea | Multi-line input | Not in new demos | **Demo Difference** |

**Notes:** Input visually matches well for basic, addon, and clear features. Old has significantly more demo variations.

---

### Progress
| Aspect | Old | New | Verdict |
|--------|-----|-----|---------|
| Basic line | Blue progress bar with % | Blue progress bar with % | OK |
| Error/Success states | Red bar with X, green bar with check | Red bar with X, green bar with check | OK |
| Circle | Large circle with % inside | Very small circle dots (too small!) | **Bug** - circle progress renders tiny |
| Dashboard | Semi-circle gauge | Not in new demos | **Demo Difference** |
| Gradient | Linear gradient progress | Not in new demos | **Demo Difference** |

**Notes:** The circle progress in the new version appears to render as tiny dots instead of proper circular progress indicators. This is a rendering bug that needs fixing.

---

### Select
Not fully comparable - new demos are minimal. Old has extensive dropdown, search, tags, group, loading demos.

### Modal
Not fully comparable - modals require interaction to display.

### Tooltip
Not fully comparable - tooltips require hover to display.

---

## Summary of Issues Found

### Bugs Fixed
1. **Progress circle-basic** (FIXED): Circle progress rendered as tiny dots instead of proper circular indicators
   - **Root cause**: SVG arc path degenerated when drawing a full 360-degree circle (start point === end point)
   - **Fix**: Clamped arc angle to 359.9 degrees in `ProgressCircle.vue`; also fixed CSS `overflow: hidden` and `width: 100%` leaking from line progress styles into circle mode
   - **Files**: `packages/ui/src/components/progress/ProgressCircle.vue`, `packages/ui/src/components/progress/style/index.css`

2. **Badge colors** (FIXED): Color badge demo showed text labels but no colored dots
   - **Root cause**: Badge component only entered the dot+text rendering path when `status` prop was set; `color` prop alone didn't trigger it
   - **Fix**: Updated template condition to render status-like output when `color` is set (without children), matching old ant-design-vue behavior; added preset color class to status dot
   - **Files**: `packages/ui/src/components/badge/Badge.vue`

### Intentional Differences (Documented)
1. **Button API**: `variant` replaces `type`, default appearance changed from white to outlined-accent
2. **Tag colors**: Slightly different color tag presentation (bordered vs filled)
3. **Overall styling**: CSS variables + Tailwind instead of CSS-in-JS, minor visual refinements

### Demo Coverage Gaps
Many old components have significantly more demos than new ones. Key missing demos:
- Button: button-group, ghost
- Input: search, status, textarea, borderless, group
- Tag: icon, status, hot-tags, control
- Progress: dashboard, gradient, segment, linecap, format
- Badge: overflow, ribbon, status
- Checkbox: controller, layout
- Radio: radioGroup-more, radioGroup-options, radioButton variations

---

## Screenshots Location
All comparison screenshots saved to `/tmp/compare-screenshots/`
- `{component}-new.png` — New playground (port 5173)
- `{component}-old.png` — Old playground (port 5174)
