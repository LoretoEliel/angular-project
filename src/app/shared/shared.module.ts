import { DragulaModule } from 'ng2-dragula';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';

import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LanguageSelectorComponent } from './components/language-selector/language-selector.component';
import { PassMatchDirective } from './directive/pass-match.directive';
import { TranslateValidatorMessageLoader } from './services/translate-validator-message-loader';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule, MatPseudoCheckboxModule, MatRippleModule } from '@angular/material/core';
import { AzTableModule } from './az-table';
import { AzInputControlModule } from './az-input-control';
import { NotImageDirective } from './directive/not-image.directive';

defineLocale('es', esLocale);

export function createValidationLoader(translate: TranslateService) {
  return new TranslateValidatorMessageLoader(translate);
}

@NgModule({
  declarations: [
    // Components
    LanguageSelectorComponent,
    // Directives
    PassMatchDirective,
    NotImageDirective,
    SidebarComponent
  ],
  imports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // Third Party Modules
    DragulaModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgSelectModule,
    NgxPaginationModule,
    TranslateModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPseudoCheckboxModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    AzTableModule.forRoot({
      // scrollable: true,
      // selectable: true,
      // paginable: true,
      sortable: true,
    }),
    AzInputControlModule,
  ],
  exports: [
    // Modules
    FormsModule,
    ReactiveFormsModule,
    // Third Party Modules
    DragulaModule,
    NgxMaskModule,
    NgSelectModule,
    TranslateModule,
    // Custom Modules
    LanguageSelectorComponent,
    // Directives
    PassMatchDirective,
    SidebarComponent,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatPseudoCheckboxModule,
    MatRippleModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatTabsModule,
    AzTableModule,
    AzInputControlModule,
    NotImageDirective
  ],
})
export class SharedModule {
  // #region Public Static Methods

  public static forRoot(): ModuleWithProviders<SharedModule> {
    var providers: Provider[] = [];
    if (NgxMaskModule.forRoot().providers) {
      providers.push(...(NgxMaskModule.forRoot().providers as Provider[]));
    }
    return {
      ngModule: SharedModule,
      providers: [providers],
    };
  }

  // #endregion Public Static Methods
}
