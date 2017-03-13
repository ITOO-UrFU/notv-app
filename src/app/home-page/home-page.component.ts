import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { HomePageService } from 'app/home-page/home-page.service';
import { Router, Routes } from '@angular/router';
//import { CarouselConfig } from 'app/carousel/carousel.config';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
 /* providers: [
      {
        provide: CarouselConfig, 
        useValue: {interval: 30000, noPause: true}
      }
    ]*/
})
export class HomePageComponent implements OnInit, AfterViewInit  {

 homePage: any;
 public slides: any[] = [];

  constructor(private router:Router, private homepageService: HomePageService) {

   }

  ngAfterViewInit() {
  // console.log(document.querySelectorAll(".slide"));
  }

  ngOnInit() {
            this.homepageService.getHomePage()
          .subscribe(homePage => { 
            this.homePage = homePage;

            console.log(this.homePage);
            this.homePage.pages.find(slider => slider.slug == "slider").pages.forEach(element => {
              element.active = false;
              this.slides.push(element);
            });
            this.slides[0].active= true;

            setInterval(() =>this.nextSlide(), 300000);
        })
  }

nextSlide(){
      let currentSlide = this.slides.map(x => x.active).indexOf(true);
      this.slides[currentSlide].active = false;
      if(currentSlide == this.slides.length-1){
        this.slides[0].active = true;
      }
      else{
        this.slides[currentSlide+1].active = true;
      }
}

prevSlide(){
      let currentSlide = this.slides.map(x => x.active).indexOf(true);
      this.slides[currentSlide].active = false;
      if(currentSlide == 0){
        this.slides[this.slides.length-1].active = true;
      }
      else{
        this.slides[currentSlide-1].active = true;
      }
}


}
