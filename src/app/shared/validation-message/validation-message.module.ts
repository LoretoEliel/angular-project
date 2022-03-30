import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { ValidatorMessagesComponent } from './components/validator-messages/validator-messages.component';
import {
  ACTIVE_VALIDATOR_MESSAGE,
  ValidationModuleConfig,
} from './services/active-validator-message.service';
import { ValidatorMessageFakeLoader } from './services/validator-message-fake.loader';
import { ValidatorMessageLoader } from './services/validator-message-loader';
import { ValidatorMessageService } from './services/validator-message.service';

@NgModule({
  declarations: [ValidatorMessagesComponent],
  imports: [CommonModule],
  exports: [ValidatorMessagesComponent],
})
export class ValidationMessageModule {
  // #region Public Static Methods

  public static forRoot(
    config: ValidationModuleConfig
  ): ModuleWithProviders<ValidationMessageModule> {
    return {
      ngModule: ValidationMessageModule,
      providers: [
        ValidatorMessageService,
        config.loader || {
          provide: ValidatorMessageLoader,
          useClass: ValidatorMessageFakeLoader,
        },
        {
          provide: ACTIVE_VALIDATOR_MESSAGE,
          useValue: config,
        },
      ],
    };
  }

  // #endregion Public Static Methods
// static forRoot(
  //   conf?: ActiveValidatorMessageProvider
  // ): ModuleWithProviders<ValidationMessageModule> {
  //   return {
  //     ngModule: ValidationMessageModule,
  //     providers: [
  //       { provide: ACTIVE_VALIDATOR_MESSAGE, useValue: conf },
  //       ValidatorMessageService,
  //     ],
  //   };
  // }
}
