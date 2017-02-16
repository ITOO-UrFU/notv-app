import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PageService } from 'app/page.service';

import { Page } from 'app/page'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  page: Page;
  constructor(private router:Router, private pageService: PageService) { }
  
  getPages(router:Router)  {
    let url = router.url.split('/');
    
    this.pageService.getPages('/'+url[url.length-1])
      .subscribe(
        page => {
          this.page = page;
          console.log(this.page)
      });
  }

  ngOnInit() {
     this.getPages(this.router)

  }
}
