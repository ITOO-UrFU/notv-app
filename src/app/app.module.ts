import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { PageService } from 'app/page.service';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PageComponent } from './page/page.component';
import { MaterialModule } from '@angular/material';

import {TranslateModule} from "ng2-translate";
import { EventListComponent } from './events/event-list/event-list.component';
import { EventsService } from 'app/events/events.service';
import { EventsFilterPipe } from 'app/events/events.filter';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageComponent,
    EventListComponent,
    EventsFilterPipe
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
  providers: [
    PageService, 
    EventsService,
   { 
      provide: LOCALE_ID, 
     //  useValue: "en-EN" 
     useValue: "ru-RU" 
    },
    ],
  bootstrap: [AppComponent],
  entryComponents: [ PageComponent ]
})
export class AppModule { }
