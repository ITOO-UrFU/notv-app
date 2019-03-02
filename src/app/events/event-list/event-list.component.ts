import {Component, Input, OnInit} from '@angular/core';
import {EventsService} from 'app/events/events.service';
import {Router} from '@angular/router';
import {Event} from 'app/events/event';
import {Title} from '@angular/platform-browser';
import {AuthGuard} from 'app/services/auth.guard';
import {RegisterService} from 'app/services/register.service';
import {AuthenticationService} from 'app/services/auth.service';

@Component({
  selector: 'div.app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})

export class EventListComponent implements OnInit {
  eventsList: Event[];
  conferenceDates: Date[] = [];
  selectedDay: any;
  selectedTime: any;
  uniqueTimes: any[];
  currentEvents: Event[];
  timeGrid: any;


  currentUser: any;
  hideEvents: false;

  isLogged: boolean = false;


  @Input() typeFilter: string = '';


  constructor(private router: Router,
              private eventsService: EventsService,
              private title: Title,
              private authGuard: AuthGuard,
              private registerService: RegisterService,
              private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.isLogged = this.authGuard.canActivate();
    this.title.setTitle('Мероприятия');
    this.eventsService.getEventsList()
      .subscribe(eventsList => {
        this.timeGrid = []; //eventsList;
        console.log(this.eventsList);
        this.timeGrid = []; //this.eventsService.getEventsObject(this.typeFilter);
        this.registerService.getProfile().subscribe(
          userProfile => {
            this.currentUser = userProfile;
          },
          error => {
            this.authenticationService.logout();
          }
        );
        }
      );
  }

  ngOnChanges(changes: any) {
    if (this.eventsList) {
      this.timeGrid = this.eventsService.getEventsObject(this.typeFilter);
    }
  }

  funcSelectedDay(value) {
    this.uniqueTimes = this.eventsService.getUniqueTimesByDay(value);
  }

  funcSelectedTime(value) {
    this.currentEvents = this.eventsService.getEventsByDayTimes(value);

  }

  public toEvent(event: Event) {
    this.router.navigate(['events', 'event', event.id]);
  }

  // передаем список событий
  // получаем отсортированный список дат, когда есть события
  getUniqueDates(eventsList: Event[]) {
    let uniqueDates: Date[] = [];
    for (let item of eventsList) {
      let event: Event = item;
      if (!uniqueDates.find(item => item.getDate() === event.startdate.getDate() && item.getMonth() === event.startdate.getMonth())) {
        uniqueDates.push(event.startdate);
      }
      /*if(!uniqueDates.find(item => item.getTime() == event.startdate.getTime() )){
          uniqueDates.push(event.startdate);
      }*/
    }
    uniqueDates.sort(function (a, b) {
      return a.getTime() - b.getTime()
    });
    return uniqueDates;
  }


}
