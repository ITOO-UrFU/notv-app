import { Component, OnInit,  ViewEncapsulation  } from '@angular/core';
import { Router, Routes } from '@angular/router';
import {Location} from '@angular/common';



import { NavigationStart, NavigationError, NavigationCancel , NavigationEnd} from '@angular/router';

import { PageService } from 'app/page.service';
import { PageComponent } from 'app/page/page.component';

import { TranslateService } from 'app/translate/translate.service';

@Component({
  selector: 'body.app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class AppComponent implements OnInit {

  component: any = {
    name: 'AppComponent',
  };

constructor(private _location: Location,
            private _translate: TranslateService
) {

  }

  ngOnInit() {
    this._translate.setDefaultLang();
  // console.log(navigator.language, window.navigator['userLanguage']);
  //   let lang = navigator.language || window.navigator['userLanguage'];
    // if (lang.includes('ru')){
      // lang = 'ru';
    // }
    // console.log("navigator.language", navigator.language);
    // console.log("this._translate", this._translate);
    // this._translate.use(lang);
  }


}
