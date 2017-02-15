import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { PageComponent } from 'app/page/page.component'



const routes: Routes = [
{
  path:'home',
  component: PageComponent,
  data:{
    title: "Домашняя страница"
  }
},
{
  path:'events',
  component: PageComponent,
  data:{
    title: "Список событий"
  }
},
{
  path:'calendar',
  component: PageComponent,
  data:{
    title: "Календарь"
  }
},
{
  path:'constructor',
  component: PageComponent,
  data:{
    title: "О проекте"
  }
},
{
  path:'contacts',
  component: PageComponent,
  data:{
    title: "О проекте"
  }
}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
