<script lang="ts">
/**
 * Column is a declarative component used as a child of Table.
 * It is not rendered — its props are collected by Table to build the columns config.
 * Usage: <a-table><a-table-column title="Name" dataIndex="name" /></a-table>
 */
export default {
  name: 'ATableColumn',
  /** Not rendered — purely declarative */
  render() {
    return null
  },
}
</script>
