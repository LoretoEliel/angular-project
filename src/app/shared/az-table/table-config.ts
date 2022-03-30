import { InjectionToken } from '@angular/core';

export interface TableConfig {
  // #region Properties

  paginable?: boolean;
  scrollable?: boolean;
  selectable?: boolean;
  sortable?: boolean;

  // #endregion Properties
}

export const DEFAULT_CONFIG: TableConfig = {
  scrollable: false,
  selectable: false,
  paginable: false,
  sortable: false,
};

export const AZ_TABLE_CONFIG = new InjectionToken<TableConfig>('AZ_TABLE_CONFIG');
