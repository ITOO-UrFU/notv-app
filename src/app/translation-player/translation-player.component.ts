import {Component, Input, OnInit} from '@angular/core';
// import { User } from 'app/user';
// import { Router, Routes } from '@angular/router';
import {SpeakersService} from 'app/speakers/speakers.service';
import {Title} from '@angular/platform-browser';

import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'div.translation-player',
  styleUrls: ['./translation-player.component.scss'],
  template: `
    <div class="translation-player-wrap">
      <div class="translation-player-title">{{ 'event_broadcast_label' | translate }}</div>
      <div class="videowrapper">
        <iframe width="560" height="315" [src]="url" frameborder="0" allowfullscreen></iframe>
      </div>
    </div>
  `,

})
export class TranslationPlayerComponent implements OnInit {

  // name:string;
  // video: any = {id: 'wzrnuUOoFNM'};
  @Input() translationUrl: any;
  url: any;

  // baseUrl:string = 'https://www.youtube.com/embed/';
  constructor(private sanitizer: DomSanitizer) {
    // console.log(this.translationUrl);

  }

  // speakersList: any[];
  //
  // constructor(private router: Router, private speakersService: SpeakersService, private title: Title) {}

  ngOnInit() {
    // console.log("TranslationPlayerComponent init", this.translationUrl);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.translationUrl.replace('watch?v=', 'embed/'));
    //   this.title.setTitle("Спикеры");
    //   this.speakersService.getSpeakersList()
    //     .subscribe(speakersList => {
    //         this.speakersList = speakersList;
    //         console.log(this.speakersList);
    //       }
    //     );
  }
}
