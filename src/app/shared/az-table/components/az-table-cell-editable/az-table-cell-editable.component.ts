import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { TableField } from '../../models/table-field';
import { TableFieldType } from '../../models/table-field-type.enum';
import { TableRow } from '../../models/table-row';
import { AzTableService } from '../services/az-table.service';

import { get } from "lodash";

@Component({
  selector: 'az-table-cell-editable',
  templateUrl: './az-table-cell-editable.component.html',
})
export class AzTableCellEditableComponent implements OnInit {
  // #region Properties

  private innerValue: TableRow | null = null;

  public readonly BASE_TRANSALATE = 'shared.table.editable';
  public readonly TABLE_FIELD_TYPE = TableFieldType;

  @Input() public disabled: boolean = false;
  @Input() public inputRequired: boolean = false;
  @Input() public field: string | TableField | null = null;
  @Input() public row: TableRow | null = null;
  @Input() public vInput: string | any | null = null;
  @Output() public change: EventEmitter<TableRow | null> = new EventEmitter<TableRow | null>();

  public fieldType: TableFieldType = TableFieldType.text;

  // #endregion Properties

  // #region Constructors

  constructor(private tableService: AzTableService) {}

  // #endregion Constructors

  // #region Public Accessors

  public get value(): TableRow | null {
    return this.innerValue;
  }

  public set value(v: TableRow | null) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.change.emit(v);
    }
  }

  // #endregion Public Accessors

  // #region Public Methods
  public valueChange(value: any) {
    this.value = value;
  }

  public ngOnInit(): void {
    if (this.field && this.tableService.isTableField(this.field)) {
      this.fieldType = this.field.inputType ? this.field.inputType : this.fieldType;
      this.disabled = this.field.readonly ? this.field.readonly : this.disabled;
      this.inputRequired = this.field.inputRequired ? this.field.inputRequired : this.inputRequired;
    }
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public getMaxlength(v: any) {
    return get(v, 'maxlength', '');
  }

  public getIdItemSelect(v: any) {
    return get(v, 'id', '');
  }

  public getLabelSelect(v: any) {
    return get(v, 'label', '');
  }

  public getSelected(v: any) {
    return get(v, 'selected', '');
  }

  public ngChageSelect(e: any) {
    if (this.vInput?.length > 0) {
      this.vInput.forEach((item: {id: any, selected: boolean}) => {
        item.selected = false;
        
        if (String(item.id).toLowerCase() === String(e.target.value).toLowerCase()) {
          item.selected = true;
        }
      });
    }
  }

  // #endregion Public Methods
}
