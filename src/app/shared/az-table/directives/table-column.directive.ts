import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[tableColumn]',
})
export class TableColumnDirective {
  // #region Properties

  @Input('tableColumn') public tableColumnKey: string = '';

  // #endregion Properties

  // #region Constructors

  constructor() {
    console.log('TableColumnDirective: ', this.tableColumnKey);
  }

  // #endregion Constructors
}
