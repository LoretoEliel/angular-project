import { isString, get } from 'lodash';

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChildren,
} from '@angular/core';

import { TableField } from '../../models/table-field';
import { AzTableService } from '../services/az-table.service';
import { TableSortEvent } from '../../models/table-sort-event';
import { TableSortDirection } from '../../models/table-sort-direction.enum';

@Component({
  selector: '[az-table-header]',
  templateUrl: './az-table-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AzTableHeaderComponent implements OnChanges {
  // #region Properties

  private isAllSelected: boolean = false;

  @Output() public readonly selectAll = new EventEmitter<boolean>();
  @Output() public readonly sortChanged = new EventEmitter<TableSortEvent>();

  public readonly BASE_TRANSALATE = 'shared.table';

  @Input() public selectedAll: boolean = false;

  @Input() public actionable: boolean = false;
  @Input() public scrollable: boolean = false;

  @Input() public fields: Array<string | TableField> | null = null;
  @Input() public headerTemplate!: TemplateRef<any>;
  @Input() public selectable: boolean = false;
  @Input() selectMode: string = "multiple";
  @ViewChildren('sortIcon', { read: ElementRef }) sortIcons!: QueryList<ElementRef>;

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
        c.sortable = c.sortable != undefined ? c.sortable : true;
  
        if (c.width) {
          cW++;
          this.widthMenos = cW;
          this.pxMenos = this.pxMenos + parseInt(c.width.replace('px', ''));
        }
      });
    }
  }

  // #region Public Methods

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
  }

  public fieldTitle(field: string | TableField): string {
    let result = '';

    if (this.tableService.isTableField(field)) {
      result = field.translation ? field.translation : field.label;
    } else if (isString(field)) {
      result = field;
    }

    return result;
  }

  public getKeyByField(field: string | TableField): string {
    if (this.isTableField(field)) {
      return field.key;
    }
    return field;
  }

  public getCellClass(field: string | TableField): string | Array<string> {
    let result: Array<any> = [];
    if (this.tableService.isTableField(field)) {
      if (field.class) {
        result.push(...(isString(field.class) ? [field.class] : field.class));
      }
      if (field.thClass) {
        result.push(...(isString(field.thClass) ? [field.thClass] : field.thClass));
      }
    }
    return result;
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

  public getStylesFlexbox(field: string | TableField) {
    let textAlignX = get(field, 'textAlign', '');
    let obj = {
      justifyContent: ''
    };

    if (textAlignX) {
      obj.justifyContent = textAlignX === 'left' ? 'flex-start' : textAlignX === 'right' ? 'flex-end' : 'center';
    }
    
    return obj;
  }

  public isSorteable(field: string | TableField): boolean {
    if (this.isTableField(field)) {
      return field.sortable ? true : false;
    }
    return false;
  }

  public isTableField(field: string | TableField): field is TableField {
    return this.tableService.isTableField(field);
  }

  /**
   * Selecciona todas las filas si no están todas seleccionadas; de lo contrario, deselecciona todos.
   */
  public masterToggle() {
    if (this.isAllSelected) {
      this.isAllSelected = false;
    } else {
      this.isAllSelected = true;
    }

    this.selectAll.emit(this.isAllSelected);
  }

  public orderBy(event: any, field: string | TableField) {
    const key = this.getKeyByField(field);
    if (this.sortIcons) {
      for (const sortIcon of this.sortIcons) {
        let element = sortIcon.nativeElement;

        if (element.getAttribute('data-sort') === key) {
          // No esta Ordenado
          if (element.classList.contains('fa-sort')) {
            element.classList.remove('fa-sort');
            element.classList.add('fa-sort-down');
            const tableSortEvent: TableSortEvent = { key: key, direction: TableSortDirection.ASCENDING };
            this.sortChanged.emit(tableSortEvent);
          }
          // Ordenado Ascendente
          else if (element.classList.contains('fa-sort-down')) {
            element.classList.remove('fa-sort-down');
            element.classList.add('fa-sort-up');
            const tableSortEvent: TableSortEvent = { key: key, direction: TableSortDirection.DESCENDING };
            this.sortChanged.emit(tableSortEvent);
          }
          // Ordenado Descendente
          else if (element.classList.contains('fa-sort-up')) {
            element.classList.remove('fa-sort-up');
            element.classList.add('fa-sort');
            const tableSortEvent: TableSortEvent = { key: '', direction: TableSortDirection.EMPTY };
            this.sortChanged.emit(tableSortEvent);
          }
        } else {
          // Ordenado Ascendente
          if (element.classList.contains('fa-sort-down')) {
            element.classList.remove('fa-sort-down');
            element.classList.add('fa-sort');
          }
          // Ordenado Descendente
          else if (element.classList.contains('fa-sort-up')) {
            element.classList.remove('fa-sort-up');
            element.classList.add('fa-sort');
          }
        }
      }
    }
  }

  // #endregion Public Methods
}
