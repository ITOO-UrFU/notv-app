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
    //currentEvent: Event;
    errorMessage: string;
    //isLogged: boolean = false;
    userEvents: Event[];
    isReg: boolean;
    
    showButtons:boolean = true;

    constructor(private eventsService: EventsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private authGuard: AuthGuard,
        private registerService: RegisterService,
        private alertService: AlertService
        ) { }

  ngOnInit() {
      //this.isLogged = this.authGuard.canActivate();
      //console.log(this.isLogged)
        //let id = this.activatedRoute.snapshot.params["id"];
          this.update(this.currentEvent);     
       //console.log(this.currentEvent)
    //    if (id) {

    //         this.eventsService.getEvent(this.currentEvent.id)
    //             .subscribe(
    //             event => {   
    //                 this.currentEvent = event;
    //                 this.update(this.currentEvent);
    //                 console.log(this.currentEvent);
    //             },
    //             error => this.errorMessage = error
    //             );
    //    }
  }

update(event:Event){
    this.showButtons = false;
    this.registerService.getProfile().subscribe(userProfile => {
                    userProfile.get_events.forEach(event=>{
                        if (event.event.id == this.currentEvent.id){
                            this.isReg = true;
                        }
                    });
                    this.showButtons = true;
                }
            );

}

registerOnEvent(event: Event){
    this.isReg = false;
    this.registerService.registerOnEvent(event.id).subscribe(
                data => {
                 this.alertService.success('Вы зарегистрированы!', true);
                 this.update(this.currentEvent);
                },
                error => {
                    this.alertService.error("Ошибка при регистрации!", error);
                });;
       
}

unregisterOnEvent(event: Event){
    this.isReg = false;
    this.registerService.unregisterOnEvent(event.id).subscribe(
                data => {
                 this.alertService.success('Вы отписаны от события!', true);
                     this.update(this.currentEvent);
                },
                error => {
                    this.alertService.error("Ошибка отписки от события!", error);
                });;
}

    public goBack() {
        this.router.navigate(["/events"]);
    }

    public goMyEvents(){
        this.router.navigate(["events", "my_events"]);
    }
}
