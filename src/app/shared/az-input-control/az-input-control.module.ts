import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { AzDatepickerComponent } from './containers/az-datepicker/az-datepicker.component';

@NgModule({
  declarations: [
    // Components
    AzDatepickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    // Third Party Modules
    BsDatepickerModule,
    TranslateModule,
  ],
  exports: [
    // Components
    AzDatepickerComponent,
  ],
})
export class AzInputControlModule {}
