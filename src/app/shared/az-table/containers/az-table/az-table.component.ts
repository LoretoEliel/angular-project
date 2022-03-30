import { countBy, eq, filter, findIndex, get, map, size } from 'lodash';

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';

import { AzTableService } from '../../components/services/az-table.service';
import { RowEvent } from '../../models/row-event';
import { TableAction } from '../../models/table-action';
import { TableActionEvent } from '../../models/table-action-event';
import { TableField } from '../../models/table-field';
import { TableRow } from '../../models/table-row';
import { TableSortDirection } from '../../models/table-sort-direction.enum';
import { TableSortEvent } from '../../models/table-sort-event';
import { AZ_TABLE_CONFIG, TableConfig } from '../../table-config';
import { newGuid } from '../../utilities/string.utility';
import { BehaviorSubject, from, Observable } from 'rxjs';

@Component({
  selector: 'az-table',
  templateUrl: './az-table.component.html',
  styleUrls: ['./az-table.component.css']
})
export class AzTableComponent implements OnInit, OnChanges {
  // #region Properties

  private _currentPage: number = 1;
  private _currentPerPage: number = 10;
  private _rawData: any[] = [];
  private currentSortDirection: TableSortDirection = TableSortDirection.EMPTY;
  private currentSortKey: string = '';
  private tableRows: Array<TableRow> = [];

  // Solo si hay length en this.actions, entonces pasa a ser true.
  public actionable: boolean = false;
  filteredRows$?: Observable<any>;

  @ContentChild('tableHeader') header!: TemplateRef<any>;
  @Input() public actions: Array<TableAction> | null = null;
  /**
   * Matriz de nombres de campo o matriz de objetos de definición de campo
   */
  @Input() public fields: Array<string | TableField> | null = null;
  @Input() public pagination: boolean = false;
  @Input() public scrollable: boolean = false;
  @Input() public selectable: boolean = false;
  @Input() public selectMode: string = "multiple";
  @Input() public sortable: boolean = false;
  /**
   * Emitido cuando se hace click en una acción.
   */
  @Output() public actionClick = new EventEmitter<TableActionEvent>();
  /**
   * Emitido cuando una fila o filas han sido seleccionadas o deseleccionadas.
   */
  @Output() public rowsSelected = new EventEmitter<Array<any>>();

  public PAGINATION_ID: string = '';
  public filteredRows: Array<TableRow> = [];
  public isSelectedAll: boolean = false;
  public totalItems: number = 0;
  private _filterCollection$ = new BehaviorSubject<TableRow[]>([]);

  get filterCollection$() {
    return this._filterCollection$.asObservable();
  }
  // #endregion Properties

  // #region Constructors

  constructor(
    @Inject(AZ_TABLE_CONFIG) private config: TableConfig,
    private ref: ChangeDetectorRef,
    private tableService: AzTableService
  ) {
    this.pagination = this.config.paginable ? this.config.paginable : false;
    this.scrollable = this.config.scrollable ? this.config.scrollable : false;
    this.selectable = this.config.selectable ? this.config.selectable : false;
    this.sortable = this.config.sortable ? this.config.sortable : false;
  }

  // #endregion Constructors

  // #region Public Accessors

  /**
   * El número de página actual.
   */
  @Input() public set currentPage(v: number) {
    if (v > 0) {
      this._currentPage = v;
    }
  }

  @Input() items: Array<any> = [];
  @Input() public get itemsPerPage(): number {
    return this._currentPerPage;
  }

  public get currentPage(): number {
    return this._currentPage;
  }

  public set itemsPerPage(v: number) {
    if (v > 0) {
      this._currentPerPage = v;
    }
  }

  // #endregion Public Accessors

  // #region Public Methods

  public actionClicked(event: TableActionEvent) {
    this.actionClick.emit(event);
  }

  public changeSelectionAllRows(checked: boolean): void {
    this.tableRows = map(this.tableRows, (item) => {
      item.selected = checked;
      return item;
    });
    this.setFilteredRows();
    this.setIsSelectedAll();

    this.rowsSelected.emit(this.getSelectedRows());
  }

  public itemsPerPageChanged(itemsPerPage: number) {
    this.itemsPerPage = itemsPerPage;
    this.setFilteredRows();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.initTableRows();
      this.setFilteredRows();
    }
  }

  public ngOnInit(): void {
    this.PAGINATION_ID = newGuid();
    this._filterCollection$.next(this.items);

    if (this.actions) {
      this.actionable = this.actions.length >= 1 ? true : false;
    }

    this.initTableRows();
    this.setFilteredRows();
  }

  public pageChanged(event: number) {
    this.currentPage = event;
    this.setFilteredRows();
  }

  public selectRow(event: RowEvent): void {
    const index = findIndex(this.tableRows, (o) => eq(o.index, event.item.index));
    this.tableRows.splice(index, 1, { ...event.item, selected: true });

    this.setIsSelectedAll();
    this.rowsSelected.emit(this.getSelectedRows());
  }

  public sortingChanged(event: TableSortEvent) {
    this.currentSortKey = event.key;
    this.currentSortDirection = event.direction;
    this.setFilteredRows();
  }

  public unselectRow(event: RowEvent): void {
    const index = findIndex(this.tableRows, (o) => eq(o.index, event.item.index));
    this.tableRows.splice(index, 1, { ...event.item, selected: false });

    this.setIsSelectedAll();
    this.rowsSelected.emit(this.getSelectedRows());
  }

  // #endregion Public Methods

  // #region Private Methods

  private getSelectedRows(): any[] {
    return filter(this.tableRows, (o) => o.selected).map((x) => x.item);
  }

  private initTableRows() {
    this.tableRows = this.tableService.mapToTableRow(this.items);
    this.totalItems = size(this.tableRows);
  }

  private setFilteredRows() {
    let result = this.tableService.sortTableRow(this.tableRows, this.currentSortKey, this.currentSortDirection);

    if (this.pagination) {
      this.filteredRows = result.slice(
        (this.currentPage - 1) * this.itemsPerPage,
        (this.currentPage - 1) * this.itemsPerPage + this.itemsPerPage
      );
    } else {
      this.filteredRows = result;
    }
  }

  /**
   * Comprueba si estan seleccionadas todas las filas.
   */
  private setIsSelectedAll() {
    const result = countBy(this.tableRows, (x) => x.selected);

    const isSelected = get(result, 'false', 0);
    if (isSelected === 0) {
      this.isSelectedAll = true;
    } else {
      this.isSelectedAll = false;
    }
  }

  // #endregion Private Methods

  public _refAZTable_() {
    this.ref.detectChanges();
    this.ref.reattach();
    this.ref.detach();
    this.ref.checkNoChanges();
  }
}

export class AzTableInterface {
  scrollable?: boolean;
  fields?: Array<string | TableField> | null;
  items?: Array<any>;
  pagination?: boolean;
  selectable?: boolean;
  selectMode?: string;
  actions?: Array<TableAction> | null;
  actionClick?: any;
  rowsSelected?: any;
  currentPage?: number;
  itemsPerPage?: number;
  sortable?: boolean;

  constructor() {}
}