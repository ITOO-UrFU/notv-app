import { Component, OnDestroy, HostListener } from '@angular/core';
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
          console.log(this.page)
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

@HostListener("window:scroll", [])
  onWindowScroll() {
   // console.log("scroll")
    this.scrollFunction();
  }

 scrollFunction() {
   if(document.getElementById("return-to-top")){
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("return-to-top").style.display = "block";
    } else {
        document.getElementById("return-to-top").style.display = "none";
    }
   }
}

  topFunction() {
    // document.body.scrollTop = 0;
    // document.documentElement.scrollTop = 0;
    let scrollDuration = 300;
    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval); 
    },15);
}


  ngOnDestroy() {
    //console.log("Я отработала")
    // this.getPages(this.activateRoute.snapshot.params['id'])
    this.errorMessage="";
    this.subscription.unsubscribe()
     
  }
  
}
