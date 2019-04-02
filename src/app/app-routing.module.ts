import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageComponent} from 'app/page/page.component';
import {HomePageComponent} from 'app/home-page/home-page.component';
import {SpeakersListComponent} from 'app/speakers/speakers-list/speakers-list.component';

import {EventComponent} from 'app/events/event/event.component';
import {EventListComponent} from 'app/events/event-list/event-list.component';

import {RegistrationComponent} from 'app/registration/registration.component';
import {LoginComponent} from 'app/login/login.component';

import {UserProfileComponent} from 'app/user-profile/user-profile.component';
import {AuthGuard} from 'app/services/auth.guard';
import {ProfileEditComponent} from 'app/user-profile/profile-edit/profile-edit.component';
import {UserEventsComponent} from './user-events/user-events.component';
import {MyProfileComponent} from './user-profile/my-profile/my-profile.component';

import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ChangePasswordComponent} from './user-profile/change-password/change-password.component';
import {RegisterStudentsComponent} from './register-students/register-students.component';
import {EventPageComponent} from 'app/events/event-page/event-page.component';
import {LoadMaterialsComponent} from './user-profile/load-materials/load-materials.component';
import {PechaKuchaComponent} from './pechakucha/pechakucha.component';

const routes: Routes = [

  {
    path: '',
    data: {
      meta: {
        title: 'EDCRUNCH Ural: Новые образовательные технологии в вузе – 2019',
        description: 'Домашняя страница конференции EDCRUNCH URAL'
      }
    },
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
        data: {
          meta: {
            title: 'EDCRUNCH Ural: Новые образовательные технологии в вузе – 2019',
            description: 'Домашняя страница конференции EDCRUNCH URAL'
          }
        },
      },

      {
      path: 'profile',
      component: UserProfileComponent,
      canActivate: [AuthGuard],
      children: [
          {
            path: 'edit',
            component: ProfileEditComponent,
          },
          {
            path: 'my',
            component: MyProfileComponent,
          },
         // {
         //    path: 'my_events',
         //    component: UserEventsComponent
         //  },
        {
          path: 'materials',
          component: LoadMaterialsComponent
        },
          {
            path: 'change-password',
            component: ChangePasswordComponent,
          }
        ]
      },
      {
        path: 'login',
        component: LoginComponent

      },
      {
        path: 'register',
        component: RegistrationComponent

      },
      {
        path: 'register-students',
        component: RegisterStudentsComponent

      },

      {
        path: 'reset-password',
        component: ResetPasswordComponent
      },

      // {
      //   path: 'events/my_events',
      //   component: UserEventsComponent,
      //   // canActivate: [AuthGuard],
      // },
      // {
      //   path: 'events/all_events',
      //   component: EventListComponent,
      //
      // },

      {
        path: 'events',
        // pathMatch: 'full',
        component: EventListComponent,
        children: [


        ]

      },
  {
    path: 'events/:id',
    component: EventPageComponent,
    data: {}
    },
      {
        path: 'home',
        component: HomePageComponent,
        children: [
        ]
      },
      {
        path: 'pechakucha',
        component: PechaKuchaComponent,
        children: [],
      },
      {
        path: 'speakers',
        component: SpeakersListComponent,
        children: [
        ]
      },
      {
        path: ':id',
        component: PageComponent,
        children: [
          {
            path: ':id',
            component: PageComponent,
          },

        ]
      }
    ]

  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})

export class AppRoutingModule { }

/*const routes: Routes = [
{
  path:'home',
  component: PageComponent,
  data:{
    title: "Главная"
  }
},
{
  path:'about', component: PageComponent,
  data:{ title: "О конференции" },
  children:[
    { path:'conditions', component: PageComponent, data:{ title: "Условия участия" } },
    { path:'registration', component: PageComponent, data:{ title: "Регистрация" } },
    { path:'accommodation', component: PageComponent, data:{ title: "Проживание" } },
    { path:'food', component: PageComponent, data:{ title: "Питание" } },
    { path:'transport', component: PageComponent, data:{ title: "Проезд" } }
  ]
},
{
  path:'participants',
  component: PageComponent,
  data:{
    title: "Участникам"
  }
},
{
  path:'speakers',
  component: PageComponent,
  data:{
    title: "Спикеры"
  }
},
{
  path:'calendar',
  component: PageComponent,
  data:{
    title: "Календарь мероприятий"
  }
},
{

  path:'contacts',
  component: PageComponent,
  data:{
    title: "Контакты"
  }
}
];*/
