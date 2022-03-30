import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TableAction, TableActionEvent, TableField } from 'src/app/shared/az-table';
import { AddEmployComponent } from '../../components/add-employ/add-employ.component';
import { Employee } from '../../interfaces/employee.interface';
import { EmployeeService } from '../../services/employee.service';
import * as moment from "moment";
import { EditEmployComponent } from '../../components/edit-employ/edit-employ.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.container.html',
  styleUrls: ['./employee.container.scss']
})
export class EmployeeContainer implements OnInit {
  public readonly BASE_TRANSLATE = "employee";

  columns: any[] = [];
  rows$!: Observable<any[]>;
  customActions: TableAction[] = [];
  listEmployee: Employee[] = [];

  constructor(
    private dialog: MatDialog,
    private employeeServices: EmployeeService
  ) {}

  ngOnInit() {
    this.columns = this.getTableColumns();
    this.customActions = this.getTableActions();
    this.getEmployes();
  }

  formatFecha(fecha: string | Date) {
    return moment(fecha).format("YYYY-MM-DD h:mm a");
  }

  getEmployes() {
    this.listEmployee = [];
    this.employeeServices.get().subscribe((res: any) => {
      this.listEmployee = res;
      let result: Observable<any[]> | any[] = of(this.listEmployee);
      this.rows$ = result.pipe(
        map((result) => {
          return result.map((result) => {
            result.profile_format = result.profile === 1 ? 'Developer' : result.profile === 2 ? 'QA' : result.profile === 3 ? 'Soporte' : 'RRHH';
            result.d_create_format = this.formatFecha(result.d_create);
            return result;
          });
        })
      );
    });
  }

  openAdd() {
    this.dialog.open(AddEmployComponent, {
      data: {},
      width: "700px",
      height: "200px"
    }).afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        this.getEmployes();
      }
    });
  }

  onActionClick(event: TableActionEvent) {
    if (event.action.name === "editar") {
      const dialogRef = this.dialog.open(EditEmployComponent, {
        data: {...event.row},
        width: "700px",
        height: "200px"
      });
  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result === true) {
          this.getEmployes();
        }
      });
    }
  }

  private getTableActions(): TableAction[] {
    return [
      {
        name: 'editar',
        title: `${this.BASE_TRANSLATE}.list.tooltip.edit`,
        icon: 'fas fa-edit',
        tooltip: `${this.BASE_TRANSLATE}.list.tooltip.edit`
      },
    ] as TableAction[];
  }

  private getTableColumns(): TableField[] {
    return [
      {
        key: 'name',
        label: 'Nombre',
        textAlign: "left",
        translation: `${this.BASE_TRANSLATE}.list.th_name`,
      },
      {
        key: 'lastname',
        label: 'Apellido',
        textAlign: "left",
        translation: `${this.BASE_TRANSLATE}.list.th_lastname`,
      },
      {
        key: 'profile_format',
        label: 'Perfil',
        textAlign: "center",
        translation: `${this.BASE_TRANSLATE}.list.th_profile`,
      },
      {
        key: 'd_create_format',
        label: 'Fecha de creación',
        textAlign: "center",
        translation: `${this.BASE_TRANSLATE}.list.th_d_create`,
      }
    ] as TableField[];
  }
}