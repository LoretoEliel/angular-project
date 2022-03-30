import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/employes/services/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.container.html',
  styleUrls: ['./home.container.scss']
})
export class HomeContainer implements OnInit {
  public readonly BASE_TRANSLATE = "home";

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    // code
  }
}