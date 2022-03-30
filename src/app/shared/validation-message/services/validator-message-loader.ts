import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export abstract class ValidatorMessageLoader {
  abstract getErrorMessages(): Observable<any>;
}
