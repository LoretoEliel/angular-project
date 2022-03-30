import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ValidatorMessageLoader } from './validator-message-loader';

@Injectable({
  providedIn: 'root',
})
export class ValidatorMessageFakeLoader extends ValidatorMessageLoader {
  getErrorMessages(): Observable<any> {
    const result = {
      min: 'Please enter a value greater than or equal to __min__.',
      max: 'Please enter a value less than or equal to __max__.',
      required: 'This field is required.',
      requiredTrue: 'This field must be true.',
      email: 'Please enter a valid email address.',
      minlength: 'Please enter at least __requiredLength__ characters.',
      maxlength: 'Please enter no more than __requiredLength__ characters.',
      pattern: 'Invalid format.',
      nullValidator: 'This field is required.',
      rut: 'Please write a valid RUT.',
      isURL: 'Please enter a valid URL.',
      isEmail: 'Please enter a valid email address.',
      isPhone: 'Please write a valid phone number.',
      requiredFile: 'This file is required.',
      allowExtensions:
        'Please select a file with an accepted extension (__requiredExtensions__).',
    };
    return of(result);
  }
}
