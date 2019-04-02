import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';
import {PageService} from 'app/page.service';

import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {PageComponent} from './page/page.component';
import {MaterialModule} from '@angular/material';

import {TranslateModule} from 'ng2-translate';
import {EventListComponent} from './events/event-list/event-list.component';
import {EventsService} from 'app/events/events.service';
import {eventsToObjectPipe} from 'app/events/events.filter';

import {HomePageComponent} from './home-page/home-page.component';
import {HomePageService} from './home-page/home-page.service';
import {SpeakersListComponent} from './speakers/speakers-list/speakers-list.component';
import {SpeakersService} from './speakers/speakers.service';
import {EventComponent} from 'app/events/event/event.component';
import {FooterComponent} from './footer/footer.component';
import {RegistrationComponent} from './registration/registration.component';

import {RegisterService} from 'app/services/register.service';
import {LoginComponent} from './login/login.component';
import {AuthenticationService} from 'app/services/auth.service';
import {AlertService} from 'app/services/alert.service';
import {PechaKuchaService} from 'app/services/pechakucha.service';

import {AlertComponent} from 'app/directives/alert.component';
import {UserProfileComponent} from 'app/user-profile/user-profile.component';
import {AuthGuard} from 'app/services/auth.guard';
import {ProfileEditComponent} from 'app/user-profile/profile-edit/profile-edit.component';
import {UserEventsComponent} from 'app/user-events/user-events.component';
import {SafePipe} from 'app/page/safe.pipe';
import {MetaConfig, MetaModule} from 'ng2-meta';
import {LoadMaterialsComponent} from './user-profile/load-materials/load-materials.component';
import {MyProfileComponent} from './user-profile/my-profile/my-profile.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

import {ChangePasswordComponent} from './user-profile/change-password/change-password.component';
import {RegisterStudentsComponent} from './register-students/register-students.component';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService } from './translate';

import {EventPageComponent} from './events/event-page/event-page.component';
// import {EventModalComponent} from './events/event-modal/event-modal.component';
import {PechaKuchaComponent} from './pechakucha/pechakucha.component';
import {CommonModule} from '@angular/common';

const metaConfig: MetaConfig = {

  useTitleSuffix: true,
  defaults: {
    title: 'EDCRUNCH Ural: Новые образовательные технологии в вузе – 2019',
    titleSuffix: ' | EDCRUNCH Ural'
  }
};

@NgModule({
  declarations: [
    // EventModalComponent,
    AppComponent,
    NavComponent,
    PageComponent,
    EventListComponent,
    EventPageComponent,
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
    UserEventsComponent,
    SafePipe,
    LoadMaterialsComponent,
    MyProfileComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    RegisterStudentsComponent,
    TranslatePipe,
    PechaKuchaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    TranslateModule.forRoot(),
    MetaModule.forRoot(metaConfig),
    CommonModule,
  ],

  providers: [
    TranslateService,
    TRANSLATION_PROVIDERS,
    PageService,
    EventsService,
    HomePageService,
    SpeakersService,
    RegisterService,
    PechaKuchaService,
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
  entryComponents: [ PageComponent ],
})
export class AppModule { }
