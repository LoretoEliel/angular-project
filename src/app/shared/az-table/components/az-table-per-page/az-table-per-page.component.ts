import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

import { PaginationPerPageOption } from '../../models/pagination-per-page-option';

@Component({
  selector: 'az-table-per-page',
  templateUrl: './az-table-per-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AzTablePerPageComponent {
  // #region Properties

  public readonly BASE_TRANSALATE = 'shared.table';
  public readonly _options: Array<PaginationPerPageOption> = [
    { value: '5', label: '5' },
    { value: '10', label: '10', selected: true },
    { value: '20', label: '20' },
    { value: '50', label: '50' },
  ];

  @Output() public changeItemsPerPage = new EventEmitter<number>();

  // #endregion Properties

  // #region Constructors

  constructor() {}

  // #endregion Constructors

  // #region Public Accessors

  public get options(): Array<PaginationPerPageOption> {
    return this._options;
  }

  // #endregion Public Accessors

  // #region Public Methods

  public itemsPerPageChanged(event: any) {
    const limit = parseInt(event.target.value);

    this.changeItemsPerPage.emit(limit);
  }

  // #endregion Public Methods
}
