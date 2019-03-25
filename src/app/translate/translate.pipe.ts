// app/translate/translate.pipe.ts

import {Injectable, Pipe, PipeTransform} from '@angular/core';
import { TranslateService } from '../translate'; // our translate service

@Pipe({
  name: 'translate',
  pure: false // impure pipe, update value when we change language
})

@Injectable()
export class TranslatePipe implements PipeTransform {

  constructor(private _translate: TranslateService) { }

  transform(value: string, args: string | string[]): any {
    if (!value) return;

    return this._translate.instant(value, args);
  }
}
