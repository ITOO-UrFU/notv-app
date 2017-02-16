import { Component, OnInit  } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { PageService } from 'app/page.service';
import { PageComponent } from 'app/page/page.component';
import { Page } from 'app/page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{

  component:any = {
    name: 'AppComponent',
  };
  page: Page;
  constructor(private router:Router, private pageService: PageService) { }
  
  coreUrl = [];

  getPages(router:Router)  {
    let url = router.url.split('/');
    
    this.pageService.getPages(url[url.length-1])
      .subscribe(
        page => {
          this.page = page;

          this.loadUrl(page);
      });
  }
  

loadUrl(page){
//this.coreUrl = arr;
//console.log(page);

    for(let x of page){
      this.coreUrl.push(x.slug);
      console.log(x.slug);
    this.router.config.push(
      {
        path: x.slug,
        component: PageComponent
      }
    );
    this.router.resetConfig(this.router.config);
  }

  console.log(this.coreUrl);
}


  ngOnInit() {
     this.pageService.getPageList().subscribe(page => {console.log(page)})
     this.getPages(this.router);
  }
}
