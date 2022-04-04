import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoComponent } from './containers/demo/demo.component';
import { DemoRoutingModule } from './demo-route.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    CommonModule,
    DemoRoutingModule,
    SharedModule
  ]
})
export class DemoModule { }
