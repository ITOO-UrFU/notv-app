import {Component, Input, OnInit} from '@angular/core';
import {EventsService} from 'app/events/events.service';
import {Router} from '@angular/router';
import {Event} from 'app/events/event';
import {Title} from '@angular/platform-browser';
import {AuthGuard} from 'app/services/auth.guard';
import {RegisterService} from 'app/services/register.service';
import {AuthenticationService} from 'app/services/auth.service';
import {TranslateService} from 'app/translate/translate.service';

@Component({
  selector: 'div.app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
})

export class EventListComponent implements OnInit {
  eventsList: Event[];
  // conferenceDates: Date[] = [];
  // selectedDay: any;
  // selectedTime: any;
  uniqueTimes: any[];
  currentEvents: Event[];
  timeGrid: any;


  currentUser: any;
  hideEvents: false;

  isLogged: boolean = false;

  filters = {
    by_day: [],
  };

  user_filters = {
    by_day: 'all',
  };


  @Input() typeFilter: string = '';


  constructor(private router: Router,
              private eventsService: EventsService,
              private title: Title,
              private authGuard: AuthGuard,
              private registerService: RegisterService,
              private authenticationService: AuthenticationService,
              private _translate: TranslateService,
  ) {
  }

  ngOnInit() {
    this.isLogged = this.authGuard.canActivate();
    this.title.setTitle('Мероприятия');
    console.log('oninit event-list component');

    this.eventsService.getEventsList()
      .subscribe(eventsList => {
          this.timeGrid = eventsList;
          this.timeGrid = this.eventsService.getEventsObject(this.typeFilter);

          let day_label = this._translate.instant('day_label');
          let UniqueDates = this.getUniqueDates(eventsList);
            // .map(item => { return item.getDate() });
          this.filters.by_day = UniqueDates.map(function(item, idx) {
            return { name: day_label + ' ' + (idx + 1), value: item.getDate()};
          });
          this.filters.by_day.unshift({ name: this._translate.instant('two_days_label'), value: 'all'});
          this.user_filters.by_day = 'all';

          if (localStorage.getItem('user_filters')){
            this.user_filters = JSON.parse(localStorage.getItem('user_filters'));
            this.filterChange();
          }

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

  // filter_events
  filterChange() {
    this.currentEvents = this.eventsService.filter_events(this.user_filters);
    console.log(this.currentEvents);
    this.timeGrid = this.eventsService.eventsListToObject(this.currentEvents);
    // console.log(this.currentEvents)
    localStorage.setItem('user_filters', JSON.stringify(this.user_filters));
    // console.log(this.user_filters);
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
      return a.getTime() - b.getTime();
    });
    return uniqueDates;
  }


}
