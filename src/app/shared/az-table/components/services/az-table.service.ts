import { Injectable } from '@angular/core';
import { get, isDate, isString, map, reverse, sortBy } from 'lodash';
import { TableField } from '../../models/table-field';
import { TableRow } from '../../models/table-row';
import { TableSortDirection } from '../../models/table-sort-direction.enum';
import { replaceAccents } from '../../utilities/string.utility';

@Injectable({
  providedIn: 'root',
})
export class AzTableService {
  // #region Constructors

  constructor() {}

  // #endregion Constructors

  // #region Public Methods

  public isTableField(field: string | TableField): field is TableField {
    return (field as TableField) !== undefined;
  }

  public mapToTableRow(items: Array<any>): Array<TableRow> {
    return map(
      items,
      (value: any, index: number) =>
        ({
          index: index,
          selected: false,
          item: value,
        } as TableRow)
    );
  }

  public sortTableRow(tableRows: TableRow[], sortKey: string, sortDirection: TableSortDirection): TableRow[] {
    let result = tableRows;
    if (sortDirection !== TableSortDirection.EMPTY) {
      result = sortBy(result, (o) => {
        const v = get(o.item, sortKey);
        if (isString(v)) {
          return replaceAccents(v);
        } else if (isDate(v)) {
          return v.getTime();
        }
        return v;
      });
      sortDirection === TableSortDirection.ASCENDING ? (result as TableRow[]) : reverse(result);
    }

    return result;
  }

  // #endregion Public Methods
}
