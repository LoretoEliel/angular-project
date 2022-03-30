import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeContainer } from './containers/employee/employee.container';

const routes: Routes = [
  {
    path: '',
    component: EmployeeContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployesRoutingModule {}
