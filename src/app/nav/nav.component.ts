import { Component, OnInit } from '@angular/core';

import { PageService } from 'app/page.service';
import { Page } from 'app/page'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  pages: Page[];

  constructor(private pageService: PageService){}

  getPages()  {
    this.pageService
      .getPages()
      .subscribe(
        pages => {
          this.pages = pages;
      });
  }
  ngOnInit() {
    this.getPages()
  
  }

}
