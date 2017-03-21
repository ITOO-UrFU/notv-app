import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { EventsService } from 'app/events/events.service';
import { Event } from 'app/events/event';
import { AuthGuard } from 'app/services/auth.guard';
import { RegisterService} from 'app/services/register.service';
import { AlertService } from 'app/services/alert.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

    currentEvent: Event;
    errorMessage: string;
    isLogged: boolean = false;
    userEvents: Event[];
    isReg: boolean;
    
    showButtons:boolean = false;

    constructor(private eventsService: EventsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private authGuard: AuthGuard,
        private registerService: RegisterService,
        private alertService: AlertService) { }

  ngOnInit() {
        this.isLogged = this.authGuard.canActivate();
        let id = this.activatedRoute.snapshot.params["id"];
       
        if (id) {
            this.eventsService.getEvent(id)
                .subscribe(
                event => {
                
                this.currentEvent = event;
                this.update(this.currentEvent);
                },
                error => this.errorMessage = error
                );
        }
  }

update(event:Event){
    console.log("UPDATE");
    this.isReg = false;
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
    this.registerService.registerOnEvent(event.id).subscribe(
                data => {
                 this.alertService.success('Вы зарегистрированы!', true);
                    window.scrollTo(0,0);
                     this.update(this.currentEvent);
                },
                error => {
                    window.scrollTo(0,0);
                    this.alertService.error("Ошибка при регистрации!", error);
                });;
       
}

unregisterOnEvent(event: Event){
    this.registerService.unregisterOnEvent(event.id).subscribe(
                data => {
                 this.alertService.success('Вы отписаны от события!', true);
                    window.scrollTo(0,0);
                     this.update(this.currentEvent);
                },
                error => {
                    window.scrollTo(0,0);
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
