import {Injectable, Inject, EventEmitter, forwardRef} from '@angular/core';
import { TRANSLATIONS, available_languages } from './translations'; // import our opaque token

@Injectable()
export class TranslateService {
  // private _currentLang: string;
  private PLACEHOLDER = '%';
  private _defaultLang = 'en';
  private _currentLang = 'en';
  private _fallback: boolean;

  public onLangChanged: EventEmitter<string> = new EventEmitter<string>();

  public get currentLang() {
    return this._currentLang || this._defaultLang;
  }

  public get availableLangs(){
    // let c = this._currentLang;
    // return available_languages.sort(function(x,y){return x.code === c ? -1 : y.code === c ? 1 : 0; }); // текущий язык на первом месте
    return available_languages;
  }

  public setDefaultLang() {
    let local_lang = 'en';
    if (localStorage.getItem('edcrunch_site_language')) {
      if (this.availableLangs.some((l) => l.code === localStorage.getItem('edcrunch_site_language'))){
         local_lang = localStorage.getItem('edcrunch_site_language');
      }
    }else{
      let browser_lang = navigator.language || window.navigator['userLanguage'];
      if (browser_lang.includes('ru')){
        local_lang = 'ru';
      }
    }
    this._defaultLang = local_lang;
    // console.log(available_languages);
    this.use(local_lang);
  }

  public enableFallback(enable: boolean) {
    this._fallback = enable;
  }

  // public write(logMessage:string){
  //
  //   console.log(logMessage);
  // }
  // inject our translations
  constructor(
    @Inject(TRANSLATIONS) private _translations: any,
  ) {
  }

  public use(lang: string): void {
    localStorage.setItem('edcrunch_site_language', lang);

    if (this._translations[lang]){
      // set current language
      this._currentLang = lang;
      this.onLangChanged.emit(lang);
    }
  }

  private translate(key: string): string {
    let translation = key;

    // found in current language
    if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
      return this._translations[this.currentLang][key];
    }

    // fallback disabled
    if (!this._fallback) {
      return translation;
    }

    // found in default language
    if (this._translations[this._defaultLang] && this._translations[this._defaultLang][key]) {
      return this._translations[this._defaultLang][key];
    }

    // not found
    return translation;
  }

  // public addTranslate(key: string, word: string){
  //
  // }


  public replace(word: string = '', words: string | string[] = '') {
    let translation: string = word;

    const values: string[] = [].concat(words);
    values.forEach((e, i) => {
      translation = translation.replace(this.PLACEHOLDER.concat(<any>i), e);
    });
    return translation;
  }

  public instant(key: string, words?: string | string[]) {
    // public perform translation
    const translation: string = this.translate(key);

    if (!words) return translation;
    return this.replace(translation, words);
  }
}
