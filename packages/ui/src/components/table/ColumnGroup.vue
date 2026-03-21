<script lang="ts">
/**
 * ColumnGroup is a declarative component for grouped column headers.
 * It is not rendered — its props and children are collected by Table.
 * Usage: <a-table><a-table-column-group title="Info"><a-table-column ... /></a-table-column-group></a-table>
 */
export default {
  name: 'ATableColumnGroup',
  /** Not rendered — purely declarative */
  render() {
    return null
  },
}
</script>
