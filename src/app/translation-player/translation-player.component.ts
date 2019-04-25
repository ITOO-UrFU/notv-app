import {Component, Input, OnInit} from '@angular/core';
// import { User } from 'app/user';
// import { Router, Routes } from '@angular/router';
import {SpeakersService} from 'app/speakers/speakers.service';
import {Title} from '@angular/platform-browser';

import {DomSanitizer} from '@angular/platform-browser';
import {DateFormatter} from '@angular/common/src/pipes/intl';

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

  @Input() video_id: any;
  url: any;

  baseUrl: string = 'https://www.youtube.com/embed/';
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl + this.video_id);
    // var offset = new Date().getTimezoneOffset();
    // console.log(offset);
  }
}
