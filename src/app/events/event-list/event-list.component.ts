import { Component, OnInit } from '@angular/core';
import { EventsService } from 'app/events/events.service';
import { Router, Routes } from '@angular/router';
import { Event } from 'app/events/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})

export class EventListComponent implements OnInit {
 
  eventsList: Event[];
  conferenceDates: Date[] = [];

  constructor(private router:Router, private eventsService: EventsService) { }

  ngOnInit() {
        this.eventsService.getEventsList()
          .subscribe(eventsList => { 
            this.eventsList = eventsList;
            this.conferenceDates = this.getUniqueDates(eventsList);
        }
      );
  }


 // передаем список событий
 // получаем отсортированный список дат, когда есть события
  getUniqueDates(eventsList:Event[]){
    let uniqueDates:Date[] = [];
        for(let item of eventsList){
          let event: Event = item;
          if(!uniqueDates.find(item => item.getDate() === event.startdate.getDate() && item.getMonth() === event.startdate.getMonth() )){
              uniqueDates.push(event.startdate);
           }
        }
    uniqueDates.sort(function(a,b){return a.getTime() - b.getTime()});
    console.log(uniqueDates);
    return uniqueDates;
  }


}
