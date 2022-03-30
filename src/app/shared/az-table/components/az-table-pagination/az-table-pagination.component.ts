import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'az-table-pagination',
  templateUrl: './az-table-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AzTablePaginationComponent {
  // #region Properties

  public readonly BASE_TRANSALATE = 'shared.table';

  @Input() public currentPage: number = 0;
  @Input() public id: string = '';
  @Input() public itemsPerPage: number = 0;
  @Input() public totalItems: number = 0;
  @Output() public pageChange = new EventEmitter<number>();

  // #endregion Properties

  // #region Constructors

  constructor() {}

  // #endregion Constructors

  // #region Public Methods

  public end(): number {
    const result = Math.ceil(this.itemsPerPage * this.currentPage);
    return result < this.totalItems ? result : this.totalItems;
  }

  public pageChanged(page: number) {
    this.pageChange.emit(page);
  }

  public start(): number {
    let result = Math.ceil(this.itemsPerPage * this.currentPage) - this.itemsPerPage;
    result += 1;
    return result > 0 ? result : 0;
  }

  // #endregion Public Methods
}
