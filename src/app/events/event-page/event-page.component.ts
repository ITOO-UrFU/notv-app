import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EventsService } from 'app/events/events.service';
import { Event } from 'app/events/event';
import { AuthGuard } from 'app/services/auth.guard';
import { RegisterService} from 'app/services/register.service';
import { AlertService } from 'app/services/alert.service';
import {AuthenticationService} from 'app/services/auth.service';

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
        private alertService: AlertService
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
    // this.router.navigate(["login"]);
  }

// update(event: Event){
//     // this.showButtons = false;
//     this.currentUser.get_events.forEach(event => {
//                         if (event.event.id == this.currentEvent.id){
//                             this.isReg = true;
//                         }
//                     });
//
//
//     // console.log(this.currentEvent);
//     if (this.eventsDisableButton.includes(this.currentEvent.get_event_slug)){
//       this.showButtons = false;
//     }
//     else {
//       this.showButtons = true;
//     }
//
//
// }



//
//
// checkSameTimeEvents(potentialEvent: Event): any[] {
//     let sameTimeEvents: any[] = [];
//     const offset = new Date().getTimezoneOffset();
//     this.currentUser.get_events.forEach(event => {
//                         const startdate = new Date(event.event.startdate);
//                         startdate.setMinutes(startdate.getMinutes() + offset.valueOf());
//                         let currentDate = startdate.getTime();
//
//                         if (currentDate == potentialEvent.startdate.getTime()){
//                             sameTimeEvents.push(event);
//                         }
//                     });
//     // console.log(sameTimeEvents);
//     return sameTimeEvents;
// }

// attemptRegisterOnEvent(event: Event) {
//
//       console.log(console.log(this.checkSameTimeEvents(event)))
//
// this.registerService.getProfile().subscribe(userProfile => {
//                         this.currentUser = userProfile;
//                         let sameEvents: any[] = this.checkSameTimeEvents(event);
//                         if (sameEvents.length > 0) {
//                         let sameEventsTitles = '';
//                             for (let sameEvent of sameEvents){
//                                sameEventsTitles += sameEvent.event.title + '\r\n';
//                             }
//                            if (confirm('В это время проходят мероприятия, на которые Вы подписаны: \r\n' +
//                                         sameEventsTitles +
//                                        'Вы уверены что хотите зарегистрироваться на ' +
//                                         event.title + '?')) {
//                                     this.registerOnEvent(event);
//                             } else {
//                                 // Do nothing!
//                                 }
//                         } else {
//                             this.registerOnEvent(event);
//                         }
//             });
//
//
//
// }

// registerOnEvent(event: Event) {
//     this.isReg = false;
//     this.registerService.registerOnEvent(event.id).subscribe(
//                 data => {
//                         this.registerService.getProfile().subscribe(userProfile => {
//                         this.currentUser = userProfile;
//                         this.update(this.currentEvent);
//                 });
//                  this.alertService.success('Вы зарегистрированы!', true);
//                 },
//                 error => {
//                     this.alertService.error("Ошибка при регистрации!", error);
//                 });
// }


// attemptUnregisterOnEvent(event) {
//     if (confirm('Вы уверены, что хотите отписаться от события ' + event.title + "?")) {
//             this.unregisterOnEvent(event);
//     } else {
//         // Do nothing!
//         }
// }
//
// unregisterOnEvent(event: Event) {
//     this.isReg = false;
//     this.registerService.unregisterOnEvent(event.id).subscribe(
//                 data => {
//                     this.alertService.success('Вы отписаны от события!', true);
//                     this.registerService.getProfile().subscribe(userProfile => {
//                     this.currentUser = userProfile;
//                     this.update(this.currentEvent);
//                 })
//                 },
//                 error => {
//                     this.alertService.error("Ошибка отписки от события!", error);
//                 });
// }

    public goBack() {
        this.router.navigate(["events"]);
    }
    // public toRegister(){
    //     this.router.navigate(["login"]);
    // }
    // public goMyEvents(){
    //     this.router.navigate(["events", "my_events"]);
    // }
}
