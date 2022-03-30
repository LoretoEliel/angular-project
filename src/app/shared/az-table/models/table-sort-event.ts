import { TableSortDirection } from './table-sort-direction.enum';

export interface TableSortEvent {
  key: string;
  direction: TableSortDirection;
}
