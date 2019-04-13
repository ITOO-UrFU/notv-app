import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EventsService } from 'app/events/events.service';
import { Event } from 'app/events/event';
import { AuthGuard } from 'app/services/auth.guard';
import { RegisterService} from 'app/services/register.service';
import { AlertService } from 'app/services/alert.service';
import {AuthenticationService} from 'app/services/auth.service';
import {TranslateService} from '../../translate';

@Component({
  selector: 'div.app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})


export class EventPageComponent implements OnInit {

    // @Input() currentEvent: Event;
    // @Input() isLogged: boolean;
  isLogged: boolean = false;
    // errorMessage: string;

    // @Input() currentUser: any;

    userEvents: String[];
    isReg: boolean;
    currentEvent: Event;
  currentUser: any;

    private eventsDisableButton = ['dinner', 'coffee_break', 'closed_event'];

    showButtons: boolean = false;

    constructor(private eventsService: EventsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private authGuard: AuthGuard,
        private authenticationService: AuthenticationService,
        private registerService: RegisterService,
        private alertService: AlertService,
        private _translate: TranslateService,
        ) { }

  ngOnInit() {

    this.isLogged = this.authGuard.is_logged();

    this.activatedRoute.params.subscribe(params => {
      // console.log(params)
      // console.log(params['id']); // log the value of id
      this.eventsService.getEvent(params['id'])
        .subscribe(event => {
          this.currentEvent = event;

          // console.log(this.vent);
          this.registerService.getProfile().subscribe(
            userProfile => {
              this.currentUser = userProfile;
              console.log(this.currentEvent);
              this.userEvents = this.currentUser.get_events.map(e => {return e.event.id});
              // console.log(this.userEvents)
              if(this.userEvents.includes(this.currentEvent.id)){
                this.isReg = true;
              } else {
                this.isReg = false;
              }
              if (this.eventsDisableButton.includes(this.currentEvent.get_event_slug)){
                this.showButtons = false;
              }
              else {
                this.showButtons = true;
              }
            },
            error => {
              this.authenticationService.logout();
            }
          );


        });
    });


  }

  public toLogin(){
    this.router.navigate(['login'], { queryParams: { back: 'events/' + this.currentEvent.id }});
    }

    public goBack() {
        this.router.navigate(["events"]);
    }

  checkSameTimeEvents(potentialEvent: Event): any[] {
    let sameTimeEvents: any[] = [];
    const offset = new Date().getTimezoneOffset();
    this.currentUser.get_events.forEach(event => {
      const startdate = new Date(event.event.startdate);
      startdate.setMinutes(startdate.getMinutes() + offset.valueOf());
      let currentDate = startdate.getTime();

      if (currentDate == potentialEvent.startdate.getTime()){
        sameTimeEvents.push(event);
      }
    });
    return sameTimeEvents;
  }

  attemptRegisterOnEvent(event: Event) {

    this.registerService.getProfile().subscribe(userProfile => {
      this.currentUser = userProfile;

      let sameEvents: any[] = this.checkSameTimeEvents(event);
      if (sameEvents.length > 0) {
        let sameEventsTitles = '';
        for (let sameEvent of sameEvents){
          sameEventsTitles += sameEvent.event.title + '\r\n';
        }
        if (confirm(this._translate.instant('same_time_events_alert', [this._translate.currentLang === 'ru' ? sameEvents[0].event.title : sameEvents[0].event.title_en, event.title]))) {
          this.registerOnEvent(event);
          this.unregisterOnEvent(sameEvents[0].event);
        }

      } else {
        this.registerOnEvent(event);
      }
    });
  }

  registerOnEvent(event: Event) {
    this.isReg = false;
    this.registerService.registerOnEvent(event.id).subscribe(
      data => {
        this.registerService.getProfile().subscribe(userProfile => {
          this.currentUser = userProfile;
          this.userEvents = userProfile.get_events.map(e => {return e.event.id});
          // this.change({id: event.id, status: true});
          // this.change(this.checkSameTimeEvents(event)[0].event);
          this.isReg = true;
          alert(this._translate.instant('register_event_alert', [event.title]));
          // this.alertService.success('Вы зарегистрированы!', false);

        });
      },
      error => {
        this.alertService.error("Ошибка при регистрации!", error);
      });
  }

//
  attemptUnregisterOnEvent(event) {
    if (confirm(this._translate.instant('unregister_event_alert', [event.title]))) {
      this.unregisterOnEvent(event);
    }
  }

  unregisterOnEvent(event: Event) {
    this.isReg = false;
    // let same = this.checkSameTimeEvents(event)[0].event;
    this.registerService.unregisterOnEvent(event.id).subscribe(
      data => {
        // this.alertService.success('Вы отписаны от события!', true);
        this.registerService.getProfile().subscribe(userProfile => {
          this.currentUser = userProfile;
          this.userEvents = userProfile.get_events.map(e => {return e.event.id});
          // this.update("unregister", event);
          // console.log(event.id, this.currentEvent.id);
          if (event.id === this.currentEvent.id){
            this.isReg = false;
          }
          // this.change({id: event.id, status: false});
        });

      },
      error => {
        this.alertService.error("Ошибка отписки от события!", error);
      });
  }

}
