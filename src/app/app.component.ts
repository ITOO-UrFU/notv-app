import { Component, OnInit  } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { NavigationStart, NavigationError, NavigationCancel , NavigationEnd} from '@angular/router';

import { PageService } from 'app/page.service';
import { PageComponent } from 'app/page/page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit{

  component:any = {
    name: 'AppComponent',
  };
  
constructor( private router:Router, private pageService: PageService ){
   /*router.events.subscribe(event => {
    if(event instanceof NavigationError) {
      this.router.navigate(link);  
      this.router.navigate(['/about']);
}*/

   // console.log("KIK");
    // NavigationEnd
    // NavigationCancel
    // NavigationError
    // RoutesRecognized
  /* });*/
}
  



  ngOnInit() { 


  }
}
