import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { PageService } from 'app/page.service';
import { PageComponent } from 'app/page/page.component';
import { EventListComponent } from 'app/events/event-list/event-list.component';

import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'] 
})

export class NavComponent implements OnInit {
  listUrl: any[] = [];
  underListUrl: Boolean = false;

  activeUrl: any = {};

  constructor( private router:Router, private pageService: PageService, private translate: TranslateService ){
        translate.addLangs(["en", "ru"]);
        translate.setDefaultLang('en');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');
  }


  showSubMenu(url: any){
    if(url.underpage){
      this.listUrl.forEach(element => {
        element.showUnderPage = false;
      });
      url.showUnderPage = true;
    }
  }

  hideSubMenu(url){
    if(url.showUnderPage != undefined){
      this.listUrl.forEach(element => {
        element.showUnderPage = false;
      });
    this.activeUrl.showUnderPage = true;
    }
  }

  toPage(url: any){
    this.listUrl.forEach(element => {
      element.activePage = false;
    });
    url.activePage = true;
    this.activeUrl = url;

    if(!this.activeUrl.underpage){
      this.listUrl.forEach(element => {
      element.showUnderPage = false;
    });
    }
    
  }

  removePageWithoutSub(list: any){
    //console.log(list);
    let ret = list.filter(item => ((item.underpage != false) && (item.underpage != undefined)) );
    return ret;
  }

  ngOnInit() {
    this.pageService.getPageList()
      .subscribe(page => {
        page.pages
          .forEach(element => {
            if (element.pages.length) {
              let array: any[] = [];
              element.pages.forEach(element => {
                array.push({ url: element.slug, title: element.title ? element.title : element.slug })
              })
              
              this.listUrl.push({ url: element.slug, title: element.title ? element.title : element.slug, underpage: array })
            }
            else this.listUrl.push({ url: element.slug, title: element.title ? element.title : element.slug, underpage: false  })
          });


          this.activeUrl = this.listUrl.filter(item => item.url == this.router.url.split("/")[1])[0];
          
          console.log(this.activeUrl)

          if(this.activeUrl != undefined){
              this.toPage(this.activeUrl);
              this.showSubMenu(this.activeUrl);
          }
          
       this.listUrl.push({ url: 'events', title: 'Мероприятия' })
       console.log(this.removePageWithoutSub(this.listUrl));
      })

 console.log(this.listUrl);  
}

}
