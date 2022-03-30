import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AddEmployComponent } from './components/add-employ/add-employ.component';
import { EditEmployComponent } from './components/edit-employ/edit-employ.component';
import { EmployeeContainer } from './containers/employee/employee.container';
import { EmployesRoutingModule } from './employes-route.routing';

@NgModule({
  imports: [CommonModule, EmployesRoutingModule, SharedModule],
  declarations: [EmployeeContainer, AddEmployComponent, EditEmployComponent],
})
export class EmployesModule {}
