import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../interfaces/employee.interface';

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  urlBase = "http://localhost:3000";

  constructor(
    private http: HttpClient
  ) {}

  post(data: Employee) {
    return this.http.post(`${this.urlBase}/employes`, data);
  }

  put(id: number, data: Employee) {
    return this.http.put(`${this.urlBase}/employes/${id}`, data);
  }

  get() {
    return this.http.get(`${this.urlBase}/employes`);
  }
}
