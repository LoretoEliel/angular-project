import { HttpClient } from '@angular/common/http';
import { FactoryProvider } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';

import { createTranslateLoader } from './createTranslateLoader';

export const translateLoaderProvider: FactoryProvider = {
  provide: TranslateLoader,
  useFactory: createTranslateLoader,
  deps: [HttpClient],
};
