import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EventsService } from 'app/events/events.service';
import { Event } from 'app/events/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

    currentEvent: Event;
    errorMessage: string;

    constructor(private eventsService: EventsService,
        private activatedRoute: ActivatedRoute,
        private router: Router) { }

  ngOnInit() {
        let id = this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.eventsService.getEvent(id)
                .subscribe(
                event => {
                  this.currentEvent = event;
                  console.log(this.currentEvent);
                },
                error => this.errorMessage = error
                );
        }
  }

    public goBack() {
        this.router.navigate(["/events"]);
    }


}
