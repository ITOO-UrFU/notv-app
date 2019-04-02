import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PageService} from 'app/page.service';

import {Page} from 'app/page';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnDestroy, OnInit {

  subPages: any[] = [];
  errorMessage: string;
  dangerousUrl: any;
  trustedUrl: any;
  public userLang: any;
  page: Page;
  private id: number;
  private subscription: Subscription;

  ngOnInit(){
    // console.log("this.page.type: ", this.page);
    this.userLang = navigator.language || window.navigator['userLanguage'];
    // console.log(navigator, )
    // if( document.getElementById("hotel-map")){
    //             const fragment = document.createRange().createContextualFragment("<script type='text/javascript' charset='utf-8' async src='https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A416166cf5c7cfc16ad8b56e6c3f87885dd7ea8d54dae469c2c59c86e8d23c4fa&amp;width=600&amp;height=450&amp;lang=ru_RU&amp;scroll=true'></script>");
    //           document.getElementById("hotel-map").appendChild(fragment);
    // }
  }



  constructor(
              private router: Router,
              private pageService: PageService,
              private activateRoute: ActivatedRoute,
              private titleService: Title,
              private sanitizer: DomSanitizer
              ) {
    this.subscription = activateRoute.params.subscribe(
      params => this.getPages(params['id']),
      error => this.errorMessage = "Неверный адрес!"
      );

    router.events.subscribe((val) => {
          this.errorMessage = "";
    });



}

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  getPages(id: string)  {
    this.pageService.getPages('/' + id)
      .subscribe(
        page => {
          this.page = page;
          this.setTitle(page.title);
          this.subPages = [];
          if (this.page.pages.length > 0){
            for (let subpage of this.page.pages){
              this.subPages.push(subpage);
            }
          }
      },
      error => {
        this.errorMessage = error;
      }
      );
  }

@HostListener("window:scroll", [])
  onWindowScroll() {
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
        else{
          clearInterval(scrollInterval);
        }
    }, 15);
}


  ngOnDestroy() {
    this.errorMessage = "";
    this.subscription.unsubscribe()
  }

}
