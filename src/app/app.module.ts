import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { PageService } from 'app/page.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PageComponent } from './page/page.component';
import { MaterialModule } from '@angular/material';

import {TranslateModule} from "ng2-translate";

/*
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './i18n', '.json');
}
*/

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    TranslateModule.forRoot()

  ],
 // exports:[TranslateModule],
  providers: [PageService],
  bootstrap: [AppComponent],
  entryComponents: [ PageComponent ]
})
export class AppModule { }
