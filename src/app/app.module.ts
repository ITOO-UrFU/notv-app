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

import { TranslateModule } from 'ng2-translate';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventsService } from 'app/events/events.service';
import { eventsToObjectPipe } from 'app/events/events.filter';

import { HomePageComponent } from './home-page/home-page.component';
import { HomePageService } from './home-page/home-page.service';
import { SpeakersListComponent } from './speakers/speakers-list/speakers-list.component';
import { SpeakersService } from './speakers/speakers.service';
import { EventComponent } from 'app/events/event/event.component';
import { FooterComponent } from './footer/footer.component';
import { RegistrationComponent } from './registration/registration.component';

import { RegisterService} from 'app/services/register.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from 'app/services/auth.service';
import { AlertService } from 'app/services/alert.service';

import { AlertComponent } from 'app/directives/alert.component';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { AuthGuard } from 'app/services/auth.guard';
import { ProfileEditComponent } from 'app/user-profile/profile-edit/profile-edit.component';
import { UserEventsComponent } from 'app/user-events/user-events.component';

import { MetaService, MetaConfig, MetaModule } from 'ng2-meta';

const metaConfig: MetaConfig = {

  useTitleSuffix: true,
  defaults: {
    title: '#EDCRUNCH Ural: Новые образовательные технологии в вузе – 2017',
    titleSuffix: ' | #EDCRUNCH Ural'
  }
};

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
    FooterComponent,
    RegistrationComponent,
    LoginComponent,
    AlertComponent,
    UserProfileComponent,
    ProfileEditComponent,
    UserEventsComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    TranslateModule.forRoot(),
    MetaModule.forRoot(metaConfig),
  ],

  providers: [
    PageService,
    EventsService,
    HomePageService,
    SpeakersService,
    RegisterService,
    AuthenticationService,
    AlertService,
    AuthGuard,
   {
      provide: LOCALE_ID,
     //  useValue: "en-EN"
     useValue: 'ru-RU'
    },
    ],
  bootstrap: [AppComponent],
  entryComponents: [ PageComponent ]
})
export class AppModule { }
