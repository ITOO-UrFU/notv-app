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
  path:'about',
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
