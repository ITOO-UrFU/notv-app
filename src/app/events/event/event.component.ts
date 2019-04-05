import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EventsService } from 'app/events/events.service';
import { Event } from 'app/events/event';
import { AuthGuard } from 'app/services/auth.guard';
import { RegisterService} from 'app/services/register.service';
import { AlertService } from 'app/services/alert.service';
import {TranslateService} from 'app/translate/translate.service';
import {Subject} from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'div.app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})


export class EventComponent implements OnInit {

  @Input() currentEvent: Event;
  @Input() isLogged: boolean;
  @Input() currentUser: any;

  errorMessage: string;

  @Output() onChanged = new EventEmitter<boolean>();

  change(increased) {
    increased.CU = this.currentUser;
    this.onChanged.emit(increased);
  }

  userEvents: String[];
  isReg: boolean = false;

  private eventsDisableButton = ['dinner', 'coffee_break', 'closed_event'];

  showButtons: boolean = true;

  constructor(private eventsService: EventsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authGuard: AuthGuard,
              private registerService: RegisterService,
              private alertService: AlertService,
              private _translate: TranslateService,
  ) { }

  ngOnInit() {
    // if
    this.userEvents = this.currentUser.get_events.map(e => {return e.event.id});
    this.update("init", this.currentEvent);
  }

  update(type, upd_event: Event){

    // if (this.currentUser.get_events.map(event => {
    //   return event.event.id;
    // }).includes(upd_event.id)) {

      if(this.userEvents.includes(upd_event.id)){
      this.isReg = true;
    } else {
      this.isReg = false;
    }

    // убираем запись на кофебрейки и обеды
    if (this.eventsDisableButton.includes(this.currentEvent.get_event_slug)){
      this.showButtons = false;
    }
    else {
      this.showButtons = true;
    }
  }


// lololo(l){
//   this.change(l);
// }

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
          // console.log(sameEvents[0].event)
          this.unregisterOnEvent(sameEvents[0].event);
          // this.sameEvent = sameEvents[0].event;
        }

      } else {
        this.registerOnEvent(event);
      }
    });
//


  }

  registerOnEvent(event: Event) {
    this.isReg = false;
    this.registerService.registerOnEvent(event.id).subscribe(
      data => {
        this.registerService.getProfile().subscribe(userProfile => {
          this.currentUser = userProfile;
          this.userEvents = userProfile.get_events.map(e => {return e.event.id});
          this.change({id: event.id, status: true});
          // this.change(this.checkSameTimeEvents(event)[0].event);
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

          this.change({id: event.id, status: false});
        });

      },
      error => {
        this.alertService.error("Ошибка отписки от события!", error);
      });
  }

  public goBack() {
    this.router.navigate(["/events"]);
  }
  public toRegister(){
    this.router.navigate(["login"]);
  }
  public goMyEvents(){
    this.router.navigate(["events", "my_events"]);
  }
}
