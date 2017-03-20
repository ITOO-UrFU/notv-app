import { Component, OnInit,  ViewEncapsulation  } from '@angular/core';
import { Router, Routes } from '@angular/router';




import { NavigationStart, NavigationError, NavigationCancel , NavigationEnd} from '@angular/router';

import { PageService } from 'app/page.service';
import { PageComponent } from 'app/page/page.component';

@Component({
  selector: 'body.app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})


export class AppComponent implements OnInit{

  component:any = {
    name: 'AppComponent',
  };
  
constructor() {

  }
  


  ngOnInit() { 


  }
}
