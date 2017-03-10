import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'app/home-page/home-page.service';
import { Router, Routes } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],

})
export class HomePageComponent implements OnInit {

homePage: any;
 
  constructor(private router:Router, private homepageService: HomePageService) {

   }


  ngOnInit() {
    console.log("this.homePage");
            this.homepageService.getHomePage()
          .subscribe(homePage => { 
            this.homePage = homePage;
            console.log(this.homePage);
        })
  }

}
