import { Component, OnInit } from '@angular/core';
import { EventsService } from 'app/events/events.service';
import { Router, Routes } from '@angular/router';


@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})

export class EventListComponent implements OnInit {
 
  eventsList: Event[] = [];
  
  constructor(private router:Router, private eventsService: EventsService) { }

  ngOnInit() {
        this.eventsService.getEventsList()
      .subscribe(eventsList => { this.eventsList = eventsList; console.log(this.eventsList)}
        
        
      );
  }

}
