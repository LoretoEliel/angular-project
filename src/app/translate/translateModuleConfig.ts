import { TranslateModuleConfig } from '@ngx-translate/core';

import { translateLoaderProvider } from './translateLoaderProvider';
import { TranslateSettings } from './TranslateSettings';

export const translateModuleConfig: TranslateModuleConfig = {
  // compiler: undefined,
  defaultLanguage: TranslateSettings.DEFAULT_LANGUAGE,
  // extend: undefined,
  // isolate: undefined,
  loader: translateLoaderProvider,
  // missingTranslationHandler: undefined,
  // parser: undefined,
  useDefaultLang: TranslateSettings.USE_DEFAULT_LANG,
};
