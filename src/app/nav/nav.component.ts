import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { PageService } from 'app/page.service';
import { PageComponent } from 'app/page/page.component';

import {TranslateService} from 'ng2-translate';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  listUrl: any[] = [];


  constructor( private router:Router, private pageService: PageService, private translate: TranslateService ){
        translate.addLangs(["en", "ru"]);
        translate.setDefaultLang('en');
        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');

  }



  loadUrls(page: any[]) {
    page.forEach(element => {
      this.router.config.push(
        {
          path: element.slug,
          component: PageComponent,
        }
      );
    });
    this.router.resetConfig(this.router.config);
    console.log(this.router.config);
 
  }

  ngOnInit() {
    this.pageService.getPageList()
                    .subscribe(page => {
                      this.loadUrls(page);
                      page  //.filter(element => {return element.pages.length})
                      .forEach(element => {
                        this.listUrl.push({url: element.slug, title: element.slug})
                      });
                    })
  }
}
