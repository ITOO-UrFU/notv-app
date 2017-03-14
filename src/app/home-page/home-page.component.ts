import { Component, OnInit, AfterViewInit  } from '@angular/core';
import { HomePageService } from 'app/home-page/home-page.service';
import { Router, Routes } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})

export class HomePageComponent implements OnInit  {

 homePage: any;
 public slides: any[] = [];
 sliderTimeOut:any;
 public sliderInterval = 5000; //in ms

  constructor(private router:Router, private homepageService: HomePageService) {

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
            this.startSlider();
           
        })
  }

startSlider(){
    console.log("start slider!");
 this.sliderTimeOut =  setInterval(() => { this.nextSlide(); }, this.sliderInterval);
}

pauseSlider(){
  console.log("pause slider!");
  clearTimeout(this.sliderTimeOut);
}

nextSlide(){
      console.log("next slide");
      let currentSlide = this.slides.map(x => x.active).indexOf(true);
      this.slides[currentSlide].active = false;
      if(currentSlide == this.slides.length - 1){
        this.slides[0].active = true;
      }
      else{
        this.slides[currentSlide + 1].active = true;
      }
}

prevSlide(){
      console.log("prev slide");
      let currentSlide = this.slides.map(x => x.active).indexOf(true);
      this.slides[currentSlide].active = false;
      if(currentSlide == 0){
        this.slides[this.slides.length - 1].active = true;
      }
      else{
        this.slides[currentSlide - 1].active = true;
      }
}


}
