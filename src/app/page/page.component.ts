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
    private id: number;
    private subscription: Subscription;
  
  constructor(
              private router:Router, 
              private pageService: PageService, 
              private activateRoute: ActivatedRoute,
              private titleService: Title 
              ) { 
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
    this.pageService.getPages('/' + id)
      .subscribe(
        page => {
          this.page = page;
          this.setTitle(page.title);
          this.subPages = [];
          if(this.page.pages.length > 0)
          {
            for (let subpage of this.page.pages){
              this.subPages.push(subpage);   
            }
          }
      },
      error => {
        this.errorMessage = error
      }

      
      );
  }


  ngOnDestroy() {
    //console.log("Я отработала")
    // this.getPages(this.activateRoute.snapshot.params['id'])
    this.errorMessage="";
    this.subscription.unsubscribe()
     
  }
  
}
