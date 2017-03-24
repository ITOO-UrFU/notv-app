import { Component, OnInit, Input  } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EventsService } from 'app/events/events.service';
import { Event } from 'app/events/event';
import { AuthGuard } from 'app/services/auth.guard';
import { RegisterService} from 'app/services/register.service';
import { AlertService } from 'app/services/alert.service';

@Component({
  selector: 'div.app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

    @Input() currentEvent: Event;
    @Input() isLogged: boolean;

    errorMessage: string;

    @Input() currentUser: any;

    userEvents: Event[];
    isReg: boolean;


    showButtons: boolean = true;

    constructor(private eventsService: EventsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private authGuard: AuthGuard,
        private registerService: RegisterService,
        private alertService: AlertService
        ) { }

  ngOnInit() {
          this.update(this.currentEvent);
  }

update(event: Event){
    this.showButtons = false;
    this.currentUser.get_events.forEach(event => {
                        if (event.event.id == this.currentEvent.id){
                            this.isReg = true;
                        }
                    });
                    this.showButtons = true;

}

checkSameTimeEvents(potentialEvent: Event): any[] {
    let sameTimeEvents: any[] = [];
  // console.log(potentialEvent.startdate.getTime());
    this.currentUser.get_events.forEach(event => {
                        let currentDate = new Date(event.event.startdate).getTime();
                        if (currentDate == potentialEvent.startdate.getTime()){
                            sameTimeEvents.push(event);
                        }
                    });
    // console.log(sameTimeEvents);
    return sameTimeEvents;
}

attemptRegisterOnEvent(event: Event) {

this.registerService.getProfile().subscribe(userProfile => {
                        this.currentUser = userProfile;
                        let sameEvents: any[] = this.checkSameTimeEvents(event);
                        if (sameEvents.length > 0) {
                          //  console.log("sameEvents", sameEvents);
                        let sameEventsTitles = '';
                            for (let sameEvent of sameEvents){
                                console.log(event);
                               sameEventsTitles += sameEvent.event.title + '\r\n';
                            }
                            console.log(sameEventsTitles);
                           if (confirm('В это время проходят мероприятия, на которые Вы подписаны: \r\n' +
                                        sameEventsTitles +
                                       'Вы уверены что хотите зарегистрироваться на' +
                                        event.title + '?')) {
                                    this.registerOnEvent(event);
                            } else {
                                // Do nothing!
                                }
                        } else {
                            this.registerOnEvent(event);
                            // console.log("Регистрируем пользователя");
                        }

            });



}

registerOnEvent(event: Event) {
    this.isReg = false;
    this.registerService.registerOnEvent(event.id).subscribe(
                data => {
                        this.registerService.getProfile().subscribe(userProfile => {
                        this.currentUser = userProfile;
                        this.update(this.currentEvent);
                });
                 this.alertService.success('Вы зарегистрированы!', true);

                },
                error => {
                    this.alertService.error("Ошибка при регистрации!", error);
                });
}


attemptUnregisterOnEvent(event) {
    if (confirm('Вы уверены, что хотите отписаться от события ' + event.title)) {
            this.unregisterOnEvent(event);
    } else {
        // Do nothing!
        }
}

unregisterOnEvent(event: Event) {
    this.isReg = false;
    this.registerService.unregisterOnEvent(event.id).subscribe(
                data => {
                    this.alertService.success('Вы отписаны от события!', true);
                    this.registerService.getProfile().subscribe(userProfile => {
                    this.currentUser = userProfile;
                    this.update(this.currentEvent);
                })
                },
                error => {
                    this.alertService.error("Ошибка отписки от события!", error);
                });
}

    public goBack() {
        this.router.navigate(["/events"]);
    }

    public goMyEvents(){
        this.router.navigate(["events", "my_events"]);
    }
}
