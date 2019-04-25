import {Component, Input, OnInit, AfterViewChecked, AfterViewInit, ViewChildren, QueryList} from '@angular/core';
import {EventsService} from 'app/events/events.service';
import {Router} from '@angular/router';
import {Event} from 'app/events/event';
import {Title} from '@angular/platform-browser';
import {AuthGuard} from 'app/services/auth.guard';
import {RegisterService} from 'app/services/register.service';
import {AuthenticationService} from 'app/services/auth.service';
import {TranslateService} from 'app/translate/translate.service';
import {EventComponent} from '../event/event.component';
import {ScrollHelper} from 'app/helpers';

@Component({
  selector: 'div.app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss'],
  host: {'(window:scroll)': 'scrollFunction()'},
  // directives: [EventComponent],
})

export class EventListComponent implements OnInit, AfterViewChecked {
  eventsList: Event[];
  // conferenceDates: Date[] = [];
  // selectedDay: any;
  // selectedTime: any;
  // selectedTime: any;
  uniqueTimes: any[];
  currentEvents: Event[];
  timeGrid: any;

  currentUser: any;
  // hideEvents: false;

  isLogged: boolean = false;
  showResetFilter = false;
  private eventsDisableFilter = ['dinner', 'coffee_break'];
  private scrollHelper: ScrollHelper = new ScrollHelper();

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

  scroll_position: any = null;

  @Input() typeFilter: string = '';

  @ViewChildren('cmp') components: QueryList<EventComponent>;

  onChanged(increased) {
    this.currentUser = increased.CU;
    this.components.filter((child) => {
      return child.currentEvent.id === increased.id;
    })[0].isReg = increased.status;
    // this.filterChange();
  }

  constructor(private router: Router,
              private eventsService: EventsService,
              private title: Title,
              private authGuard: AuthGuard,
              private registerService: RegisterService,
              private authenticationService: AuthenticationService,
              private _translate: TranslateService,
  ) {
  }

  scrollFunction() {
    // if (!this.scroll_position) {
      localStorage.setItem('events_offset', document.documentElement.scrollTop.toString());
    // }
    // localStorage.setItem('events_offset', window.pageYOffset.toString());
    // if(document.getElementById("return-to-top")){
    //   if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    //     document.getElementById("return-to-top").style.display = "block";
    //   } else {
    //     document.getElementById("return-to-top").style.display = "none";
    //   }
    // }
  }

  // topFunction() {
  //   // document.body.scrollTop = 0;
  //   // document.documentElement.scrollTop = 0;
  //   let scrollDuration = 300;
  //   var scrollStep = -window.scrollY / (scrollDuration / 15),
  //     scrollInterval = setInterval(function(){
  //       if ( window.scrollY != 50 ) {
  //         window.scrollBy( 0, scrollStep );
  //       }
  //       else{
  //         clearInterval(scrollInterval);
  //       }
  //     }, 15);
  // }


  ngOnInit() {
    this.isLogged = this.authGuard.is_logged();
    this.title.setTitle('Мероприятия');

    this.eventsService.getEventsList()
      .subscribe(eventsList => {
          this.timeGrid = eventsList;
          this.timeGrid = this.eventsService.getEventsObject(this.typeFilter);
          let UniqueDates = this.getUniqueDates(eventsList);
          this.filters.by_day = UniqueDates.map(function (item, idx) {
            return {
              name: item.getDate() + ' ' + this._translate.instant('month_' + item.getMonth() + '_1') + ' ' + item.getFullYear(),
              value: item.getDate()
            };
          }, this);

          this.filters.by_path = this.getPathList(eventsList);
          this.filters.by_type = this.getTypesList(eventsList);

          this.user_filters.by_path = this.filters.by_path;
          this.user_filters.by_type = this.filters.by_type;

          this.filters.by_day.unshift({name: this._translate.instant('three_days_label'), value: 'all'});
          this.user_filters.by_day = 'all';

          if (localStorage.getItem('user_filters')) {
            this.user_filters = JSON.parse(localStorage.getItem('user_filters'));

            if (!(this.arraysIsEqual(Object.keys(this.user_filters.by_type).sort(), Object.keys(this.filters.by_type).sort()) && this.arraysIsEqual(Object.keys(this.user_filters.by_path).sort(), Object.keys(this.filters.by_path).sort()))) {
              this.user_filters.by_path = this.filters.by_path;
              this.user_filters.by_type = this.filters.by_type;
            }
            this.filterChange();
          }

        if(localStorage.getItem('events_offset')){
          this.scroll_position = parseInt(localStorage.getItem('events_offset'));
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

  ngAfterViewChecked() {
    if (this.scroll_position) {
      window.scrollTo(0, this.scroll_position);
      this.scroll_position = null;
    }
  }

  filterChange() {
    this.currentEvents = this.eventsService.filter_events(this.user_filters);
    this.timeGrid = this.eventsService.eventsListToObject(this.currentEvents);
    localStorage.setItem('user_filters', JSON.stringify(this.user_filters));

    console.log(this.currentEvents);

    if (Object.keys(this.user_filters.by_path).some(item => {
      return this.user_filters.by_path[item].checked;
    }) || Object.keys(this.user_filters.by_type).some(item => {
      return this.user_filters.by_type[item].checked;
    }) || this.user_filters.by_day !== 'all') {
      this.showResetFilter = true;
    } else {
      this.showResetFilter = false;
    }

    // kostyl'
    if (window.pageYOffset > document.getElementsByClassName('events-list-wrap')[0].getBoundingClientRect().top + window.scrollY) {
      this.scrollHelper.scrollToFirst('events-list-wrap');
      this.scrollHelper.doScroll();
    }
  }

  resetFilters() {
    this.user_filters.by_day = 'all';
    Object.keys(this.user_filters.by_path).forEach(item => this.user_filters.by_path[item].checked = false);
    Object.keys(this.user_filters.by_type).forEach(item => this.user_filters.by_type[item].checked = false);
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
          types[event.get_event_slug] = {
            'title': event.eventtype,
            'slug': event.get_event_slug,
            'checked': false,
          };
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
          event.path.checked = false;
          paths[event.path.slug] = event.path;
        }
      }

    }
    return paths;
  }

  arraysIsEqual(a, b) {
    if (a === b) {
      return true;
    }
    if (a == null || b == null) {
      return false;
    }
    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
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
