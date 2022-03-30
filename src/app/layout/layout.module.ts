import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { LayoutHomeComponent } from './layout-home/layout-home.component';
import { LayoutService } from './services/layout.service';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [
    LayoutHomeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    NgxPermissionsModule.forChild()
  ],
  providers: [LayoutService],
})
export class LayoutModule {}
