import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: '[az-table-cell-checkbox]',
  templateUrl: './az-table-cell-checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AzTableCellCheckboxComponent {
  // #region Properties

  @ViewChild('checkbox') public readonly checkbox!: ElementRef<HTMLInputElement>;
  
  @Input() isCheckbox: boolean = false;
  @Input() checked: boolean = false;
  @Input() selectMode: string = "multiple";
  @Input() idTable: string = "";
  @Output() public changeSelection = new EventEmitter<boolean>();

  // #endregion Properties

  // #region Constructors

  constructor() {}

  // #endregion Constructors

  // #region Public Methods

  /**
   * Cuando se hace clic en una fila.
   * @param event Objeto de evento nativo
   */
  public onSelected(event: any) {
    if (this.checkbox) {
      if (this.checkbox.nativeElement.checked === true) {
        this.checkbox.nativeElement.checked = false;
        this.changeSelection.emit(false);
      } else {
        this.checkbox.nativeElement.checked = true;
        this.changeSelection.emit(true);
      }
    }
  }

  // #endregion Public Methods
}
