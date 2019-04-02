import {Component, Input, OnInit, OnDestroy, AfterViewChecked} from '@angular/core';
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
  host: {'(window:scroll)': 'setScroll()'}
})

export class EventListComponent implements OnInit, OnDestroy, AfterViewChecked {
  eventsList: Event[];
  // conferenceDates: Date[] = [];
  // selectedDay: any;
  // selectedTime: any;
  // selectedTime: any;
  uniqueTimes: any[];
  currentEvents: Event[];
  timeGrid: any;

  scrollOffset = 0;

  currentUser: any;
  // hideEvents: false;

  isLogged: boolean = false;
  showResetFilter = false;
  private eventsDisableFilter = ['dinner', 'coffee_break'];

  filters = {
    by_day: [],
    by_path: {},
    by_type: {},
  };

  user_filters = {
    by_day: 'all',
    by_path: {},
    by_type: {},
  };
  objectKeys = Object.keys;

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

  setScroll(){
    localStorage.setItem('events_offset', window.pageYOffset.toString());
  }
  ngOnDestroy(){
    console.log("OnDestroy")
    // @HostListener('window:scroll', ['$event']);

    // console.log('destroy', );
  }

  ngOnInit() {
    this.isLogged = this.authGuard.canActivate();
    this.title.setTitle('Мероприятия');
    console.log('oninit event-list component');

    this.eventsService.getEventsList()
      .subscribe(eventsList => {
          this.timeGrid = eventsList;
          this.timeGrid = this.eventsService.getEventsObject(this.typeFilter);

          console.log(eventsList);

          // let day_label = this._translate.instant('day_label');
          let UniqueDates = this.getUniqueDates(eventsList);
          // .map(item => { return item.getDate() });
          this.filters.by_day = UniqueDates.map(function (item, idx) {
            return {
              name: item.getDate() + ' ' + this._translate.instant('month_' + item.getMonth() + '_1') + ' ' + item.getFullYear(),
              value: item.getDate()
            };
          }, this);

          this.filters.by_path = this.getPathList(eventsList);
          this.filters.by_type = this.getTypesList(eventsList);
          console.log(this.filters);

          this.user_filters.by_path = this.filters.by_path;
          this.user_filters.by_type = this.filters.by_type;

          this.filters.by_day.unshift({name: this._translate.instant('two_days_label'), value: 'all'});
          this.user_filters.by_day = 'all';

          // if (localStorage.getItem('user_filters')) {
          //   this.user_filters = JSON.parse(localStorage.getItem('user_filters'));
          //   this.filterChange();
          // }

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

    console.log('filters: ', this.filters);
    console.log('user filters: ', this.user_filters);
  }

  ngAfterViewChecked() {
    if(localStorage.getItem('events_offset')){
      window.scrollTo(0, parseInt(localStorage.getItem('events_offset')))
    }

  }
  filterChange() {
    this.currentEvents = this.eventsService.filter_events(this.user_filters);

    // console.log("Показано мероприятий", this.currentEvents.length);

    this.timeGrid = this.eventsService.eventsListToObject(this.currentEvents);
    // console.log(this.timeGrid);
    localStorage.setItem('user_filters', JSON.stringify(this.user_filters));

    // if (this.user_filters.by_path.some(item => {
    //   return item.checked;
    // }) || this.user_filters.by_type.some(item => {
    //   return item.checked;
    // }) || this.user_filters.by_day !== 'all') {
    //   this.showResetFilter = true;
    // } else {
    //   this.showResetFilter = false;
    // }
  }

  resetFilters() {
    console.log(this.filters);
    this.user_filters.by_day = 'all';
    // this.user_filters.by_path.forEach(item => item.checked = false);
    // this.user_filters.by_type.forEach(item => item.checked = false);
    this.filterChange();
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

  getTypesList(eventsList: Event[]) {
    let types = {};
    for (let item of eventsList) {
      let event: Event = item;
      if (event.get_event_slug !== 'empty' && !this.eventsDisableFilter.includes(event.get_event_slug)) {
        if (!Object.keys(types).find(item => item === event.get_event_slug)) {
          // event.path.checked = false;
          // console.log();
          // types.push(
          types[event.get_event_slug] = {
              'title': event.eventtype,
              'slug': event.get_event_slug,
              'checked': false,
            };
            // );
        }
      }

    }
    return types;
  }

  getPathList(eventsList: Event[]) {
    let paths = {};
    for (let item of eventsList) {
      let event: Event = item;
      if (event.path) {
        if (!Object.keys(paths).find(item => item === event.path.slug)) {
          // event.path.checked = false;
          paths[event.path.slug] = event.path;

          // paths[event.get_event_slug] = {
          //   'title': event.eventtype,
          //   'slug': event.get_event_slug,
          //   'checked': false,
          // };
        }
      }

    }
    console.log(paths);
    return paths;
  }

  // updateTypesList(){
  //
  // }


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
