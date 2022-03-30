import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isNull } from 'lodash';

import { isRutValid } from '../utilities/rut.utility';

export class RutValidator {
  // #region Public Static Methods

  public static isRut(control: AbstractControl): ValidationErrors | null {
    if (isNull(control.value)) {
      return null;
    }
    return  !isRutValid(control.value) ? { rut: true } : null;
  }

  // #endregion Public Static Methods
}
