import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { TranslateSettings } from './TranslateSettings';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    TranslateSettings.TRANSLATE_FILES_PATH,
    TranslateSettings.TRANSLATE_FILES_EXTENSION
  );
}
