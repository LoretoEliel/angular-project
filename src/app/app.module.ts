import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import esCL from '@angular/common/locales/es-CL';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { translateModuleConfig } from './translate/translateModuleConfig';

import { MatSnackBarModule } from '@angular/material/snack-bar';

registerLocaleData(esCL);

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,

    TranslateModule.forRoot(translateModuleConfig),
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No hay resultados',
        totalMessage: 'Total',
        selectedMessage: 'Seleccione',
      },
    }),

    AppRoutingModule,
    LayoutModule,
    MatSnackBarModule,
    SharedModule.forRoot(),
  ],
  providers: [
    AppService,
    {
      provide: LOCALE_ID,
      useValue: 'es-CL',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
