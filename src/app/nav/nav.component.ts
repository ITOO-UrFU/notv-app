import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { PageService } from 'app/page.service';
import { PageComponent } from 'app/page/page.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  listUrl: any[] = [];


  constructor( private router:Router, private pageService: PageService ){}



loadUrl(page){
  console.log(page);
  this.router.config = [];
  for(let x of page){
    this.router.config.push(
      {
        path: x.slug,
        component: PageComponent
      }
    );
  }
    this.router.resetConfig(this.router.config);
    console.log(this.router.config)
  
}

  ngOnInit() {
    this.pageService.getPageList()
                    .subscribe(page => {
                      this.loadUrl(page);
                      page  //.filter(element => {return element.pages.length})
                      .forEach(element => {
                        this.listUrl.push({url: element.slug, title: element.slug})
                      });
                    })
  }
}
