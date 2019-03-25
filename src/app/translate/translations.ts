// app/translate/translation.ts

import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS, LANG_EN_TITLE } from './lang-en';
import { LANG_RU_NAME, LANG_RU_TRANS, LANG_RU_TITLE  } from './lang-ru';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all traslations
const dictionary = {
  [LANG_EN_NAME]: LANG_EN_TRANS,
  [LANG_RU_NAME]: LANG_RU_TRANS,
};

export const available_languages = [
  {
    code: LANG_EN_NAME,
    title: LANG_EN_TITLE
  },
  {
    code: LANG_RU_NAME,
    title: LANG_RU_TITLE
  },
];

// providers
export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue: dictionary },
];
