import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PageService } from 'app/page.service';

import { Page } from 'app/page'

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnDestroy {

  page: Page;
    private id: number;
    private subscription: Subscription;
  constructor(private router:Router, private pageService: PageService, private activateRoute: ActivatedRoute) { 

    this.subscription = activateRoute.params.subscribe(params=>this.getPages(params['id']));
  }
  
  getPages(id:string)  {
  
    
    this.pageService.getPages('/'+id)
      .subscribe(
        page => {
          this.page = page;
          console.log(this.page)
      });
  }

  ngOnDestroy() {
    console.log("Я отработала")
    // console.log(this.router)
    // this.getPages(this.activateRoute.snapshot.params['id'])
    this.subscription.unsubscribe()
     
  }
  
}
