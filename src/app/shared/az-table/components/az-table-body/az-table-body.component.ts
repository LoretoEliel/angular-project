import { get, isString } from 'lodash';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

import { RowEvent } from '../../models/row-event';
import { TableField } from '../../models/table-field';
import { TableItem } from '../../models/table-item';
import { AzTableService } from '../services/az-table.service';
import { TableRow } from '../../models/table-row';
import { TableAction } from '../../models/table-action';
import { TableActionEvent } from '../../models/table-action-event';

@Component({
  selector: '[az-table-body]',
  templateUrl: './az-table-body.component.html'
})
export class AzTableBodyComponent {
  // #region Properties

  public readonly BASE_TRANSALATE = 'shared.table';

  @Input() public actionable: boolean = false;
  @Input() public scrollable: boolean = false;

  @Input() public bodyTemplate!: TemplateRef<any>;
  @Input() public emptyTemplate!: TemplateRef<any>;
  @Input() selectMode: string = "multiple";
  @Input() public actions: Array<TableAction> | null = null;

  /**
   * Matriz de nombres de campo o matriz de objetos de definición de campo
   */
  @Input() public fields: Array<any | TableField> | null = null;
  /**
   * Matriz de elementos para mostrar
   */
  @Input() public rows: Array<TableRow> = [];
  @Input() public selectable: boolean = false;
  @Input() public idTable: string = "";
  @Output() public rowSelected = new EventEmitter<RowEvent>();
  @Output() public rowUnselected = new EventEmitter<RowEvent>();

  /**
   * Emitido cuando se hace click en una acción.
   */
  @Output() actionClick = new EventEmitter<TableActionEvent>();

  // #endregion Properties

  // #region Constructors

  constructor(private tableService: AzTableService) {}

  // #endregion Constructors

  public pxMenos: number = 0;
  public widthMenos: number = 0;
  ngOnInit(): void {
    this.calcWidthTableTH();
  }

  calcWidthTableTH() {
    let cW = 0;
    this.pxMenos = this.pxMenos + (this.selectable ? 50 : 0);
    this.pxMenos = this.pxMenos + (this.actionable ? 200 : 0);

    if (this.fields) {
      this.fields.forEach((c: any) => {
        if (c.width) {
          cW++;
          this.widthMenos = cW;
          this.pxMenos = this.pxMenos + parseInt(c.width.replace('px', ''));
        }
      });
    }
  }

  // #region Public Methods

  /**
   * Obtiene el valor del objeto
   * @param object El objeto a consultar
   * @param path La propiedad a obtener.
   * @returns Devuelve el valor resuelto.
   */
  public getCellValue(item: any, field: string | TableField): any {
    let path = '';
    if (this.tableService.isTableField(field)) {
      path = field.key;
    } else if (isString(field)) {
      path = field;
    }
    return get(item, path, '');
  }

  public getCellClass(field: string | TableField): string | Array<string> {
    let result: Array<any> = [];
    if (this.tableService.isTableField(field)) {
      if (field.class) {
        result.push(...(isString(field.class) ? [field.class] : field.class));
      }
      if (field.tdClass) {
        result.push(...(isString(field.tdClass) ? [field.tdClass] : field.tdClass));
      }
    }
    return result;
  }

  public getIsEditable(field: string | TableField): boolean {
    if (this.tableService.isTableField(field)) {
      return field.editable ? field.editable : false;
    }
    return false;
  }

  public getColspan(): number {
    let cFields = 0;
    let cAction = this.actionable ? 1 : 0;
    let cSelect = this.selectable ? 1 : 0;

    if (this.fields) {
      cFields = this.fields.length;
    }

    return cFields + cAction + cSelect;
  }

  onChangeTableEditable(e: any, item: any, field: any) {
    if (e.target) {
      if (e.target.nodeName === 'SELECT') {
        console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAA -> ", e);
      } else {
        item[field.key] = e.target.value;
      }
    } else {
      item[field.key] = e;
    }
  }

  public getProperties(object: any): TableItem[] {
    let result: TableItem[] = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = object[key];
        result.push(new TableItem(key, element));
      }
    }
    return result;
  }

  getHTMLBoolean(field: string | TableField) {
    return get(field, "html", "");
  }

  public isCheckbox(row: any): boolean {
    return row.item ? get(row.item, 'check', true) : true;
  }

  public actionClicked(action: TableAction, row: TableRow) {
    this.actionClick.emit({ action, row } as TableActionEvent);
  }

  public getStyles(field: string | TableField) {
    let widthX = get(field, 'width', '');
    let textAlignX = get(field, 'textAlign', '');
    let lengthField = 0;
    let obj = {
      width: '',
      textAlign: ''
    };

    if (this.fields) {
      lengthField = this.fields.length;
    }

    if (widthX != '') {
      obj.width = widthX ? widthX : 'calc(' + 100 / (lengthField - this.widthMenos) + '% - ' + this.pxMenos + 'px)';
    }

    if (textAlignX != '') {
      obj.textAlign = textAlignX;
    }

    return obj;
  }

  /**
   * Cuando se hace clic en una fila.
   * @param item Datos del elemento de la fila en la que se hace clic
   * @param index Índice de la fila en la que se hace clic
   */
  public selectRow(item: any, index: number) {
    console.log("selectRow -> ", item, index);
    this.rowSelected.emit({ index, item } as RowEvent);
  }

  /**
   * Cuando se hace clic en una fila.
   * @param item Datos del elemento de la fila en la que se hace clic
   * @param index Índice de la fila en la que se hace clic
   */
  public unselectRow(item: any, index: number) {
    console.log("unselectRow -> ", item, index);
    this.rowUnselected.emit({ index, item } as RowEvent);
  }

  // #endregion Public Methods
}
