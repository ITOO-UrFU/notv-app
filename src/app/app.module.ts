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
import { eventsToObjectPipe } from 'app/events/events.filter';

import { HomePageComponent } from './home-page/home-page.component';
import { HomePageService } from './home-page/home-page.service';
import { SpeakersListComponent } from './speakers/speakers-list/speakers-list.component';
import { SpeakersService } from './speakers/speakers.service';
import { EventComponent } from 'app/events/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    PageComponent,
    EventListComponent,
    eventsToObjectPipe,
    HomePageComponent,
    SpeakersListComponent,
    EventComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    TranslateModule.forRoot(),

  ],

  providers: [
    PageService, 
    EventsService,
    HomePageService,
    SpeakersService,
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
