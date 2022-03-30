import { get } from 'lodash';

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TableAction } from '../../models/table-action';
import { TableRow } from '../../models/table-row';

@Component({
  selector: '[az-table-cell-actions]',
  templateUrl: './az-table-cell-actions.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AzTableCellActionsComponent {
  // #region Properties

  @Input() public actions: Array<TableAction> | null = null;
  @Input() public row: any | null = null;
  @Output() public actionClick = new EventEmitter<TableAction>();

  // #endregion Properties

  // #region Constructors

  constructor() {}

  ngOnInit(): void {
    console.log(this.row);
  }

  // #endregion Constructors

  // #region Public Methods

  public actionClicked(event: any, action: TableAction): void {
    this.actionClick.emit(action);
  }

  public getClassesFromAction(action: TableAction): any {
    if (action.toggle) {
      if (this.row.item.active) {
        return action.icon;
      } else {
        return action.toggle;
      }
    }

    if (action.default) {
      if (this.row.item.default) {
        return action.icon;
      } else {
        return action.default;
      }
    }

    return action.icon;
  }

  public getTooltipFromAction(action: TableAction): any {
    if (action.default) {
      if (this.row.item.default) {
        return "Predeterminado";
      } else {
        return action.title;
      }
    }

    return action.title;
  }

  public getItemAction() {
    if (this.row) {
      if (this.row.item.actions) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  public getActionActive(action: TableAction): boolean {
    if (action.name) {
      if (this.row.item.actions[action.name.toLowerCase()]) {
        return true;
      } else {
        return false;
      }
    }

    return false;
  }

  // #endregion Public Methods
}
