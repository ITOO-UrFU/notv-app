import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { PageComponent } from 'app/page/page.component'



const routes: Routes = [
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
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
