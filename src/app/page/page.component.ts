import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PageService } from 'app/page.service';

import { Page } from 'app/page'
import { Title }     from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnDestroy {

  subPages: any[] = [];
  errorMessage: string;

  page: Page;
  id: string;
    private subscription: Subscription;
  
  constructor( private router:Router, private pageService: PageService, private activateRoute: ActivatedRoute, private titleService: Title ) { 
    this.subscription = activateRoute.params.subscribe(
      params=> this.getPages(params['id']),
      error => this.errorMessage = "Неверный адрес!"
      );
      
    router.events.subscribe((val) => {
          this.errorMessage="";
    });
   
  }
  
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getPages(id:string)  {
    this.id = id;   
    this.pageService.getPages('/' + id)
      .subscribe(
        page => {
          this.page = page;
          this.setTitle(page.title);
        },
        error => {
          this.errorMessage = error
        }
      );
  }


  ngOnDestroy() {
    this.errorMessage="";
    this.subscription.unsubscribe()  
  }
  
}
