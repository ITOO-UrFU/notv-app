import { Component, OnInit } from '@angular/core';
import { User } from 'app/user';
import { Router, Routes } from '@angular/router';
import { SpeakersService } from 'app/speakers/speakers.service';

@Component({
  selector: 'app-speakers-list',
  templateUrl: './speakers-list.component.html',
  styleUrls: ['./speakers-list.component.scss']
})
export class SpeakersListComponent implements OnInit {

 speakersList: any[];


constructor(private router:Router, private speakersService: SpeakersService) { 

}

  ngOnInit() {
        this.speakersService.getSpeakersList()
          .subscribe(speakersList => { 
            this.speakersList = speakersList;
            console.log(this.speakersList)
        }
      );
  }
}
