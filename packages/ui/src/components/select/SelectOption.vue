<script lang="ts">
/**
 * Stub component for <a-select-option>.
 * The new Select uses the `options` prop instead.
 * This exists only for template compatibility — it renders nothing,
 * the Select component collects options from children via slots.
 */
export default {
  name: 'ASelectOption',
  props: {
    value: { type: [String, Number, Boolean, Object], default: undefined },
    disabled: { type: Boolean, default: undefined },
    title: { type: String, default: undefined },
    label: { type: String, default: undefined },
    class: { type: [String, Object, Array], default: undefined },
  },
  render() {
    return null
  },
}
</script>
