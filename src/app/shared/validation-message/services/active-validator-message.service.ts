import { InjectionToken, Provider } from '@angular/core';

export interface ValidationModuleConfig {
  // #region Properties

  loader?: Provider;

  // #endregion Properties
}

export const ACTIVE_VALIDATOR_MESSAGE = new InjectionToken<ValidationModuleConfig>('Active Validator Message');
