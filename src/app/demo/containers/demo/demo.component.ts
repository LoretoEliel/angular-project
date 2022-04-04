import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Heroes } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  is_boolean: boolean = true;
  text: string = "Esta es una respuesta éxitosa.";

  list: any[] = [1, 2, 3, 4, 5];
  numero: number = 12;

  listEmpresasHeroes: Heroes[] = [
    {
      name: "Marvel",
      type: 'grande'
    },
    {
      name: "DC",
      type: 'grande'
    },
    {
      name: "Otros",
      type: 'no-existe'
    }
  ];

  form!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(3)]]
      }
    );
  }
  
  save(): void {
    console.log("HACIENDO EL SUBMIT", this.form.value);
  }
}
