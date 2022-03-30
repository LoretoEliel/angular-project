import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { ErrorMessage } from '../models/error-message';
import { ValidatorMessageLoader } from './validator-message-loader';
import { ErrorMessageDisplay } from '../models/error-message-display';

const CACHE_SIZE = 1;

@Injectable({
  providedIn: 'root',
})
export class ValidatorMessageService {
  // #region Properties

  private REGEX_INTERPOLATION = /#{([^{}]*)}/g;
  private cache$!: Observable<Array<ErrorMessage>>;

  // #endregion Properties

  // #region Constructors

  constructor(
    public currentLoader: ValidatorMessageLoader // @Inject(ACTIVE_VALIDATOR_MESSAGE) public config: ValidationModuleConfig
  ) {}

  // #endregion Constructors

  // #region Public Accessors

  public get errorMessages(): Observable<Array<ErrorMessage>> {
    if (!this.cache$) {
      this.cache$ = this.requestMessages().pipe(shareReplay(CACHE_SIZE));
    }
    return this.cache$;
  }

  // #endregion Public Accessors

  // #region Public Methods

  public getErrorMessageToDisplay(element: ErrorMessage | undefined, params?: any): ErrorMessageDisplay {
    var result = element as ErrorMessageDisplay;
    if (element?.value) {
      result.display = this.interpolateString(element.value, params);
    }
    return result;
  }

  // #endregion Public Methods

  // #region Private Methods

  private requestMessages(): Observable<Array<ErrorMessage>> {
    return this.currentLoader.getErrorMessages().pipe(
      map((object) => {
        let result: Array<ErrorMessage> = [];

        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            const element = new ErrorMessage(key, object[key]);
            result.push(element);
          }
        }

        return result;
      })
    );
  }

  // https://stackoverflow.com/questions/1408289/how-can-i-do-string-interpolation-in-javascript#answer-1408373
  private interpolateString(expr: string, params?: any): string {
    if (!params) {
      return expr;
    }

    return expr.replace(this.REGEX_INTERPOLATION, (a: any, b: string | number) => {
      var r = params[b];
      return typeof r === 'string' || typeof r === 'number' ? r : a;
    });
  }

  // #endregion Private Methods
}
