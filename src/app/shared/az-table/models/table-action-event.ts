import { TableAction } from './table-action';
import { TableRow } from './table-row';

export interface TableActionEvent {
  // #region Properties

  action: TableAction;
  row: TableRow;

  // #endregion Properties
}
