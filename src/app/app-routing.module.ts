import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageService } from 'app/page.service';
import { Page } from 'app/page'

class PageList {
  pages: Page[];

  constructor(private heroService: PageService){}

    getPages()  {
     this.heroService
        .getPages()
        .subscribe(
          pages => {
            this.pages = pages;
            console.log(this.pages)
        });
  }
}


const routes: Routes = [
  {
    path: '',
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
