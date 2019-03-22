import {Component, OnInit} from '@angular/core';
import {HomePageService} from 'app/home-page/home-page.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'div.app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})

export class HomePageComponent implements OnInit {

  homePage: any;
  public slides: any[] = [];
  sliderTimeOut: any;
  public sliderInterval = 5000; //in ms
  public userLang: any;

  constructor(private router: Router,
              private homepageService: HomePageService,
              private title: Title,
  ) {

  }

  ngOnInit() {
    this.userLang = navigator.language || window.navigator['userLanguage'];

    this.title.setTitle('EDCRUNCH Ural: новые образовательные технологии в вузе – 2019');
    this.homepageService.getHomePage()
      .subscribe(homePage => {
        this.homePage = homePage;

        this.homePage.pages.find(slider => slider.slug == 'slider').pages.forEach(element => {
          element.active = false;
          this.slides.push(element);
        });
        this.slides[0].active = true;
        this.startSlider();


      });
  }

  toEventByDirection(direction: string) {
    this.router.navigate(['events', direction]);
  }

  startSlider() {
    this.sliderTimeOut = setInterval(() => {
      this.nextSlide();
    }, this.sliderInterval);
  }

  pauseSlider() {
    clearTimeout(this.sliderTimeOut);
  }

  nextSlide() {
    let currentSlide = this.slides.map(x => x.active).indexOf(true);
    this.slides[currentSlide].active = false;
    if (currentSlide == this.slides.length - 1) {
      this.slides[0].active = true;
    } else {
      this.slides[currentSlide + 1].active = true;
    }
  }

  prevSlide() {
    let currentSlide = this.slides.map(x => x.active).indexOf(true);
    this.slides[currentSlide].active = false;
    if (currentSlide == 0) {
      this.slides[this.slides.length - 1].active = true;
    } else {
      this.slides[currentSlide - 1].active = true;
    }
  }

}
