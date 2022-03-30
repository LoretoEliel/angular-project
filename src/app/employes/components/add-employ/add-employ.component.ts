import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Employee } from '../../interfaces/employee.interface';
import { Profile } from '../../interfaces/profile.interface';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employ',
  templateUrl: './add-employ.component.html',
  styleUrls: ['./add-employ.component.scss']
})
export class AddEmployComponent implements OnInit {
  public readonly BASE_TRANSLATE = "employee.form";
  
  form!: FormGroup;
  listProfile: Profile[] = [
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
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddEmployComponent>,
    private employeeService: EmployeeService,
    private alert: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      lastname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      profile: ['', [Validators.required]],
    });
  }

  submit() {
    let data: Employee = {
      name: this.form.value.name,
      lastname: this.form.value.lastname,
      profile: parseInt(this.form.value.profile),
      d_create: moment().format("YYYY-MM-DD HH:mm:ss")
    }

    this.employeeService.post(data).subscribe(() => {
      this.alert.open("Empleado registrado exitosamente.", "", { panelClass: "success", duration: 5000 });
      this.dialogRef.close(true);
    }, (err) => {
      console.log(err);
      this.alert.open("Ha ocurrido un problema al guardar el empleado.", "", { panelClass: "error", duration: 5000 });
      this.dialogRef.close(false);
    });
  }
}