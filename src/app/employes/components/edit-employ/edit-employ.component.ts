import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TableRow } from 'src/app/shared/az-table';
import { Employee } from '../../interfaces/employee.interface';
import { Profile } from '../../interfaces/profile.interface';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-edit-employ',
  templateUrl: './edit-employ.component.html',
  styleUrls: ['./edit-employ.component.scss']
})
export class EditEmployComponent implements OnInit {
  public readonly BASE_TRANSLATE = "employee.form";
  
  form!: FormGroup;
  listProfile: any[] = [
    {
      value: 1,
      text: "Developer"
    },
    {
      value: 2,
      text: "QA"
    },
    {
      value: 3,
      text: "Soporte"
    },
    {
      value: 4,
      text: "RRHH"
    }
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: TableRow,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditEmployComponent>,
    private employeeService: EmployeeService,
    private alert: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.data.item.name, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      lastname: [this.data.item.lastname, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      profile: [this.data.item.profile, [Validators.required]],
    });
  }

  submit() {
    let data: Employee = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      profile: this.form.value.profile
    }

    this.employeeService.put(this.data.item.id, data).subscribe(() => {
      this.alert.open("Empleado actualiazado exitosamente.", "", { panelClass: "success", duration: 5000 });
      this.dialogRef.close(true);
    }, (err) => {
      console.log(err);
      this.alert.open("Ha ocurrido un problema al actualizar el empleado.", "", { panelClass: "error", duration: 5000 });
      this.dialogRef.close(false);
    });
  }
}