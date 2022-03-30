import { NgxPaginationModule } from 'ngx-pagination';

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AzInputControlModule } from '../az-input-control';
import { AzTableBodyComponent } from './components/az-table-body/az-table-body.component';
import { AzTableCellActionsComponent } from './components/az-table-cell-actions/az-table-cell-actions.component';
import { AzTableCellCheckboxComponent } from './components/az-table-cell-checkbox/az-table-cell-checkbox.component';
import { AzTableCellEditableComponent } from './components/az-table-cell-editable/az-table-cell-editable.component';
import { AzTableHeaderComponent } from './components/az-table-header/az-table-header.component';
import { AzTablePaginationComponent } from './components/az-table-pagination/az-table-pagination.component';
import { AzTablePerPageComponent } from './components/az-table-per-page/az-table-per-page.component';
import { AzTableComponent } from './containers/az-table/az-table.component';
import { TableColumnDirective } from './directives/table-column.directive';
import { AZ_TABLE_CONFIG, DEFAULT_CONFIG, TableConfig } from './table-config';

import { SafeHtmlPipe } from '../pipes/safe-html.pipe';

@NgModule({
  declarations: [
    // Components
    AzTableBodyComponent,
    AzTableCellActionsComponent,
    AzTableCellCheckboxComponent,
    AzTableHeaderComponent,
    AzTablePaginationComponent,
    AzTablePerPageComponent,
    AzTableComponent,
    AzTableCellEditableComponent,
    // Directives
    TableColumnDirective,
    SafeHtmlPipe
  ],
  imports: [
    // Modules
    CommonModule,
    FormsModule,
    // Third Party Modules
    TranslateModule,
    NgxPaginationModule,
    // Components
    AzInputControlModule
  ],
  exports: [AzTableComponent, TableColumnDirective],
})
export class AzTableModule {
  // #region Public Static Methods

  public static forRoot(config?: TableConfig): ModuleWithProviders<AzTableModule> {
    return {
      ngModule: AzTableModule,
      providers: [
        {
          provide: AZ_TABLE_CONFIG,
          useValue: { ...DEFAULT_CONFIG, ...config },
        },
      ],
    };
  }

  // #endregion Public Static Methods
}
