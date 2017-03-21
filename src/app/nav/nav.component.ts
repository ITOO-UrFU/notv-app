import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

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

export class NavComponent implements OnInit {
  listUrl: any[] = [];
  underListUrl: Boolean = false;
  activeUrl: any = {};
  showMenu: Boolean = false;

  constructor( 
              private router:Router, 
              private pageService: PageService, 
              private translate: TranslateService, 
              private authGuard: AuthGuard 
             ){
        translate.addLangs(["en", "ru"]);
        translate.setDefaultLang('en');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }

  toggleMenuVisible(disable: Boolean){
    this.showMenu = !this.showMenu;
    if(disable==true){
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
              
              if(element.slug=="login" && this.authGuard.canActivate() ){
                
                    this.listUrl.push({ url: "profile/edit", title: "Профиль"  })
              }
              else{
                 this.listUrl.push({ url: element.slug, title: element.title ? element.title : element.slug, underpage: false, type: element.type  })
              }
                }
          });


          this.activeUrl = this.listUrl.filter(item => item.url == this.router.url.split("/")[1])[0];
          
         //console.log(this.activeUrl)
         /*if(this.activeUrl.underpage.length>0){
           this.router.navigate([this.activeUrl.url+'/'+]);
         }*/
      // this.listUrl.push({ url: 'events', title: 'Мероприятия' })
 
      })

console.log(this.listUrl);  
}
goTo(location: string): void {

    history.pushState(null, null, window.location.pathname + '#' + location);
    window.scrollTo(0, document.getElementById(location).getBoundingClientRect().top);
}

}
