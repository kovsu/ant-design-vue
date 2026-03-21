import { App, Plugin } from 'vue'
import Table from './Table.vue'
import Column from './Column.vue'
import ColumnGroup from './ColumnGroup.vue'
import Summary from './Summary.vue'
import SummaryRow from './SummaryRow.vue'
import SummaryCell from './SummaryCell.vue'
import './style/index.css'
import {
  EXPAND_COLUMN,
  SELECTION_COLUMN,
  SELECTION_ALL,
  SELECTION_INVERT,
  SELECTION_NONE,
} from './types'

export { default as Table } from './Table.vue'
export { default as TableColumn } from './Column.vue'
export { default as TableColumnGroup } from './ColumnGroup.vue'
export { default as TableSummary } from './Summary.vue'
export { default as TableSummaryRow } from './SummaryRow.vue'
export { default as TableSummaryCell } from './SummaryCell.vue'
export * from './types'

// Static properties (like Table.Column, Table.Summary)
const TableWithStatic = Table as typeof Table &
  Plugin & {
    Column: typeof Column
    ColumnGroup: typeof ColumnGroup
    Summary: typeof Summary & {
      Row: typeof SummaryRow
      Cell: typeof SummaryCell
    }
    EXPAND_COLUMN: typeof EXPAND_COLUMN
    SELECTION_COLUMN: typeof SELECTION_COLUMN
    SELECTION_ALL: typeof SELECTION_ALL
    SELECTION_INVERT: typeof SELECTION_INVERT
    SELECTION_NONE: typeof SELECTION_NONE
  }

TableWithStatic.Column = Column
TableWithStatic.ColumnGroup = ColumnGroup

const SummaryWithStatic = Summary as typeof Summary & {
  Row: typeof SummaryRow
  Cell: typeof SummaryCell
}
SummaryWithStatic.Row = SummaryRow
SummaryWithStatic.Cell = SummaryCell
TableWithStatic.Summary = SummaryWithStatic

TableWithStatic.EXPAND_COLUMN = EXPAND_COLUMN
TableWithStatic.SELECTION_COLUMN = SELECTION_COLUMN
TableWithStatic.SELECTION_ALL = SELECTION_ALL
TableWithStatic.SELECTION_INVERT = SELECTION_INVERT
TableWithStatic.SELECTION_NONE = SELECTION_NONE

TableWithStatic.install = function (app: App) {
  app.component('ATable', Table)
  app.component('ATableColumn', Column)
  app.component('ATableColumnGroup', ColumnGroup)
  app.component('ATableSummary', Summary)
  app.component('ATableSummaryRow', SummaryRow)
  app.component('ATableSummaryCell', SummaryCell)
  return app
}

export default TableWithStatic
