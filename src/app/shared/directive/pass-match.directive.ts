import { Directive } from '@angular/core';
import { ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPassMatch]',
})
export class PassMatchDirective {
  static ConfirmPasswordValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('newPassword')?.value;
    const confirmpassword = control.get('confirmPassword')?.value;

    if (password !== confirmpassword) {
      return { passMatch: true } as ValidationErrors;
    } else {
      return null;
    }
  };

  constructor() {}
}
