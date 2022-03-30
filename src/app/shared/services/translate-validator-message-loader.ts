import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, iif, interval, Observable } from 'rxjs';
import { concatMap, publishReplay, switchMap, take, tap } from 'rxjs/operators';
import { ValidatorMessageLoader } from '../validation-message/services/validator-message-loader';

export class TranslateValidatorMessageLoader implements ValidatorMessageLoader {
  constructor(private translate: TranslateService) {}

  getErrorMessages(): Observable<any> {
    const TRANSLATE_KEY = 'shared.validation';

    let fist = true;

    const stream = interval(250);
    return stream.pipe(
      concatMap(() => {
        return fist
          ? this.translate.get(TRANSLATE_KEY).pipe(tap(() => (fist = false)))
          : this.translate.onLangChange.pipe(
              switchMap(() => this.translate.get(TRANSLATE_KEY))
            );
      })
    );
  }
}
