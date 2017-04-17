import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, Routes, ActivatedRoute } from '@angular/router';

import { PageService } from 'app/page.service';
import { PageComponent } from 'app/page/page.component';
import { EventListComponent } from 'app/events/event-list/event-list.component';

import {TranslateService} from 'ng2-translate';

import { AuthenticationService } from 'app/services/auth.service';
import { AuthGuard } from 'app/services/auth.guard';

@Component({
  selector: 'header.app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit, AfterViewInit {
  listUrl: any[] = [];
  underListUrl: Boolean = false;
  activeUrl: any = {};
  showMenu: Boolean = false;

  constructor( 
              private router: Router,
              private pageService: PageService,
              private translate: TranslateService,
              private authGuard: AuthGuard,
              private activatedRoute: ActivatedRoute
             ){
        translate.addLangs(["en", "ru"]);
        translate.setDefaultLang('en');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  toggleMenuVisible(disable: Boolean){
    this.showMenu = !this.showMenu;
    if(disable == true){
      this.showMenu == false;
    }
  }

  ngOnInit() {
    this.pageService.getPageList()
      .subscribe(page => {
        page.pages
          .forEach(element => {
            if (element.pages.length) {
              let array: any[] = [];
              element.pages.forEach(element => {
                  array.push({ url: element.slug, title: element.title ? element.title : element.slug, type: element.type })    
              })
                this.listUrl.push({ url: element.slug, title: element.title ? element.title : element.slug, underpage: array, type: element.type })
            }
            else {
              if (element.slug == "login" && this.authGuard.canActivate() ){
                    this.listUrl.push({ url: "profile/my", title: "Профиль",   })
                    /* Сслыка на профиль */
              }
              else{
                 this.listUrl.push({ url: element.slug, title: element.title ? element.title : element.slug, underpage: false, type: element.type  })
              }
            }
          });

          this.activeUrl = this.listUrl.filter(item => item.url == this.router.url.split("/")[1])[0];

    });
}

ngAfterViewInit(){
    if (window.location.hash) {
      this.goTo(window.location.hash.replace('#', ''));
    }
}

goTo(location: string): void {

  if (document.getElementById(location) != null) {
      history.pushState(null, null, window.location.pathname + '#' + location);
      window.scrollTo(0, document.getElementById(location).getBoundingClientRect().top);
  }
}

}
