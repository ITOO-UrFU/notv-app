import { Component, OnInit } from '@angular/core';
import { HomePageService } from 'app/home-page/home-page.service';
import { Router, Routes } from '@angular/router';
import { CarouselConfig } from 'app/carousel/carousel.config';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [
      {
        provide: CarouselConfig, 
        useValue: {interval: 30000, noPause: true}
      }
    ]
})
export class HomePageComponent implements OnInit {

homePage: any;
 public slides: any[] = [];

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
