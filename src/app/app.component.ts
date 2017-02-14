import { Component, OnInit  } from '@angular/core';

import { PageService } from 'app/page.service';
import { Page } from 'app/page'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'app works!';
  pages: Page[];

  constructor(private heroService: PageService){}

  getPages()  {
    this.heroService
      .getPages()
      .subscribe(
        pages => {
          this.pages = pages;
          console.log(this.pages)
      });
  }
  ngOnInit() {
    this.getPages()
  }
}
